<template>
	<div>
		<div class="user-info">
			<div class="user-comon" @mouseenter="isShowUserPanel=true" @mouseleave="isShowUserPanel=false">
				<div class='img-parent'>
                    <div class="img-class icon iconfont icon-morentouxiang"  id='user_false_img'></div>
					<img src="" id='user_small_img' alt="userImg">
				</div>
				<span class="user-lable">{{userName}}</span>
				<span class="arrow-section"><i class="arrow"></i></span>
				<div class="user-content" :class="{'show': isShowUserPanel}">
					<!-- <div class="select-lists">
						<a href="javascript:void(0)" class="link-set" @click="personalSetting">个人设置</a>
					</div>
					<div class="select-lists">
						<router-link class="link-set" :to="{name: 'login'}">切换账号</router-link>
					</div> -->
					<div class="select-lists">
						<a href="javascript:void(0)" class="link-set" @click="loginOut">退出系统</a>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import {
		mapGetters,
		mapActions
	} from 'vuex';
	// import {
	// 	loginOut,
	// 	isLogin
	// } from '@/api/common/login/login.js'
	import loginData from '@/mockData/login.json'
	export default {
		// name: 'userInfo',
		computed: {
			...mapGetters([
				'isFullScreen',
				'userInfo',
				'channel'
			])
		},
		data() {
			return {
				isShowUserPanel: false,
				userName: ''
			}
		},
		mounted() {
			this.isLogin();
		},
		methods: {
			// store设置userInfo
			...mapActions({
				setUserInfo: 'setUserInfo',
				addTab: 'addTab',
				delChannel: 'delChannel'
			}),
			isLogin() {
				// isLogin().then(res => {
					let res = loginData;
					console.log(res, 'dada')
					if (res.code == 0) {
						this.setUserInfo(res.entity);
						this.userName = res.entity.userName

						// 设置user.vue里的头像
						if (res.entity.imageUrl) {
							document.getElementById('user_false_img').style.display = 'none'
                            document.getElementById('user_small_img').src = require(`../../../assets/images/userInfo/${res.entity.imageUrl}`)
						} else {
							document.getElementById('user_small_img').style.display = 'none'
						}
					}
				// })
			},
			loginOut() {
				// loginOut().then(res => {
				// 	this.$router.push({
				// 		name: 'login'
				// 	})
				// 	this.delChannel()
				// })
				this.$router.push({
					name: 'login'
				})
				this.delChannel()
			},
			// 个人设置
			personalSetting() {
				let tab = {
					name: '个人设置',
					linkAddress: '/system_setting/personal_settings',
					id: 'personalSettings',
					applicationId: this.channel
				}
				this.addTab(tab)
				this.$router.push({
					name: 'systemSettingPersonalSettings'
				})
			}
		}
	}

</script>

<style lang="scss">
	@import '../../../assets/styles/util.scss';

	.user-info {
		position: absolute;
		top: 0;
		right: -20px;

		.user-comon {
			line-height: 60px;
			padding: 0 10px;
			height: 60px;
			cursor: pointer;
			font-size: 0;
			position: relative;

			&:hover {
				background-color: $mainHoverBlue;

				>.arrow-section {
					transform: rotateZ(180deg);
					transition: transform 0.5s;
				}

				.user-content {
					display: block;
				}
            }

            .img-parent {
				width: 32px;
				height: 32px;
				display: inline-block;
				margin-right: 10px;
				position: relative;
				overflow: hidden;
				top: 13px;

				img {
					width: 32px;
					height: 32px;
					border-radius: 50%;
					border: 2px solid #76afd9;
					margin-right: 10px;
					position: absolute;
				}

				.img-class {
					width: 32px;
					height: 32px;
					border-radius: 50%;
					border: 2px solid #76afd9;
                    background: #fff;
					margin-right: 10px;
                    line-height: 32px;
                    font-size: 20px;
                    color: #ddd;
                    text-align: center;
				}
			}

			>.user-lable {
				font-size: 12px;
				color: $auxiliary7;
				margin-right: 10px;
				font-weight: 700;
			}

			>.arrow-section {
				line-height: 12px;
				display: inline-block;
				height: 6px;

				.arrow {
					width: 0;
					height: 0;
					border-style: solid;
					border-width: 6px 6px 0 6px;
					border-color: $auxiliary7 transparent transparent transparent;
				}
			}

			.user-content {
				z-index: 999;
				position: absolute;
				top: 60px;
				right: 10px;
				display: none;
				width: 160px;
				border: 1px solid $borderColor;
				border-radius: 3px;
				background-color: $white;

				.select-lists {
					padding: 6px 0;
					border-bottom: 1px solid $borderColor;
					height: 44px;
					box-sizing: border-box;

					&:last-child {
						border: none;
					}

					.link-set {
						color: $fc333;
						display: block;
						font-size: 14px;
						text-indent: 15px;
						height: 30px;
						line-height: 30px;

						&:hover {
							color: $auxiliary1;
							background-color: $auxiliary5;
							text-decoration: underline;
						}
					}
				}

				&.show {
					display: block;
				}
			}
		}

	}

</style>
