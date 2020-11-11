import {
	getAllAuthButtons,
	getAirlineInfo,
	getGlobalData
} from '@/api/common/layout/layout'

/*
 *fetchFunc 接口名字
 *dataName  本地存储的数据名字
 *mustFetch 是否需要强制重新后台拉去数据
 *callback  你懂得
 *param     接口请求参数
 *filter    返回参数做处理
 */
let _func = (fetchFunc, dataName, mustFetch, callback, param, filter) => {
	return new Promise((resolve, reject) => {
		if (window.globalData[dataName] && !mustFetch) {
			let result = window.globalData[dataName]
			resolve(filter ? result[filter] : result)
		} else {
			fetchFunc(param).then(res => {
				if (callback) {
					callback(res.entity || res, resolve)
				} else {
					window.globalData[dataName] = res.entity
					resolve(window.globalData[dataName])
				}
			})
		}
	})
}

const getAllButtons = (mustFetch) => {
	let callback = (data, resolve) => {
		window.globalData.__allButtons = []
		if (data) {
			window.globalData.__allButtons = data
		}
		resolve(window.globalData.__allButtons)
	}
	return _func(getAllAuthButtons, '__allButtons', mustFetch, callback)
}

const getAirlineInfoFunc = () => { // 航司信息
	return new Promise((resolve) => {
		if (window.globalData.airlines && window.globalData.airlines.length) {
			resolve(window.globalData.airlines)
		} else {
			getAirlineInfo().then(res => {
				window.globalData.airlines = res.entity
				resolve(window.globalData.airlines)
			})
		}
	})
}
const globalData = (paramArr) => { // 基础数据
	return new Promise((resolve, reject) => {
		let arr = [
			'AGN', // '填开货运单的代理人名称'
			'ALT', // '航线类型'
			'AUS', // '审核状态'
			'BUT', // '业务类型'
			'CAS', // '货物状态'
			'CAT', // '货物类型'
			'EMT', // '员工类型'
			'FBM', // '结算注意事项'
			'FRTN', // '运价种类'
			'IHPM', // '付款方式（进港分单）'
			'IPIT', // '提货方式（进港）'
			'JS', // '计价方式'
			'MPT', // '付款方式（主单）'
			'OHT', // '付款方式（出港分单）'
			'IMPT', // '付款方式（进港主单）'
			'OPT', // '提货方式（出港）'
			'TLT', // '时效类型'
			'TRM', // '储运注意事项及其它'
			'MPT2', // '主单付款方式'
			'OCG', // '主单其他费用项'
			'TBY', // '用户建议类型'
			'FBY', // '反馈类型'
			'SOPT', // '客户操作类型'
			'AVM', // 计价方式
			'OHDC', // 支付渠道
			'WBT', // 票证类型
			'WBS', // 票证状态
			'WBOPT', // 票证操作类型
			'WBET', // 票证异常类型
			'WBRC ', // 领票公司
			'ORDT', // 订单类型
			'PHDC', // 平台货代设置(PHDC_01: 展示支付的平台公司编码)
			'OMAS', // 填开人或代理人签字、盖章
			'OWEF', // 分单页面附加费用项
			'EXCP', // 客服查单跟踪异常状态
			'TRAS ', // 客服查单跟踪跟进状态
			'VER', // 系统版本
			'RBUST', // 应收-业务类型（进、出港）
			'PBUST', // 应付-业务类型（进、出港）
			'PAYO', // 结算对象类型（航司，货站，货代）
			'PRIT', // 计价方式（重量，件数，票数）成本页面
			'CART', // 进位类型 (四舍五入)
			'ORDPS', // 支付状态 (待支付, 已支付, 支付失败等)
			'QACF', // 舱位报价 活动配置(热门，特价，热门&特价)
			'ODWBC', // --出港-是否默认电子单 (1：默认，0：不默认）
			'IDWBC', // --进港-是否默认电子单（1：默认，0：不默认）
			'IHDC', // 进港分单支付渠道
			'ICAS', // 进港货物状态
			'PSTA', // 分单支付状态
			'PBF', // 地面基础费用(各种系统定义的费用)
			'CSI', // 费用项
			'SSP', // 服务环节
			'SMP', // 结算周期
			'TKOI', // 发票类型
			'AGT', // 航班时效
			'DIG', // 小数点位数
			'INR', // 发票税率
			'OMPT', // 主单协议类型
			'ALPB', // 企业提现认证页面的银行列表
			'QTP', // 货物类型列表
			'CSC', // 其中SFSC表示出港主分单是否开通丰羿平台开票 IMHC表示进港主单录分单跳转界面 0:老页面 1新页面
			'CSN', // CCSP系统名称
			'BST', // 业务章类型
			'PTT', // 打印模板类型
			'CXWH', // 车型维护
			// 配送单页面需要
            'ZZFW', // 增值服务
            'QHD', // 签回单类型
            'DDLX', // 订单类型
            'IHWO', // 进港分单-来源类型
            'IMWO', // 进港主单-来源类型
            'IDWO', // 配送消息-来源类型
            'IMCS', // 进港消息-确认状态
            'OMSS', // 出港消息-发送状态
            'MPCSC', // 出港主单-发货人信息是否赋值
			'IHOS', // 进港交接状态
			'IMWC', // 进港主单是否自动填充收货人
			'OHWTM', // 出港分单界面 列表是否展示开主单按钮
            'OMWTH', // 出港主单界面 列表是否展示开分单按钮
            'OPMS_NOTIFY' // 运营监控 事件通知方式
		]
		getGlobalData({
			catalogInfoType: paramArr || arr
		}).then(res => {
			// window.globalData = res.entity
			res.entity.ODWBC = Object.values(res.entity.ODWBC || [])[0] === '1'
			res.entity.IDWBC = Object.values(res.entity.IDWBC || [])[0] === '1'
			if ((paramArr || arr).includes('CSC')) {
				// 只有1的时候才是老页面 其他情况全是跳转分单新页面
				res.entity.CSC.IMHC = !Number(res.entity.CSC.IMHC)
			}
			resolve({...res.entity})
		})
	})
}
export {
	getAllButtons,
	getAirlineInfoFunc,
	globalData
}
