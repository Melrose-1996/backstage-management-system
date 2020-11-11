export let timestampFormat = (timestamp, format) => {
	let result = ''
	let zeroFill = val => val < 10 ? '0' + val : val

	format = format || 'YYYY-MM-DD'

	if (!timestamp) {
		result = '-'
	} else {
		let sFormat = format
		format = format.split(' ')
		let dateFormat = format[0]
		let timeFormat = format[format.length - 1]
		let dateSymbol = dateFormat.match(/[^Y,^M,^D]/)[0]
		let timeSymbol = timeFormat.match(/[^h,^m,^s]/)[0]
		let clearance = sFormat.replace(dateFormat, '').replace(timeFormat, '')
		let datetime = new Date(timestamp)
		let year = datetime.getFullYear()
		let month = zeroFill(datetime.getMonth() + 1)
		let day = zeroFill(datetime.getDate())
		let hours = zeroFill(datetime.getHours())
		let minute = zeroFill(datetime.getMinutes())
		let second = zeroFill(datetime.getSeconds())
		if (dateFormat.match(/Y/)) {
			result += year
		}
		if (dateFormat.match(/M/)) {
			result += dateSymbol + month
		}
		if (dateFormat.match(/D/)) {
			result += dateSymbol + day
		}
		if (timeFormat.match(/h/)) {
			result += clearance + hours
		}
		if (timeFormat.match(/m/)) {
			result += timeSymbol + minute
		}
		if (timeFormat.match(/s/)) {
			result += timeSymbol + second
		}
	}

	return result.replace(/^[^\d]+/, '')
}
/**
 *  转换时间2018-04为201804
 */
export const formatDate = (val, fmt) => {
    if (val == null || val == '') {
        return val;
    } else {
		let newDate = new Date(val);
		let date = new Date(newDate.setDate(newDate.getDate()));
		let years = date.getFullYear();
		let month = (date.getMonth() + 1) > 9 ? (date.getMonth() + 1) : `0${date.getMonth() + 1}`;
		if (fmt == 'YYYY-MM-DD') {
			return `${years}${month}`;
		}
		return `${years}${month}`;
	}
};
/**
 *  转换小时分钟从0000为00:00
 */
export let hourAndMinuteFormat = (val) => {
    let hh = val.substr(0, 2);
    let mm = val.substr(2, 2);
    return `${hh}:${mm}`
}

/**
 * 价格过滤器，/100 && 保留两位小数
 */
export let priceFilter = (price = 0) => {
	if (price === '' || price === null || price === undefined) {
		return ''
	} else {
		return Number(price).toFixed(2)
	}
}

export let currency = (value = 0, prefix = '$', type) => {
	let money = (value).toFixed(2)
	if (type === 2) {
		money = money.replace(/(\d)(?=(\d{3})+\.)/g, '$1,')
	}
	return prefix + money
}

export let priceFloat = (value = 0, prefix = '$') => {
	return prefix + parseFloat((value))
}

/*
 *格式化手机号码
 */
export let codeFilter = (val) => {
	if (val) {
		let str = ''
		for (let i = 0, len = val.length; i < len; i++) {
			str += val[i]
			if ((i + 1) % 4 === 0) {
				str += ' '
			}
		}
		return str
	}
}
/*
 *展示两位小数
 */
export let twoDecimalNumber = num => { // 保留两位小数
	if (num === '' || num === null || num === undefined) {
		return ''
	} else {
		return Number(num).toFixed(2)
	}
}

/*
 * 根据7位数 返回8位数
 */
export let getFullNumber = (billType, num) => { // 保留两位小数
	if (['WBT_01', 'WBT_04'].includes(billType)) {
		return num + (num % 7).toString()
	} else {
		return num
	}
}