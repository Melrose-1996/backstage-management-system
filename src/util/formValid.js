import common from '@/util/common';
let baseRule = {
	required: true,
	message: '必填',
	trigger: 'blur'
}; // 基本必填验证
let baseChangeRule = {
	required: true,
	message: '必填',
	trigger: 'change'
}; // 下拉框基本必填验证
let provinceRule = {
	required: true,
	message: '必须选择到市',
	trigger: 'change'
}; // 省市区必须选择到市校验
let priceRule = (rule, value, callback) => {
	// 数字验证 最多两位小数
	if (value !== '' && value !== null) {
		let flag = common.numberRule(value);
		if (flag) {
			callback();
		} else {
			callback(new Error('请输入最多两位小数的数字'));
		}
	} else {
		callback();
	}
};
let phoneRule = (rule, value, callback) => {
	// 电话号码验证 移动电话 固定电话都可以
	if (value !== '' && value !== null) {
		if (common.mobilephoneRule(value) || common.fixedphoneRule(value)) {
			callback();
		} else {
			callback(new Error('电话格式不正确'));
		}
	} else {
		callback();
	}
};
let mobilephoneRule = (rule, value, callback) => {
	// 移动电话
	if (value !== '' && value !== null) {
		if (common.mobilephoneRule(value)) {
			callback();
		} else {
			callback(new Error('-手机格式不正确'));
		}
	} else {
		callback();
	}
};
let numberLettersRule = (rule, value, callback) => {
	// 只能输入数字跟字母
	if (value !== '' && value !== null) {
		if (common.numberLettersRule(value)) {
			callback();
		} else {
			callback(new Error('只能输入数字和字母'));
		}
	} else {
		callback();
	}
};
// emailRule
let emailRule = (rule, value, callback) => {
	// 邮箱验证
	if (value !== '' && value !== null) {
		if (common.emailRule(value)) {
			callback();
		} else {
			callback(new Error('请输入正确的邮箱'));
		}
	} else {
		callback();
	}
};

let flightNoRule = (rule, value, callback) => {
	// 航班号校验
	if (value !== '' && value !== null) {
		// if (value.length < 5 || value.length > 7) {
		//     callback(new Error('航班号在5-7位之间'))
		// } else {
		if (common.numberLettersRule(value)) {
			callback();
		} else {
			callback(new Error('只能输入数字或字母'));
		}
		// }
	} else {
		callback();
	}
};
let integerRule = (rule, value, callback) => {
	// 正整数验证
	// value = toString(value)
	if (value !== '' && value !== null) {
		if (/^\d+$/.test(value)) {
			callback();
		} else {
			callback(new Error('必须整数'));
		}
	} else {
		callback();
	}
};
let IDRule = (rule, value, callback) => {
	// 身份证验证
	// value = toString(value)
	if (value !== '' && value !== null) {
		if (
			/(^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)|(^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{2}[0-9Xx]$)/.test(
				value
			)
		) {
			callback();
		} else {
			callback(new Error('身份证号码格式不正确'));
		}
	} else {
		callback();
	}
};
let noZeroRule = (rule, value, callback) => {
	// 非0校验
	if (value !== '' && value !== null) {
		if (value == 0) {
			callback(new Error('不可为0'));
		} else {
			callback();
		}
	} else {
		callback();
	}
};
let maxSixNumber = (rule, value, callback) => {
	// 最多99 99999.99 整数部分最多6位
	if (value !== '' && value !== null) {
		if (Number(value) >= 1000000) {
			callback(new Error('请输入小于1000000的数字'));
		} else {
			callback();
		}
	} else {
		callback();
	}
};
let maxEightNumber = (rule, value, callback) => {
	// 最多9999 9999.99 整数部分最多8位
	if (value !== '' && value !== null) {
		if (Number(value) >= 100000000) {
			callback(new Error('请输入小于100000000的数字'));
		} else {
			callback();
		}
	} else {
		callback();
	}
};
let maxFiveNumber = (rule, value, callback) => {
	// 最多9 9999.99 整数部分最多8位
	if (value !== '' && value !== null) {
		if (Number(value) >= 100000) {
			callback(new Error('请输入小于100000的数字'));
		} else {
			callback();
		}
	} else {
		callback();
	}
};
// zipRule
let zipRule = (rule, value, callback) => {
	// 邮编验证
	if (value !== '' && value !== null) {
		if (common.zipRule(value)) {
			callback();
		} else {
			callback(new Error('请输入正确的邮编'));
		}
	} else {
		callback();
	}
};
let letterRule = (rule, value, callback) => {
	if (value !== '' && value !== null) {
		if (/^[a-zA-Z]+$/.test(value)) {
			callback();
		} else {
			callback(new Error('请输入大写字母'));
		}
	} else {
		callback();
	}
};

