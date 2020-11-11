import {
	portalAxios
} from '@/util/axios'
// 发送短信
const sendUserAccountMsg = (params) => portalAxios('post', '/leaguer/leaUser/sendUserAccountMsg', params)

export {
	sendUserAccountMsg
}