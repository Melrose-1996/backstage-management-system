<template>
	<div class="c-button-wrapper">
		<button type="button" class="c-button" :class="[isShowClose ? 'close-icon' : '']" @click="btnClick">
			<span v-if="isShowClose" @click.stop="destroyCButton" :class="[isShowClose ? 'close-btn' : '']">x</span>
			<slot></slot>
		</button>
	</div>
</template>
<script>
	export default {
		name: 'CButton',
		data() {
			return {
				isShowClose: false
			}
		},
		methods: {
			btnClick() {
				this.isShowClose = !this.isShowClose;
			},
			destroyCButton() {
				setTimeout(() => {
					this.isShowClose = false;
				}, 200);
				this.$emit('destroyCButton');
			}
		}
	}
</script>
<style lang="scss">
	@import '../../assets/styles/util.scss';
	.c-button-wrapper {
		display: inline-block;
		.c-button {
			outline: 0;
			background-color: $white;
		    border: 1px solid $fcddd;
		    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
		    padding: 9px 15px;
    		font-size: 12px;
    		border-radius: 4px;
    		position: relative;
    		cursor: pointer;
    		&:hover{
				color: #3fadff;
			    border-color: #3fadff;
    		}
    		.close-btn {
    			display: inline-block;
				width: 15px;
				height: 15px;
				position: absolute;
				top: -5px;
				right: -5px;
				height: 15px;
				background: #FA3535;
				border-radius: 50%;
				cursor: pointer;
    		}
    		&.close-icon {
				color: $white;
			    background: #3fadff;
    		}
		}
	}
</style>