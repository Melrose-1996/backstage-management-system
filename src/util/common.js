import {
	timestampFormat
} from './filters'

import {
	base64encode,
	base64decode
} from '@/util/base64'
import config from '@/config'
let add = (...arg) => {
	let tmp = (arg1, arg2) => {
		if (arg1 === null || arg1 === undefined) {
			arg1 = 0
		}
		if (arg2 === null || arg2 === undefined) {
			arg2 = 0
		}
		let r1
		let r2
		let m
		let c
		try {
			r1 = arg1.toString().split('.')[1].length
		} catch (e) {
			r1 = 0
		}
		try {
			r2 = arg2.toString().split('.')[1].length
		} catch (e) {
			r2 = 0
		}
		c = Math.abs(r1 - r2)
		m = Math.pow(10, Math.max(r1, r2))
		if (c > 0) {
			let cm = Math.pow(10, c)
			if (r1 > r2) {
				arg1 = Number(arg1.toString().replace('.', ''))
				arg2 = Number(arg2.toString().replace('.', '')) * cm
			} else {
				arg1 = Number(arg1.toString().replace('.', '')) * cm
				arg2 = Number(arg2.toString().replace('.', ''))
			}
		} else {
			arg1 = Number(arg1.toString().replace('.', ''))
			arg2 = Number(arg2.toString().replace('.', ''))
		}
		return (arg1 + arg2) / m
	}
	let total = 0
	arg.forEach(v => {
		total = tmp(total, v)
	})
	return total
}
let sub = (arg1, arg2) => {
	let r1
	let r2
	let m
	let n
	try {
		r1 = arg1.toString().split('.')[1].length
	} catch (e) {
		r1 = 0
	}
	try {
		r2 = arg2.toString().split('.')[1].length
	} catch (e) {
		r2 = 0
	}
	m = Math.pow(10, Math.max(r1, r2))
	n = r1 >= r2 ? r1 : r2
	return Number(((arg1 * m - arg2 * m) / m).toFixed(n))
}
let mul = (arg1, arg2) => {
	let m = 0
	let s1 = arg1.toString()
	let s2 = arg2.toString()
	try {
		m += s1.split('.')[1].length
	} catch (e) {}
	try {
		m += s2.split('.')[1].length
	} catch (e) {}
	return Number(s1.replace('.', '')) * Number(s2.replace('.', '')) / Math.pow(10, m)
}
let div = (arg1, arg2) => {
	let t1 = 0
	let t2 = 0
	let r1
	let r2
	try {
		t1 = arg1.toString().split('.')[1].length
	} catch (e) {}
	try {
		t2 = arg2.toString().split('.')[1].length
	} catch (e) {}
	r1 = Number(arg1.toString().replace('.', ''))
	r2 = Number(arg2.toString().replace('.', ''))
	return r1 / r2 * Math.pow(10, t2 - t1)
}
let numberRule = (num) => /^\d+(\.\d{1,2})?$/.test(num) // 两位小数验证
let integerRule = (num) => /^\d+$/.test(num) // 正整数验证
let mobilephoneRule = (phone) => /^1(3|4|5|6|7|8)\d{9}$/.test(phone) // 移动电话校验
let fixedphoneRule = (phone) => /^([0-9]{3,4}-)?[0-9]{7,8}$/.test(phone) // 固定电话校验
let numberLettersRule = (str) => /^[0-9a-zA-Z]+$/.test(str) // 只能数字和字母
let emailRule = (email) => /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/.test(email) // 邮箱正则
let zipRule = (zip) => /^[0-9]{6}$/.test(zip) // 邮箱正则
let allNumber = (number) => /^\d+$/.test(number) // 纯数字
let lengthTest = (value) => /^[a-zA-Z0-9_\u4e00-\u9fa5]{5,20}$/.test(value) // 长度校验
let userNameRule = (name) => /^[a-zA-Z0-9_\u4e00-\u9fa5]+$/.test(name) // 中文字母数字下划线
let taxpayerRule = (str) => /^[A-Za-z0-9]{15,20}$/.test(str) // 只能数子和字母 15 -20位
let sapIdRule = (str) => /^[A-Za-z0-9]{2,16}$/.test(str) // 只能数子和字母 2 -16位
let mawbNoTest = (value) => { // 主单号校验
	if (value !== '' && value !== null) {
		let list = value.substr(0, 7)
		let last = value.substr(7, 1)
		if (last == list % 7) {
			return true
		} else {
			return false
		}
	} else {
		return false
	}
}
let isEbill = str => ['E', 'e'].includes(str.substr(0, 1)) // 是否电子单
let getAllRegionCode = (code) => { // 省市区通过一个code获取三个code
	if (code) {
		return [code.slice(0, 2) + '0000', code.slice(0, 4) + '00', code]
	} else {
		return []
	}
}
let setAllRegionCode = (arr) => { // 省市区把三个code获取一个code
	if (arr.length === 2) {
		return arr[1]
	} else if (arr.length === 1) {
		return arr[0]
	} else {
		return arr[2]
	}
}
let getWeekAgoTime = (time, day = 6) => { // 获取day天前的时间 默认一周
	return new Date(new Date(time || new Date()).getTime() - day * 24 * 3600 * 1000)
}
let getLaterTime = (time, day = 30) => { // 获取day天以后的时间
	return new Date(new Date(time || new Date()).getTime() + day * 24 * 3600 * 1000)
}
let moreThan31Day = (time1, time2, day = 31) => { // 是否超过day天
	if (!time1 || !time2) {
		return '起始日期不得晚于结束日期，且日期跨度必须在' + day + '天以内'
	}
	let tm1 = new Date(timestampFormat(time1)).getTime()
	let tm2 = new Date(timestampFormat(time2)).getTime()
	let tm = tm2 - tm1
	if (tm2 < tm1) {
		return '起始日期不得晚于结束日期，且日期跨度必须在' + day + '天以内'
	} else {
		return tm > day * 24 * 3600 * 1000 ? '起始日期不得晚于结束日期，且日期跨度必须在' + day + '天以内' : ''
	}
}
let twoDecimalNumber = num => { // 保留两位小数
	if (num === '' || num === null || num === undefined) {
		return ''
	} else {
		return Number(num).toFixed(2)
	}
}
let goPrint = (that, type, data) => { // that 传入当前页面的this用来做路由跳转 type 打印的不同模板 data 实时打印的数据
	let printData = {
		type: type,
		data: data
	}
	localStorage.setItem('printData', JSON.stringify(printData))
	let routeData = that.$router.resolve({
		name: 'printPage'
		// query: params,
		// params:{catId:params.catId}
	});
	// window.open(routeData.href, '_blank');
	if (routeData && routeData != '') {
		window.open(routeData.href, '', 'alwaysRaised=yes, toolbar=no, location=no, resizable=no, height=900, width=900, scrollbars=yes, left=380')
	} else {
		window.$message.error('打印机连接失败，请重试')
	}
}
// 获取cookie值
let getCookie = (objname) => {
	let arrstr = decodeURIComponent(document.cookie).split('; ')
	let returnValue = ''
	for (let v of arrstr) {
		let key = v.split('=')[0]
		let value = v.split('=')[1]
		if (key === objname) {
			returnValue = value
			break
		}
	}
	return returnValue
}
let setCookie = (name, value, days, urls) => {
	let d = new Date()
	d.setTime(d.getTime() + 24 * 60 * 60 * 1000 * days)
	document.cookie = `${name}=${value}; expires=${d.toGMTString()}; path=${urls}`
}
let noIsRight = (billType, no) => { // 票证查询条件是否合理
	if (['WBT_01', 'WBT_04'].includes(billType)) {
		return mawbNoTest(no)
	} else {
		return no.length < 8
	}
}
let _message = (text, type = 'warning') => {
	window.$message({
		message: text,
		type
	})
}
let isOnlyOne = (arr, isMore = false) => { // 多选框进行操作时进行数据条数判断  arr选中的数据 isMore true: 多选 false: 单选
	let length = arr.length
	let flag = false
	if (!length) {
		_message(`请选择${isMore ? '至少' : ''}一条数据`)
	} else if (length > 1 && !isMore) {
		_message('一次只能操作一条数据')
	} else {
		flag = true
	}
	return flag
}
let formValidFail = () => {
	_message('保存失败,请检查数据后再次提交')
}
let getDomInputValue = eleName => { // 获取input Value
	let ele = document.querySelector(eleName).querySelector('input')
	return ele ? ele.value : ''
}
let debounce = (fun, delay) => { // 节流函数
	return (args) => {
		let that = this
		let _args = args
		clearTimeout(fun.id)
		fun.id = setTimeout(() => {
			fun.call(that, _args)
		}, delay)
	}
}
let getObjectFirstAttribute = (obj) => { // 获取对象中第一个属性
	for (const key in obj) {
		return obj[key]
	}
}
let getObjectFirstAttributeKey = (obj) => { // 获取对象中第一个KEY
	for (const key in obj) {
		return key
	}
}

