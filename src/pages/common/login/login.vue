<template>
	<div class="login-wrapper default-theme">
		<div class="nav-section">
			<span class="logo"></span>
			<span class="text">蜂鸟云数据平台</span>
		</div>
		<div>
			<div class="main-content">
				<div class="login-dialog">
					<div class="tabs-section">
						<div class="logo-title">欢迎登录</div>
					</div>
					<p class="u-line"></p>
					<div class="form-section">
						<el-form :model="loginForm1" ref="loginForm1" :rules="loginFormRules1">
							<el-form-item prop="userName">
								<el-input class="long-width user" v-model="loginForm1.userName"
									:placeholder="$t('enterAccountName')"></el-input>
							</el-form-item>

							<el-form-item prop="password">
								<el-input class="long-width password" type="password" v-model="loginForm1.password"
									:placeholder="$t('enterPassword')" maxlength="20"></el-input>
							</el-form-item>

							<el-form-item prop="picVerifyCode">
								<el-input
	                             auto-complete="off"
	                             class="long-width captcha"
	                             v-model="loginForm1.picVerifyCode"
	                             @keyup.native.enter="queryEncryptionType"
	                             :placeholder="$t('enterPicVerifyCode')"
	                             maxlength="4">
								</el-input>
								<!-- <img :src="imgSrc" class="verify-code" alt="" @click="getImage"> -->
								<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHgAAAAoCAIAAAC6iKlyAAACBUlEQVR42u3avU1EMQwH8LcEDR3QUrAHtDAFMwASPQXS9UzAAGxAwQIswQhHpJPMkfgltmMnflGsFKd3Hzr9ZP2fk7tlP6tJLZOAVT9vl2FNaENcMfGENsc1gb7+eEev37xewePTk11+VX6Hr90jfdFx788uiKtRR6PWLOhKawE0pXPdQaPWAE1RrrGmE7NiQUXZJKMjaxQ6eotugBQzF80NQXWGjqwp0MVnVW5omXSuh+42daTWbaDXYqGvMgL9dHcOC714fJ1ozYK2GMW6K5ehI2KZdRFa0M70G5qpshCaqMy1DtBrlKzboGAT4UQ5B60VIIeOFo90NTs0P8oF6PTVMusAHfqaTqy1/fUQzaToQEsGHUAz1mGpny24Um4KDdZo5+pO0N6U/0EbKUcZnXau+rbQVTQ3hQ6mwRpw0/MQowM8P8qG0FEsQFOj5yEWp3eulHnQxZFj7YaWQh+sgVsd2k8010KzRjEUGri1Mtq0nes/baE0bPoUaxTLQEdj36jKf9D53bZ4T7innfeDtRNo+mE/+6xD9yyJC32w9pPO7aBRa9mXpv92Jba2HjZsobtUZV97Ll/QA1u7gx7VevGmPKq1U+jxrP1CW1s/f97CapfRbqve+hi0Me6WoGXWHUE3DD1GXm/m/9Ey6++Xh2hNaKF1SumBddvQrjp0cOiZ0bMK9QuGpRMpBL/HwwAAAABJRU5ErkJggg==" alt="" class="verify-code">
							</el-form-item>

							<!-- <el-form-item>
								<p class="register">
									<router-link :to="{ name: 'register'}">{{$t('registerImmediately')}}</router-link>
								</p>
							</el-form-item> -->

							<el-form-item>
								<el-button class="login-btn" type="primary" :loading="loginBtn1"
									@click="login1('test')">{{$t('loginImmediately')}}</el-button>
							</el-form-item>
						</el-form>
					</div>
				</div>
			</div>
			<div class="login-bgimages">
				<llsRuleEngine></llsRuleEngine>
			</div>
		</div>
	</div>
</template>

