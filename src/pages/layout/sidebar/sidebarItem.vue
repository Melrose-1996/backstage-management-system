<template>
    <div class="sidebar-menu-section">
        <div class="sidebar-menu-operation">
            <div class="opr-item">
                <i class="icon iconfont icon-top-sidebar-list" :class="{active : oprSelect == 1}" @click="getMenusList"></i>
            </div>
            <div class="opr-item" :class="{hide: isCollapse}">
                <i class="icon iconfont icon-sidebar-top-home" :class="{active : oprSelect == 3}" @click="getHomepage"></i>
            </div>
            <div class="opr-item" :class="{hide: isCollapse}">
                <i class="icon iconfont icon-top-sidebar-collect" :class="{active : oprSelect == 2}" @click="getCollectMenuList"></i>
            </div>
            <div class="opr-item" :class="{hide: isCollapse}">
                <el-input class="opr-popup-search" v-model="menusFilterText" :class="{active: showPopupSearch}" placeholder="搜索" @keyup.enter.native="getSearchMenusList" clearable></el-input>
                <i class="icon iconfont icon-top-sidebar-search" :class="{active : oprSelect == 4}" @click="popupOprSearch"></i>
            </div>
        </div>
        <el-menu ref="sidebarMenus" :collapse-transition="false" :collapse="isCollapse" text-color="#aab8bf" active-text-color="#fff" background-color="#fff" class="el-menu-vertical-demo" :default-active="$route.path" unique-opened router>
            <template v-for="(item, index) in menus">
                <el-menu-item class="sidebar-menu-item no-children" v-if="item.resourceType == 4" :key="index" :index="item.linkAddress" @click="menuItemSelect(item)">
                    <i :class="sidebarIcon + item.resourceCode"></i>
                    <span slot="title">{{item.name}}</span>
                    <collect-icon :isCollapse="isCollapse" :id="item.id" :isCollect="item.isCollect"></collect-icon>
                </el-menu-item>
                <el-submenu :key="index" :index="item.resourceCode" v-else>
                    <template slot="title">
                        <i :class="sidebarIcon + item.resourceCode"></i>
                        <span slot="title">{{item.name}}</span>
                    </template>
                    <el-menu-item class="sidebar-menu-item" style="padding-left:64px" v-for="(child, idx) in item.children" :key="idx" :index="child.linkAddress" @click="menuItemSelect(child)">
                        <span slot="title">{{child.name}}</span>
                        <collect-icon :isCollapse="isCollapse" :id="child.id" :isCollect="child.isCollect">
                        </collect-icon>
                    </el-menu-item>
                </el-submenu>
            </template>
        </el-menu>
    </div>
</template>
<script>
	import {
		mapGetters,
		mapActions
	} from 'vuex'
	import CollectIcon from '@/pages/layout/sidebar/collectIcon.vue'
	export default {
		name: 'SidebarItem',
		computed: {
			...mapGetters(['menus', 'channel', 'sideMenuInfo'])
		},
		props: {
			isCollapse: {
				type: Boolean
			}
		},
		watch: {
			channel(val) {
				this.getMenusList()
			}
		},
		created() {
			this.oprSelect = 1
			this.setAllMenuInfo().then(res => {
				this.getListMenuInfo({
					type: 1
				})
			})
		},
		data() {
			return {
				oprSelect: 1, // 1：正常列表；2： 收藏列表；3：主页；4：查询功能
				showPopupSearch: false,
				menusFilterText: '', // 菜单过滤
				sidebarIcon: 'icon iconfont icon-'
			}
		},
		methods: {
			...mapActions({
                addTab: 'addTab', // 将 `this.add()` 映射为 `this.$store.dispatch('increment')`
                setCurrentTab: 'setCurrentTab',
				setAllMenuInfo: 'setAllMenuInfo',
				getListMenuInfo: 'getListMenuInfo'
			}),
			// 弹出框
			popupOprSearch() {
				this.oprSelect = 4
				this.showPopupSearch = !this.showPopupSearch
			},
			// 获取正常列表
			getMenusList() {
				this.oprSelect = 1
				this.getListMenuInfo({
					type: 1
				})
			},
			// 收藏列表
			getCollectMenuList() {
				this.oprSelect = 2
				this.getListMenuInfo({
					type: 2
				})
			},
			// 搜索菜单
			getSearchMenusList() {
				if (this.menusFilterText) {
					this.getListMenuInfo({
						type: 3,
						name: this.menusFilterText
					})
				}
			},
			// 将点击菜单的路由路径加到tablist里面
			menuItemSelect(data) {
				// 去掉dialog弹框的背景
				let bg = document.getElementsByClassName('c-dialog-bg')
				if (bg.length > 0) {
					document.getElementById('subject_main_section').removeChild(bg[0])
				}
				this.addTab(data)
			},
			getHomepage() {
				this.$router.push({
					name: 'home'
				})
				this.oprSelect = 3
				this.setCurrentTab('home')
				sessionStorage.setItem('currentTabId', 'home')
				sessionStorage.removeItem('currentTab')
			}
		},
		components: {
			CollectIcon
		}
	}

