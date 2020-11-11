<template>
    <div class="select_all_region" :id="onlyOneId">
        <el-input
            v-model="showText"
            :placeholder="showPlaceholder ? '请选择省市区': ''"
            :id="onlyOneIdInput"
            :title="needTitle ? showText : ''"
            popper-class="c-region-popper-class"
            :class="[className, 'select_all_region_input']"
            @keydown.native="handleKeydown"
            :readonly="true"
            :disabled="disabled"
            @click.native="handleClick"
            @focus="handleShowText($event)">
            <i
                slot="suffix"
                v-if="clearable&&isClearIconShow&&!disabled"
                class="select_all_region_close el-input__icon el-icon-circle-close"
                @click="clear">
            </i>
        </el-input>
        <el-tabs
            :id="onlyOneId"
            type="border-card"
            v-model="titleIndex"
            v-show="dialogIsShow"
            @click.native="tabsClick"
            class="lh20">
            <el-tab-pane
                v-for="(item, index) in [{data:commonCity,label:'常用城市',type:-1},{data:provinceInfo,label:'省',type:0},{data:cityInfo.children,label:'市',type:1},{data:areaInfo.children,label:'区',type:2}]"
                :key="index"
                :label="item.label"
                :name="item.type.toString()">
                <div
                    v-for="showItem in item.data"
                    :key="showItem.regionCode"
                    @click="handleContent(showItem, item.type)"
                    :class="['click_item', selectedOptions.data[index]==showItem.regionCode?'current_blue':'']">
                    {{showItem.regionName}}
                </div>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>
