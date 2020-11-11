<template>
    <el-select
        ref="airlineSelect"
        :placeholder="placeholder"
        default-first-option
        :class="[multiple?'airlines_multiple':className]"
        :disabled="disabled"
        v-model="data"
        :multiple="multiple"
        filterable
        class="s-input airlines"
        :collapse-tags="collapseTags"
        @change="changeHandler"
        :clearable="clearable">
        <el-option
            v-if="allCode"
            :value="allCode"
            label="全部">
        </el-option>
        <el-option
            v-for='(item, key) in airlines'
            :key="key"
            :label="isShowName?`${item.airlineName}(${item.airlineCode})`:item.airlineCode"
            :value="item[vForKey]"
            :disabled="disabledAll">
            <span style="float: left">{{isShowName?`${item.airlineName}(${item.airlineCode})`:item.airlineCode}}</span>
        </el-option>
    </el-select>
</template>
<script>
import {getAirlineInfoFunc} from '@/util/globalData' // 引入下拉框数据
export default {
    data () {
        return {
            airlines: [],
            airlinesMap: { // map数据
                airlineCode: {}, // code做键
                masterWaybillPrefix: {} // 前缀做键
            }
        }
    },
    props: {
        isShowName: {
            type: Boolean,
            default: false
        },
        disabled: {
            type: Boolean,
            default: false
        },
        className: {
            type: String,
            default: 's-input'
        },
        placeholder: {
            type: String,
            default: ''
        },
        clearable: { // 是否可清除
            type: Boolean,
            default: false
        },
        multiple: { // 是否多选
            type: Boolean,
            default: true
        },
        data: {
            type: [Array, String],
            default () {
                return []
            }
        },
        allCode: { // 全部选项code
            type: String,
            default: ''
        },
        disabledAll: { // disabled所有
            type: Boolean,
            default: false
        },
        vForKey: { // v-for 唯一键
            type: String,
            default: 'airlineCode'
        },
        collapseTags: {
            type: Boolean,
            default: false
        }
    },
    created () {
        getAirlineInfoFunc().then(res => {
            this.airlines = res;
            res.forEach(({airlineCode, airlineName, masterWaybillPrefix}) => {
                this.airlinesMap.airlineCode[airlineCode] = airlineName
                this.airlinesMap.masterWaybillPrefix[masterWaybillPrefix] = airlineName
            })
            this.$emit('getAirLineMapData', this.airlinesMap.airlineCode)
        })
    },
    methods: {
        changeHandler (val) {
            this.$emit('update:data', val)
            this.$emit('change', val, val ? this.airlinesMap[this.vForKey][val] : '')
        },
        selectRefBlur() {
            this.$refs.airlineSelect.blur();
		}
    }
}
</script>
<style lang="scss">
    .airlines_multiple {
        input.el-input__inner{
            width: 400px;
        }
    }
</style>
