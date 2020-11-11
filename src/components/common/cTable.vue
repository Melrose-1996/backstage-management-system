<template>
	<el-row class="ctable">
		<!-- 表格标题 -->
		<div v-if="title" class="ctable-title clearfix">
			<div class="fl" v-if="title">{{title}}</div>
		</div>
		<!-- 表格查询条件 -->
		<slot name="search"></slot>
		<!-- 表格slot 表格按钮放置,(后面可以跟汇总信息等等文字数据) -->
		<div class="total-info" :class="[isShowTableInfo?'total-info-height':'']">
			<slot name="head"></slot>
			<div
				v-if="textContent"
				class="el-title-info el-title-info2"
				:style="{'color': color}">
				<img :src="iconUrl" v-if="showIcon">
				<span v-html="textContent"></span>
			</div>
			<div class="is-show-row-class" v-if="isShowTableInfo&&isShowRow">
				<!-- <el-button
					type="text"
					icon="el-icon-refresh"
					@click="handleRefresh">
				</el-button> -->
				<el-dropdown
					trigger="click"
					:hide-on-click="false"
					@visible-change="handleShowRowCheckedChange">
					<span class="el-dropdown-link">
						<i class="iconfont icon-jiugongge"></i>
					</span>
					<el-dropdown-menu
						slot="dropdown"
						class="ctable-is-show-row-check">
						<el-checkbox
							:indeterminate="isIndeterminate"
							v-model="showRowCheckedAll"
							@change="handleCheckAllChange">
							{{'全选'}}
						</el-checkbox>
						<el-checkbox-group v-model="showRowChecked" @change="handleCheckedChange">
							<template v-for="(item, index) in thead">
								<el-checkbox
									v-if="item.name&&!item.fixed&&index!==0"
									:key="index"
									:label="index">
									{{item.name}}
								</el-checkbox>
							</template>
						</el-checkbox-group>
					</el-dropdown-menu>
				</el-dropdown>
			</div>
		</div>
		<!-- 表格信息 -->
		<el-table
			:class="[highLight?'pointer':'']"
			:stripe="stripe"
			:max-height="maxHeight"
			:height="height"
			ref="multipleTable"
			:data="tableData"
			tooltip-effect="light"
			style="width:100%"
			@selection-change="handleSelectionChange"
			@current-change="handleCurrentChange"
			@cell-click="cellClick"
			@cell-dblclick="dblClick"
			:checkPropoty="checkPropoty"
			:highlight-current-row="highLight"
			:default-expand-all="defaultExpandAll"
			@expand-change="expandChange"
			:row-class-name="tableRowClassName"
			@row-click="rowClick">
			<!-- 多选框 -->
			<el-table-column
				v-if="innerSelectType==='checkbox'"
				type="selection"
				width="40"
				class-name="cTableStopPropagation ctable-checkbox"
				:selectable='handleCheckboxAble'
				fixed>
			</el-table-column>
			<!-- 单选框 -->
			<el-table-column
				v-else-if="innerSelectType==='radio'"
				fixed
				label="选择"
				width="60"
				class-name="cTableStopPropagation ctable-radio"
				align="center">
				<template slot-scope="scope">
					<el-radio
						class="radio"
						:label="scope.$index"
						v-model="selectIndex"
						@change="radioChange(scope)">
						&nbsp;
					</el-radio>
				</template>
			</el-table-column>
			<!-- 展开行表格形式 -->
			<el-table-column type="expand" v-if="expandKey">
				<template slot-scope="expandData">
					<el-table
						:data="expandData.row[expandKey]"
						:class="['expand-table-class', expandClass||'']">
						<template v-for="(item, index) in expandThead">
							<component
								:key="index"
								v-if="item.component"
								:is="item.component"
								:item="item"
								:width="item.width || (index==0?130:'')">
							</component>
							<el-table-column
								:show-overflow-tooltip="true"
								:key="index"
								v-if="!item.component&&!item.hidden"
								:prop="item.prop"
								:label="item.name"
								:formatter="item.format"
								:width="item.width||100"
								:min-width="item.minWidth||100"
								:align="item.align||'left'">
							</el-table-column>
						</template>
					</el-table>
				</template>
			</el-table-column>
			<!-- 展开行列表形式 -->
			<el-table-column type="expand" v-if="expand">
				<template slot-scope="expandData">
					<div class="demo-table-expand">
						<div v-for="(item, index) in expandThead" :key="index">
							<span style="color:#99a9bf;margin:0 2px;">{{item.name}} : </span>
							<el-tooltip
								effect="light"
								:content="item.format?item.format(expandData.row,item,expandData.row[item.prop]).toString():(expandData.row[item.prop]&&expandData.row[item.prop].toString())"
								placement="top">
								<span style="margin-right:10px">
									{{item.format?item.format(expandData.row,item,expandData.row[item.prop]):expandData.row[item.prop]}}
								</span>
							</el-tooltip>
						</div>
					</div>
				</template>
			</el-table-column>
			<!-- 序号 -->
			<el-table-column
				v-if="serial"
				type="index"
				label="序号"
				align="center"
				width="65"
				fixed>
			</el-table-column>
			<!-- 正常列 -->
			<template v-for="(item, index) in thead">
				<!-- 多级表头情况 -->
				<template v-if="item.children">
					<el-table-column :key="index" :label="item.name" :align="item.align||'left'">
						<template v-for="(children, childrenIndex) in item.children">
							<!-- 自定义列 -->
							<component
								:key="index+'_'+childrenIndex"
								v-if="children.component"
								:is="children.component"
								:item="children"
								:width="children.width">
							</component>
							<!-- 常规列 -->
							<el-table-column
								:show-overflow-tooltip="true"
								:key="index+'_'+childrenIndex"
								v-if="!children.component && !children.colorClass && !children.hidden"
								:prop="children.prop"
								:label="children.name"
								:formatter="children.format"
								:width="children.width"
								:min-width="children.minWidth||100"
								:align="children.align||'left'">
							</el-table-column>
						</template>
					</el-table-column>
				</template>
				<!-- 文字变颜色 -->
				<el-table-column
					v-if="item.colorClass"
					:show-overflow-tooltip="true"
					:label="item.name"
					:key="index"
					:width="item.width || 100"
					:align="item.align||'left'">
					<template slot-scope="scope">
						<span :class="[item.colorClass[scope.row[item.colorProp || item.prop]] || item.colorClass.default] || ''">
							{{item.format ? item.format(scope.row, '',scope.row[item.prop]) : scope.row[item.prop]}}
						</span>
					</template>
				</el-table-column>
				<!-- 常规情况 -->
				<template v-else>
					<!-- 自定义列 -->
					<component
						:key="index"
						v-if="item.component"
						:is="item.component"
						:item="item"
						:formTableData="formTableData"
						:width="item.width || (index==0?130:'')">
					</component>
					<!-- 常规列 -->
					<el-table-column
						:show-overflow-tooltip="true"
						:key="index"
						v-if="!item.component && !item.colorClass && !item.hidden && !item.children"
						:prop="item.prop"
						:label="item.name"
						:formatter="item.format"
						:width="item.width || (index==0?130:'')"
						:min-width="item.minWidth||100"
						:fixed="(index == 0&&item.fixed===undefined)?(!expandKey&&!expand):item.fixed"
						:align="item.align||'left'">
					</el-table-column>
				</template>
			</template>
		</el-table>
		<!-- 权限树 slot -->
		<div class="tree-section" v-show="isShowTree">
			<slot name="templateRightTreeSection"></slot>
		</div>
		<!-- 表格页脚信息 slot -->
		<slot name="footer"></slot>
		<!-- 分页 -->
		<paginate
			v-if="pageData.callback"
			:callback="pageData.callback"
			:page="pageData.page">
		</paginate>
	</el-row>
