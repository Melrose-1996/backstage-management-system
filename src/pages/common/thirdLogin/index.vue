<template>
	<div class="third-login-wrapper default-theme">
		<div class="nav-section">
			<div class="left">
				<!-- <img class="logo" src="../../../assets/images/common/login/white-logo.png" alt="logo"> -->
			</div>
		</div>
		<div class="third-login-body">
			<img class="head-img" src="" alt="头像">
			<p class="nickname">Morty</p>
			<p class="remark">您正在使用QQ快捷登录<br>为了给您提供更好的服务和支持，请先绑定账号</p>
			<router-link class="existed-account-btn" to="/login">绑定已有账号</router-link>
			<router-link class="new-account-btn" to="/register">绑定新账号</router-link>
		</div>
	</div>
</template>

<style lang="scss">
	@import '../../../assets/styles/util.scss';

	.third-login-wrapper {
		background-repeat: no-repeat;
		background-size: cover;
		background-position: center;
		width: 100%;
		height: 100%;
		padding-top: 140px;
		background-color: $grayBackground;

		.nav-section {
			display: flex;
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			background-image: linear-gradient(150deg, $mainTheme 0%, $auxiliary2 100%);

			.left {
				width: 240px;
				height: 100px;
				line-height: 100px;
				color: $white;
				text-align: right;

				.logo {
					margin-right: 20px;
					display: inline-block;
				}
			}
		}

		.third-login-body {
			padding: 55px 0 75px;
			background-color: $white;
			width: 800px;
			margin: 60px auto 0;
			text-align: center;

			.head-img {
				display: inline-block;
				width: 86px;
				height: 86px;
				border-radius: 50%;
				margin-bottom: 20px;
			}

			.nickname {
				font-size: 12px;
				color: $fc333;
				margin-bottom: 50px;
			}

			.remark {
				color: $fc999;
				font-size: 12px;
				line-height: 24px;
				margin-bottom: 25px;
			}

			.existed-account-btn {
				width: 180px;
				height: 40px;
				line-height: 40px;
				font-size: 14px;
				color: $white;
				background-color: $btnPrimary;
				display: block;
				margin: 0 auto 20px;

				&:hover {
					background-color: $btnPrimaryHover;
				}
			}

			.new-account-btn {
				width: 180px;
				height: 40px;
				line-height: 40px;
				font-size: 14px;
				color: $fc333;
				background-color: $btnInfo;
				display: block;
				margin: 0 auto 20px;
				border: 1px solid $borderColor;

				&:hover {
					background-color: $btnInfoHover;
				}
			}
		}
	}

</style>