let session = (key, value) => { // 存储在sessionStorage
	if (value) {
		sessionStorage.setItem(key, JSON.stringify(value))
	} else {
		return JSON.parse(sessionStorage.getItem(key))
	}
}
let getPosition = (ele) => { // 获取元素的位置
	let allHeight = document.body.scrollHeight
	let scrollx = document.documentElement.scrollLeft || document.body.scrollLeft
	let scrollt = document.documentElement.scrollTop || document.body.scrollTop
	let pos = ele.getBoundingClientRect()
	return {
		top: pos.top + scrollt,
		right: pos.right + scrollx,
		bottom: pos.bottom + scrollt,
		left: pos.left + scrollx,
		scrollBottom: allHeight - scrollx - pos.top,
		height: pos.height
	}
	// return {top: pos.top, right: pos.right, bottom: pos.bottom, left: pos.left}
}
const headerRequired = (createElement, {
	column,
	$index
}) => { // 表头自定义,必填
	return createElement('span', [
		createElement('span', {
			domProps: {
				innerHTML: '*'
			},
			style: {
				color: 'red'
			}
		}),
		createElement('span', column.label)
	])
}
const fetchFileStreams = (obj) => { // 解析后台返回的文件流下载excel
	let _downFile = (blob, fileName) => { // 文件流下载
		if (window.navigator.msSaveOrOpenBlob) {
			navigator.msSaveBlob(blob, fileName)
		} else {
			let link = document.createElement('a')
			link.href = window.URL.createObjectURL(blob)
			link.download = fileName
			link.click()
			window.URL.revokeObjectURL(link.href)
		}
	}
	obj.type = obj.type || 'post'
	let fetchData = obj.data || new FormData()
	if (obj.param) { // 如果有其他参数
		fetchData.append('param', base64encode(JSON.stringify({
			entity: obj.param
		})))
	}
	let xhr = null
	if (window.XMLHttpRequest) {
		xhr = new XMLHttpRequest()
	} else if (window.ActiveXObject) {
		xhr = new window.ActiveXObject('Microsoft.XMLHTTP')
	} else {
		xhr = null
	}
	if (xhr) {
		xhr.open(obj.type, config.portalIp + obj.url)
		xhr.setRequestHeader('Authorization', `Bearer${localStorage.getItem('jwt')}`); // 定义请求头带给后端
		xhr.responseType = 'blob'
		xhr.onload = function () {
			if (this.status === 200) {
				let data = this.response
				if (data.type == 'application/json' || data.type == 'application/json;charset=UTF-8') { // 正常返回
					let fr = new FileReader()
					fr.readAsText(data)
					fr.addEventListener('loadend', function () {
						let decodeData = JSON.parse(base64decode(JSON.parse(fr.result).result))
						if (Number(decodeData.code)) {
							obj.error(decodeData)
						} else {
							obj.sucess(decodeData)
						}
					})
				} else { // 文件流返回
					let blob = new Blob([data], {
						type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
					})
					let fileName = 'error.xls'
					_downFile(blob, fileName)
					obj.error({
						detail: '有部分错误数据,请修改错误数据后再上传'
					}, true)
				}
			} else {
				obj.error({
					detail: '服务器错误，请稍后再试'
                }, true)
			}
		}
		xhr.send(fetchData)
	}
}

