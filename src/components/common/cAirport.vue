<template>
    <div class="selectAirportWithCityName">
        <el-select v-model="data" default-first-option :disabled="disabled" :popper-class="onlyOneIdPopper" :clearable="clearable" :id="onlyOneIdInput" :multiple="multiple" @keydown.native="handleKeydown" filterable :filter-method="filterFunc" :placeholder="placeholder" @focus="elSelectFocus" :class="className" @change="changeMessage">
            <template v-show="showSelect===1">
                <el-option v-show="showSelect===1" v-for="(item, key) in cityList" :key="key" :label="`${showAll?item.airportName:item.serviceAddress}(${key})`" :value="key">
                    <span style="float: left">{{`${showAll?item.airportName:item.serviceAddress}(${key})`}}</span>
                </el-option>
            </template>
        </el-select>
        <div v-show="showSelect===2" @click.native="tabsClick" class="outer" :id="onlyOneId">
            <div class="tips lh20">支持中文/拼音/简拼输入</div>
            <el-tabs v-model="activeName" class="lh20" @click.native="tabsClick">
                <el-tab-pane v-for="(val, key) in pinYinObj" :key="key" :label="key" :name="key">
                    <template v-if="key==='热门'">
                        <div class="first_city_hot">
                            <span v-for="item in pinYinObj.热门" :key="item.code" @click="citySelect(item.code, item.name)">{{item.name}}</span>
                        </div>
                    </template>
                    <template v-if="key!=='热门'">
                        <div v-for="firstKey in key.split('')" :key="firstKey" class="first_key_outer">
                            <template v-if="Object.keys(pinYinObj[key][firstKey]||{}).length">
                                <div class="first_key">{{firstKey}}</div>
                                <div class="first_city_name">
                                    <span v-for="(cityName, cityCode) in pinYinObj[key][firstKey]" :key="cityCode" @click="citySelect(cityCode, cityName)">{{cityName}}</span>
                                </div>
                            </template>
                        </div>
                    </template>
                </el-tab-pane>
            </el-tabs>
        </div>
    </div>
