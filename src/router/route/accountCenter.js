import resultRouter from './util';
export default resultRouter({
	title: '系统配置',
	name: 'accountCenter',
	children: [
		{
			title: '账号信息管理',
			name: 'accountInfoManage',
			children: [
				{
					title: '账号信息',
					name: 'accountInfo',
					component: resolve => {
						require([
							'@/pages/accountCenter/accountInfo/accountInfo'
						], resolve);
					}
				}
			]
		},
		{
			title: '安全设置管理',
			name: 'securitySettingManage',
			children: [
				{
					title: '安全设置',
					name: 'securitySetting',
					component: resolve => {
						require([
							'@/pages/accountCenter/securitySetting/securitySetting'
						], resolve);
					}
				}
			]
		},
		{
			title: '项目管理',
			name: 'projectManagement',
			children: [
				{
					title: '项目管理',
					name: 'projectManagement',
					component: resolve => {
						require([
							'@/pages/accountCenter/projectManagement/projectManagement'
						], resolve);
					}
				}
			]
		}
	]
});
