<!-- 在点击菜单叶子节点时，为了不重新刷新菜单，独立出来收藏icon -->
<template>
	<i class="collect-icon" :class="{ hide : isCollapse, active: isCollect }" @click.stop="toggleCollection"></i>
</template>

<script>
	import {
		mapActions
	} from 'vuex'
	// import {
	// 	isCollect
	// } from '@/api/common/layout/layout'
	export default {
		name: 'collectIcon',
		props: {
			isCollapse: {
				type: Boolean
			},
			id: {
				type: Number
			},
			isCollect: {
				type: Boolean,
				default: false
			}
		},
		methods: {
			...mapActions({
				setCollectionForMenuItem: 'setCollectionForMenuItem'
			}),
			// 是否收藏操作
			toggleCollection() {
				// isCollect({
				// 	id: this.id
				// })
				this.setCollectionForMenuItem(this.id)
			}
		}
	}

</script>

<style lang="scss">
	.collect-icon {
		position: absolute;
		width: 16px;
		height: 16px;
		background-image: url('../../../assets/images/layout/sidebar/sidebar-collect.svg');
		background-size: 16px;
		background-position: center;
		background-repeat: no-repeat;
		top: 15px;
		right: 16px;
		padding: 4px;
		box-sizing: content-box;

		&.active {
			background-image: url('../../../assets/images/layout/sidebar/sidebar-collect-active.svg');
		}
	}

</style>
