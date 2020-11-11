<template>
    <div class="tabs-section">
        <div class="nav-tabs-section">
            <el-tabs @tab-remove="removeTab" @tab-click="clickTab" v-model="tabName">
                <el-tab-pane class="tabs-home" label="首页" name="home" :closable="false"></el-tab-pane>
                <el-tab-pane closable v-for="item in tabList" :key="item.id" :label="item.name" :name="item.id + ''">
                </el-tab-pane>
            </el-tabs>
        </div>
        <div class="nav-operation-section">
            <div class="nav-dropdown">标签操作
                <i class="arrow-down"></i>
                <div class="operation-lists">
                    <p class="list" @click="closeCurrentTab">关闭当前</p>
                    <p class="list" @click="closeOtherTab">关闭其他</p>
                    <p class="list" @click="closeAllTab">关闭全部</p>
                    <p class="list" @click="showFullscreen">全屏显示</p>
                </div>
            </div>
            <!-- <p class="nav-refresh" @click="refreshTab">刷新</p> -->
        </div>
    </div>
</template>

<script>
	import {
		mapGetters,
		mapActions
	} from 'vuex'
	export default {
		name: 'tabs',
		computed: {
			...mapGetters(['tabList', 'channel', 'currentTabId']), // tabList来自tab channel来自common.js
			tabName: {
				get: function () {
					return this.$store.getters.currentTabId + ''
				},
				set: function () {}
			}
		},
		data() {
			return {
				isHome: false // 是否是首页页面
			}
		},
		mounted() {
			let currentTabId = sessionStorage.getItem('currentTabId')
			let currentTab = sessionStorage.getItem('currentTab')
			if (currentTab != null && currentTab != 'undefined') {
				currentTab = JSON.parse(currentTab)
			}
			if (currentTabId) {
				this.setCurrentTab(currentTabId)
				if (currentTabId != 'home') {
					let tab = {
						name: currentTab.name,
						linkAddress: currentTab.link,
						id: currentTab.id,
						applicationId: currentTab.channel
					}
					this.addTab(tab)
				}
			}
		},
		methods: {
			...mapActions({
				addTab: 'addTab',
				delTab: 'delTab',
				setCurrentTab: 'setCurrentTab',
				setChannel: 'setChannel',
				delOtherTab: 'delOtherTab',
				delAllTab: 'delAllTab',
				setTabFullScreen: 'setTabFullScreen',
				getFakeLink: 'getFakeLink',
				getListMenuInfo: 'getListMenuInfo'
			}),
			removeTab(targetId) {
				this.delTab(targetId)
				if (this.tabList.length == 0) {
					sessionStorage.removeItem('currentTab')
					sessionStorage.setItem('currentTabId', 'home')
					this.$router.push({
						path: '/home'
					})
					return
				}
				let currentTabData = this.tabList.filter((cur) => {
					return cur.id == this.currentTabId
				})

				sessionStorage.setItem('currentTab', JSON.stringify(currentTabData[0]))
				// 删除tab，跳到下一个选中的tab
				this.$router.push({
					path: currentTabData[0].link
				})
				// 删掉当前tab, 如果下一个tab的应用id不等于当前页面的应用id，则channel要变为下一个应用的id,菜单变为相对应的菜单
				if (this.channel != currentTabData[0].channel) {
					this.setChannel(currentTabData[0].channel)
					this.getListMenuInfo({
						type: 1
					})
				}
			},
			// 点击tab，切换页面
			clickTab(tab) {
				if (tab.name == 'home') {
					this.$router.push({
						path: '/home'
					})
                    this.isHome = true
                    this.setCurrentTab('home')
					sessionStorage.setItem('currentTabId', 'home')
					sessionStorage.removeItem('currentTab')
					return
				}
				this.isHome = false
				let currentTabData = this.tabList.filter((cur) => {
					return cur.id == tab.name
				})
				// tab的name 就是传入的id
				this.$router.push({
					path: currentTabData[0].link
				})
				this.setCurrentTab(tab.name)

				// 切换当前tab, 如果下一个tab的应用id不等于当前页面的应用id，则channel要变为下一个应用的id,菜单变为相对应的菜单
				if (this.channel != currentTabData[0].channel) {
					this.setChannel(currentTabData[0].channel)
					this.getListMenuInfo({
						type: 1
					})
				}
			},
			// 关闭当前tab
			closeCurrentTab() {
				if (this.isHome) {
					return
				}
				this.removeTab(this.currentTabId)
			},
			// 关闭其他
			closeOtherTab() {
				if (this.isHome) {
					this.delAllTab()
					return
				}
				this.delOtherTab(this.currentTabId)
			},
			// 关闭所有
			closeAllTab() {
				// this.delAllTab()
				this.closeOtherTab()
				this.closeCurrentTab()
			},
			// 全屏显示
			showFullscreen() {
				let subjectMainSection = document.getElementById('subject_main_section')
				subjectMainSection.style.position = 'fixed'
				subjectMainSection.style.top = '0'
				subjectMainSection.style.left = '0'
				subjectMainSection.style.width = '100%'
				subjectMainSection.style.height = '100%'
				subjectMainSection.style.zIndex = '100'
				this.setTabFullScreen()
			},
			// 刷新tab
			refreshTab() {
				this.getFakeLink(this.$route.path)
				this.$router.push({
					path: '/fake'
				})
			}
		}
	};

