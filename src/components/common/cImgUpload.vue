<template>
    <span class="c-img-upload">
        <c-img :clearable="clearable" v-for="(item, index) in imgList" :key="index" @close="()=>imgClose(index)" :src="item"></c-img>
        <c-upload v-if="imgList.length<limit" @change="fileChange" :maxSize="maxSize" :type="comType" :isPopout="true"></c-upload>
        <div class="cell-color-orange">
            只能上传以 {{this.comImgType}} 结尾的且文件大小不超过{{maxSize}}M的图片;
            <template v-if="limit>1">最多({{imgList.length}}/{{limit}}张)</template>
        </div>
    </span>
</template>
<script>
export default {
    props: {
        maxSize: { // 单张图片最大size
            type: Number,
            default: 2
        },
        clearable: { // 图片是否可清空
            type: Boolean,
            default: true
        },
        limit: { // 最大上传张数
            type: Number,
            default: 1
        },
        fileList: { // 文件对象
            type: Array,
            default: () => []
        },
        imgList: { // 所选图片 展示url用的
            type: Array,
            default: () => []
        },
        imgType: {
            type: Array,
            default: () => ['jpeg', 'jpg', 'png', 'gif', 'bmp', 'tif', 'pdf']
        }
    },
    computed: {
        comImgType() {
            return this.imgType.join('/');
        },
        comType() { // 不需要 pdf
            if (this.imgType.includes('pdf')) {
                return 1;
            }
            return this.imgType;
        }
    },
    methods: {
        fileChange(fileObj) {
            // 文件变化
            let reader = new FileReader()
            reader.readAsDataURL(fileObj)
            reader.onload = e => {
                this.imgList.push(e.currentTarget.result)
            }
            this.fileList.push(fileObj)
            this.$emit('change', this.fileList)
        },
        imgClose(index) {
            // 删除图片
            this.imgList.splice(index, 1)
            this.fileList.splice(index, 1)
            this.$emit('change', this.fileList)
        },
        clear() { // 清空操作
            this.imgList.splice(0, this.imgList.length)
            this.fileList.splice(0, this.fileList.length)
            this.$emit('change', this.fileList)
        }
    }
}
</script>
<style lang="scss">
	.cell-color-orange {
		font-size: 12px;
        margin-top: 12px;
	}
</style>
