import {
	portalAxios
} from '@/util/axios'
// 个人登录相关接口
const getImage = (params) => portalAxios('post', '/leaguer/leaUser/createImge', params) // 获取图片验证码

const getUserSalt = (params) => portalAxios('post', '/leaguer/leaUser/getUserSalt', params) // 获取登录人的salt

const queryOldEncryption = (params) => portalAxios('post', '/leaguer/leaUser/isOldEncryption', params) // 查询是否取用旧加密方法(0:md5,1:RSA)

const getRSAPublic = (params) => portalAxios('post', '/leaguer/leaUser/getRSAPublic', params) // 获取RSA加密公钥

const platformLogin = (params) => portalAxios('post', '/leaguer/leaEmployee/platformLogin', params) // 会员密码登录

const getLoginMsgCode = (params) => portalAxios('post', '/leaguer/leaUser/getLoginMsgCode', params) // 手机/邮箱登录短信发送

const platformQuickLogin = (params) => portalAxios('post', '/leaguer/leaEmployee/platformQuickLogin', params) // 手机/邮箱登录

const loginOut = (params) => portalAxios('post', '/leaguer/leaUser/loginOut', params) // 退出登录

const isLogin = (params) => portalAxios('post', '/leaguer/leaUser/isLogin', params) // 查询用户是否登录及用户信息

export {
	getImage,
	getUserSalt,
	queryOldEncryption,
	getRSAPublic,
	platformLogin,
	getLoginMsgCode,
	platformQuickLogin,
    loginOut,
    isLogin
}