const productionEnv = () => location.href.includes('hd.fengyee.com') // 是否是生产环境

/**
 * 将具有父子关系的原始数据格式化成树形结构
 */
const toTreeData = (rawdata) => {
	let _obj = JSON.stringify(rawdata)
	let data = JSON.parse(_obj);
	let pos = {};
	let tree = [];
	let i = 0;
	while (data.length != 0) {
		if (data[i].parentId == 0) {
			tree.push({
				id: data[i].id,
				label: data[i].name,
				parentId: data[i].parentId,
				resourceType: data[i].resourceType, // 1 应用 2分类 3 菜单 4 按钮
				icon: data[i].resourceType == 1 ? 'iconfont icon-yingyong' : data[i].resourceType == 2 ? 'iconfont icon-jiaose' : data[i].resourceType == 3 ? 'iconfont icon-fenji' : data[i].resourceType == 4 ? 'iconfont icon-yemian' : '',
				children: []
			});
			pos[data[i].id] = [tree.length - 1];
			data.splice(i, 1);
			i--;
		} else {
			let posArr = pos[data[i].parentId];
			if (posArr != undefined) {

				let obj = tree[posArr[0]];
				for (let j = 1; j < posArr.length; j++) {
					obj = obj.children[posArr[j]];
				}

				obj.children.push({
					id: data[i].id,
					label: data[i].name,
					parentId: data[i].parentId,
					resourceType: data[i].resourceType,
					icon: data[i].resourceType == 1 ? 'iconfont icon-yingyong' : data[i].resourceType == 2 ? 'iconfont icon-jiaose' : data[i].resourceType == 3 ? 'iconfont icon-fenji' : data[i].resourceType == 4 ? 'iconfont icon-yemian' : '',
					children: []
				});
				pos[data[i].id] = posArr.concat([obj.children.length - 1]);
				data.splice(i, 1);
				i--;
			}
		}
		i++;
		if (i > data.length - 1) {
			i = 0;
		}
	}
	return tree;
}
/**
 * zzh将具有父子关系的原始数据格式化成树形结构
 */
