<template>
    <div class="upload">
        <template v-if="httpAddress&&!isPopout">
            <el-dialog title="导入"  :show-close="true" :visible.sync="uploadVisible" width="500px" :close-on-click-modal="false"  :before-close="handleClose">
                <label class="label-btn" :for="onlyOneId">选择文件</label>
                <form enctype="multipart/form-data" style="display:none">
                    <input type="file" :id="onlyOneId" name="file" @change="handleUpload">
                </form>
            </el-dialog>
            <el-button :disabled="disabled" :size="classObj.size" :type="classObj.type" :class="classObj.className" :icon="classObj.icon" @click="handleBaseClick">导入</el-button>
        </template>
        <template v-if="!httpAddress&&isPopout">
            <el-dialog :visible.sync="previewVisible" class="preview-img">
                <img :src="dataSrc" alt=""  width="100%">
            </el-dialog>
            <img v-if="needPreview" style="cursor:pointer;margin-bottom: 15px;" :src="dataSrc" :width="imgWidth" @click="handleImg" alt="">
            <template v-if="!readOnly">
                <label class="label-btn" :for="onlyOneId">{{text}}</label>
                <form enctype="multipart/form-data" style="display:none">
                    <input :disabled="disabled" type="file" :id="onlyOneId" name="file" @change="handleUpload">
                </form>
            </template>
        </template>
        <template v-if="httpAddress&&isPopout">
            <label :class="[disabled ? 'label-btn is-disabled' : 'label-btn']" :for="onlyOneId">{{text}}</label>
                <form enctype="multipart/form-data" style="display:none">
                    <input type="file" :id="onlyOneId" name="file" @change="handleUpload" :disabled="disabled">
                </form>
        </template>
    </div>
