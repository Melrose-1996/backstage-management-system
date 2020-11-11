<template>
    <div class="c-img">
        <i class="el-icon-close" v-if="clearable" @click="close"></i>
        <img v-if="src" :src="src" style="cursor:pointer" :class="className" @click="handleDialogShow">
        <el-dialog :visible.sync="dialogShow" class="c-img-preview-img" append-to-body :close-on-click-modal="false">
            <img :src="isMorePic?srcList[active]:src" alt=""  width="100%">
            <template v-if="isMorePic">
                <div class="arrow-class arrow-left" @click="handleArrowClick('left')">
                    <i class="el-icon-arrow-left"></i>
                </div>
                <div class="arrow-class arrow-right" @click="handleArrowClick('right')">
                    <i class="el-icon-arrow-right"></i>
                </div>
            </template>
            <div class="imgtitle">
                {{isMorePicTitle}}
            </div>
        </el-dialog>
    </div>
</template>
<script>
export default {
    data () {
        return {
            dialogShow: false,
            active: 0 // 当前图片下标
        }
    },
    props: {
        className: {
            type: String,
            default: 'default-img-class'
        },
        src: {
            default: ''
        },
        srcList: { // 多张图片弹窗滚动展示
            type: Array,
            default() {
                return []
            }
        },
        clearable: { // 是否需要删除按钮
            type: Boolean,
            default: false
        }
    },
    computed: {
        isMorePic() {
            return this.srcList.length > 1
        },
        isMorePicTitle() {
            if (this.srcList.length > 1) {
                return `共 ${this.srcList.length} 张图片,当前 ${this.active + 1} 张`
            } else {
                return ''
            }
        }
    },
    methods: {
        handleDialogShow() {
            this.dialogShow = true
            this.active = 0
        },
        close() {
            this.$emit('close')
        },
        handleArrowClick(type) {
            let index = (type === 'left' ? -1 : 1) + this.active
            let length = this.srcList.length
            if (index < 0) { // 到第一张了
                this.active = length - 1
            } else if (index === length) { // 到最后一张了
                this.active = 0
            } else {
                this.active = index
            }
        }
    }
}
</script>
<style lang="scss">
    .c-img {
        display: inline-block;
        position: relative;
        .el-icon-close {
            background-color: rgba(0, 0, 0, 0.5);
            color: #fff;
            position: absolute;
            right: 10px;
            top: 0;
            font-size: 20px;
            display: none;
            cursor: pointer;
        }
        &:hover {
            .el-icon-close {
                display: block;
            }
        }
        .default-img-class {
            width: 80px;
            height: 80px;
            margin-right: 10px;
            margin-bottom: 10px;
        }
        .c-img-cell-class {
            width: 60px;
            height: 40px;
        }
    }
    .c-img-preview-img{
        .el-dialog {
            margin-top: 50px !important;
        }
        .el-dialog__headerbtn{
            right: 0;
            top: 0;
            background: rgba(0,0,0, 0.7);
            z-index: 999;
        }
        .el-dialog__body{
            padding: 0;
            position: relative;
            &:hover {
                .arrow-class {
                    opacity: 1;
                }
            }
            .imgtitle {
                width: 100%;
                text-align: center;
                height: 20px;
                line-height: 20px;
                color: #fff;
                position: absolute;
                font-size: 16px;
                top: -20px;
                left: 0;
            }
            .arrow-class {
                text-align: center;
                width: 50px;
                height: 80px;
                line-height: 80px;
                font-size: 50px;
                position: absolute;
                top: 50%;
                transform: translateY(-50%);
                color: #fff;
                background-color: rgba(0, 0, 0, 0.5);
                cursor: pointer;
                opacity: 0;
            }
            .arrow-left {
                left: 0;
            }
            .arrow-right {
                right: 0;
            }
        }
        .el-dialog .el-dialog__header .el-dialog__close {
            display: block !important;
            color: #fff !important;
            width: 20px;
            height: 20px;
        }
        .el-dialog__header {
            padding: 0;
            text-align: center;
            background-color: transparent;
        }
    }
</style>