const toTreeData2 = (data, checkStrictly, isShowAll = true) => {
	let trueNode = []
	let dataArray = []
	let param = {}
	let allId = []
	let allMin
	data.forEach((data) => {
		allId.push(data.parentId)
	})
	allMin = Math.min(...allId)
	data.forEach((data) => {
		let parentId = data.parentId
		if (parentId == allMin) {
			let objTemp = {
				id: data.id,
				name: data.name,
				order: data.level,
				parentId: parentId,
				check: data.check,
				disabled: data.edit == 2
			}
			if (isShowAll) {
				dataArray.push(objTemp)
			} else {
				if (data.check == 1) {
					dataArray.push(objTemp)
				}
			}
		}
	})
	data2treeDG(data, dataArray, checkStrictly, isShowAll)

	function data2treeDG(datas, dataArray) { // 重组权限树子节点结构
		for (let j = 0; j < dataArray.length; j++) {
			let dataArrayIndex = dataArray[j]
			let childrenArray = []
			let Id = dataArrayIndex.id
			for (let i = 0; i < datas.length; i++) {
				let data = datas[i]
				let parentId = data.parentId
				if (parentId == Id) { // 判断是否为儿子节点
					let objTemp = {
						id: data.id,
						name: data.name,
						order: data.level,
						parentId: parentId,
						check: data.check,
						disabled: data.edit == 2
					}
					if (isShowAll) {
						childrenArray.push(objTemp)
					} else {
						if (data.check == 1) {
							childrenArray.push(objTemp)
						}
					}
				}
			}
			dataArrayIndex.children = childrenArray
			if (childrenArray.length > 0) { // 有儿子节点则递归
				data2treeDG(datas, childrenArray, checkStrictly, isShowAll)
			}
			if (checkStrictly) {
				if (dataArrayIndex.check == 1) { // 没儿子节点且选中时打勾
					trueNode.push(dataArrayIndex.id)
				}
			} else {
				if (dataArrayIndex.children.length == 0 && dataArrayIndex.check == 1) { // 有儿子节点且选中时打勾
					trueNode.push(dataArrayIndex.id)
				}
			}
		}
		param = {
			data: dataArray,
			trueNode: trueNode
		}
	}
	return param
}

// 格式化时间
const formatDate = (val, fmt) => {
	if (val == null) {
		return null;
	}
	let date = new Date(val);
	let years = date.getFullYear();
	let month = (date.getMonth() + 1) > 9 ? (date.getMonth() + 1) : `0${date.getMonth() + 1}`;
	let day = date.getDate() > 9 ? (date.getDate()) : `0${date.getDate()}`;
	let hours = date.getHours() > 9 ? (date.getHours()) : `0${date.getHours()}`;
	let mins = date.getMinutes() > 9 ? (date.getMinutes()) : `0${date.getMinutes()}`;
	let seconds = date.getSeconds() > 9 ? (date.getSeconds()) : `0${date.getSeconds()}`;
	if (fmt == 'YYYY-MM-DD') {
		return `${years}-${month}-${day}`;
	}
	if (fmt == 'MM-DD') {
		return `${month}月${day}日`;
	}
	return `${years}-${month}-${day} ${hours}:${mins}:${seconds}`;
};
const numberToBoolean = (val) => {
	if (val == 1) {
		return true;
	}
	return false;
}
const booleanToNumber = (val) => {
	if (val == true) {
		return 1;
	}
	return false;
}
// 数组对象去重
const uniqueElementsBy = (arr, fn) =>
	arr.reduce((acc, v) => {
		if (!acc.some(x => fn(v, x))) acc.push(v);
		return acc;
	}, []);
