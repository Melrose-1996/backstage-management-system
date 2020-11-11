<template>
	<div class="cPageDropDown">
		<el-select :title="isShowTitle? titleStr : ''" ref="selectRef" :popper-append-to-body="false" v-model="data" @blur="selectBlur" :filterable="filterable" :clearable="clearable" :class="[className]" :placeholder="placeholder"
		 :disabled="disabled" :maxlength="maxlength" @input.native="selectInput" @change="handleInput" :filter-method="filterMethod" popper-class="page-drop-down-popper">
			<template v-if="type == 'district'">
				<el-option v-for="item in options" @click.native="optionClick(item)" :key="item.id" :label="`${item.distName}(${item.cityCode})`" :value="item.distName">
				</el-option>
			</template>
			<template v-else-if="type == 'planeType'">
				<el-option v-for="item in options" :key="item.id" @click.native="optionClick(item)" :label="`${item.planeType}`" :value="item.planeType">
				</el-option>
			</template>
			<template v-else-if="type == 'customer'">
				<el-option v-for="item in options" :key="item.id" @click.native="optionClick(item)" :label="`${item.userCode}(${item.userName})`" :value="`${item.userCode}(${item.userName})`">
				</el-option>
			</template>
			<template v-else-if="type == 'supplier'">
				<el-option v-for="item in options" :key="item.supplierId" @click.native="optionClick(item)" :label="`${item.deptCode}(${item.supplierName})`" :value="`${item.supplierId}`">
				</el-option>
			</template>
			<template v-else-if="type == 'company'">
				<el-option v-for="item in options" :key="item.enterpriseCode" @click.native="optionClick(item)" :label="`${item.enterpriseName}`" :value="`${item.enterpriseCode}`">
				</el-option>
			</template>
			<!-- 机场数据 -->
			<template v-else-if="type == 'airportList'">
				<el-option v-for="item in options" :key="item.bsApCode" @click.native="optionClick(item)" :label="`${item.bsApCode}`" :value="`${item.bsApCode}`">
				</el-option>
			</template>
			<!-- 航司数据 -->
			<template v-else-if="type == 'airlineList'">
				<el-option v-for="item in options" :key="item.bsaiCode" @click.native="optionClick(item)" :label="`${item.bsaiCode}`" :value="`${item.bsaiCode}`">
				</el-option>
			</template>
			<!--kc供应商数据 -->
			<template v-else-if="type == 'kcSupplier'">
				<el-option :title="`${item.enterpriseName}(${item.enterpriseCode})`" v-for="item in options" :key="item.enterpriseCode" @click.native="optionClick(item)" :label="`${item.enterpriseName}(${item.enterpriseCode})`" :value="`${item.enterpriseCode}`">
				</el-option>
			</template>
			<template>
				<div class="PageDropDownButton">
					<el-button size="small" type="primary" icon="el-icon-d-arrow-left" @click="firstPage" :disabled="currPage==1"></el-button>
					<el-button size="small" type="primary" icon="el-icon-arrow-left" @click="previous" :disabled="currPage==1"></el-button>
					第{{currPage}}页 共{{totalNumber}}页
					<el-button size="small" type="primary" @click="pageDown" :disabled="currPage==totalNumber" icon="el-icon-arrow-right"></el-button>
					<el-button size="small" type="primary" @click="endPage" :disabled="currPage==totalNumber" icon="el-icon-d-arrow-right"></el-button>
				</div>
			</template>
		</el-select>
	</div>