</template>
<script>
	import paginate from '@/components/common/paginate'
	export default {
		data() {
			return {
				selectIndex: '', // 单选框下标
				showRowChecked: [], // 显示影藏
				isIndeterminate: false,
				showRowCheckedAll: true,
				initshowRowChecked: [], // 用来显示影藏弹框影藏的时候 做列表展示影藏比较的
				innerSelectType: 'checkbox' // 表格选择类型
			}
		},
		created() {
			this.showRowCheckedInit()
			if (this.selectionRadio) { // 兼容老代码单选框
				this.innerSelectType = 'radio'
			} else if (this.selection === false) { // 兼容老代码复选框
				this.innerSelectType = false
			} else { // 新代码直接传类型 false 则为不需要选择框
				this.innerSelectType = this.selectType
			}
		},
		props: {
			formTableData: { // 表单里面套表格的时候需要把这个参数传进来
				type: Object
			},
			stripe: { // 是否隔行变色
				type: Boolean,
				default: true
			},
			highLight: { // 当前行是否高亮
				type: Boolean,
				default: false
			},
			isTotal: { // 是否显示汇总
				type: Number,
				default () {
					return 0;
				}
			},
			showIcon: { // 是否显示汇总图标
				type: Boolean,
				default () {
					return false;
				}
			},
			iconUrl: { // 图标自定义地址
				type: String
			},
			color: { // 汇总颜色
				type: String,
				default () {
					return '#429fd5';
				}
			},
			textContent: { // 汇总文案
				type: String,
				default () {
					return '';
				}
			},
			tableData: { // 表单数据
				type: Array,
				default () {
					return []
				},
				required: true
			},
			/**
			 * 表单头信息包含字段
			 * @param {String} prop: 对应内容字段
			 * @param {String} name: 标题
			 * @param {String} width: 表格宽度
			 * @param {String} minWidth: 最小宽度
			 * @param {Function} format: 数据格式化
			 * @param {String} align: 文字对齐方式
			 * @param {String} colorClass: 文字颜色,用公用classname
			 * @param {String} fixed: 是否固定 可选值(left, right)
			 * @param {Boolean} hidden: 影藏
			 * @param {Object} children: 表头合并下面的子表
			 */
			thead: {
				type: Array,
				default () {
					return []
				}
			},
			defaultExpandAll: { // 是否展开所有行
				type: Boolean,
				default: false
			},
			expandKey: { // 是否展开行表格形式 传入展开行数据key 表格传这个
				type: String,
				default: ''
			},
			expand: { // 是否展开行列表形式 列表默认传这个
				type: Boolean,
				default: false
			},
			expandThead: { // 展开行展示数据 同表格thead
				type: Array
			},
			expandClass: { // 展开行样式
				type: String,
				default: ''
			},
			maxHeight: { // 表格最大高度
				type: Number,
				default: 500
			},
			totalWeight: { // 最大重量
				type: Number,
				default: 0
			},
			totalFee: { // 最大件数
				type: Number,
				default: 0
			},
			serial: { // 序号
				type: Boolean,
				default: false
			},
			selectType: { // 表格选择类型 radio 单选 checkbox 多选 false 则都不需要
				type: [String, Boolean],
				default: 'checkbox'
			},
			selection: { // 复选框 默认使用复选框 // 新代码不需要这个参数了
				type: Boolean,
				default: true
			},
			selectionRadio: { // 是否显示单选框 单选 复选 只能用一个 // 新代码不需要这个参数了
				type: Boolean,
				default: false
			}, // 单选框
			allAlign: { // 全部对齐方式 // 默认全部左对齐 暂时废弃这个属性
				type: String
			},
			optWidth: { // 操作宽度
				type: Number
			},
			title: { // 表格标题
				type: String,
				default: ''
			},
			pageData: { // 分页数据
				type: Object,
				default () {
					return {}
				}
			},
			height: { // 表格默认高度
				type: [String, Number]
			},
			checkPropoty: { // 判断复选框是否禁选的函数
				type: String,
				default: ''
			},
			tableRowClassName: { // 为 Table 中的某一行添加 class,表明该行处于某种状态
				type: Function,
				default () {
					return ''
				}
			},
			isShowRow: { // 是否展示表格列筛选功能
				default: true
			},
			isShowTableInfo: { // 是否展示表头右边表格操作相关信息
				default: true
			},
			isShowTree: {
				type: Boolean,
				default: false
			} // 显示树结构
		},
		methods: {
			handleCheckboxAble(val) { // 选择框禁用
				return this.checkPropoty ? this.checkPropoty(val)() : true
			},
			checkBox(val) { // 是否可以选择
				// 触发条件
				this.$emit('checkAble', (val || 1))
			},
			radioChange(val) { // 单选框change事件
				this.$emit('selectData', ([{
					...val.row
				}]))
				console.log(val, 456)
			},
			handleSelectionChange(val) { // 选中数据（有复选框时）
				this.$emit('selectData', val)
			},
			handleCurrentChange(val) { // 选中数据(没有复选框时)
				this.$emit('currentChange', val)
			},
			rowClick(val) { // 点击当前行的数据
				this.$emit('rowClick', val)
			},
			dblClick(val, col, ele) { // 单元格双击事件 行的双击事件用这个函数
				// return false
				// if (Array.from(ele.classList).includes('el-table-column--selection')) { // 多选框的点击事件不管
				//     return
				// }
				// Array.from(ele.parentNode.parentNode.children).forEach(v => {
				//     v.classList.remove('bgcolor-blue')
				// })
				// ele.parentNode.classList.add('bgcolor-blue')
				this.$emit('dblclickOption', val)
			},
			cellClick(val, col, ele) { // 单击事件 行单击事件用这个 el-table__expand-column
				// 假如cell里面有表单元素 比如 input textarea 直接打回 不执行行单击事件
				let isHasInput = ele.querySelectorAll('input').length + ele.querySelectorAll('textarea').length
				if (isHasInput) {
					return
				}
				if (Array.from(ele.classList).includes('cTableStopPropagation')) { // 多选框的点击事件不管
					return
				}
				// 行单击时 如果有选择框 则执行改行选择框的事件
				if (this.innerSelectType === 'checkbox') { // 复选
					this.toggleRowSelection(val)
				} else if (this.innerSelectType === 'radio') { // 单选
					if (this.tableData[this.selectIndex] !== val) { // 如果不是选中行 选中改行
						this.selectIndex = this.tableData.findIndex(item => item === val)
						this.$emit('selectData', [val])
					}
				}
				this.$emit('clickOption', val)
			},
			clearSelection() { // 用于多选表格，清空用户的选择
				this.$refs.multipleTable.clearSelection()
			},
			toggleRowSelection(row, selected) { // 用于多选表格，切换某一行的选中状态，如果使用了第二个参数，则是设置这一行选中与否
				this.$refs.multipleTable.toggleRowSelection(row, selected)
			},
			toggleAllSelection(row, selected) { // 用于多选表格，切换所有行的选中状态
				this.$refs.multipleTable.toggleAllSelection(row, selected)
			},
			toggleRowExpansion(row, selected) { // 用于可展开表格，切换某一行的展开状态，如果使用了第二个参数，则是设置这一行展开与否
				this.$refs.multipleTable.toggleRowExpansion(row, selected)
			},
			setCurrentRow(row) { // 强行设置某行数据选中
				this.$refs.multipleTable.setCurrentRow(row)
			},
			clearSort() { // 用于清空排序条件，数据会恢复成未排序的状态
				this.$refs.multipleTable.clearSort()
			},
			clearFilter() { // 用于清空过滤条件，数据会恢复成未过滤的状态
				this.$refs.multipleTable.clearFilter()
			},
			expandChange(row, expandedRows) { // 当用户对某一行展开或者关闭的时候会触发该事件
				this.$emit('expandChange', row, expandedRows)
			},
			// 表格更多功能部分
			handleShowRowCheckedChange(type) { // 显示影藏
				if (!type) { // 影藏的时候
					// this.showRowChecked 包含则显示  不包含则影藏
					this.initshowRowChecked.forEach(i => {
						let item = this.thead[i]
						let isHidden = !this.showRowChecked.includes(i)
						if (item.hidden != isHidden) {
							this.$set(this.thead, i, {
								...item,
								hidden: isHidden
							})
						}
					})
				}
			},
			showRowCheckedInit() { // 初始化筛选数据
				this.showRowChecked = []
				this.thead.forEach((item, i) => {
					if (i > 0 && !item.fixed) {
						this.showRowChecked.push(i)
					}
				})
				this.initshowRowChecked = [...this.showRowChecked]
			},
			handleCheckedChange(value) {
				let checkedCount = value.length
				this.showRowCheckedAll = checkedCount === this.initshowRowChecked.length
				this.isIndeterminate = checkedCount > 0 && checkedCount < this.initshowRowChecked.length
			},
			handleCheckAllChange(val) { // 影藏显示是否全选
				this.showRowChecked = val ? this.initshowRowChecked : []
				this.isIndeterminate = false
			},
			handleRefresh() { // 刷新表格
				if (this.pageData && this.pageData.callback) {
					this.pageData.callback(this.pageData.page.currentPage)
				}
			}
		},
		components: {
			paginate
		},
		watch: {
			tableData: {
				handler() {
					this.selectIndex = ''
					// 数据跟新过后单选框数据置空
					if (this.innerSelectType === 'radio') {
						this.$emit('selectData', [])
					}
				}
			}
		}
	}

