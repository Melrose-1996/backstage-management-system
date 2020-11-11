<template>
	<div class="logo-section">
		<span class="logo" :style="{width: isCollapse ? '60px' : '240px'}">
			<!-- <i :class="[isCollapse ? 'iconfont icon-yunying' : 'iconfont icon-yunyingzhongxin']">
			</i> -->
			<span class="logo-img"></span>
			蜂鸟数据云平台
		</span>
	</div>

</template>

<script>
	export default {
		props: {
			isCollapse: {
				type: Boolean
			}
		}
	}

</script>
<style lang="scss">
	@import '../../../assets/styles/util.scss';

	.logo-section {
		position: absolute;
		top: 0;
		left: 0;

		>.logo {
			display: block;
			width: 240px;
			height: 60px;
			line-height: 56px;
			font-size: 20px;
			line-height: 60px;
			text-align: center;
			background-image: linear-gradient(135deg, $mainHoverBlue 0%, $auxiliary2 100%);
			transition: width 0.35s;
			color: $white;
			// display: flex;
			// align-items: center;
			// justify-content: center;
			// .icon-yunying {
			// 	font-size: 48px;
			// }
			// .icon-yunyingzhongxin{
			// 	font-size: 110px;
			// 	display:inline-block;
			// 	margin-top:4px;
			// }
			.logo-img {
				display:inline-block;
				margin-right: 5px;
				width: 32px;
				height: 30px;
				position: relative;
				top: 6px;
				background-image: url('../../../assets/images/common/login/logo_login.png');
				background-repeat: no-repeat;
			}
		}
	}

</style>
