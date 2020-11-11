<template>
    <span>
        <el-col :span="6">
            <el-form-item :label="startLabel">
                <el-date-picker
                :clearable="false"
                class="s-input"
                :editable="false"
                v-model="startDate"
                type="date"
                placeholder="">
                </el-date-picker>
            </el-form-item>
        </el-col>
        <el-col :span="6">
            <el-form-item :label="endLabel">
                <el-date-picker
                :clearable="false"
                :editable="false"
                class="s-input"
                v-model="endDate"
                type="date"
                placeholder="">
                </el-date-picker>
            </el-form-item>
        </el-col>
    </span>
</template>
<script>
const dateRange = {
    'month': 30,
    'week': 6
}
export default {
    props: {
        startLabel: {
            type: String,
            default: '开始日期'
        },
        endLabel: {
            type: String,
            default: '结束日期'
        },
        startDate: { // 开始时间
            default: ''
        },
        endDate: { // 结束时间
            default: ''
        },
        range: { // 时间跨度 month31 天 week 7天  数字类型则为具体天数 false则不作任何校验
            type: [String, Number, Boolean],
            default: 'month'
        }
    },
    watch: {
        'startDate': {
            handler(now, old) {
                if (this.range !== false) {
                    let range = dateRange[this.range] || this.range
                    let errText = common.moreThan31Day(now, this.endDate, range)
                    if (errText) {
                        let time = common.getLaterTime(now, range)
                        this.endDate = time
                        this.$emit('update:endDate', this.endDate)
                    }
                }
                this.$emit('update:startDate', this.startDate)
            }
        },
        'endDate': {
            handler(now, old) {
                if (this.range !== false) {
                    let range = dateRange[this.range] || this.range
                    let errText = common.moreThan31Day(this.startDate, now, range)
                    if (errText) {
                        this.$message.warning(errText)
                        this.endDate = old
                    }
                }
                this.$emit('update:endDate', this.endDate)
            }
        }
    }
}
</script>
