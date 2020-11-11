import axios from 'axios'
import config from '@/config'
import {
	querystringify
} from '@/util/base64'

axios.defaults.timeout = config.timeout // 请求超时时间
axios.defaults.withCredentials = true
const defaultAxios = (type = 'get', url, data, domId, ip) => {
	return new Promise((resolve, reject) => {
		let loading = null
		if (domId && document.querySelector(`#${domId}`)) {
			loading = window.$loading({
				target: `#${domId} .el-table__body-wrapper`
			})
		}
		type = type.toLowerCase()
		let configuration = {
			method: type,
			url: (config.baseIp || '') + config[ip || 'ip'] + url,
			headers: {
				'Cookie': 'JSESSIONID=2ed8yvwd1qob17neiiknx19ga; sino.topin.login.flag=true; Hm_lpvt_d3afdb3dff9eb4f240a28f263f91ea37=1542781216'
			}
		}

		if (type === 'get') {
			configuration.params = data
		} else if (type === 'post') {
			configuration.data = querystringify(data)
		}

		axios(configuration)
			.then((response) => {
				if (response) {
					if (loading) {
						let timer = setTimeout(v => {
							loading.close()
							clearTimeout(timer)
							timer = null
						}, 200)
					}
					// console.log(response);
					if (response.status != '200') {
						return window.$message({
							message: ' 系统开小差了，请稍后重试...',
							type: 'warning'
						})
					}
					console.log(response.data)
					let result = response.data.result
					let code = result.code
					switch (Number(code)) {
						case 5: // 登录超时
							window.$message({
								message: result.detail,
								type: 'warning'
							})
							window.$VUE.$router.push('login')
							reject(result)
							break
						case 0: // 成功
							resolve(result)
							break
						case 8: // 未授权
							window.$message({
								message: result.detail,
								type: 'warning'
							})
							window.$VUE.$router.push('home')
							reject(result)
							break
						default:
							window.$message({
								message: result.detail,
								type: 'warning'
							})
							reject(result)
							break
					}
				} else {
					reject(response)
				}
			})
			.catch((err) => {
				if (err.toString().includes('timeout of')) {
					window.$message({
						message: '网络超时,请稍后重试...',
						type: 'warning'
					})
				} else {
					window.$message({
						message: '网络错误,请稍后重试...,',
						type: 'warning'
					})
				}
				loading && loading.close()
				reject(err)
			})
	})
}
const _portalAxios = (ip) => {
	return (type, url, data, domId) => {
		defaultAxios(type, url, data, domId, ip)
	}
}
const portalAxios = _portalAxios('portalIp')
export default defaultAxios
export {
	portalAxios
}
