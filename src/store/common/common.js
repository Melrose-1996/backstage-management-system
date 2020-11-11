// import {
// 	getAllMenuInfo
// } from '@/api/common/layout/layout'
import data from '@/mockData/menu.json'
export default {
	state: {
		isCollapse: false, // 侧边栏是否打开
		channel: '', //   bpsp 1
		isFullScreen: false,
		topMenuInfo: [], // 顶栏菜单信息
		sideMenuInfo: [], // 侧边栏菜单信息
		currentSideMenuInfo: [], // 当前侧边栏菜单信息
		menus: [],
		currentTabId: 'home', // 当前tab
		tabList: [],
		tabFullScreen: false, // 当前tab是否全屏
		fakeLink: '', // 刷新当前页面的过渡页面时，记录当前页面的url
		userInfo: {}, // 登录获取用户信息
		buttonList: [] // 按钮权限
	},
	getters: {
		isCollapse: state => state.isCollapse,
		channel: state => state.channel,
		isFullScreen: state => state.isFullScreen,
		topMenuInfo: state => state.topMenuInfo,
		sideMenuInfo: state => state.sideMenuInfo,
		currentSideMenuInfo: state => state.currentSideMenuInfo,
		menus: state => state.menus,
		tabList: (state) => state.tabList,
		currentTabId: (state) => state.currentTabId,
		tabFullScreen: (state) => state.tabFullScreen,
		fakeLink: (state) => state.fakeLink,
		userInfo: (state) => state.userInfo,
		buttonList: state => state.buttonList
	},
	mutations: {
		DEL_CHANNEL: (state) => {
			state.channel = ''
		},
		SET_COLLAPSE: (state, action) => {
			state.isCollapse = !state.isCollapse;
		},
		SET_CHANNEL: (state, channel) => {
			state.channel = channel
			sessionStorage.setItem('channel', channel)
		},
		SET_FULLSCREEN: (state, action) => {
			state.isFullScreen = !state.isFullScreen;
		},
		SET_TOPMENUINFO: (state, topMenuInfo) => {
			state.topMenuInfo = topMenuInfo
		},
		SET_SIDEMENUINFO: (state, sideMenuInfo) => {
			state.sideMenuInfo = sideMenuInfo
		},
		// type 1是所有列表 2是收藏列表 3是搜索列表
		GET_CURRENTSIDEMENUINFO: (state, data) => {
			if (state.sideMenuInfo.length == 0) {
				state.menus = []
				return
			}
			let menus = state.sideMenuInfo.filter(menu => {
				if (data.type == 1) {
					return menu.applicationId == state.channel
				} else if (data.type == 2) {
					return menu.applicationId == state.channel && menu.isCollect
				} else {
					return menu.applicationId == state.channel && menu.name.indexOf(data.name) > -1
				}
			})
			state.menus = []
			if (menus.length == 0) {
				return
			}
			let temp = []
			temp.push(menus.splice(0, 1)[0])
			// 把menus菜单从一维变成二维
			temp[0].children = []
			while (menus.length > 0) {
				let menu = menus.splice(0, 1)[0]
				if (temp[temp.length - 1].id == menu.parentId) {
					temp[temp.length - 1].children.push(menu)
				} else {
					temp.push(menu)
					temp[temp.length - 1].children = []
				}
			}
			state.menus = temp.slice(0)
		},
		SET_COLLECTIONFORMENUITEM: (state, id) => {
			state.sideMenuInfo.map(menu => {
				if (menu.id == id) {
					menu.isCollect = !menu.isCollect
					return true
				}
			})
		},
		/**
		 * 添加tab
		 */
		ADD_TAB: function(state, data) {
			state.currentTabId = data.id
			sessionStorage.setItem('currentTabId', data.id)
			let tab = {
				name: data.name,
				link: data.linkAddress,
				id: data.id,
				channel: data.applicationId
			};
			sessionStorage.setItem('currentTab', JSON.stringify(tab))
			if (state.tabList.some((a) => a.id === data.id)) {
				return;
			}
			state.tabList.push(tab);
		},
		DEL_TAB: function(state, id) {
			let tabList = state.tabList
			// 判断删除的是否是选中的tab
			if (state.currentTabId == id) {
				tabList.forEach((item, index) => {
					if (item.id == id) {
						let nextTab = tabList[index + 1] || tabList[index - 1];
						if (nextTab) {
							state.currentTabId = nextTab.id;
						}
					}
				});
			}

			state.tabList = tabList.filter((tab) => {
				return tab.id != id
			});
			// 当删除完所有tab，默认选中首页
			if (state.tabList.length == 0) {
				state.currentTabId = 'home'
				sessionStorage.removeItem('currentTabId')
			} else {
				sessionStorage.setItem('currentTabId', state.currentTabId)
			}
		},
		// 删除其他tab
		DEL_OTHER_TAB: function(state, id) {
			let tabList = state.tabList
			state.tabList = tabList.filter((tab) => {
				return tab.id == id
			});
		},
		// 删除所有
		DEL_ALL_TAB: function(state) {
			state.tabList = []
			state.currentTabId = 'home'
		},
		SET_CURRENT_TAB: function(state, id) {
			state.currentTabId = id
			sessionStorage.setItem('currentTabId', id)

			let tabs = state.tabList.filter(tab => {
				return tab.id == id
			})

			sessionStorage.setItem('currentTab', JSON.stringify(tabs[0]))
		},
		SET_TABFULLSCREEN: function(state) {
			state.tabFullScreen = !state.tabFullScreen
		},
		GET_FAKELINK: function(state, fakeLink) {
			state.fakeLink = fakeLink
		},
		SET_USERINFO: (state, userInfo) => {
			state.userInfo = userInfo
		},
		SET_BUTTONLIST: (state, buttonList) => {
			state.buttonList = buttonList
		}
	},
	actions: {
		delChannel({
			commit
		}) {
			commit('DEL_CHANNEL')
		},
		setCollapse({
			commit
		}) {
			commit('SET_COLLAPSE')
		},
		setChannel({
			commit
		}, channel) {
			commit('SET_CHANNEL', channel)
		},
		// 存储所有菜单的信息
		setAllMenuInfo({
			commit,
			state
		}) {
			return new Promise((resolve, reject) => {
				console.log(data, 'jsdata')
				// getAllMenuInfo().then(res => {
					let res = data;
					if (res.code == 0 && res.entity != null) {
						if (res.entity) {
							commit('SET_TOPMENUINFO', res.entity.applicationList)
							commit('SET_SIDEMENUINFO', res.entity.menuList)
						} else {
							commit('SET_TOPMENUINFO', [])
							commit('SET_SIDEMENUINFO', [])
						}
						// 默认选第一个应用
						// 为了防止刷新丢失  先宠sessionStorage里面取
						let channel = sessionStorage.getItem('channel')
						if (res.entity && res.entity.applicationList.length > 0 && (channel == null || channel == 'undefined')) {
							commit('SET_CHANNEL', res.entity.applicationList[0].id)
						} else {
							commit('SET_CHANNEL', channel)
						}
						resolve()
					} else {
						state.topMenuInfo = []
						state.sideMenuInfo = []
						state.channel = ''
					}
				// })
			})
		},
		// 获取当前菜单列表
		getListMenuInfo({
			commit
		}, data) {
			commit('GET_CURRENTSIDEMENUINFO', data)
		},
		// 更改收藏菜单的isCollect字段
		setCollectionForMenuItem({
			commit
		}, id) {
			commit('SET_COLLECTIONFORMENUITEM', id)
		},
		addTab({
			commit
		}, data) {
			commit('ADD_TAB', data);
		},
		delTab({
			commit
		}, id) {
			commit('DEL_TAB', id);
		},
		delOtherTab({
			commit
		}, id) {
			commit('DEL_OTHER_TAB', id)
		},
		delAllTab({
			commit
		}) {
			commit('DEL_ALL_TAB')
		},
		setCurrentTab({
			commit
		}, id) {
			commit('SET_CURRENT_TAB', id)
		},
		setTabFullScreen({
			commit
		}) {
			commit('SET_TABFULLSCREEN')
		},
		getFakeLink({
			commit
		}, fakeLink) {
			commit('GET_FAKELINK', fakeLink)
		},
		setUserInfo({
			commit
		}, userInfo) {
			commit('SET_USERINFO', userInfo)
		}
	}
}