<script>
	import Vue from 'vue'
	import {
		mapActions
	} from 'vuex'
	// import md5 from 'js-md5';
	import '@/util/rsa.js'; // 引入RSA
	import {
		verifyCodeCountDown,
		noContinuityClick
	} from '@/util/countDown'
	import {
		getAllAuthButtons
	} from '@/api/common/layout/layout'
	import {
		// getImage,
		// platformLogin,
		// getUserSalt,
		// queryOldEncryption,
		// getRSAPublic,
		getLoginMsgCode,
		platformQuickLogin
	} from '@/api/common/login/login';

	import VueI18n from 'vue-i18n'
	import zh from '@/assets/i18n/zh/common/login'
	import en from '@/assets/i18n/en/common/login'
	Vue.use(VueI18n)

	const messages = {
		en: en,
		zh: zh
	}

	const language = localStorage.getItem('i18n');

	const i18n = new VueI18n({
		locale: language || 'zh',
		messages
	})

	export default {
		created() {
			localStorage.removeItem('jwt'); // 清除之前的jwt
			sessionStorage.removeItem('channel')
			sessionStorage.removeItem('currentTab')
			sessionStorage.removeItem('currentTabId')
			// this.getImage()
			this.delAllTab()
		},
		mounted() {
			document.querySelector('.re-main-bee').classList.add('replace-img')
		},
		data() {
			let Form2userNameRule = (rule, value, callback) => { // 用户名是邮箱还是手机号验证
				let phoneRule = /^1(3|4|5|6|7|8)\d{9}$/
				let emailRule = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/
				if (value === '') {
					callback(new Error(this.$t('loginErrorMessage1')))
				} else if (phoneRule.test(value)) {
					this.loginForm2.msgType = '1';
					callback();
				} else if (emailRule.test(value)) {
					this.loginForm2.msgType = '2';
					callback();
				} else {
					callback(new Error(this.$t('loginErrorMessage2')))
				}
			}
			let Form2submitRule = (rule, value, callback) => { // 短信验证码提交时验证
                let that = this
				if (!value && this.loginForm2.submitFlag) {
					callback(new Error(this.$t('loginErrorMessage3')));
				} else if (/\D/.test(value)) {
                        that.loginForm2.verifyCode = that.loginForm2.verifyCode.replace(/[^.\d]/g, '')
                        callback();
                } else {
					callback();
				}
			}
			return {
				publicExponent: '',
				/* 登录公钥 */
				modulus: '',
				/* 登录公钥 */
				key: '',
				/* 登录公钥 */
				loginForm1: {
					userName: 'superAdmin',
					password: 'superAdmin',
					picVerifyCode: 'pb7z',
					encryptionType: '' // 加密方式：1.MD5、2.RSA
				}, // 账号登录
				loginForm2: {
					mobileOrEmail: '',
					verifyCode: '',
					picVerifyCode: '',
					msgType: '', // 手机或邮箱登录账号类型：1.手机，2邮箱
					submitFlag: false, // 判断是否提交按钮触发校验规则
					issendCode: 0, // 是否发送手机验证码
					timerNum: '', // 再次发送手机验证码倒计时时间
					timer: null // 手机验证码倒计时计时器
				}, // 手机或邮箱登录
				loginFormRules1: {
					userName: {
						required: true,
						message: this.$t('loginErrorMessage4'),
						trigger: 'blur'
					},
					password: {
						required: true,
						message: this.$t('loginErrorMessage5'),
						trigger: 'blur'
					},
					picVerifyCode: {
						required: true,
						message: this.$t('loginErrorMessage6'),
						trigger: 'blur'
					}
				},
				loginFormRules2: {
					mobileOrEmail: {
						validator: Form2userNameRule,
						trigger: 'blur'
					},
					picVerifyCode: {
						required: true,
						message: this.$t('loginErrorMessage7'),
						trigger: 'blur'
					},
					verifyCode: {
						validator: Form2submitRule,
						trigger: 'change'
					}
				},
				toggleLoginSection: 1, // 不同登录框之间切换: 1-密码登录，2-验证码登录
				imgSrc: '', // 图形验证码
				sendCodeFlag: false, // 获取验证码请求是否发送
				loginBtn1: false, // 登录请求是否发送
				loginBtn2: false, // 登录请求是否发送
				uuid: '',
				timer: null // canvas流星背景的定时器
			}
		},
		methods: {
			...mapActions({
				delAllTab: 'delAllTab'
			}),
			// 获取验证码
			// getImage() {
			// 	getImage().then(res => {
			// 		this.imgSrc = res.entity.imgStr;
			// 		this.uuid = res.entity.uuid;
			// 	})
			// },
			// 账号登录-确认加密方式
			queryEncryptionType() {
				// let self = this;
				// this.$refs.loginForm1.validate(valid => {
				// 	if (valid) {
				// 		/** 还在请求、操作过于频繁时不再发送新的请求 */
				// 		this.loginBtn1Obj = noContinuityClick(this.loginBtn1Obj, this)
				// 		if (this.loginBtn1 || this.loginBtn1Obj.clickCounts > 0) {
				// 			return false;
				// 		}
				// 		/** 还在请求、操作过于频繁时不再发送新的请求 */
				// 		this.loginBtn1 = true;
				// 		// type：登录会员类型，1-个人会员，2-企业/企业会员/运营平台
				// 		getUserSalt({
				// 			userName: this.loginForm1.userName,
				// 			type: '2'
				// 		}).then(res => {
				// 			this.saltCode = res.entity;
				// 			let data = JSON.parse(JSON.stringify(self.loginForm1));
				// 			// type：登录会员类型，1-个人会员，2-企业/企业会员/运营平台
				// 			queryOldEncryption({
				// 				userName: this.loginForm1.userName,
				// 				type: '2'
				// 			}).then(res => {
				// 				if (res.entity == 1) {
				// 					data.encryptionType = '2';
				// 					getRSAPublic().then(res => {
				// 						self.modulus = res.entity.modulus
				// 						self.publicExponent = res.entity.publicExponent
				// 					}).then(() => {
				// 						/* eslint-disable */
				// 						let key = RSAUtils.getKeyPair(
				// 							self.publicExponent,
				// 							'',
				// 							self.modulus
				// 						)
				// 						data.password = RSAUtils.encryptedString(
				// 							key,
				// 							encodeURIComponent(data.password)
				// 						)
				// 						/* eslint-disable */
				// 						self.login1(data);
				// 					}).catch(err => {
				// 						if (err) {}
				// 						this.loginBtn1 = false
				// 					})
				// 				} else if (res.entity == 0) {
				// 					data.encryptionType = '1'
				// 					data.password = md5(md5(md5(data.password) + self.saltCode) +
				// 						data.picVerifyCode);
				// 					self.login1(data)
				// 				}
				// 			}).catch(err => {
				// 				this.loginBtn1 = false
				// 			})
				// 		}).catch(err => {
				// 			this.loginBtn1 = false
				// 		})
				// 	}
				// })
			},
			// 账号登录
			login1(data) {
				this.$refs.loginForm1.validate(valid => {
					if (valid) {
						this.$message({
							type: 'success',
							message: '登录成功'
						});
						this.$router.push({
							name: 'home'
						})
					}
				})
				// platformLogin({
				// 	...data,
				// 	uuid: this.uuid
				// }).then(res => {
				// 	this.loginBtn1 = false;
				// 	this.$message({
				// 		type: 'success',
				// 		message: res.detail
				// 	});
				// 	localStorage.setItem('jwt', res.entity);
				// 	getAllAuthButtons().then(res => {
				// 		if (res.code == 0 && res.entity != null) {
				// 			sessionStorage.setItem('authButtonList', res.entity.join(','))
				// 		}
				// 	})
				// 	this.$router.push({
				// 		name: 'home'
				// 	})
				// }).catch((err) => {
				// 	this.loginBtn1 = false;
				// 	this.getImage();
				// })
			},
			// 手机或邮箱登录-发送手机或邮箱验证码
			sendCode() {
				this.loginForm2.submitFlag = false;
				this.$refs.loginForm2.validate(valid => {
					if (valid) {
						/** 还在请求、验证码倒计时、操作过于频繁时不再发送新的请求 */
						this.sendCodeObj = noContinuityClick(this.sendCodeObj, this)
						if (this.sendCodeFlag || this.loginForm2.issendCode == 1 || this.sendCodeObj.clickCounts >
							0) {
							return false;
						}
						/** 还在请求、验证码倒计时、操作过于频繁时不再发送新的请求 */
						this.sendCodeFlag = true;
						getLoginMsgCode({
							msgType: this.loginForm2.msgType,
							mobileOrEmail: this.loginForm2.mobileOrEmail,
							picVerifyCode: this.loginForm2.picVerifyCode,
							uuid: this.uuid
						}).then(res => {
                            this.sendCodeFlag = false;
                            verifyCodeCountDown(this.loginForm2, '120');
                            this.$message.success(res.detail)
						}).catch(() => {
							this.sendCodeFlag = false;
							// this.getImage();
						})
					}
				});
			},
			// 手机或邮箱登录
			login2() {
				this.loginForm2.submitFlag = true;
				this.$refs.loginForm2.validate(valid => {
					if (valid) {
						/** 还在请求、操作过于频繁时不再发送新的请求 */
						if (this.loginBtn2) {
							return false;
						}
						/** 还在请求、操作过于频繁时不再发送新的请求 */
						this.loginBtn2 = true;
						platformQuickLogin({
							mobileOrEmail: this.loginForm2.mobileOrEmail,
							verifyCode: this.loginForm2.verifyCode
						}).then(res => {
							this.loginBtn2 = false;
							this.$message({
								type: 'success',
								message: res.detail
							});
							localStorage.setItem('jwt', res.entity);
							getAllAuthButtons().then(res => {
								if (res.code == 0 && res.entity != null) {
									sessionStorage.setItem('authButtonList', res.entity.join(','))
								}
							})
							this.$router.push({
								name: 'home'
							})
						}).catch(() => {
							this.loginBtn2 = false;
							// this.getImage();
						})
					}
				});
            },
            // 查寻备案信息
            goMiitbeian() {
                window.open('http://www.miitbeian.gov.cn')
            }
		},
		i18n
	}

