import resultRouter from './util';
export default resultRouter({
	title: '首页',
	name: '/wecome',
	children: [
		{
			title: '我的申请单',
			name: 'myApproval',
			children: [
				{
					title: '新建集群',
					name: 'newCluster',
					component: resolve => {
						require([
							'@/pages/home/myApproval/newCluster'
						], resolve);
					}
				}
			]
		},
		{
			title: '菜单权限管理',
			name: 'menuManagement',
			children: [
				{
					title: '菜单管理',
					name: 'menuManagement',
					component: resolve => {
						require([
							'@/pages/home/menuManagement/menuManagement'
						], resolve);
					}
				},
				{
					title: '角色管理',
					name: 'rolesManagement',
					component: resolve => {
						require([
							'@/pages/home/menuManagement/rolesManagement'
						], resolve);
					}
				},
				{
					title: '分配角色',
					name: 'assignRoles',
					component: resolve => {
						require([
							'@/pages/home/menuManagement/assignRoles'
						], resolve);
					}
				}
			]
		}
	]
});
