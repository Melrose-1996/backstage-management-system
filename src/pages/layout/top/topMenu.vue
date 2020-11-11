<template>
    <div class="top-menu">
        <el-menu :default-active="channel + ''" mode="horizontal" text-color="#e4e7ed" active-text-color="#fff" background-color="#269ace">
            <template v-for="item in topMenuInfo">
                <el-menu-item class="top-menu-item" :index="item.id + ''" @click.native="openMenu(item)" :key="item.id">
                    <template slot="title">
                        <i :class="item.icon"></i>
                        <span slot="title" class="title">{{item.applicationName}}</span>
                    </template>
                </el-menu-item>
            </template>
        </el-menu>
    </div>
</template>

<script>
	import {
		mapGetters,
		mapActions
	} from 'vuex'

	export default {
		name: 'topMenu',
		computed: {
			...mapGetters(['channel', 'topMenuInfo'])
		},
		methods: {
			...mapActions({
                addTab: 'addTab',
				setChannel: 'setChannel',
				getListMenuInfo: 'getListMenuInfo' // 获取侧边栏菜单，来自menu.js
			}),
			// 点击不同应用，重新设置channel和菜单
			openMenu(item) {
				this.setChannel(item.id)
				this.getListMenuInfo({
					type: 1
                })
                // 进入运营监控首页
				if (item.id == '38') {
                    this.$router.push('/monitor_and_warning/monitor_and_warning_home')
                    this.addTab({
                        applicationId: 38,
                        children: [],
                        displayIndex: 1,
                        favoriteResourceId: null,
                        id: 2153,
                        isCollect: false,
                        linkAddress: '/monitor_and_warning/monitor_and_warning_home',
                        name: '监控预警看板',
                        parentId: 2135,
                        resourceCode: 'r010603',
                        resourceType: 4
                    })
				}
			}
		}
	};

</script>

<style lang="scss">
	@import '../../../assets/styles/util.scss';

	.top-menu {
		margin-left: 50px;
		box-sizing: border-box;

		.el-menu {
			&.el-menu--horizontal {
				background-color: $mainTheme !important;
				border: none;

				li.top-menu-item {
					height: 50px !important;
					line-height: 50px !important;
					background-color: $mainTheme !important;
					padding: 0;
					margin: 0 15px;
					font-size: 16px;

					.title {
						color: #a6dcff;
					}

					&.is-active {
						border-bottom: 3px solid $auxiliary2 !important;
						color: #fff;
					}

					&.is-active .title {
						color: #fff;
					}
				}
			}
		}
	}

</style>
