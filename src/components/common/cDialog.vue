<template>
	<el-dialog
		v-if="isDistoryDialog ? visible : true"
		:visible="visible"
		:title="title"
		:width="width.includes('px')?width:width+'px'"
		:fullscreen="innerFullscreen"
		:modal="modal"
		:lockScroll="lockScroll"
		customClass="c-dialog-wrapper"
		:showClose="false"
		:append-to-body="isInner"
		:class="[innerFullscreen? 'c-dialog-fullscreen-dialog__header': '']"
        :top="top"
		v-dialogDrag>
		<div class="c-dialog-body">
			<slot></slot>
		</div>
		<div class="c-dialog-set-win">
			<span v-if="!fullscreen" class="c-dialog-wrapper-icon icon iconfont"
				:class="[innerFullscreen? 'icon-dialog-zoon-in': 'icon-dialog-zoom-out']" @click="handleFull"></span>
			<span v-if="showClose" class="c-dialog-wrapper-icon icon iconfont icon-dialog-close" @click="close"></span>
		</div>
		<div class="c-dialog-btn">
			<slot name="footer"></slot>
		</div>
	</el-dialog>
</template>
<script>
	export default {
		data() {
			return {
				innerFullscreen: false
			}
		},
		props: {
			isInner: { // 是否是嵌套弹窗
				type: Boolean,
				default: false
			},
			visible: {
				type: Boolean,
				default: false
			},
			title: {
				type: String,
				default: ''
			},
			width: {
				type: String,
				default: '420px'
			},
			modal: {
				type: Boolean,
				default: true
			},
			lockScroll: {
				type: Boolean,
				default: true
			},
			closeOnClickModal: {
				type: Boolean,
				default: false
			},
			closeOnPressEscape: {
				type: Boolean,
				default: true
			},
			showClose: {
				type: Boolean,
				default: true
			},
			center: {
				type: Boolean,
				default: true
			},
			fullscreen: {
				type: Boolean,
				default: false
			}, // 是否一直全屏
			isDistoryDialog: {
				type: Boolean,
				default: false
			}, // 是否使用vi-if 进行对弹框进行销毁 默认是v-show 解决弹框滚动问题
			closeBefore: { // 关闭之前的事件可以在此函数里面做弹窗表单重置处理
				type: Function
            },
            // 弹窗margin-top值 嵌套弹窗使用
            top: {
                type: String,
                default: '15vh'
            }
		},
		created() {
			if (this.fullscreen) {
				this.innerFullscreen = true
			}
		},
		methods: {
			handleFull() {
				this.innerFullscreen = !this.innerFullscreen
			},
			close() {
				this.$emit('close')
				// 如果有关闭之前的函数 则先调用
				this.closeBefore && this.closeBefore()
				this.$emit('update:visible', false)
			}
		}
	}

</script>
<style lang="scss">
	.c-dialog-wrapper {
		position: relative;

		.c-dialog-btn {
			padding-top: 20px;
			text-align: center;
		}

		.c-dialog-set-win {
			position: absolute;
			top: 10px;
			right: 0;

			.c-dialog-wrapper-icon {
				display: inline-block;
				width: 14px;
				height: 14px;
				background-size: contain;
				margin-right: 10px;
				cursor: pointer;
				color: #888;

				&.icon-dialog-close {
					margin-right: 15px;
				}
			}
		}
	}

	.c-dialog-fullscreen-dialog__header {
		.el-dialog__header {
			cursor: default !important;
		}

		.c-dialog-wrapper {
			left: 0 !important;
			top: 0 !important;
		}
	}

</style>
