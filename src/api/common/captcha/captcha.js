import axios from '@/util/axios'
// 获取验证码
const getImage = (params) => axios('post', '/authority/user/getValidImage', params)

export {
	getImage
}