// 邮箱和手机任取其一
let emailOrMobileRule = (rule, value, callback) => {
	// 邮编验证
	if (value !== '' && value !== null) {
		if (common.mobilephoneRule(value)) {
			callback();
		} else if (common.emailRule(value)) {
			callback();
		} else {
			callback(new Error('请输入正确的手机号码或邮箱'));
		}
	} else {
		callback(new Error('请输入手机号码或邮箱'));
	}
};

let mawbNoTest = (rule, value, callback) => {
	// 主单号后8位验证
	if (value !== '' && value !== null) {
		let list = value.substr(0, 7);
		let last = value.substr(7, 1);
		if (value.length !== 8) {
			callback(new Error('运单号必须8位'));
		} else if (last == list % 7) {
			callback();
		} else {
			callback(new Error('运单号错误'));
		}
	} else {
		callback();
	}
};
let mawbNoPrefixRule = (rule, value, callback) => {
	// 主单号前三位是否合法
	if (value !== '' && value !== null) {
		if (value.toUpperCase() === 'YYY') {
			callback();
		}
		if (/^\d+$/.test(value)) {
			callback();
		} else {
			callback(new Error('非邮单必须整数'));
		}
	} else {
		callback();
	}
};
let hawNoNotEbill = (rule, value, callback) => {
	// 普通分单不能以e或者E开头
	if (value !== '' && value !== null) {
		if (common.isEbill(value)) {
			callback(new Error('不能以字符E或者e开头'));
		} else {
			callback();
		}
	} else {
		callback();
	}
};
// 用户名非纯数字验证
let allMunber = (rule, value, callback) => {
	if (value !== '' && value !== null) {
		if (common.allNumber(value)) {
			callback(new Error('不能是纯数字'));
		} else {
			callback();
		}
	} else {
		callback();
	}
};

let lengthTest = (rule, value, callback) => {
	if (value !== '' && value !== null) {
		if (common.lengthTest(value)) {
			callback();
		} else {
			callback(new Error('长度5到20位'));
		}
	} else {
		callback();
	}
};
// 中文字母数字下划线组合
let userNameRule = (rule, value, callback) => {
	if (value !== '' && value !== null) {
		if (common.userNameRule(value)) {
			callback();
		} else {
			// callback()
			callback(new Error('只能是中文字母数字下划线'));
		}
	} else {
		callback();
	}
};
let taxpayerRule = (rule, value, callback) => {
	// 纳税人识别号
	if (value !== '' && value !== null) {
		if (common.taxpayerRule(value)) {
			callback();
		} else {
			callback(new Error('只能包含数字，字母 且15-20位'));
		}
	} else {
		callback();
	}
};

// 接口平台 ip 规则校验
let ipRule = (rule, value, callback) => {
	if (value !== '' && value !== null) {
		if (common.isValidIP(value)) {
			callback(
				new Error(
					'IP白名单格式错误,正确的IP格式如,192.168.1.1,10.0.126.x'
				)
			);
		} else {
			callback();
		}
	}
};
const sapIdRule = (rule, value, callback) => {
	if (value !== '' && value !== null) {
		if (common.sapIdRule(value)) {
			callback();
		} else {
			callback(new Error('只能包含数字，字母 且2-16位'));
		}
	} else {
		callback();
	}
};
export {
	baseRule,
	baseChangeRule,
	priceRule,
	phoneRule,
	mobilephoneRule,
	integerRule,
	IDRule,
	numberLettersRule,
	flightNoRule,
	noZeroRule,
	maxSixNumber,
	maxEightNumber,
	maxFiveNumber,
	emailRule,
	zipRule,
	provinceRule,
	letterRule,
	emailOrMobileRule,
	mawbNoTest,
	mawbNoPrefixRule,
	hawNoNotEbill,
	allMunber,
	userNameRule,
	lengthTest,
	taxpayerRule,
	ipRule,
	sapIdRule
};
