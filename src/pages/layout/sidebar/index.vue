<template>
	<div class="sidebar-container" :class="{'is-active':isCollapse}">
		<logo :isCollapse="isCollapse"></logo>
		<sidebar-item :isCollapse="isCollapse"></sidebar-item>
	</div>
</template>

<script>
	import SidebarItem from './sidebarItem'
	import logo from './logo'
	export default {
		name: 'sidebar',
		components: {
			SidebarItem,
			logo
		},
		props: {
			isCollapse: {
				type: Boolean
			}
		}
	}

</script>
<style lang="scss">
	.sidebar-container {
		height: 100%;
		padding-top: 60px;
		position: relative;
	}

</style>
