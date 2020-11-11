<template>
	<div class="register-wrapper default-theme">
		<div class="nav-section">
			<div class="left">
				<!-- <img class="logo" src="~assets/images/common/login/white-logo.png" alt="logo"> -->
				<span v-show="toggleRegisterSection">{{$t('快捷注册')}}</span>
				<span v-show="!toggleRegisterSection">{{$t('账号注册')}}</span>
			</div>
			<div class="right">
				<router-link :to="{ name: 'login'}">
					<span class="to-login"><span class="login-user"></span>已有账号 请登录</span>
				</router-link>
				<c-lang />
			</div>
		</div>
		<div class="form-section" v-show="!toggleRegisterSection">
			<el-form ref="registerForm" :model="form" :rules="registerFormRules" label-width="100px">
				<el-radio-group v-model="form.businessRole">
					<el-radio-button label="1">{{$t('我是货主')}}</el-radio-button>
					<el-radio-button label="2">{{$t('我是供应商')}}</el-radio-button>
				</el-radio-group>

				<el-row>
					<el-col :span="15">
						<el-form-item :label="$t('用户名')" prop="userName">
							<el-input @blur="formBlur('userName')" @focus="formFocus('userName')" maxlength='20' class="long-width" v-model="form.userName"
							 :placeholder="$t('请输入用户名')"></el-input>
							<a class="focus-userName" v-if="focusUserName">{{$t('-注册后不允许修改且不支持纯数字，长度5~20字符，支持大小写字母、数字、中文、下划线')}}</a>
						</el-form-item>
					</el-col>
				</el-row>

				<el-row>
					<el-col :span="15" class="passIntensity">
						<el-form-item :label="$t('密码')" prop="password">
							<el-input @blur="formBlur('pass')" @focus="formFocus('pass')" maxlength='20' class="long-width" v-model="form.password"
							 type="password" :placeholder="$t('请输入密码')"></el-input>
							<a class="focus-password" v-if="focusPassword">{{$t('-长度8~20位字符，支持数字、大小写字母、符号的组合')}}</a>
						</el-form-item>
						<!-- <div class="showPass">
							<span>弱</span>
							<span>中</span>
							<span>强</span>
						</div> -->
					</el-col>
				</el-row>

				<el-row>
					<el-col :span="15">
						<el-form-item :label="$t('确认密码')" prop="confirmPassword">
							<el-input maxlength='20' class="long-width" type="password" v-model="form.confirmPassword" :placeholder="$t('请再次输入密码')"></el-input>
						</el-form-item>
					</el-col>
				</el-row>

				<el-row>
					<el-col :span="15">
						<el-form-item :label="$t('图形验证码')" prop="picVerifyCode">
							<el-input class="long-width" v-model="form.picVerifyCode" :placeholder="$t('请输入图形中的验证码')" maxlength='4'></el-input>
							<img :src="imgSrc" class="verify-code" @click="createImge">
						</el-form-item>
					</el-col>
				</el-row>

				<el-row>
					<el-col :span="15">
						<el-form-item :label="$t('手机号/邮箱')" prop="mobileOrEmail">
							<el-input class="long-width" v-model="form.mobileOrEmail" :placeholder="$t('请输入手机号或邮箱')"></el-input>
						</el-form-item>
					</el-col>
				</el-row>

				<el-row>
					<el-col :span="15">
						<el-form-item :label="$t('验证码')" prop="verifyCode">
							<el-input class="short-width" @keyup.native="codeFilter(true)" v-model="form.verifyCode" :placeholder="$t('请输入验证码')"
							 maxlength='6'></el-input>
							<button type="button" class="send-code" v-if="loginForm2.issendCode == 0" @click="getRegisterMsgCode(true)">{{$t('发送验证码')}}</button>
							<button type="button" class="send-code" v-if="loginForm2.issendCode == 1">{{loginForm2.timerNum}}S</button>
							<button type="button" class="send-code" v-if="loginForm2.issendCode == 2" @click="getRegisterMsgCode(true)">{{$t('重发验证码')}}</button>
						</el-form-item>
					</el-col>
				</el-row>

				<el-row>
					<el-col :span="15">
						<el-form-item prop="protocol">
							<el-checkbox name="type" @change="popMain" v-model='protocolData'>{{$t('我已阅读并同意')}}{{$t('《用户注册服务协议》')}}
							</el-checkbox>
						</el-form-item>
					</el-col>
				</el-row>

				<el-row class="el-row-last">
					<el-col :span="15">
						<el-form-item>
							<el-button class="long-width" type="primary" @click="register">{{$t('同意并注册')}}</el-button>
						</el-form-item>
					</el-col>
				</el-row>

				<el-row>
					<el-col :span="15">
						<el-form-item class="toggole-register-section">
							<a href="javascript:void(0)" class="toggle-btn" @click="toggleRegisterSection=!toggleRegisterSection">{{$t('快捷注册')}}</a>
						</el-form-item>
					</el-col>
				</el-row>
			</el-form>
		</div>

		<div class="form-section" v-show="toggleRegisterSection">
			<el-form ref="quickRegisterForm" :rules="quickRegisterFormRules" :model="quickForm" label-width="100px">
				<el-radio-group v-model="quickForm.businessRole">
					<el-radio-button label="1">{{$t('我是货主')}}</el-radio-button>
					<el-radio-button label="2">{{$t('我是供应商')}}</el-radio-button>
				</el-radio-group>

				<el-row>
					<el-col :span="15">
						<el-form-item :label="$t('手机号/邮箱')" prop="mobileOrEmail">
							<el-input :placeholder="$t('请输入手机号或邮箱')" class="long-width" v-model="quickForm.mobileOrEmail"></el-input>
						</el-form-item>
					</el-col>
				</el-row>

				<el-row>
					<el-col :span="15">
						<el-form-item :label="$t('图形验证码')" prop="picVerifyCode">
							<el-input :placeholder="$t('请输入图形验证码')" maxlength="4" class="long-width" v-model="quickForm.picVerifyCode"></el-input>
							<img :src="imgSrc" class="verify-code" @click="createImge">
						</el-form-item>
					</el-col>
				</el-row>

				<el-row>
					<el-col :span="15">
						<el-form-item :label="$t('验证码')" prop="verifyCode">
							<el-input :placeholder="$t('请输入验证码')" maxlength="6" class="short-width" v-model="quickForm.verifyCode"
							 @keyup.native="codeFilter(false)"></el-input>
							<button type="button" class="send-code" v-if="loginForm3.issendCode == 0" @click="getRegisterMsgCode(false)">{{$t('发送验证码')}}</button>
							<button type="button" class="send-code" v-if="loginForm3.issendCode == 1">{{loginForm3.timerNum}}S</button>
							<button type="button" class="send-code" v-if="loginForm3.issendCode == 2" @click="getRegisterMsgCode(false)">{{$t('重发验证码')}}</button>
						</el-form-item>
					</el-col>
				</el-row>

				<el-row class="service-agreement">
					<el-col :span="15">
						<el-form-item prop="quickProtocol">
							<el-checkbox name="type" @change="popMain" v-model="quickProtocol">{{$t('我已阅读并同意')}}{{$t('《用户注册服务协议》')}}
							</el-checkbox>
						</el-form-item>
					</el-col>
					<el-col :span="6">
					</el-col>
				</el-row>

				<el-row class="el-row-last">
					<el-col :span="15">
						<el-form-item>
							<el-button type="primary" class="long-width" @click="quickRegister">{{$t('同意并注册')}}</el-button>
						</el-form-item>
					</el-col>
				</el-row>

				<el-row>
					<el-col :span="15">
						<el-form-item class="toggole-register-section">
							<a href="javascript:void(0)" class="toggle-btn" @click="toggleRegisterSection=!toggleRegisterSection">{{$t('账号注册')}}</a>
						</el-form-item>
					</el-col>
				</el-row>
			</el-form>
		</div>
		<c-dialog :visible.sync="showProp" :title="appTitle" width="695">
			<div class="pop-body">
			</div>
			<div slot="footer" class="dialog-footer">
				<el-row>
					<el-col :span="24">
						<el-button size="small" @click="cancelPop">确 定</el-button>
					</el-col>
				</el-row>
			</div>
		</c-dialog>
	</div>