</template>
<script>
// import config from '@/config'
import common from '@/util/common'
export default {
    data () {
        return {
            uploadVisible: false,
            previewVisible: false,
            dataSrc: '',
            // imgSrc: '', // 上传的图片路径
            fileList: [],
            message: ['只能上传以jpeg/jpg/png/gif结尾的文件', '只能上传以xls/xlsx结尾的文件'],
            headersObj: {
                'Authorization': `${sessionStorage.getItem('Authorization')}`
            },
            onlyOneId: 'fileInput_' + Math.random().toString().slice(2)
        }
    },
    created() {
        if (this.imgSrc) {
            this.dataSrc = this.imgSrc;
        }
        // console.log(this.imgSrc);
    },
    props: {
        text: { // 按钮的文本内容
            type: String,
            default: '选择文件'
        },
        isPopout: { // 是否出现选择弹框
            type: Boolean,
            default: false
        },
        disabled: {
            type: Boolean,
            default: false
        },
        classObj: {
            type: Object,
            default() {
                return {
                    type: 'info',
                    className: '',
                    icon: 'el-icon-upload2',
                    size: 'small'
                }
            }
        },
        width: {
            type: Number
        },
        height: {
            type: Number
        },
        type: { // type 1: 上传图片 2: 上传excel等文件 自定义上传类型传数组 什么不传 则为不做判断
            type: [Number, Array]
        },
        beforeUpload: { // 选择文件之前的逻辑判断
            type: Function
        },
        successCallback: {
            type: Function // 上传成功的回调
        },
        errorCallback: {
            type: Function // 上传失败的回调
        },
        closeDialog: {
            type: Function // 关闭弹窗的回调
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
        isShowErrorMessage: { // 上传成功是否展示成功消息提示
            type: Boolean,
            default: true
        },
        maxSize: { // 文件最大size 单位m
            type: Number
        },
        needPreview: { // 是否需要预览
            type: Boolean,
            default: false
        },
        imgWidth: { // 预览图片的宽度
            type: Number
        },
        readOnly: { // 该控件是否允许选择上传图片
            type: Boolean,
            default: false
        },
        imgSrc: { // 图片路径
            type: [String, File]
        },
        minWidth: {
             type: Number
        },
        minHeight: {
             type: Number
        },
        fileName: {
            type: String,
            default: ''
        },
        index: {
            type: Number
        },
        param: { // 需要一起上传后台的其他参数
            default: ''
        }
    },
    computed: {},
    methods: {
        async handleBaseClick() { // 点击导入按钮
            if (this.beforeUpload) {
                let result = await this.beforeUpload();
                result && (this.uploadVisible = true)
            } else {
                this.uploadVisible = true
            }
        },
        handleImg() { // 点击缩略图后
            this.previewVisible = true;
            console.log(1111);
        },
        handleSuccess (result) {
            if (result) {
                if (Number(result.code)) {
                    this.isShowErrorMessage && this.$message.error(`上传失败,${result.detail}`)
                    this.uploadVisible = false
                    this.errorCallback && this.errorCallback(result, this.fileName)
                } else if (Number(result.code) == 0) {
                    this.isShowSuccessMessage && this.$message({message: '上传成功', type: 'success'})
                    this.uploadVisible = false
                    this.successCallback && this.successCallback(result, this.fileName, this.index)
                } else {
                    this.$message({message: '有部分错误数据,请修改错误数据后再上传', type: 'warning'})
                    this.errorCallback && this.errorCallback(result, this.fileName, this.index)
                }
            }
        },
        handleClose() {
            this.uploadVisible = false
            this.closeDialog && this.closeDialog()
        },
        handleUpload() {
            let that = this
            let fileObj = document.querySelector(`#${this.onlyOneId}`).files[0]
            this.uploadVisible = false
            this.clearFile()
            let type = []
            if (this.type === 1) { // 判断上传文件条件 type 1 上传图片 2 上传excel等文件 什么不传 则为不做判断
                type = ['jpeg', 'jpg', 'png', 'gif']
            } else if (this.type === 2) {
                type = ['xls', 'xlsx']
            } else if (Array.isArray(this.type)) {
                type = this.type
            }
            let flag = type.some(val => {
                return fileObj.name.endsWith(`.${val}`)
            })
            let imageFileArr = ['jpeg', 'jpg', 'png', 'gif'];
            let splitFileName = fileObj.name.split('.');
            let suffixName = splitFileName[splitFileName.length - 1];
            let compressArr = ['zip', 'rar', '7z', 'tar', 'gz'];
            let compressSuffixName = splitFileName[splitFileName.length - 1];
            console.log(compressSuffixName, fileObj.size > 6 * 1024 * 1024)
            if (compressArr.includes(compressSuffixName) && (fileObj.size > 6 * 1024 * 1024)) { // 压缩文件不可超过 6M
               this.$message.error(`压缩文件超过6M不可上传`)
               return false;
            }
            if (!flag && type.length) { // 判断文件格式
                this.$message.error(`请上传以.${type.join(',或.')}结尾的文件`)
                return false
            } else if (this.maxSize && (fileObj.size > this.maxSize * 1024 * 1024) && (!compressArr.includes(compressSuffixName))) { // 判断文件大小
                this.$message.error(`文件超过${this.maxSize}M不可上传`)
                return false
            }
            if (!this.httpAddress) {
                if (!this.readOnly) {
                    let reader = new FileReader();
                    reader.readAsDataURL(fileObj); // 发起异步请求
                    reader.onload = (e) => {
                        console.log(111);
                        this.dataSrc = e.currentTarget.result
                    }
                }
                return this.$emit('change', fileObj, this.fileName, this.index)
            }
            if (imageFileArr.includes(suffixName)) {
                if (type.includes('jpg')) {
                    let reader = new FileReader()
                    reader.onload = (e) => {
                        let data = e.target.result
                        let img = new Image()
                        img.src = data;
                        function callback() {
                            // console.log(img.width, img.height, 112221, that.minHeight)
                            if (that.width && that.height && that.width != img.width) {
                                that.$message.error(`请上传${that.width}*${that.height}尺寸的文件`)
                                // that.imgSrc = ''
                                return false
                            }
                            if (that.minWidth && that.minHeight) {
                                if (that.minWidth > img.width) {
                                    that.$message.error(`请上传尺寸大于${that.minWidth}*${that.minHeight}尺寸的文件`)
                                    return false
                                }
                                if (that.minHeight > img.height) {
                                    that.$message.error(`请上传尺寸大于${that.minWidth}*${that.minHeight}尺寸的文件`)
                                    return false
                                }
                                // that.imgSrc = ''
                            }
                            that.uploadFile(fileObj)
                            img = null
                            that.$emit('change', fileObj, that.fileName, that.index)
                        }
                        if (img.complete) {
                            callback();
                        } else {
                            img.onload = callback
                        }
                    };
                    reader.readAsDataURL(fileObj)
                }
            } else {
                that.uploadFile(fileObj)
                that.$emit('change', fileObj, that.fileName, that.index)
            }
            this.clearFile()
        },
        // 清除选中文件
        clearFile() {
            let file = document.querySelector(`#${this.onlyOneId}`)
            file.value = ''
        },
        uploadFile(fileObj) {
            let that = this;
            let loading = this.$loading({
                lock: true,
                text: '正在光速上传,请稍等!!!',
                spinner: 'el-icon-loading',
                background: 'rgba(0, 0, 0, 0.7)'
            })
            let formData = new FormData()
            formData.append('file', fileObj)
            common.fetchFileStreams({
                data: formData,
                param: this.param,
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
                } else {
                    this.closeDialog && this.closeDialog()
                }
            }
        },
        imgSrc(now, old) {
            this.dataSrc = now
            console.log(now)
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
        .preview-img{
            .el-dialog__headerbtn{
                right: 0;
                top: 0;
                background: rgba(0,0,0, 0.7);
            }
            .el-dialog__body{
                padding: 0;
            }
        }
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
            width: 70px;
            height: 32px;
            line-height: 28px;
            text-align: center;
            background-color: #fff;
            border: 1px solid #b3d8ff;
            border-radius: 3px;
            color: #409eff;
            &:hover, &:active, &:focus {
                background: #ecf5ff;
                border-color: #b3d8ff;
            }
        }
        .is-disabled{
            background-color: #f5f7fa;
            border-color: #e4e7ed;
            color: #c0c4cc;
            cursor: not-allowed;
            &:hover, &:active, &:focus {
                background: #f5f7fa;
                border-color: #e4e7ed;
            }
        }
    }
</style>