</script>

<style lang="scss">
	@import '../../../assets/styles/util.scss';

	.tabs-section {
		background-color: $white;
		position: relative;
		box-sizing: border-box;
		width: 100%;
		height: 40px;
		border-left: 1px solid $borderColor;
		border-right: 1px solid $borderColor;

		.nav-tabs-section {
			// .el-tabs__nav-wrap {
			// 	padding: 0 35px !important;
			// }

			.el-icon-close {
				position: relative;
				top: -12px;
				font-size: 12px;
			}

			height: 40px;
			position: relative;
			margin-right: 120px;

			.el-tabs {
				box-sizing: border-box;

				.el-tabs__header {
					margin-bottom: 0;

					.el-tabs__nav-wrap {
						padding: 0 10px;
						cursor: pointer;

						.el-tabs__active-bar{
							background: transparent;
						}

						.el-tabs__item{
							&.is-active{
								background: #e4e9f5;
								color: inherit;
							}
							// &:hover{
							// 	background: #e5eaf4;
							// 	// color: inherit;
							// }
							padding: 0 20px;
						}
						&.is-scrollable {
							padding: 0 50px;
						}

						.el-tabs__nav-prev {
							line-height: 40px;
							width: 35px;

							.el-icon-arrow-left {
								width: 0;
								height: 0;
								border-style: solid;
								border-width: 6px 6px 6px 0;
								border-color: transparent $fcddd transparent transparent;
								display: block;
								margin: 14px 0 0 16px;

								&::before {
									content: "";
								}
							}
						}

						.el-tabs__nav-next {
							line-height: 40px;
							width: 35px;

							.el-icon-arrow-right {
								width: 0;
								height: 0;
								border-style: solid;
								border-width: 6px 0 6px 6px;
								border-color: transparent transparent transparent $fcddd;
								display: block;
								margin: 14px 0 0 13px;

								&::before {
									content: "";
								}
							}
						}
					}
				}
			}
		}

		.el-tabs__nav-wrap::after {
			height: 1px;
		}

		.nav-operation-section {
			border-left: 1px solid $borderColor;
			border-bottom: 1px solid $borderColor;
			position: absolute;
			top: 1px;
			right: 0;
			// width: 215px;
			height: 39px;
			box-sizing: border-box;
			display: flex;

			.nav-dropdown {
				line-height: 39px;
				color: $fc333;
				border-right: 1px solid $borderColor;
				font-size: 14px;
				padding: 0 16px 0 20px;
				cursor: pointer;
				position: relative;

				.arrow-down {
					display: inline-block;
					width: 0;
					height: 0;
					border-style: solid;
					border-width: 6px 6px 0 6px;
					border-color: $fcddd transparent transparent transparent;
					margin-left: 10px;
					vertical-align: middle;
				}

				&:hover {
					.arrow-down {
						transform: rotateZ(180deg);
						transition: transform 0.5s;
					}

					.operation-lists {
						display: block;
					}
				}

				.operation-lists {
					position: absolute;
					left: -1px;
					top: 38px;
					background-color: $white;
					z-index: 2;
					border: 1px solid $fcddd;
					width: 120px;
					display: none;

					>.list {
						height: 24px;
						line-height: 24px;
						text-indent: 17px;
						color: $fc333;
						font-size: 12px;

						&:hover {
							background-color: $auxiliary5;
						}
					}
				}
			}

			.nav-refresh {
				background-image: url('../../../assets/images/layout/tabs/tabs-refresh.svg');
				background-size: 16px 14px;
				background-repeat: no-repeat;
				background-position: 21px 13px;
				width: 94px;
				line-height: 39px;
				font-size: 12px;
				text-indent: 47px;
				cursor: pointer;
			}
		}
	}

</style>
