import {
    portalAxios
} from '@/util/axios'

const getRegisterMsgCode = (params) => portalAxios('post', '/leaguer/leaUser/getRegisterMsgCode', params) // 短信验证码

const createImge = (params) => portalAxios('post', '/leaguer/leaUser/createImge', params) // 图形验证码

const register = (params) => portalAxios('post', '/leaguer/leaUser/register', params) // 注册

const quickRegister = (params) => portalAxios('post', '/leaguer/leaUser/quickRegister', params) // 快捷注册

const getRSAPublic = (params) => portalAxios('post', '/leaguer/leaUser/getRSAPublic', params) // 获取RSA加密公钥

export {
	getRegisterMsgCode,
	createImge,
	register,
	quickRegister,
	getRSAPublic
}