</script>

<style lang="scss">
	@import '../../../assets/styles/util.scss';

	.sidebar-menu-section {
		height: 100%;
		overflow: hidden;
		.sidebar-menu-operation {
			height: 40px;
			line-height: 38px;
			border-bottom: 1px solid $borderColor;
			display: flex;
			text-align: center;
			align-items: center;

			.opr-item {
				flex-grow: 1;
				position: relative;

				.icon {
					display: block;
					margin: 0 auto;
					cursor: pointer;
					color: #666;

					&.icon-top-sidebar-collect,
					&.icon-sidebar-top-home,
					&.icon-top-sidebar-search {
						font-size: 18px;
					}

					&.active {
						color: $auxiliary2;
					}
				}

				.opr-popup-search {
					position: absolute;
					height: 30px;
					width: 0;
					left: 0;
					top: 0;
					z-index: 100;

					>input {
						height: 32px;
						line-height: 30px;
						display: none;
					}

					&.active {
						animation: showPopupSearch 0.3s;
						animation-fill-mode: forwards;

						>input {
							display: inline-block;
							width: 165px;
						}
					}
				}
			}
		}
		.el-menu {
			border: 0 none;
			height:100%;
			overflow-y: auto;
			.el-submenu {
				.el-submenu__title {
					height: 50px;
					line-height: 50px;
					font-size: 15px !important;
					padding-left: 18px !important;
					border-left: 3px solid $white;
					color: $fc333 !important;

					.icon {
						font-size: 18px;
						color: $fc666;
						margin-right: 11px;
					}

					&:hover {
						background-color: $auxiliary6 !important;
						border-left: 4px solid $auxiliary2;
						color: $mainTheme !important;
						i {
							color: $mainTheme;
						}
					}
					.tabs-img {
						width: 20px;
						height: 20px;
						margin-left: 5px;
						margin-right: 15px;
					}

					.el-submenu__icon-arrow {
						&.el-icon-arrow-down {
							width: 0;
							height: 0;
							border-style: solid;
							border-width: 9px 8px 0 8px;
							border-color: $fcddd transparent transparent transparent;
							margin-top: 0;
							color: #ccc;

							&::before {
								content: "";
							}
						}
					}
				}

				.sidebar-menu-item {
					padding-left: 53px !important;
				}
			}

			.sidebar-menu-item {
				position: relative;
				height: 50px !important;
				line-height: 50px !important;
				border-left: 3px solid $white;
				color: $fc333 !important;
				font-size: 15px;
				padding-left: 18px !important;

				.el-tooltip {
					padding-left: 18px !important;
					.collect-icon{
						display:none !important;
					}
				}

				.icon {
					font-size: 18px;
					color: $fc666;
					margin-right: 11px;

					&.icon-r010101 {
						font-size: 16px;
					}
				}

				span {
					color: $fc333 !important;
					font-size: 15px;
				}

				.collect-icon {
					display: none;
				}

				&:hover,
				&.is-active {
					background-color: $auxiliary6 !important;
					border-left: 4px solid $auxiliary2;
					color: $mainTheme !important;

					.collect-icon {
						display: inline;
					}

					span {
						color: $mainTheme !important;
					}
					i {
						color: $mainTheme;
					}
				}
			}
		}
		.el-menu::-webkit-scrollbar {
			width: 6px;
		}
		.el-menu::-webkit-scrollbar-thumb {
			border-radius: 10px;
			background: #c3c3c3;
		}
		.el-menu::-webkit-scrollbar-thumb:hover {
			background: #a6a6a6;
		}
	}
	@keyframes showPopupSearch {
		from {
			width: 47px;
			left: 0;
		}

		to {
			width: 175px;
			left: -165px;
			display: block;
		}
	}

	@keyframes hidePopupSearch {
		from {
			width: 175px;
			left: -165px;
		}

		to {
			width: 0;
			left: 0;
		}
	}

	.el-menu--vertical {
		.sidebar-menu-item {
			position: relative;
			height: 50px !important;
			line-height: 50px !important;
			border-left: 3px solid $white;
			color: $fc333 !important;
			padding-left: 35px !important;
			font-size: 15px;

			span {
				color: $fc333 !important;
				font-size: 15px;
			}

			&:hover,
			&.is-active {
				background-color: $auxiliary6 !important;
				border-left: 3px solid $auxiliary2;
				color: $mainTheme !important;

				span {
					color: $mainTheme !important;
				}
			}
		}
	}

</style>
