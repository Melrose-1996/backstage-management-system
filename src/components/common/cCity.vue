<template>
    <div class="common_select_city">
        <el-select :title="showTitle?cityName:''" :id="onlyOneIdInput" default-first-option :popper-class="onlyOneIdPopper" v-model="data" :clearable="clearable" :disabled="disabled" :multiple="multiple" @keydown.native="handleKeydown" filterable :placeholder="placeholder" :filter-method="filterFunc" @focus="elSelectFocus" :class="[className]" @change="changeMessage">
            <template v-show="showSelect===1">
                <el-option v-show="showSelect===1" v-for="(val, key) in cityList" :key="key" :label="`${val.name}`" :value="key">
                    <span style="float: left">{{ val.name }}({{val.spelling}})</span>
                    <span style="float: right">{{ val.pinyin }}</span>
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
import { mapActions } from 'vuex'
import common from '@/util/common'
// import { HOT_CITY } from '@/util/hotArea'
export default {
    data() {
        return {
            showSelect: '', // '' 不显示 1 :展示搜索 2:展示首拼排序
            cityList: [],
            cityName: '',
            // baseCityList: [],
            activeName: '热门',
            // pinYinObj: {},
            onlyOneId:
                'select_city_' +
                Math.random()
                    .toString()
                    .slice(2),
            onlyOneIdInput:
                'select_city_input' +
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
        placeholder: {
            type: String,
            default: function() {
                return ''
            }
        },
        data: {
            type: String,
            default: function() {
                return ''
            }
        },
        // needAll: {
        //     type: Boolean,
        //     default: function () {
        //         return false;
        //     }
        // },
        clearable: {
            type: Boolean,
            default: function() {
                return true
            }
        },
        disabled: {
            type: Boolean
        },
        multiple: {
            // 是否多选
            type: Boolean,
            default: false
        },
        showTitle: { // 是否需要显示title
        	type: Boolean,
        	default: false
        },
        isPet: { // 是否是宠宝用的
            type: Boolean,
        	default: false
        }
    },
    created() {
        if (Object.keys(this.baseCityList).length == 0) {
            this.isPet ? this.setAllCityPet() : this.setAllCity();
        }
        this.cityList = common.deepClone(this.baseCityList)
        // this.cityList = common.deepClone(this.baseCityList)
        // getCityPinyinBase().then(res => {
        //     this.cityList = res
        //     this.baseCityList = common.deepClone(res)
        //     getCityPinyinMapSort().then(data => {
        //         this.pinYinObj = data
        //     })
        // })
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
                        if (position.scrollBottom > 280) {
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
                if (this.baseCityList[this.data]) {
                    this.cityName = this.baseCityList[this.data].name;
                }
            }
        }
    },
    computed: {
        // ...mapGetters({
        //     pinYinObj: this.isPet ? 'cityPinYinPet' : 'cityPinYin',
        //     baseCityList: this.isPet ? 'allCityPet' : 'allCity'
        // }),
        pinYinObj() {
            return this.isPet ? this.$store.getters.cityPinYinPet : this.$store.getters.cityPinYin
        },
        baseCityList() {
            return this.isPet ? this.$store.getters.allCityPet : this.$store.getters.allCity
        }
        // cityName() {
        //     console.log(this.cityList, 211212112121212)
        //     return this.cityList.map((item) => {
        //         return item[this.data];
        //     });
        //     // return 1111;
        // }
        // pinYinObj() {
        //     let pinYinData = common.dataFilter(this.baseCityList, 'spelling', 'name', HOT_CITY)
        //     return pinYinData
        // }
    },
    methods: {
        ...mapActions(['setAllCity', 'setAllCityPet']),
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
        elSelectFocus(e) {
            e.stopPropagation()
            if (this.multiple) {
                // 多选不展示字母排序
                this.showSelect = 1
            } else {
                this.showSelect = 2
            }
        },
        changeMessage() {
            this.$emit('update:data', this.data)
            this.$emit('change', this.data)
            this.showSelect = ''
        },
        filterFunc(val) {
            if (val.length) {
                this.showSelect = 1
                setTimeout(() => {
                    let upperName = val.toUpperCase()
                    let lowerName = val.toLowerCase()
                    let obj = {}
                    let baseObj = {}
                    Object.keys(this.baseCityList).forEach(v => {
                        let tmp = this.baseCityList[v]
                        // 简拼搜索
                        let { spelling } = tmp
                        if (upperName == spelling) {
                            obj[v] = tmp
                        }
                        // 模糊搜索
                        let { name, pinyin } = tmp
                        let regStr = `\\S*${lowerName
                            .split('')
                            .join('\\S*')}\\S*`
                        let reg = new RegExp(regStr)
                        if (reg.test(name + pinyin)) {
                            baseObj[v] = tmp
                        }
                    })
                    if (Object.keys(obj).length > 0) {
                        this.cityList = obj
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
        citySelect(code, name) {
        	this.cityName = name;
            this.data = code
            this.$emit('update:data', this.data)
            this.$emit('change', this.data)
            this.showSelect = ''
        },
        tabsClick(e) {
            e.stopPropagation()
        }
    }
}
</script>
<style lang="scss">
.common_select_city {
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
}
</style>
