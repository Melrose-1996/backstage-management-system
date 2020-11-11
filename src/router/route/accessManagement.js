import resultRouter from './util';
export default resultRouter({
	title: '访问管理',
	name: 'accessManagement',
	children: [
		{
			title: '概览管理',
			name: 'accountInfoManage',
			children: [
				{
					title: '概览',
					name: 'overview',
					component: resolve => {
						require([
							'@/pages/accessManagement/overview/overview'
						], resolve);
					}
				}
			]
		},
		{
			title: '用户管理',
			name: 'userManagement',
			children: [
				{
					title: '用户列表',
					name: 'userList',
					component: resolve => {
						require([
							'@/pages/accessManagement/userManagement/userList'
						], resolve);
					}
				},
				{
					title: '用户设置',
					name: 'userSettings',
					component: resolve => {
						require([
							'@/pages/accessManagement/userManagement/userSettings'
						], resolve);
					}
				}
			]
		},
		{
			title: '用户组管理',
			name: 'userGroupManagement',
			children: [
				{
					title: '项目管理',
					name: 'userGroup',
					component: resolve => {
						require([
							'@/pages/accessManagement/userGroup/userGroup'
						], resolve);
					}
				}
			]
		},
		{
			title: '策略管理',
			name: 'strategyManagement',
			children: [
				{
					title: '项目管理',
					name: 'strategy',
					component: resolve => {
						require([
							'@/pages/accessManagement/strategy/strategy'
						], resolve);
					}
				}
			]
		},
		{
			title: '角色管理',
			name: 'rolesManagement',
			children: [
				{
					title: '角色',
					name: 'roles',
					component: resolve => {
						require([
							'@/pages/accessManagement/roles/roles'
						], resolve);
					}
				}
			]
		}
	]
});
