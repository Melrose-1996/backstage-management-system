<template>
	<div class="top-nav-section">
		<div class="breadcrumb" :class="{'close': isCollapse}" @click="setCollapse"></div>
		<topMenu></topMenu>
		<userInfo></userInfo>
	</div>
</template>
<script>
	import {
		mapGetters,
		mapActions
	} from 'vuex'
	import topMenu from './topMenu'
	import userInfo from './user'
	export default {
		name: 'top',
		components: {
			topMenu,
			userInfo
		},
		computed: {
			...mapGetters(['isCollapse'])
		},
		methods: {
			...mapActions({
				setCollapse: 'setCollapse'
			})
		}
	}

</script>

<style lang="scss">
	@import '../../../assets/styles/util.scss';

	.top-nav-section {
		height: 60px;
		position: relative;

		.breadcrumb {
			position: absolute;
			left: 0;
			top: 16px;
			text-align: center;
			line-height: 60px;
			box-sizing: border-box;
			cursor: pointer;
			width: 20px;
			height: 22px;
			background-size: cover;
			background-image: url('../../../assets/images/layout/top/layout-collapse-close.svg');

			&.close {
				background-image: url('../../../assets/images/layout/top/layout-collapse-open.svg');
			}

			>img {
				width: 14px;
				height: 10px;
			}
		}
	}

</style>