</template>
<script>
// import {getAirportPinyinBase, getAirportPinyinSort} from '@/util/globalData'
import { mapActions, mapGetters } from 'vuex'
import common from '@/util/common'
// import { HOT_AIRPORT } from '@/util/hotArea'
export default {
    data() {
        return {
            showSelect: '', // '' 不显示 1 :展示搜索 2:展示首拼排序
            cityList: [],
            // baseCityList: [],
            activeName: '热门',
            pinYinObj: {},
            onlyOneId:
                'selectAirportWithCityName' +
                Math.random()
                    .toString()
                    .slice(2),
            onlyOneIdInput:
                'selectAirportWithCityNameInput' +
                Math.random()
                    .toString()
                    .slice(2),
            onlyOneIdPopper:
                'selectAirportWithCityNamePopper' +
                Math.random()
                    .toString()
                    .slice(2)
        }
    },
    props: {
        className: {
            type: String,
            default: function() {
                return 's-input'
            }
        },
        showAll: {
            // false: 机场城市名 true: 机场机场名字
            type: Boolean,
            default: function() {
                return false
            }
        },
        disabled: {
            // 是否禁用
            type: Boolean,
            default: function() {
                return false
            }
        },
        placeholder: {
            type: String,
            default: function() {
                return ''
            }
        },
        data: {
            type: [String, Array],
            default: function() {
                return ''
            }
        },
        clearable: {
            type: Boolean,
            default: function() {
                return true
            }
        },
        change: {
            type: Function
        },
        multiple: {
            // 是否多选
            type: Boolean,
            default: false
        }
    },
    created() {
        if (Object.keys(this.baseCityList).length == 0) {
            this.setAllAirport()
        }
        this.cityList = common.deepClone(this.baseCityList)
        if (Object.keys(this.pinYinObj).length == 0) {
            this.pinYinObj = this.$store.getters.airportPinyin(this.showAll)
        }
        document.body.addEventListener('click', () => {
            this.showSelect = ''
        })
    },
    watch: {
        showSelect: {
            handler(now) {
                this.$nextTick(() => {
                    let position = common.getPosition(
                        document.querySelector('#' + this.onlyOneIdInput)
                    )
                    let currentDropdown = document.querySelector(
                        '.' + this.onlyOneIdPopper
                    )
                    let dom = document.querySelector('#' + this.onlyOneId)
                    if (now === 2) {
                        currentDropdown.style.visibility = 'hidden'
                        if (position.scrollBottom > 200) {
                            dom.style.top = '35px'
                            dom.style.bottom = 'auto'
                        } else {
                            dom.style.top = 'auto'
                            dom.style.bottom = position.height + 10 + 'px'
                        }
                    } else if (now === 1) {
                        currentDropdown.style.visibility = 'visible'
                    }
                })
            }
        },
        baseCityList: {
            handler(now) {
                this.cityList = common.deepClone(this.baseCityList)
                this.pinYinObj = this.$store.getters.airportPinyin(this.showAll)
            },
            deep: true
        }
    },
    computed: {
			...mapGetters({
                baseCityList: 'allAirport'
                // pinYinObj: 'airportPinyintrue'
            })
		},
    methods: {
        ...mapActions(['setAllAirport']),
        handleKeydown(event) {
            const keyCode = event.keyCode
            if (keyCode === 9) {
                // 按下tab键
                setTimeout(() => {
                    this.showSelect = ''
                    event.stopPropagation()
                }, 0)
            }
        },
        changeMessage() {
            this.$emit('update:data', this.data)
            this.$emit('change', this.data, { ...this.baseCityList[this.data] })
        },
        elSelectFocus(e) {
            e.stopPropagation()
            if (this.multiple) {
                // 多选不展示字母排序
                this.showSelect = 1
            } else {
                this.showSelect = 2
            }
        },
        filterFunc(val) {
            if (val.length) {
                this.showSelect = 1
                setTimeout(() => {
                    let upperName = val.toUpperCase()
                    let lowerName = val.toLowerCase()
                    let codeObj = {}
                    let baseObj = {}
                    Object.keys(this.baseCityList).forEach(v => {
                        let tmp = this.baseCityList[v]
                        // 先按照三字码搜索
                        if (v.includes(upperName)) {
                            codeObj[v] = tmp
                        }
                        // 模糊匹配
                        let name = this.showAll
                            ? tmp.airportName
                            : tmp.serviceAddress
                        let pinyin = this.showAll
                            ? tmp.airPinyin
                            : tmp.cityPinyin
                        let regStr = `\\S*${lowerName
                            .split('')
                            .join('\\S*')}\\S*`
                        let reg = new RegExp(regStr)
                        if (reg.test(name + pinyin)) {
                            baseObj[v] = tmp
                        }
                    })
                    if (Object.keys(codeObj).length > 0) {
                        this.cityList = codeObj
                    } else {
                        this.cityList = baseObj
                    }
                }, 10)
            } else {
                if (this.multiple) {
                    this.showSelect = 1
                    this.cityList = common.deepClone(this.baseCityList)
                } else {
                    this.showSelect = 2
                }
            }
        },
        tabsClick(e) {
            e.stopPropagation()
        },
        citySelect(code, name) {
            this.data = code
            this.$emit('update:data', this.data)
            this.$emit('change', this.data, { ...this.baseCityList[this.data] })
            this.showSelect = ''
        }
    }
}
</script>
<style lang="scss">
.selectAirportWithCityName {
    position: relative;
    .outer {
        width: 450px;
        border: 1px solid #dcdfe6;
        box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.12),
            0 0 6px 0 rgba(0, 0, 0, 0.04);
        background-color: #fff;
        position: absolute;
        left: 0px;
        top: 35px;
        z-index: 9998;
        .el-tabs {
            .el-tabs__nav {
                // padding-left: 10px;
                > div {
                    padding: 0 15px;
                    font-size: 12px;
                    text-align: left;
                }
            }
            .el-tabs__content {
                padding-left: 10px;
                .first_key_outer {
                    display: flex;
                    .first_key {
                        width: 20px;
                        color: #f39c12;
                    }
                    .first_city_name {
                        flex: 1;
                        span {
                            font-size: 12px;
                            height: 20px !important;
                            display: inline-block;
                            margin: 0 5px 5px;
                            cursor: pointer;
                            &:hover {
                                color: #429fd5;
                            }
                        }
                    }
                }
            }
            .first_city_hot {
                span {
                    font-size: 12px;
                    height: 20px !important;
                    display: inline-block;
                    margin: 0 5px 5px;
                    cursor: pointer;
                    &:hover {
                        color: #429fd5;
                    }
                }
            }
        }
        .lh20 {
            line-height: 20px !important;
        }
        .tips {
            font-size: 12px;
            padding-left: 15px;
            color: #666;
        }
    }
    .heightAuto {
        height: auto !important;
    }
}
</style>