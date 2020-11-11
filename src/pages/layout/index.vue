<template>
	<el-container class="fy-container">
		<el-aside class="fy-aside" :style="{width: isCollapse ? asideWidthCollapse : asideWidth}">
			<!-- 左侧导航栏 -->
			<sidebar :isCollapse="isCollapse"></sidebar>
		</el-aside>
		<el-container class=" fy-content ">
			<el-header>
				<!-- 顶部导航栏 -->
				<top />
				<!-- 顶部标签卡 -->
			</el-header>
			<tabs />
			<el-main id="subject_main_section" class="self-scrollbar">
				<i class="main-section-close el-icon-close" v-show="tabFullScreen" @click="closeTabFullscreen"></i>
				<!-- 主体视图层 -->
				<keep-alive>
					<router-view class="router-main-section" v-if="$route.meta.keepAlive " />
				</keep-alive>
				<router-view class="router-main-section" v-if="!$route.meta.keepAlive " />
			</el-main>
		</el-container>
	</el-container>
</template>

<script>
	import {
		mapGetters,
		mapActions
	} from 'vuex'
	import sidebar from './sidebar/'
	import top from './top/'
	import tabs from './tabs/'
	export default {
		name: 'index',
		components: {
			sidebar,
			top,
			tabs
		},
		computed: {
			...mapGetters(['isCollapse', 'tabFullScreen', 'tabList'])
		},
		watch: {
			'$route'(to, from) {
				let currentTabData = this.tabList.filter((cur) => {
					return cur.link == to.path
				})
				if (currentTabData.length > 0) {
					this.setCurrentTab(currentTabData[0].id)
					this.setChannel(currentTabData[0].channel)
				}
			}
		},
		data() {
			return {
				// [侧边栏宽度] 正常状态
				asideWidth: '240px',
				// [侧边栏宽度] 折叠状态
				asideWidthCollapse: '60px',
				// 刷新token锁
				refreshLock: false,
				// 刷新token的时间
				refreshTime: ''
			}
		},
		methods: {
			...mapActions({
				setCurrentTab: 'setCurrentTab',
				setChannel: 'setChannel',
				setTabFullScreen: 'setTabFullScreen'
			}),
			closeTabFullscreen() {
				let subjectMainSection = document.getElementById('subject_main_section')
				subjectMainSection.style.cssText = ''
				this.setTabFullScreen()
			}
		}
	}

</script>

<style lang="scss">
	@import '../../assets/styles/util.scss';

	.fy-container {
		height: 100%;

		.fy-aside {
			background-color: $white;
			height: 100%;
			transition: width 0.35s;

			.el-menu {
				border: none;
			}
		}

		.fy-content {
			.el-header {
				height: 60px;
				line-height: 60px;
				background: $mainTheme;
			}

			.el-main {
				background-color: $mainBackground;
				overflow-y: auto;
				padding-right: 0;
				-moz-box-shadow:2px 2px 5px #969696;
				-webkit-box-shadow:3px 2px 18px -13px #4665d2 inset;
				box-shadow:3px 2px 18px -13px #4665d2 inset;
				&#subject_main_section {
					height: 100%;
					position: relative;

					// 右边侧边栏现在只做了样式，暂时还用不上
					.router-main-section {
						// margin-right: 52px;
						margin-right: 20px;
					}
				}

				.main-section-close {
					cursor: pointer;
					border: 1px solid $fc333;
					border-radius: 50%;
					position: absolute;
					top: 4px;
					left: 4px;
				}
			}
		}
	}

</style>