</script>

<style lang="scss">
	@import '../../../assets/styles/util.scss';

	.login-wrapper {
		background-image: url('../../../assets/images/common/login/banner.jpg');
		background-repeat: no-repeat;
		background-size: cover;
		background-position: center top;
		width: 100%;
		min-height: 740px;
		height: 100vh;
		position: relative;

		.nav-section {
			height: 60px;
			position: relative;
			// text-align: right;
			z-index: 1000;
			display: flex;
			width: 90%;
			align-items: center;
			margin: 0 auto;
			.logo {
				width: 32px;
				height: 30px;
				// position: absolute;
				// top: 25px;
				// left: 100px;
				margin-right: 10px;
				background-image: url('../../../assets/images/common/login/logo_login.png');
				background-repeat: no-repeat;
			}
			.text {
				// position: absolute;
				// top: 25px;
				// left: 140px;
				color: #fff;
				font-size: 24px;
				font-style: italic;
			}

			.to-login {
				color: $auxiliary1;
				font-size: 16px;
				line-height: 100px;
				margin-right: 20px;
				color: $toLogin;

				&:hover {
					color: $toLoginHover;
				}
			}

			.to-register {
				color: $white;
				font-size: 16px;
				line-height: 100px;
				margin-right: 70px;

				&:hover {
					color: $btnInfoHover;
				}
			}
		}
		.replace-img {
        	background: url('../../../assets/images/common/login/mix-cloud.png') no-repeat center center !important;
	        width: 262px !important;
	        height: 209px !important;
	        left: -122px !important;
	        top: -122px !important;
	        animation: C 1s 4s ease-out forwards !important;
        /*opacity: 1 !important;*/
    	}
		.main-content {
			position: relative;
			min-height: 640px;
			z-index: 1000;

			.login-dialog {
				width: 380px;
				height: 430px;
				background-color: $white;
				// background-color: rgba(255, 255, 255, 0.85);
				padding-top: 10px;
				border-radius: 5px;
				position: absolute;
				top: 30px;
				right: 50px;
				box-sizing: border-box;
				box-shadow: 0 0 30px 0px $loginDialogShadow;

				.tabs-section {
					display: flex;
					// margin-bottom: 30px;
					padding: 0 37px;
					align-items: center;
					background-color: rgba(0, 0, 0, 0);
					border-left: 0;
					border-right: 0;
					height: 58px;
					.logo-title {
						background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAD9ElEQVRYhc1X2UtUcRT+ZhydGUXHcdRKyxbQiiLCiAyybDELQyIVoV4tguov8KWXyKeIaHmKohCihSI00h4yrGyBFqRV0cyMHB23GWe9M3XO1ZnmeufeuZQxfU96595zvt8531l+up8EJBD6RDpnGLS+GKI4ddh9aPnmRafdj+5JAWP+6eBZU3QozDBgY24KKheaUJprhF6nza4uXgr411tfPWh4NYnP5FQLiojMieIMVBeYoYtDRJVAr1PAgY4xPBv2a3I8GyU5KWgqtWJZunKgFQm0//Chpn0UDl/oj5yHYTPqcbMsC2XzjdoJsPOdD0YQ+DvfESST1NvKs2OSkFUBh51PrtV5fqoe93fYMLl/AZq3ZyErRZ50tsU22bYqAY4F51xr2Fn9rXSyinwT0umYlQvNaCy2xHyXbbLt2fGWEGC1axUcpRZ3ttqwKjNZ8rzQoiw4ts0+YhLgOudS0wIO8hVS9+YYOb1HfUIN7CMUFYUI3Y4hn+Y6b1yXgdV08rZBL1zCtDUDC23Qh/OfplS/ZR/c0LbMM0oJtMRhHgYr+mK3Gx/GBSwgAb4dDWBgKogiCv0rRwBaBgv7khHoVMk956lqkQn1hanoJ2fPR/y4tMkq/nbmgwsfJwScL8mcPuFEQCR4uccNu4KYuZVH2xbRrRD+UurvewtMuL3NhspFZhiT1Hsrp4Ddni2xYI3VgDSD/P1oXxEC4cESBqv8wgYLjq9Nj9vPfcHf355abxEbDottOc2El5U5pBdpZUT7UhzHxbZk1C1NhTOgntU8cxKu9Xlw6OkYTr93ik2HJ+I5Sgl/u5LEergoTfH7CAHrrA7WORzAumY7hr0heIXfJDgDvc4ghJlaqllixpuqHBxZkYamXg/ejQfE52Z6MdesR/2TMRx9MSGxHe0rEhue50NeqRD7XEEc7BwnYzwfvBRaE/bQ6V6QYKsfOsC89JQfbr9MbHe+UWxM4/4QGrucaKGyjAX2JSPAy8Rje+xK8ASBra0OMaf7Fpuwi0jw37XU37uoHB+U22AiBnz62nYH2r77oNbN2VcYkWn4iCZgWeuI8lcz4OFTX5iGHlLyEKeHBMinZyG+pD4Q1NAI2ndly/tAKT3gTSZeNxx0h8SpdpVasW5WeTyn1GxrG4FbUGbBPnhlCyMiQt7heI3SgqsktobX8rmxgTagOhKlGthH9L4oKUPe4XiN0oKTXS5c+OiSPU9VaVRsm31EQ0KAI8o7HK9RWnCMyuvGF3fk/4EpAdf7PTHfZZtNYtqkz+dkJavIM2I+1erdAY+sozLUVrL/cykNI6FreRgJvZhEQ7yaDc1czYYVrmY5M1ezeXN4NfvXSPjt+BfrLOQrBSjhGgAAAABJRU5ErkJggg==) no-repeat 0;
					    font-size: 24px;
					    color: #00a0e4;
					    padding-left: 35px;
					    height: 58px;
					    line-height: 58px;
					}

					.tab {
						width: 164px;
						// height: 22px;
						// line-height: 22px;
						// font-size: 16px;
						text-align: center;
						cursor: pointer;
						color: $fc999;
						font-size: 18px;
						line-height: 18px;
						padding: 20px 0px;

						&.active {
							color: $toggleLoginTab;
						}
					}

					.vline {
						height: 22px;
						width: 0;
						border-left: 1px solid $fcddd;
					}
				}

				.u-line {
					width: 100%;
					height: 0px;
					border-top: 1px solid $fcddd;
				}

				.form-section {
					margin-top: 30px;
					padding: 0 40px;

					.el-form-item {
						margin-bottom: 20px;

						.el-form-item__content>.el-form-item__error {
							position: absolute !important;
						}

						&:nth-child(3) {
							margin-bottom: 0px;
						}

						.long-width {
							width: 100%;
							padding-left: 50px;
							box-sizing: border-box;
							height: 40px;
							line-height: 38px;
							border: 1px solid $inputBorder;
							border-radius: 3px;
							background-color: $white;
							background-repeat: no-repeat;
							background-position: 12px 10px;
							background-size: 16px;

							.el-input__inner {
								height: 38px;
								border: none;
								padding: 0;
							}

							&.user {
								background-image: url('../../../assets/images/common/login/login-user.png');
							}

							&.password {
								background-image: url('../../../assets/images/common/login/login-pass.png');
							}

							&.captcha {
								background-image: url('../../../assets/images/common/login/login-captcha.png');
							}
						}

						.short-width {
							width: 190px;
							padding-left: 50px;
							box-sizing: border-box;
							height: 40px;
							line-height: 38px;
							border: 1px solid $inputBorder;
							border-radius: 3px;
							background-color: $white;
							background-repeat: no-repeat;
							background-position: 12px 10px;
							background-size: 16px;

							&.code {
								background-image: url('../../../assets/images/common/login/login-pass.png');
							}

							.el-input__inner {
								height: 38px;
								border: none;
								padding: 0;
							}
						}

						.verify-code {
							position: absolute;
							top: 1px;
							right: 1px;
							height: 38px;
							width: 98px;
							cursor: pointer;
						}

						.send-code-btn {
							width: 100px;
							height: 38px;
							float: right;
							padding: 12px 15px;
							font-size: 14px;
							line-height: 14px;

							.el-icon-loading {
								position: absolute;
								left: 5px;
							}
						}

						.loding-btn {
							padding-left: 6px;
						}

						.forget-pass {
							display: inline-block;
							width: 49%;
							text-align: left;

							>a {
								color: $fc999;
							}
						}

						.register {
							display: inline-block;
							width: 49%;
							text-align: right;

							>a {
								color: $toggleLoginTab;
							}
						}

						.login-btn {
							width: 100%;
							font-size: 16px;
							line-height: 16px;
							margin-top: 36px;
							background-image: url('../../../assets/images/common/login/login-btn.png');
							box-shadow: 0 3px 1px 1px $loginBtnShadow;
						}
					}
				}

				.third-party-section {
					text-align: center;

					.split-line {
						font-size: 12px;
						color: $fc999;
						margin-bottom: 20px;

						&::before {
							content: '';
							display: inline-block;
							width: 70px;
							height: 1px;
							background-color: $fcddd;
							margin-right: 20px;
							vertical-align: middle;
						}

						&::after {
							content: '';
							display: inline-block;
							width: 70px;
							height: 1px;
							background-color: $fcddd;
							margin-left: 20px;
							vertical-align: middle;
						}
					}

					.link-box {
						.icon {
							margin: 0 30px;

							&:first-child {
								margin-left: 0;
							}

							&:last-child {
								margin-right: 0;
							}
						}
					}
				}
			}

		}
		// 左侧图片
		.login-bgimages {
			position: absolute;
			top: 80px;
			left: -120px;
			z-index: 1000;
		}
	}

</style>
