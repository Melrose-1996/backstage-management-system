<!-- 刷新当前页面无效 添加fake页面作为过渡，先跳到fake页面 再跳回原页面 -->
<template>
	<div></div>
</template>

<script>
	import {
		mapGetters
	} from 'vuex'
	export default {
		computed: {
			...mapGetters(['fakeLink']) // tabList来自tab channel来自common.js
		},
		created() {
			this.$router.push({
				path: this.fakeLink
			})
		}
	}

</script>