// 获取偏移日期（月份偏移）
let getOffsetMonth = (offset) => {
	let newDate = new Date();
	let date = new Date(newDate.setMonth(newDate.getMonth() - offset));
	let years = date.getFullYear();
	let month = (date.getMonth() + 1) > 9 ? (date.getMonth() + 1) : `0${date.getMonth() + 1}`;
	let day = date.getDate() > 9 ? (date.getDate()) : `0${date.getDate()}`;
	return `${years}-${month}-${day}`;
}
// 获取偏移日期（日偏移）
let getOffsetDate = (offset) => {
	let newDate = new Date();
	let date = new Date(newDate.setDate(newDate.getDate() - offset));
	let years = date.getFullYear();
	let month = (date.getMonth() + 1) > 9 ? (date.getMonth() + 1) : `0${date.getMonth() + 1}`;
	let day = date.getDate() > 9 ? (date.getDate()) : `0${date.getDate()}`;
	return `${years}-${month}-${day}`;
}
let deepClone = data => JSON.parse(JSON.stringify(data)) // 深复制
let dataFilter = (data, getKey, setKey, hot) => {
	let tabObj = ['ABCD', 'EFGH', 'JKLM', 'NOPQRS', 'TUVWX', 'YZ']
	let pinYinObj = {
		热门: hot,
		ABCD: {},
		EFGH: {},
		JKLM: {},
		NOPQRS: {},
		TUVWX: {},
		YZ: {}
	}
	Object.keys(data).forEach((v, i) => {
		let item = data[v]
		let firstWord = item[getKey].substr(0, 1) // 拿出首字母
		let key = tabObj.find(vv => vv.includes(firstWord)) // 首字母在哪一个tab中
		if (!pinYinObj[key][firstWord]) {
			pinYinObj[key][firstWord] = {}
		}
		pinYinObj[key][firstWord][v] = item[setKey]
	})
	return pinYinObj
}
let transformNumber = (money) => {
	let cnNums = ['零', '壹', '贰', '叁', '肆', '伍', '陆', '柒', '捌', '玖'];
	// 基本单位
	let cnIntRadice = ['', '拾', '佰', '仟'];
	// 对应整数部分扩展单位
	let cnIntUnits = ['', '万', '亿', '兆'];
	// 对应小数部分单位
	let cnDecUnits = ['角', '分', '毫', '厘'];
	// 整数金额时后面跟的字符
	let cnInteger = '整';
	// 整型完以后的单位
	let cnIntLast = '元';
	// 最大处理的数字
	let maxNum = 999999999999999.9999;
	// 金额整数部分
	let integerNum;
	// 金额小数部分
	let decimalNum;
	// 输出的中文金额字符串
	let chineseStr = '';
	// 分离金额后用的数组，预定义
	let parts;
	if (money == '') {
		return '';
	}
	money = parseFloat(money);
	if (money >= maxNum) {
		// 超出最大处理数字
		return '';
	}
	if (money == 0) {
		chineseStr = cnNums[0] + cnIntLast + cnInteger;
		return chineseStr;
	}
	// 转换为字符串
	money = money.toString();
	if (money.indexOf('.') == -1) {
		integerNum = money;
		decimalNum = '';
	} else {
		parts = money.split('.');
		integerNum = parts[0];
		decimalNum = parts[1].substr(0, 4);
	}
	// 获取整型部分转换
	if (parseInt(integerNum, 10) > 0) {
		let zeroCount = 0;
		let IntLen = integerNum.length;
		for (let i = 0; i < IntLen; i++) {
			let n = integerNum.substr(i, 1);
			let p = IntLen - i - 1;
			let q = p / 4;
			let m = p % 4;
			if (n == '0') {
				zeroCount++;
			} else {
				if (zeroCount > 0) {
					chineseStr += cnNums[0];
				}
				// 归零
				zeroCount = 0;
				chineseStr += cnNums[parseInt(n)] + cnIntRadice[m];
			}
			if (m == 0 && zeroCount < 4) {
				chineseStr += cnIntUnits[q];
			}
		}
		chineseStr += cnIntLast;
	}
	// 小数部分
	if (decimalNum != '') {
		let decLen = decimalNum.length;
		for (let i = 0; i < decLen; i++) {
			let n = decimalNum.substr(i, 1);
			if (n != '0') {
				chineseStr += cnNums[Number(n)] + cnDecUnits[i];
			}
		}
	}
	if (chineseStr == '') {
		chineseStr += cnNums[0] + cnIntLast + cnInteger;
	} else if (decimalNum == '') {
		chineseStr += cnInteger;
	}
	return chineseStr;
}
// 字符串模板自定义组件
let getComponentStr = (str, options = {}) => {
	let htmlStr = `<el-table-column :label="item.name" :min-width='item.minWidth' :align="item.align" :width="item.width" ${options.fixed ? `fixed="${options.fixed}"` : ''}>`
	return {
		props: ['item', 'formTableData'],
		template: `
			${htmlStr}
				<template slot-scope="scope">
					${str}
				</template>
			</el-table-column>
		`
	}
}

