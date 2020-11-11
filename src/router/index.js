import Vue from 'vue'
import Router from 'vue-router'
import accountCenter from './route/accountCenter'
import accessManagement from './route/accessManagement'
import home from './route/home'
Vue.use(Router)
let router = new Router({
	base: '/',
	mode: 'history',
	routes: [{
			path: '/login',
			name: 'login',
			component: (resolve) => {
				require(['@/pages/common/login/login'], resolve)
			},
			meta: {
				title: '登录',
				isChild: false,
				keepAlive: false,
				hidden: true
			}
		}, {
			path: '/register',
			name: 'register',
			component: (resolve) => {
				require(['@/pages/common/register/register'], resolve)
			},
			meta: {
				title: '注册',
				isChild: false,
				keepAlive: false,
				hidden: true
			}
		}, {
			path: '/',
			component: (resolve) => require(['@/pages/layout/index'], resolve),
			children: [{
				path: '/home',
				name: 'home',
				component: (resolve) => {
					require(['@/pages/common/home/index'], resolve)
				},
				meta: {
					title: '首页',
					isChild: true,
					keepAlive: true
				}
			}]
		}, {
			path: '/',
			component: (resolve) => require(['@/pages/layout/index'], resolve),
			children: [{
				path: 'fake',
				name: 'fake',
				component: (resolve) => {
					require(['@/pages/common/fake/index'], resolve)
				},
				meta: {
					title: 'fake',
					isChild: true,
					keepAlive: false
				}
			}]
		}, {
			path: '/thirdLogin',
			name: 'thirdLogin',
			component: (resolve) => {
				require(['@/pages/common/thirdLogin/index'], resolve)
			},
			meta: {
				title: 'thirdLogin',
				isChild: false,
				keepAlive: false,
				hidden: true
			}
		},
		{
			path: '/404',
			name: '404',
			component: (resolve) => {
				require(['@/pages/common/error/404'], resolve)
			},
			meta: {
				title: '404',
				isChild: false,
				keepAlive: false,
				hidden: true
			}
		},
        ...accountCenter,
        ...accessManagement,
        ...home,
        {
			path: '*',
			redirect: '/404'
		}
	]
})
router.onError((error) => {
	const pattern = /Loading chunk (\d)+ failed/g;
	const isChunkLoadFailed = error.message.match(pattern);
	const targetPath = router.history.pending.fullPath;
	if (isChunkLoadFailed) {
		router.replace(targetPath);
	}
})
export default router;