</template>
<script>
	import {
		getDistrictList,
		getCompanyList,
		getCompanyList1,
		getAirportList,
		getAirlineList,
		listKCSupplierInfo
	} from '@/api/common/pageDropDown'
	export default {
		data() {
			return {
				selectItem: '', // 选中的数据
				options: [], // 下拉数据
				waitingOption: [], // 待选数据
				selectOptions: {},
				currPage: 1, // 当前页
				searchStr: '',
				titleStr: ''
			}
		},
		props: {
			defaultProps: {
				type: Object,
				default: function () {
					return {
						value: 'distCode',
						label: 'distName'
					}
				}
			},
			className: {
				type: String,
				default: function () {
					return 's-input'
				}
			},
			pageSize: {
				// 每页显示的数据条数
				type: Number,
				default: function () {
					return 10
				}
			},
			filterable: {
				type: Boolean,
				default: true
			},
			clearable: {
				type: Boolean,
				default: true
			},
			data: {
				// 双向数据
				type: String
			},
			maxlength: {
				// 最大长度
				type: Number
			},
			disabled: { // 是否禁止
				type: Boolean,
				default: false
			},
			placeholder: {
				type: String,
				default: ''
			},
			/**
			 * 1是地区数据 district
			 * 2是机型数据 planeType
			 */
			type: {
				default: 'district'
			},
			samePage: { // 同一个页面可能调不同接口
				default: false
			},
			// 请求接口有可能要传的值
			params: {
				type: Object,
				default: function () {
					return {}
				}
			},
			isShowTitle: { // 是否显示title
				default: false
			}
		},
		created() {
			if (this.type == 'district') {
				this.getDistrictList()
			} else if (this.type == 'customer') {
				this.getCustomerList()
			} else if (this.type == 'supplier') {
				this.getSupplierList()
			} else if (this.type == 'company' && !this.samePage) {
				// this.getCompanyList()
			} else if (this.type == 'company' && this.samePage) {
				// this.getCompanyList1()
			} else if (this.type == 'airportList') {
				this.getAirportList()
			} else if (this.type == 'airlineList') {
				this.getAirlineList()
			} else if (this.type == 'kcSupplier') {
				this.listKCSupplierInfo();
			}
			document.body.addEventListener('click', () => {
				if (this.searchStr == this.data) {
					this.data = ''
				}
				this.searchStr = ''
            })
		},
		methods: {
			selectRefBlur() {
				this.$refs.selectRef.blur();
			},
			selectInput(val) {
				if (val.data && val.data != '') {
					this.searchStr += val.data
				} else {
					this.searchStr = this.searchStr.slice(0, -1)
				}
			},
			selectBlur(val) {
				if (this.searchStr) {
					this.data = this.searchStr
				}
			},
			handleInput(val) {
				this.$emit('update:data', this.data)
				// this.$emit('input', this.data)
			},
			firstPage() { // 第一页
				this.currPage = 1
				this.options = this.waitingOption.slice(0, this.pageSize)
			},
			previous() { // 上一页
				let start = (this.currPage - 1) * this.pageSize - this.pageSize
				let end = start + 10
				this.options = this.waitingOption.slice(start, end)
				this.currPage = this.currPage - 1
			},
			pageDown() {
				// 下一页
				let start = (this.currPage) * this.pageSize
				let end = start + 10
				this.options = this.waitingOption.slice(start, end)
				this.currPage = this.currPage + 1
			},
			endPage() { // 最后一页
				let start = (this.totalNumber - 1) * this.pageSize
				this.currPage = this.totalNumber
				this.options = this.waitingOption.slice(start)
			},
			// 需要做type判断
			filterMethod(val) {
				if (val) {
					let query = val.toLowerCase()
					if (this.type == 'district') {
						this.waitingOption = this.selectOptions.filter(item => {
							let str = item.cityCode.toLowerCase() + item.distName
							return str.indexOf(query) > -1
						})
					} else if (this.type == 'planeType') {
						this.waitingOption = this.selectOptions.filter(item => {
							let str = item.planeType
							return str.indexOf(query) > -1
						})
					} else if (this.type == 'customer') {
						this.waitingOption = this.selectOptions.filter(item => {
							let str = item.userCode + item.userName.toLowerCase()
							return str.indexOf(query) > -1
						})
					} else if (this.type == 'supplier') {
						this.waitingOption = this.selectOptions.filter(item => {
							let str = item.deptCode + item.supplierName.toLowerCase()
							return str.indexOf(query) > -1
						})
					} else if (this.type == 'company') {
						this.waitingOption = this.selectOptions.filter(item => {
							let str = item.enterpriseName
							return str.indexOf(query) > -1
						})
					} else if (this.type == 'airportList') {
						this.waitingOption = this.selectOptions.filter(item => {
							let str = item.bsApCode.toLowerCase()
							return str.indexOf(query) > -1
						})
					} else if (this.type == 'airlineList') {
						this.waitingOption = this.selectOptions.filter(item => {
							let str = item.bsaiCode.toLowerCase()
							return str.indexOf(query) > -1
						})
					} else if (this.type == 'kcSupplier') {
						this.waitingOption = this.selectOptions.filter(item => {
							let str = item.enterpriseCode.toLowerCase() + item.enterpriseName
							return str.indexOf(query) > -1
						})
					}
					this.options = this.waitingOption.slice(0, this.pageSize)
					this.currPage = 1
				} else {
					this.waitingOption = JSON.parse(JSON.stringify(this.selectOptions))
					if (this.waitingOption.length > 0) {
						this.options = this.waitingOption.slice(0, this.pageSize)
					}
					this.currPage = 1
				}
			},
			// 获取所有城市信息
			getDistrictList() {
				let lists = sessionStorage.getItem('pageDropDownDistrictList')
				if (lists) {
					this.selectOptions = JSON.parse(lists)
					this.options = this.selectOptions.slice(0, this.pageSize)
					this.waitingOption = JSON.parse(JSON.stringify(this.selectOptions))
					return false
				}
				getDistrictList().then(res => {
					if (res.code == 0 && res.entity) {
						this.selectOptions = res.entity
						this.options = this.selectOptions.slice(0, this.pageSize)
						this.waitingOption = JSON.parse(JSON.stringify(this.selectOptions))
						sessionStorage.setItem('pageDropDownDistrictList', JSON.stringify(this.selectOptions))
					}
				})
			},
			// 获取所有公司信息
			getCompanyList() {
				getCompanyList().then(res => {
					if (res.code == 0 && res.entity) {
						if (this.data) {
							let data = res.entity
							let index = 0
							let result = data.filter((item, i) => {
								if (this.data == item.enterpriseCode) {
									index = i
									this.isShowTitle && (this.titleStr = item.enterpriseName)
								}
								return this.data == item.enterpriseCode
							})
							if (index < this.pageSize) {
								this.selectOptions = data
								this.options = data.slice(0, this.pageSize)
								this.waitingOption = JSON.parse(JSON.stringify(data))
							} else {
								data.splice(index, 1)
								data.unshift(result[0])
								this.selectOptions = data
								this.options = data.slice(0, this.pageSize)
								this.waitingOption = JSON.parse(JSON.stringify(data))
							}
						} else {
							this.selectOptions = res.entity
							this.options = this.selectOptions.slice(0, this.pageSize)
							this.waitingOption = JSON.parse(JSON.stringify(this.selectOptions))
						}
						// sessionStorage.setItem('pageDropDownCompanytList', JSON.stringify(this.selectOptions))
					}
				})
			},
			getCompanyList1() {
				getCompanyList1(this.params).then(res => {
					if (res.code == 0 && res.entity) {
						if (this.data) {
							let data = res.entity
							let index = 0
							let result = data.filter((item, i) => {
								if (this.data == item.enterpriseCode) {
									index = i
									this.isShowTitle && (this.titleStr = item.enterpriseName)
								}
								// console.log(item.enterpriseName)
								return this.data == item.enterpriseCode
							})
							if (index < this.pageSize) {
								this.selectOptions = data
								this.options = data.slice(0, this.pageSize)
								this.waitingOption = JSON.parse(JSON.stringify(data))
							} else {
								data.splice(index, 1)
								data.unshift(result[0])
								this.selectOptions = data
								this.options = data.slice(0, this.pageSize)
								this.waitingOption = JSON.parse(JSON.stringify(data))
							}
						} else {
							this.selectOptions = res.entity
							this.options = this.selectOptions.slice(0, this.pageSize)
							this.waitingOption = JSON.parse(JSON.stringify(this.selectOptions))
						}
						// sessionStorage.setItem('pageDropDownCompanytList', JSON.stringify(this.selectOptions))
					}
				})
			},
			// 获取所有机场数据
			getAirportList() {
				let lists = sessionStorage.getItem('pageDropDownAirportList')
				if (lists) {
					this.selectOptions = JSON.parse(lists)
					this.options = this.selectOptions.slice(0, this.pageSize)
					this.waitingOption = JSON.parse(JSON.stringify(this.selectOptions))
					return false
				}
				getAirportList().then(res => {
					if (res.code == 0 && res.entity) {
						this.selectOptions = res.entity
						this.options = this.selectOptions.slice(0, this.pageSize)
						this.waitingOption = JSON.parse(JSON.stringify(this.selectOptions))
						sessionStorage.setItem('pageDropDownAirportList', JSON.stringify(this.selectOptions))
					}
				})
			},
			// 航司数据
			getAirlineList() {
				let lists = sessionStorage.getItem('pageDropDownAirlineList')
				if (lists) {
					this.selectOptions = JSON.parse(lists)
					this.options = this.selectOptions.slice(0, this.pageSize)
					this.waitingOption = JSON.parse(JSON.stringify(this.selectOptions))
					return false
				}
				getAirlineList().then(res => {
					if (res.code == 0 && res.entity) {
						this.selectOptions = res.entity
						this.options = this.selectOptions.slice(0, this.pageSize)
						this.waitingOption = JSON.parse(JSON.stringify(this.selectOptions))
						sessionStorage.setItem('pageDropDownAirlineList', JSON.stringify(this.selectOptions))
					}
				})
			},
			// kc供应商
			listKCSupplierInfo() {
				let lists = sessionStorage.getItem('pageDropDownKcSupplier')
				if (lists) {
					this.selectOptions = JSON.parse(lists)
					this.options = this.selectOptions.slice(0, this.pageSize)
					this.waitingOption = JSON.parse(JSON.stringify(this.selectOptions))
					return false
				}
				listKCSupplierInfo().then(res => {
					if (res.code == 0 && res.entity) {
						this.selectOptions = res.entity
						this.options = this.selectOptions.slice(0, this.pageSize)
						this.waitingOption = JSON.parse(JSON.stringify(this.selectOptions))
						sessionStorage.setItem('pageDropDownKcSupplier', JSON.stringify(this.selectOptions))
					}
				})
			},
			optionClick(val) {
				this.$emit('change', val)
				this.searchStr = ''
				this.isShowTitle && (this.titleStr = val.enterpriseName)
			}
		},
		watch: {
			data: {
				handler(now, old) {
					if (!now) {
						this.waitingOption = JSON.parse(JSON.stringify(this.selectOptions))
						if (this.waitingOption.length > 0) {
							this.options = this.waitingOption.slice(0, this.pageSize)
						}
						this.currPage = 1
						this.searchStr = ''
					}
				},
				deep: true,
            	immediate: true
			},
			'params.departCityCode': {
				handler(now, old) {
					this.getPlaneTypeList()
				}
			},
			'params.deptCodes': {
				handler(now, old) {
					this.getSupplierList()
				}
			}
		},
		computed: {
			totalNumber() {
				// 总计页数
				return Math.ceil(this.waitingOption.length / this.pageSize)
			}
		}
	}

</script>
<style lang="scss">
	.cPageDropDown{
		display: inline-block;
	}
	.page-drop-down-popper {
		position: absolute !important;
		top: 40px !important;
		left: 0px !important;
		.el-scrollbar__view {
			width: 320px;
			padding: 0 0 40px;
			.PageDropDownButton {
				position: absolute;
				bottom: 0;
				padding: 3px 0;
				width: 100%;
				text-align: center;
				-moz-box-shadow: 0px -2px 5px #e8e8e8;
				-webkit-box-shadow: 0px -2px 5px #e8e8e8;
				box-shadow: 0px -2px 5px #e8e8e8;
				background-color: #fff;
				button {
					// height: 25px;
					padding: 7px 10px;
					font-size: 12px;
				}
			}
		}
	}

</style>