// 校验IP是否符合规则
let isValidIP = (ip) => {
    let isErrorIp = false;
    if (ip !== '' && ip !== null) {
		let ipReg = /^(\d|[1-9]\d|1\d{2}|2[0-4]\d|25[0-5]|x|X)\.(\d|[1-9]\d|1\d{2}|2[0-4]\d|25[0-5]|x|X)\.(\d|[1-9]\d|1\d{2}|2[0-4]\d|25[0-5]|x|X)\.(\d|[1-9]\d|1\d{2}|2[0-4]\d|25[0-5]|x|X)$/;
		ip = ip.toLowerCase();
		let ips = ip.split(',');
		if (ips !== null && ips.length > 0) {
			for (let i = 0; i < ips.length; i++) {
				if (ips[i] !== null && ips[i] !== '') {
					if (!ipReg.test(ips[i])) {
						isErrorIp = true;
						break;
					}
				} else {
					isErrorIp = true;
					break;
				}
			}
		}
    }
    return isErrorIp
}
// 宠宝模块获取图片完整路径
let getPetImgUrl = fileName => `${config.agentPetImgHost}?param=${base64encode(JSON.stringify({entity: {fileName}}))}`
// 日期格式化 一次性格式化多个
let formatDateMultiple = (obj, keyArr, format) => keyArr.reduce((defaultValue, key) => {
	defaultValue[key] = timestampFormat(obj[key], format)
	return defaultValue
}, {})
let getYearAfter = (year = 1, time) => { // 获取year年后日期
	let timeCalc = new Date(time || new Date());
	timeCalc.setFullYear(timeCalc.getFullYear() + year);
	return timeCalc;
}
export default {
	add, // 加
	sub, // 减
	mul, // 乘
	div, // 除
	numberRule, // 两位小数验证
	integerRule, // 正整数验证
	mobilephoneRule, // 移动电话号码验证
	fixedphoneRule, // 固定电话号码验证
	numberLettersRule, // 只能数字和字母验证
	zipRule, // 邮编验证
	getAllRegionCode,
	setAllRegionCode,
	emailRule,
	getWeekAgoTime,
	moreThan31Day,
	twoDecimalNumber,
	goPrint,
	getCookie,
	setCookie,
	mawbNoTest,
	getLaterTime,
	noIsRight,
	isOnlyOne,
	getDomInputValue,
	isEbill,
	debounce,
	getObjectFirstAttribute,
	session,
	getPosition,
	getObjectFirstAttributeKey,
	headerRequired,
	fetchFileStreams,
	formValidFail,
	toTreeData,
	formatDate,
	numberToBoolean,
	toTreeData2,
	allNumber,
	userNameRule,
	lengthTest,
	uniqueElementsBy,
	getOffsetMonth,
	deepClone,
	dataFilter,
	getOffsetDate,
	productionEnv,
	transformNumber,
	booleanToNumber,
	getComponentStr,
    taxpayerRule,
    isValidIP,
	getPetImgUrl,
	formatDateMultiple,
	timestampFormat,
	getYearAfter,
	sapIdRule
}
