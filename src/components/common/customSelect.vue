<template>
    <el-autocomplete
      popper-class="my-autocomplete"
      class="s-input"
      v-model="data"
      :fetch-suggestions="querySearch"
      :placeholder="placeholder"
      @input="handleInput"
      @select="handleSelect"
      @focus="focus"
      @blur="blur"
      :maxlength="maxlength"
      :disabled="disabled">
        <template slot-scope="{ item }">
            <div class="name">{{item.value}}</div>
            <div v-if="showInfo.length" class="name" v-for="info in showInfo" :key="info" >{{item[info]}}&nbsp;</div>
        </template>
    </el-autocomplete>
</template>
<script>
export default {
    props: {
        label: { // 显示的文字的key
            type: String
        },
        selectOptions: { // 下拉数据
            type: [Array, Object]
        },
        data: { // 双向数据
            type: String
        },
        maxlength: { // 最大长度
            type: Number
        },
        disabled: false, // 是否禁止
        placeholder: '', // placeholder
        showInfo: { // 自定义展示字段
            type: Array,
            default() {
                return []
            }
        }
    },
    created () {
    },
    methods: {
        handleInput() {
            this.$emit('update:data', this.data)
            this.$emit('input', this.data)
        },
        handleParam () {
            let selectOptions = this.selectOptions
            if (!selectOptions || typeof selectOptions === 'string') {
                selectOptions = []
            }
            let templateData = JSON.parse(JSON.stringify(selectOptions))
            if (Array.isArray(templateData)) { // 传入列表为对象
                if (this.label) {
                    return templateData.map(v => ({...v, value: v[this.label]}))
                } else {
                    return templateData.map(v => ({value: v}))
                }
            } else {
                let list = [];
                Object.keys(templateData).forEach(v => {
                    let item = templateData[v]
                    if (typeof item === 'object') { // 为对象
                        list.push({...item, __id: v, value: item[this.label]})
                    } else { // 为基础值
                        list.push({__id: v, value: item})
                    }
                })
                return list
            }
        },
        querySearch(queryString, cb) {
            let resultList = this.handleParam();
            let results = queryString ? resultList.filter(this.createFilter(queryString)) : resultList;
            // 调用 callback 返回建议列表的数据
            cb(results)
        },
        createFilter(queryString) {
            return (item) => {
                return ((item.value.toLowerCase().indexOf(queryString.toLowerCase()) > -1))
            }
        },
        handleSelect(item) {
            this.$emit('update:data', item.value)
            this.$emit('change', item)
        },
        focus() {
            this.$emit('focus')
        },
        blur() {
            this.$emit('blur')
        }
    }
}
</script>
<style lang="scss">
    .my-autocomplete {
        li {
            padding-left: 2px;
            padding-right: 2px;
            div {
                display: inline-block;
            }
        }
    }
</style>
