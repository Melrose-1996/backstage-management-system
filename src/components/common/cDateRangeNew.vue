<template>
    <el-date-picker
    :picker-options="pickerOptions"
    :clearable="clearable"
    class="c-daterange-new"
    v-model="daterange"
    @change="handleChange"
    type="daterange">
    </el-date-picker>
</template>
<script>
    const dateRange = {
        month: 31,
        week: 7
    }
    export default {
        data() {
            return {
                pickerMinDate: '',
                daterange: [],
                pickerOptions: {
                    onPick: ({ maxDate, minDate }) => {
                        this.pickerMinDate = minDate.getTime()
                        if (maxDate) {
                            this.pickerMinDate = ''
                        }
                    },
                    disabledDate: (time) => {
                        if (!this.range) {
                            return false
                        }
                        if (this.pickerMinDate !== '') {
                            // 获取天数
                            let range = dateRange[this.range] || this.range
                            // 转换为时间戳
                            const dayRange = range * 24 * 3600 * 1000
                            let maxTime = this.pickerMinDate + dayRange
                            let minTime = this.pickerMinDate - dayRange
                            return time.getTime() > maxTime || time.getTime() < minTime
                        }
                    }
                }
            }
        },
        props: {
            startDate: { // 开始时间
                default: ''
            },
            endDate: { // 结束时间
                default: ''
            },
            range: { // 时间跨度 month31 天 week 7天  数字类型则为具体天数 false则不作任何校验
                type: [String, Number, Boolean],
                default: 'month'
            },
            clearable: { // 是否显示清空按钮
                default: false
            }
        },
        watch: {
            startDate: {
                handler(now) {
                    this.daterange = [now, this.daterange[1]]
                },
                immediate: true
            },
            endDate: {
                handler(now) {
                    this.daterange = [this.daterange[0], now]
                },
                immediate: true
            }
        },
        methods: {
            handleChange() {
                this.$emit('update:startDate', this.daterange[0])
                this.$emit('update:endDate', this.daterange[1])
                this.$emit('change', this.daterange[0], this.daterange[1])
            }
        }
    }
</script>
<style lang="scss">
    .c-daterange-new.el-range-editor.el-input__inner {
        height: 30px;
        width: 400px;
        vertical-align: middle;
        input {
            width: 189px;
            height: 28px;
            line-height: 28px;
        }
        .el-range-separator {
            line-height: 24px;
        }
        .el-input__icon {
            display: none;
        }
    }
</style>