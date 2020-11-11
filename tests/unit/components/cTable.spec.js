import ElementUI from 'element-ui'
import cTable from '@/components/common/cTable'
import {
    mount,
    createLocalVue
} from '@vue/test-utils'
const localVue = createLocalVue()
localVue.use(ElementUI) // cTable里面有elementui的组件，需要添加进来
let thead = [{
    name: '账期',
    prop: 'accountTypeString'
}, {
    name: '账单期间',
    width: 160,
    prop: 'currentStartDate'
    // format(row, col, val) {
    //     return `${val}-${row.currentEndDate}`
    // }
}]
let tableData = [
    { accountTypeString: '5月份', currentStartDate: '1574145181229'},
    { accountTypeString: '6月份', currentStartDate: '1574145171229'},
    { accountTypeString: '7月份', currentStartDate: '1574145081229'},
    { accountTypeString: '8月份', currentStartDate: '1574115181229'}
]

// 挂载cTable
const CTable = mount(cTable, {
    propsData: {
        thead: thead,
        tableData: tableData,
        highLight: true,
        maxHeight: 200
    },
    localVue
})

// showIcon showIcon defaultExpandAll expandKey expand expandThead 
// expandClass totalWeight totalFee tableRowClassName 
// 并没有用到，其实是可以考虑删掉，减少包的大小
describe('cTable', () => {
	// 测试stripe字段
	it('是否隔行变色', () => {
		expect(CTable.contains('.el-table--striped')).toBe(true);
    })
    // 测试highLight字段
    it('当前行是否高亮，当当前行高亮时，其他行是不能高亮的', () => {
        // 找到每一行
        const tr = CTable.findAll('.el-table__body-wrapper tbody tr')
        tr.at(0).trigger('click')
        expect(tr.at(0).is('.current-row')).toBe(true)
        expect(tr.at(1).contains('.current-row')).toBe(false)

        // 当点击其它行时
        tr.at(1).trigger('click')
        expect(tr.at(1).contains('.current-row')).toBe(true)
        expect(tr.at(0).contains('.current-row')).toBe(false)
    })
    it('当前行选择高亮，当数据变动时，所有行都不应该有高亮', () => {
        const tr = CTable.find('.el-table__body-wrapper tbody tr')
        tr.trigger('click')
        let data = [
            { accountTypeString: '9月份', currentStartDate: '1574045171229'},
            { accountTypeString: '10月份', currentStartDate: '1474145081229'},
            { accountTypeString: '11月份', currentStartDate: '1564115181229'}
        ]
        CTable.setProps({
            tableData: data
        })
        expect(CTable.findAll('.el-table__body-wrapper tbody tr').contains('.current-row')).toBe(false)
    })
    it('最大高度', () => {
        expect(CTable.vm.$el.querySelector('.el-table').style.maxHeight).toEqual('200px')
    })
    it('是否有序列号', () => {
        CTable.setProps({
            serial: true
        })
        const tr = CTable.findAll('.el-table__body-wrapper tbody tr')
        expect(tr.at(0).find('.cell div').text()).toBe('1')
        expect(tr.at(2).find('.cell div').text()).toBe('3')
    })
    it('选择类型为多选checkbox', () => {
        expect(CTable.find('.el-table__body .el-checkbox__original').attributes('type')).toBe('checkbox')
    })
    it('选择类型为单选radio', () => {
        const wrapper = mount(cTable, {
            propsData: {
                thead: thead,
                tableData: tableData,
                selectType: 'radio'
            },
            localVue
        })
        expect(wrapper.find('.el-table__body .el-radio__original').attributes('type')).toBe('radio')
        wrapper.destroy()
    })
    it('没有选择类型', () => {
        const wrapper = mount(cTable, {
            propsData: {
                thead: thead,
                tableData: tableData,
                selectType: false
            },
            localVue
        })
        expect(wrapper.findAll('.el-table__body .el-checkbox__original').exists()).toBe(false)
        expect(wrapper.findAll('.el-table__body .el-radio__original').exists()).toBe(false)
        wrapper.destroy()
    })
    // isShowRow 默认为true
    it('展示表格赛选功能', () => {
        const filtersRow = CTable.find('.is-show-row-class')
        expect(CTable.find('.el-dropdown-menu.el-popper.ctable-is-show-row-check').exists()).toBe(true)
        filtersRow.trigger('click')
        expect(CTable.find('.el-dropdown-menu.el-popper.ctable-is-show-row-check').exists()).toBe(true)
    })
})