<script>
import { mapActions } from 'vuex'
import {REGION_HOT_CITY, REGION_HOT_CITY_PET} from '@/util/hotArea'
import common from '@/util/common'
let oldData = [] // fucus进来的参数
export default {
    data() {
        return {
            dialogIsShow: false, // 是否展示弹框
            titleIndex: '0', // tab下标
            commonCity: REGION_HOT_CITY, // 常用城市
            // provinceInfo: [], // 省
            cityInfo: {}, // 市
            areaInfo: {}, // 区
            nameData: [], // 名字数组
            isClearIconShow: false, // 是否点击了清空按钮
            onlyOneId: 'select_all_region' + Math.random().toString().slice(2),
            onlyOneIdInput: 'select_all_region_input' + Math.random().toString().slice(2)
        }
    },
    props: {
        clearable: {
            type: Boolean,
            default: function() {
                return true
            }
        },
        disabled: {
            type: Boolean,
            default: function() {
                return false
            }
        },
        className: {
            type: String,
            default: function() {
                return 'm-input'
            }
        },
        placeholder: {
            type: String,
            default: function() {
                return ''
            }
        },
        selectedOptions: {
            type: Object,
            default: function() {
                return {
                    data: ['310000', '310100', '310115']
                }
            }
        },
        changeOnSelect: { // 是否可以所以选择不用三级
            type: Boolean,
            default: false
        },
        needTitle: {
            type: Boolean,
            default: false
        },
        showPlaceholder: {
        	type: Boolean,
        	default: false
        },
        isPet: { // 是否是宠宝用的
            type: Boolean,
        	default: false
        }
    },
    created() {
        this.isPet ? this.setAllRegionPet() : this.setAllRegion()
        this.commonCity = this.isPet ? REGION_HOT_CITY_PET : REGION_HOT_CITY;
        document.body.addEventListener('click', () => {
            this.dialogIsShow = false
        })
    },
    watch: {
        'selectedOptions.data': {
            handler(val) {
                this.edit(val)
            },
            deep: true,
            immediate: true
        },
        'showSelect': {
            handler(now) {
                this.$nextTick(() => {
                    let position = common.getPosition(document.querySelector('#' + this.onlyOneIdInput))
                    let currentDropdown = document.querySelector('.c-region-popper-class')
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
                    } else {
                        currentDropdown.style.visibility = 'visible'
                    }
                })
            }
        },
        'dialogIsShow': {
            handler(now) {
                if (!now) { // 影藏时
                    if (!this.changeOnSelect) { // 一定选三级
                        if (this.selectedOptions.data.length !== 3) { // 没有选三级
                            this.selectedOptions.data = [...oldData]
                            this.selectedOptions.callback && this.selectedOptions.callback([this.selectedOptions.data[0] || '', this.selectedOptions.data[1] || '', this.selectedOptions.data[2] || ''])
                        }
                    }
                }
            }
        }
    },
    computed: {
        showText: {
            get() {
                let str = this.nameData.join('/')
                if (this.changeOnSelect) {
                    return str
                } else {
                    return this.nameData.length === 3 ? str : ''
                }
            },
            set(val) {
                this.nameData = val
            }
        },
        //  ...mapGetters({
        //     // cityList: 'allAirport',
        //     provinceInfo: 'allRegion'
        // })
        provinceInfo() {
            return this.isPet ? this.$store.getters.allRegionPet : this.$store.getters.allRegion
        }
    },
    methods: {
        ...mapActions(['setAllRegion', 'setAllRegionPet']),
        handleKeydown(event) {
            const keyCode = event.keyCode
            if (keyCode === 9) { // 按下tab键
                setTimeout(() => {
                    this.dialogIsShow = false
                    event.stopPropagation()
                }, 0)
            }
        },
        handleClick(e) {
            e.stopPropagation()
        },
        handleContent(item, type) { // item: 儿子数据 type -1: 常用城市点击 0: 省点击 1: 市点击 2: 区点击
            if (type === -1) { // 常用城市点击
                 this.selectedOptions.data = [item.parentRegion, item.regionCode]
            } else if (type === 0) { // 省点击
                this.selectedOptions.data = [item.regionCode]
            } else if (type === 1) { // 市点击
                this.selectedOptions.data = [this.selectedOptions.data[0], item.regionCode]
            } else { // 区点击
                this.selectedOptions.data = [this.selectedOptions.data[0], this.selectedOptions.data[1], item.regionCode]
                this.dialogIsShow = false
            }
            this.titleIndex = this.selectedOptions.data.length + ''
            this.selectedOptions.callback && this.selectedOptions.callback([this.selectedOptions.data[0] || '', this.selectedOptions.data[1] || '', this.selectedOptions.data[2] || ''])
        },
        handleShowText(e) { // input框点击事件
            e.stopPropagation()
            if (this.disabled) {
                return
            }
            oldData = [...this.selectedOptions.data]
            let length = this.selectedOptions.data.length
            if (length === 0) {
                this.titleIndex = '-1'
            } else if (length > 2) {
                this.titleIndex = '2'
            } else {
                this.titleIndex = length - 1 + ''
            }
            let input = document.querySelector('#' + this.onlyOneId).querySelector('input')
            let div = document.querySelector('#' + this.onlyOneId).querySelector('.el-tabs')
            let inputPos = common.getPosition(input)
            div.style.position = 'fixed'
            div.style.left = inputPos.left + 'px'
            div.style.top = inputPos.bottom + 5 + 'px'
            div.style.zIndex = 999999
            this.dialogIsShow = !this.dialogIsShow
        },
        clear() {
            this.selectedOptions.data = []
            this.nameData = []
            this.selectedOptions.callback && this.selectedOptions.callback([])
            this.innerData = []
        },
        tabsClick(e) {
            e.stopPropagation()
        },
        handlerEdit(val, data) {
            let [province, city, area] = val
            let cityInfo = ((data || []).filter(v => (v.regionCode === province))[0]) || {}
            let areaInfo = ((cityInfo.children || []).filter(v => (v.regionCode === city))[0]) || {}
            let areaObj = ((areaInfo.children || []).filter(v => (v.regionCode === area))[0] || {})
            this.cityInfo = {}
            this.areaInfo = {}
            this.nameData = []
            if (province) { // 省
                this.cityInfo = cityInfo
                this.nameData = [cityInfo.regionName]
            }
            if (city) { // 省市
                this.areaInfo = areaInfo
                this.nameData = [cityInfo.regionName, areaInfo.regionName]
            }
            if (area) { // 省市区
                this.nameData = [cityInfo.regionName, areaInfo.regionName, areaObj.regionName]
            }
            this.isClearIconShow = !!val.length
        },
        edit(val) { // 回填功能
            // let [province, city, area] = val
            if (this.provinceInfo.length > 0) {
                this.handlerEdit(val, this.provinceInfo)
            } else {
                if (this.isPet) {
                    this.setAllRegionPet().then((res) => {
                        this.handlerEdit(val, res)
                    })
                } else {
                    this.setAllRegion().then((res) => {
                        this.handlerEdit(val, res)
                    })
                }
            }
        }
    }
}
</script>

<style lang="scss">
    .select_all_region {
        .select_all_region_input {
            .select_all_region_close {
                display: none;
                color: #ccc !important;
                &:hover {
                    color :#909399 !important;
                }
            }
            &:hover {
                .select_all_region_close {
                    display: block;
                }
            }
        }
        .el-tabs {
            width: 450px;
            .el-tabs__content {
                .click_item {
                    height: 20px !important;
                    display: inline-block;
                    margin: 0 5px 5px;
                    cursor: pointer;
                    &:hover {
                        color: #429fd5;
                    }
                }
                .current_blue {
                    color: #429fd5;
                }
            }
        }
        .lh20 {
            line-height: 20px !important;
        }
    }
</style>