</script>
<style lang="scss">
	@import '~assets/styles/util.scss';
	.ctable {
		.el-table thead.is-group th {
			background-color: #fff;
		}

		.el-table thead th.is-leaf {
			border-top: 0 none !important;
		}

		margin-bottom: 10px;

		.el-radio__label {
			padding-left: 0 !important;
		}
		.el-radio__input{
			z-index:200 !important;
		}

		.ctable-title {
			height: 40px;
			line-height: 40px;
			font-size: 16px;
			padding-left: 20px;
			background-color: #fff;
			color: #333333;
			font-weight: 700;
			border-bottom: 1px solid #f4f4f4;
		}

		.el-table {
			color: $mainContent;

			td,
			th {
				padding: 6px 0;
			}

			.ctable-checkbox, .ctable-radio {
				.cell {
					text-overflow: clip;
				}
			}

			thead {
				tr {
					th:first-child {
						.cell {
							padding-left: 20px;
						}
					}
				}
			}

			tbody {
				tr {
					td:first-child {
						.cell {
							padding-left: 20px;
						}
					}
				}
			}

			thead {
				th {
					// background: $tableHeaderBg;
					color: #333;

					&.is-leaf {
						border-top: 1px solid #E0E3EC;
						border-bottom: 1px solid #E0E3EC;
					}
				}
			}
		}
		.tree-section {
				border: 1px solid #ddd;
				width: 300px;
				transition: width 0.6s;
				position: absolute;
				right:0;
				top:49px;
				z-index:1000;
				&.collapse {
					width: 0;
				}
		}
		.pointer {
			td {
				cursor: pointer;
			}

			.el-table-column--selection {
				cursor: auto;
			}

			.hover-row {
				td {
					background-color: $tableHover !important;
				}
			}
		}

		.current-row {
			td {
				background-color: $tableHover !important;
			}
		}

		.total-info-height {
			height: 50px;
		}

		.total-info {
			position: relative;
			background-color: #fff;

			.ctable-head {
				display: inline-block;
			}

			.el-title-info {
				display: inline-block;
				padding-left: 30px;
				font-weight: 400;
				color: $colorRed;
				font-size: 12px;
				font-weight: 0;

				img {
					height: 16px;
				}
			}

			.el-title-info2 {
				color: $mainBlue;
			}

			.is-show-row-class {
				position: absolute;
				right: 10px;
				top: 50%;
				transform: translateY(-50%);
			}
		}

		.expand-table-class {
			th .cell {
				color: #99a9bf;
			}
		}

		.demo-table-expand {
			cursor: auto;
			padding-left: 120px;

			>div {
				display: inline-block;
				margin-right: 10px;
				margin-bottom: 0;
				height: 40px;
				line-height: 40px;
				width: 200px;
				overflow: hidden;
				white-space: nowrap;
				text-overflow: ellipsis;
			}
		}

		.el-table__expand-column {
			cursor: auto !important;

			.el-table__expand-icon {
				cursor: pointer;
			}
		}
		.el-dropdown-link {
			display: inline-block;
			width: 38px;
			height: 30px;
			border: 1px solid #ddd;
			line-height: 30px;
			text-align: center;
		}
	}

	.ctable-is-show-row-check {
		max-height: 300px;
		overflow: auto;

		label {
			display: block !important;
			margin-left: 10px !important;
			margin-right: 10px !important;
		}
	}

</style>
