<template>
    <div class="seven-days" v-if='isShow'>
        <el-radio-group v-model="tabPosition"  @change='handleClick'>
            <el-radio-button :label='val' v-for='(val, index) in data' :key='index'>{{val}}</el-radio-button>
        </el-radio-group>
        <!-- <el-tabs v-model="activeName" @tab-click="handleClick" type="card">
            <el-tab-pane :label='val' name="first" v-for='(val, index) in data' :key='index'>{{val}}</el-tab-pane>
        </el-tabs> -->
    </div>
</template>
<script>
/*
    *使用时需要在父组件声明@searchData事件 再点击按钮时触发
*/
export default {
    data () {
        return {
            data: [],
            tabPosition: '',
            start: ''
        }
    },
    props: {
        startDay: { // 开始时间默认当前时间
            type: Date
        },
        length: { // 所需要多少天
            type: Number,
            default: 7
        },
        isShow: { // 是否展示 备用
            type: Boolean,
            default: true
        }
    },
    created () {
        this.start = this.startDay || new Date()
        this.data = [this.getMouthDay(this.start)]
        for (let i = 1; i < this.length; i++) {
            this.start.setDate(this.start.getDate() + 1)
            this.data.push(this.getMouthDay(this.start))
        }
    },
    methods: {
        getMouthDay(data) {
            let year = data.getFullYear()
            let mouth = data.getMonth() + 1
            let day = data.getDate()
            return year + '-' + mouth + '-' + day
        },
        handleClick(data) {
            console.log(data)
            this.$emit('searchData', data)
        }
    }
}
</script>
<style lang="scss">
    .seven-days {
        .el-radio-group{
            margin-bottom: 0;
            .el-radio-button__inner {
                width: 120px;
                // height: 32px;
            }
        }
        .el-radio-button__orig-radio:checked + .el-radio-button__inner {
            background: #3eadff;
            border-color: #3eadff;
        }
    }
</style>