</template>
<script>
	import '@/util/rsa.js'; // 引入RSA
	import {
		verifyCodeCountDown
	} from '@/util/countDown.js'; // 引入倒计时
	import {
		createImge,
		getRegisterMsgCode,
		register,
		quickRegister,
		getRSAPublic
	} from '@/api/common/register/register'
	import CDialog from '@/components/common/cDialog' // 引入弹出框
	export default {
		created() {
			this.createImge();
		},
		components: {
			CDialog
		},
		data() {
			let validateName = (rule, value, callback) => { // 用户名提示语
				this.focusUserName = false
				if (value === '') {
					this.validationUserName = false
					callback(new Error(this.$t('-请输入用户名')));
				} else if (value.length < 5 || value.length > 20) {
					this.validationUserName = false
					callback(new Error(this.$t('-用户名长度为5至20个字符')))
				} else if (!/^[a-zA-Z0-9_\u4e00-\u9fa5]+$/.test(value)) {
					this.validationUserName = false
					callback(new Error(this.$t('-用户名仅支持大小写字母、数字、中文、下划线的组合!')))
				} else if (/^[0-9]*$/.test(value)) {
					this.validationUserName = false
					callback(new Error(this.$t('-用户名不支持全数字!')))
				} else {
					console.log(this.form.businessRole)
					this.validationUserName = true
					callback()
				}
			}

			let validatePass = (rule, value, callback) => { // 密码提示语
				this.focusPassword = false
				if (value == '') {
					this.validationPassword = false
					callback(new Error(this.$t('-请输入密码')));
				} else if (value.length < 8 || value.length > 20) {
					this.validationPassword = false
					callback(new Error(this.$t('-密码长度为8至20个字符')))
				} else if (!/(?!^(\d+|[a-zA-Z]+|[~!@#$%^&*?]+)$)^[\w~!@#$%^&*?]{8,20}$/.test(value)) {
					this.validationPassword = false
					callback(new Error(this.$t('-长度8~20位字符，支持大小写字母、数字、符号三种字符中任意两种字符的组合！')))
				} else {
					this.validationPassword = true
					if (this.form.confirmPassword !== '') {
						this.$refs.registerForm.validateField('confirmPassword');
					}
					callback();
				}
			}

			let validateConfirmPass = (rule, value, callback) => { // 确认密码提示语
				if (value === '') {
					callback(new Error(this.$t('-请再次输入密码')));
				} else if (value !== this.form.password) {
					callback(new Error(this.$t('-两次输入密码不一致!')));
				} else {
					callback();
				}
			};
			let validateProtocol = (rule, value, callback) => { // 是否勾选阅读
				if (!this.toggleRegisterSection) {
					if (!this.protocolData) {
						callback(new Error(this.$t('-请认真阅读《用户注册服务协议》并同意勾选')));
					} else {
						callback();
					}
				} else {
					if (!this.quickProtocol) {
						callback(new Error(this.$t('-请认真阅读《用户注册服务协议》并同意勾选')));
					} else {
						callback();
					}
				}
			};
			let validatePicVerifyCode = (rule, value, callback) => { // 确认图形验证
				if (value === '') {
					callback(new Error(this.$t('-请输入图形验证码')));
				} else {
					callback();
				}
			};
			let validateVerifyCode = (rule, value, callback) => { // 确认验证码
				if (value === '') {
					callback(new Error(this.$t('-请输入验证码')));
				} else {
					callback();
				}
			};
			let emailOrMobileRule = (rule, value, callback) => { // 邮编或手机号验证
				if (value !== '' && value !== null) {
					if (/^^1(3|4|5|7|8)\d{9}$/.test(value)) {
						callback()
					} else if (/^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(value)) {
						callback()
					} else {
						callback(new Error(this.$t('-请输入正确的手机号码或邮箱')))
					}
				} else {
					callback(new Error(this.$t('-请输入手机号码或邮箱')))
				}
			}
			return {
				publicExponent: '',
				/* 登录公钥 */
				modulus: '',
				/* 登录公钥 */
				key: '',
				/* 登录公钥 */
				form: { // 注册表格
					userName: '', // 用户名
					password: '', // 密码
					confirmPassword: '', // 确认密码
					picVerifyCode: '', // 图形验证码
					mobileOrEmail: '', // 手机或邮箱
					verificationType: '1', // 验证方式：1、手机 2、邮箱
					verifyCode: '', // 手机或邮箱验证码
					businessRole: '1', // 业务角色类型：1.个人货主、2.个人服务商
					uuid: '' // 图片验证码返回的uuid
				},
				loginForm2: { // 验证码定时器
					issendCode: 0,
					timerNum: '',
					timer: null
				},
				loginForm3: { // 验证码定时器
					issendCode: 0,
					timerNum: '',
					timer: null
				},
				getRegisterForm: { // 电话或邮箱类型
					msgType: '',
					mobileOrEmail: '',
					uuid: ''
				},
				toggleRegisterSection: true, // 切换用户注册和快捷注册
				registerFormRules: { // 表格验证
					userName: [{
						validator: validateName,
						trigger: 'change'
					}],
					password: [{
						validator: validatePass,
						trigger: 'change'
					}],
					confirmPassword: [{
						validator: validateConfirmPass,
						trigger: 'change'
					}],
					picVerifyCode: [{
						validator: validatePicVerifyCode,
						trigger: 'change'
					}],
					mobileOrEmail: [{
						validator: emailOrMobileRule,
						trigger: 'change'
					}],
					verifyCode: [{
						validator: validateVerifyCode,
						trigger: 'change'
					}],
					protocol: [{
						validator: validateProtocol,
						trigger: 'change'
					}]
				},
				quickRegisterFormRules: { // 快捷登录表单验证
					mobileOrEmail: [{
						validator: emailOrMobileRule,
						trigger: 'change'
					}],
					quickProtocol: [{
						validator: validateProtocol,
						trigger: 'change'
					}],
					picVerifyCode: [{
						validator: validatePicVerifyCode,
						trigger: 'change'
					}],
					verifyCode: [{
						validator: validateVerifyCode,
						trigger: 'change'
					}]
				},
				protocolData: false, // 账号注册勾选
				quickProtocol: false, // 快捷注册注册勾选
				focusUserName: false, // 用户名提示
				validationUserName: false, // 用户名验证判定focusUserName
				focusPassword: false, // 密码提示
				validationPassword: false, // 密码验证判定focusUserName
				quickForm: { // 快捷登录
					picVerifyCode: '', // 图形验证码
					mobileOrEmail: '', // 手机或邮箱
					verificationType: '1', // 验证方式：1、手机 2、邮箱
					verifyCode: '', // 手机或邮箱验证码
					businessRole: '1', // 业务角色类型：1.个人货主、2.个人服务商
					uuid: '' // 图片验证码返回的uuid
				},
				showProp: false, // 弹出框条件
				appTitle: '注册协议', // 弹出框表头
				imgSrc: '' // 图形验证码
			}
		},
		watch: {
			toggleRegisterSection(curVal, oldVal) { // 切换时还原数据
				this.createImge()
				if (curVal) {
					this.$refs['registerForm'].resetFields()
					this.protocolData = false
				} else {
					this.$refs['quickRegisterForm'].resetFields()
					this.quickProtocol = false
				}
			}
		},
		methods: {
			// 获取图形验证码
			createImge() {
				createImge().then(res => {
					this.imgSrc = res.entity.imgStr;
					this.form.uuid = res.entity.uuid;
					this.quickForm.uuid = res.entity.uuid;
				})
			},
			codeFilter(val) { // 验证码过滤
				if (val) {
					this.form.verifyCode = this.form.verifyCode.replace(/[^.\d]/g, '')
					this.form.verifyCode = this.form.verifyCode.replace('.', '')
				} else {
					this.quickForm.verifyCode = this.quickForm.verifyCode.replace(/[^.\d]/g, '')
					this.quickForm.verifyCode = this.quickForm.verifyCode.replace('.', '')
				}
			},
			formFocus(type) { // 表格获取焦点事件
				if (type == 'userName') {
					if (!this.validationUserName) {
						this.focusUserName = true
					}
				} else {
					if (!this.validationPassword) {
						this.focusPassword = true
					}
				}
			},
			formBlur(type) { // 表格失去焦点事件
				if (type == 'userName') {
					this.focusUserName = false
				} else {
					this.focusPassword = false
				}
			},
			cancelPop() { // 隐藏弹出框
				this.showProp = false
			},
			popMain() { // 弹出框
				this.showProp = true
			},
			// 获取RSA加密公钥
			getRSAPublic() {
				let self = this
				let RSAPassword = this.form.password // 注册未加密前的密码
				let RSAConfirmPassword = this.form.confirmPassword // 注册未加密前的确认密码
				getRSAPublic().then(res => {
					self.modulus = res.entity.modulus
					self.publicExponent = res.entity.publicExponent
				}).then(() => {
					/* eslint-disable */
					let key = RSAUtils.getKeyPair(
						self.publicExponent,
						'',
						self.modulus
					)
					RSAPassword = RSAUtils.encryptedString(
						key,
						encodeURIComponent(RSAPassword)
					)
					RSAConfirmPassword = RSAUtils.encryptedString(
						key,
						encodeURIComponent(RSAConfirmPassword)
					)
					/* eslint-disable */
					let submitForm = {}
					for (let item in self.form) {
						submitForm[item] = self.form[item]
					}
					submitForm.password = RSAPassword
					submitForm.confirmPassword = RSAConfirmPassword
					register({ // 注册
						...submitForm
					}).then(res => {
						console.log(res)
						this.$message({
							message: res.detail,
							type: 'success'
						})
						localStorage.setItem('jwt', res.entity)
						let name = 'home'
						this.$router.replace({
							name
						})
					}).catch(error => {
						this.createImge()
					})
				})
			},
			// 获取短信或邮箱验证码
			getRegisterMsgCode(type) { // true为账号注册 false为快捷注册
				console.log(type)
				if (type) { // 账号注册
					if (!this.form.picVerifyCode) {
						this.$message({
							message: '图形验证码不能为空',
							type: 'warning'
						})
						return false
					}
					if (!this.form.mobileOrEmail) {
						this.$message({
							message: '手机号/邮箱不能为空',
							type: 'warning'
						})
						return false
					}
					let regularCorrect = false // 格式正确才能发请求
					if (/^1(3|4|5|7|8)\d{9}$/.test(this.form.mobileOrEmail)) {
						this.getRegisterForm.msgType = 1
						this.form.verificationType = 1
						regularCorrect = true
					} else if (/^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(this.form.mobileOrEmail)) {
						this.getRegisterForm.msgType = 2
						this.form.verificationType = 2
						regularCorrect = true
					} else {
						regularCorrect = false
					}
					if (regularCorrect) {
						this.getRegisterForm.mobileOrEmail = this.form.mobileOrEmail
						this.getRegisterForm.uuid = this.form.uuid
						this.getRegisterForm.picVerifyCode = this.form.picVerifyCode
						console.log(this.form)
						getRegisterMsgCode({ // 发送验证码
							...this.getRegisterForm
						}).then(res => {
							if (res.code == 0) {
								this.$message({
									message: '验证码已发送',
									type: 'success'
								})
								console.log(res)
								verifyCodeCountDown(this.loginForm2, '120') // 启动倒计时
							}
						})
					}
				} else { // 快捷注册
					if (!this.quickForm.picVerifyCode) {
						this.$message({
							message: '图形验证码不能为空',
							type: 'warning'
						})
						return false
					}
					if (!this.quickForm.mobileOrEmail) {
						this.$message({
							message: '手机号/邮箱不能为空',
							type: 'warning'
						})
						return false
					}
					let regularCorrect = false // 格式正确才能发请求
					if (/^1(3|4|5|7|8)\d{9}$/.test(this.quickForm.mobileOrEmail)) {
						this.getRegisterForm.msgType = 1
						this.quickForm.verificationType = 1
						regularCorrect = true
					} else if (/^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(this.quickForm.mobileOrEmail)) {
						this.getRegisterForm.msgType = 2
						this.quickForm.verificationType = 2
						regularCorrect = true
					} else {
						regularCorrect = false
					}
					if (regularCorrect) {
						this.getRegisterForm.mobileOrEmail = this.quickForm.mobileOrEmail
						this.getRegisterForm.uuid = this.quickForm.uuid
						this.getRegisterForm.picVerifyCode = this.quickForm.picVerifyCode
						getRegisterMsgCode({ // 发送验证码
							...this.getRegisterForm
						}).then(res => {
							if (res.code == 0) {
								this.$message({
									message: '验证码已发送',
									type: 'success'
								})
								verifyCodeCountDown(this.loginForm3, '120') // 启动倒计时
							}
						})
					}
				}
			},
			// 注册操作
			register() {
				this.$refs.registerForm.validate((valid) => {
					if (valid) {
						this.getRSAPublic()
					}
				})
			},
			// 快捷登录
			quickRegister() {
				this.$refs.quickRegisterForm.validate((valid) => {
					if (valid) {
						quickRegister({ // 快捷登录
							...this.quickForm
						}).then(res => {
							this.$message({
								message: res.detail,
								type: 'success'
							})
							localStorage.setItem('jwt', res.entity)
							let name = 'home'
							this.$router.replace({
								name
							})
						}).catch(error => {
							this.createImge()
						})
					}
				})
			}
		},
		i18n
	}

</script>

<style lang="scss">
	@import '~assets/styles/util.scss';

	.register-wrapper {
		// background-image: url('~assets/images/common/register/register-bg.png');
		background-repeat: no-repeat;
		background-size: cover;
		background-position: center;
		width: 100%;
		height: 100%;
		padding-top: 140px;
		background-color: $grayBackground;
		margin-top: 80px;

		.nav-section {
			display: flex;
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			background-image: linear-gradient(150deg, $mainTheme 0%, $auxiliary2 100%);

			.left {
				width: 240px;
				height: 100px;
				line-height: 100px;
				color: $white;
				text-align: right;

				.logo {
					margin-right: 20px;
					display: inline-block;
				}
			}

			.right {
				height: 100px;
				flex-grow: 1;
				text-align: right;

				.to-login {
					position: relative;
					color: $white;
					padding-left: 30px;
					margin-right: 65px;
					line-height: 100px;

					.login-user {
						position: absolute;
						top: -3px;
						left: 0;
						height: 24px;
						width: 22px;
						background-image: url('~assets/images/common/register/register-user.png');
						background-repeat: no-repeat;
						background-size: 22px 24px;
					}
				}
			}
		}

		.form-section {
			width: 800px;
			margin: 0 auto;
			transform: translate(100px);

			.el-form-item.is-required:not(.is-no-asterisk) {

				>.el-form-item__label:before {
					content: '';
					margin: 0;
				}
			}

			.el-form .el-row .el-col .el-form-item .el-form-item__content {
				position: relative;

				.el-form-item__error {
					width: 600px;
					position: absolute !important;
					top: 39px;
				}

				.focus-userName {
					width: 600px;
					height: 15px;
					background: #f0f4fb;
					position: absolute !important;
					top: 43px;
					color: #f56c6c;
					font-size: 12px;
					line-height: 1;
					z-index: 999;
				}

				.focus-password {
					width: 600px;
					height: 15px;
					background: #f0f4fb;
					position: absolute !important;
					top: 43px;
					color: #f56c6c;
					font-size: 12px;
					line-height: 1;
					z-index: 999;
				}
			}

			.el-radio-group {
				margin: 0 0 20px 100px;

				.el-radio-button__inner {
					width: 200px;
				}
			}

			.el-row {
				margin-bottom: 30px;

				.input-tips {
					font-size: 12px;
					color: $btnGray;
					line-height: 1;
					padding-top: 4px;
					position: absolute;
					top: 100%;
					left: 0;
				}

				.long-width {
					width: 400px;
				}

				.medium-width {
					width: 270px;
				}

				.short-width {
					width: 290px;
				}

				.verify-code {
					position: absolute;
					width: 110px;
					height: 38px;
					top: 4px;
					right: -2px;
					display: inline-block;
					margin: -3px 10px 0;
				}

				.send-code {
					width: 100px;
					line-height: 38px;
					font-size: 14px;
					border: 1px solid #3fadff;
					color: #3fadff;
					border-radius: 4px;
					background-color: $white;
					margin-left: 5px;
					margin-top: 1px;
					z-index: 1;
					position: relative;
					cursor: pointer;
				}

				.change-captcha {
					color: $blue;
					font-size: 14px;
				}

				.toggole-register-section {
					text-align: center;

					.toggle-btn {
						color: $blue;
						font-size: 14px;
					}
				}
			}

			.el-row-last {
				margin-bottom: 0;
			}
		}
	}

</style>
