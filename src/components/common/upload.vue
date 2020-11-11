<template>
	<div class="upload">
		<template v-if="httpAddress">
			<el-dialog title="导入" :show-close="true" :visible.sync="uploadVisible" width="500px" :close-on-click-modal="false"
			 :before-close="handleClose">
				<label class="label-btn" :for="onlyOneId">选择文件</label>
				<form id="uploadForm" enctype="multipart/form-data" style="display:none">
					<input type="file" :id="onlyOneId" name="file" @change="handleUpload">
				</form>
			</el-dialog>
			<el-button :disabled="disabled" :size="classObj.size" :type="classObj.type" :class="classObj.className" :icon="classObj.icon"
			 @click="uploadVisible=true">导入</el-button>
		</template>
		<template v-if="!httpAddress">
			<label class="label-btn" :for="onlyOneId">选择文件</label>
			<form id="uploadForm" enctype="multipart/form-data" style="display:none">
				<input type="file" :id="onlyOneId" name="file" @change="handleUpload">
			</form>
		</template>
	</div>
</template>
<script>
	// import config from '@/config'
	// import {base64decode} from '@/util/base64'
	import common from '@/util/common'
	export default {
		data() {
			return {
				uploadVisible: false,
				fileList: [],
				message: ['只能上传以jpeg/jpg/png/gif结尾的文件', '只能上传以xls/xlsx结尾的文件'],
				headersObj: {
					'Authorization': `${sessionStorage.getItem('Authorization')}`
				},
				onlyOneId: 'fileInput_' + Math.random().toString().slice(2)
			}
		},
		props: {
			disabled: {
				type: Boolean,
				default: false
			},
			classObj: {
				type: Object,
				default () {
					return {
						type: 'info',
						className: '',
						icon: 'el-icon-upload2',
						size: 'small'
					}
				}
			},
			type: { // type 1: 上传图片 2: 上传excel等文件 什么不传 则为不做判断
				type: Number
			},
			successCallback: {
				type: Function // 上传成功的回调
			},
			importObj: {
				type: Object // 上传的额外参数
			},
			httpAddress: { // 上传的地址 不传则只是选择文件 change事件 传出文件信息
				type: String
			},
			isShowSuccessMessage: { // 上传成功是否展示成功消息提示
				type: Boolean,
				default: true
			},
			maxSize: { // 文件最大size 单位m
				type: Number
			}
		},
		methods: {
			handleBefore(file) {
				let type = ''
				if (this.type === 1) { // 判断上传文件条件 type 1 上传图片 2 上传excel等文件 什么不传 则为不做判断
					type = ['jpeg', 'jpg', 'png', 'gif']
				} else if (this.type === 2) {
					type = ['xls', 'xlsx']
				}
				let flag = type.some(val => {
					return file.name.endsWith(`.${val}`)
				})
				if (!flag && type) { // 判断文件格式
					this.$message.error(`请上传以.${type.join(',或.')}结尾的文件`)
					return false
				} else if (this.maxSize && file.size > this.maxSize * 1024 * 1024) { // 判断文件大小
					this.$message.error(`文件超过${this.maxSize}M不可上传`)
					return false
				} else {
					return true
				}
			},
			handleSuccess(result) {
				if (result) {
					if (Number(result.code)) {
						this.$message.error(`上传失败,${result.detail}`)
						this.uploadVisible = false
					} else {
						this.isShowSuccessMessage && this.$message({
							message: '上传成功',
							type: 'success'
						})
						this.uploadVisible = false
						this.successCallback(result)
					}
				} else {
					this.$message({
						message: '有部分错误数据,请修改错误数据后再上传',
						type: 'warning'
					})
				}
			},
			handleClose() {
				this.uploadVisible = false
			},
			handleUpload() {
				let that = this
				let fileObj = document.querySelector(`#${this.onlyOneId}`).files[0]
				if (!this.handleBefore(fileObj)) {
					return
				}
				this.uploadVisible = false
				if (!this.httpAddress) {
					return this.$emit('change', fileObj)
				}
				let loading = this.$loading({
					lock: true,
					text: '正在光速上传,请稍等!!!',
					spinner: 'el-icon-loading',
					background: 'rgba(0, 0, 0, 0.7)'
				})
				let formData = new FormData()
				formData.append('file', fileObj)
				// formData.append('data', { param: base64encode(JSON.stringify({ entity: data })) })
				common.fetchFileStreams({
					data: formData,
					url: that.httpAddress,
					sucess(result) {
						loading.close()
						that.handleSuccess(result)
					},
					error(result) {
						loading.close()
						that.handleSuccess(result)
					}
				})
			}
		},
		watch: {
			uploadVisible: {
				handler(now) {
					if (now) { // 防止同时上传一个文件 不能选中的问题
						this.$nextTick(() => {
							document.querySelector(`#${this.onlyOneId}`).value = ''
						})
					}
				}
			}
		}
	}

</script>
<style lang="scss">
	@import '../../assets/styles/util.scss';

	.upload {
		display: inline-block !important;
		width: 70px !important;
		height: 30px !important;
		// margin-left: -13px;
		margin-right: 10px;

		.upload-demo {
			text-align: center !important;
		}

		.el-dialog__header {
			padding: 0;
			text-align: left;
			text-indent: 2em;
		}

		.el-dialog .el-dialog__header .el-dialog__close {
			display: block !important;
			color: #fff !important;
			width: 20px;
			height: 20px;
		}

		.el-dialog__body {
			text-align: center;
		}

		.label-btn {
			display: inline-block;
			width: 81px;
			height: 36px;
			line-height: 36px;
			text-align: center;
			background-color: #fff;
			border: 1px solid #b3d8ff;
			border-radius: 3px;
			color: #409eff;

			&:hover,
			&:active,
			&:focus {
				background: #ecf5ff;
				border-color: #b3d8ff;
			}
		}
	}

</style>
