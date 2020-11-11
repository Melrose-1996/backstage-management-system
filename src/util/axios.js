import axios from 'axios'
import config from '@/config'
import {
	base64encode,
	base64decode,
	querystringify
} from '@/util/base64'
let isDecode = config.isDecode
axios.defaults.withCredentials = true
const defaultAxios = (type = 'get', url, data, domId, ip, options = {}) => {
	axios.defaults.timeout = config.downloadTimeout // 请求超时时间
	return new Promise((resolve, reject) => {
        let loading = null
        let loadingArr = [] // 当同一个接口有不同table里面的数据时，现在只有/financial_management/pay_settle_monitor页面 有这个问题
        if (domId) {
            if (domId instanceof Array) {
                for (let dom of domId) {
                    if (document.querySelector(`#${dom}`)) {
                        let load = window.$loading({
                            target: `#${dom} .el-table__body-wrapper`
                        })
                        loadingArr.push(load)
                    }
                }
            } else {
                if (document.querySelector(`#${domId}`)) {
                    loading = window.$loading({
                        target: `#${domId} .el-table__body-wrapper`
                    })
                }
            }
        }
		type = type.toLowerCase()
		let configuration = {
			method: type,
			url: (config.baseIp || '') + config[ip || 'ip'] + url
			// headers: {'Authorization': `${localStorage.getItem('Authorization')}`}
		}
		// if (localStorage.getItem('Authorization')) {
		// 	config.headers = {'Authorization': `${localStorage.getItem('Authorization')}`};
		// }

		// headers只有在跟注册 登录相关的接口并且'jwt'保存有值才有
		if (localStorage.getItem('jwt')) {
			configuration.headers = {
				Authorization: `Bearer${localStorage.getItem('jwt')}`
			}
		}

		let paramData = {
			param: base64encode(JSON.stringify({
				entity: data
			}))
        }
		if (type === 'get') {
			configuration.params = paramData
		} else if (type === 'post') {
			configuration.data = querystringify(paramData)
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
                    if (loadingArr.length > 0) {
                        let timer = setTimeout(v => {
							loadingArr.map(item => {
                                item.close()
                            })
							clearTimeout(timer)
							timer = null
						}, 200)
                    }
					// console.log(response);
					if (response.status != '200') {
						console.log(url, '系统开小差了，请稍后重试')
						return window.$message({
							message: ' 系统开小差了，请稍后重试...',
							type: 'warning'
						})
					}
					let result = isDecode ? JSON.parse(base64decode(response.data.result)) : response.data.result
					let code = result.code
					// 是否是生产环境
					let flag = common.productionEnv()
					if (!flag) {
						window.console.log(`请求路径: ${configuration.url}`, `  请求参数: `, data ? JSON.parse(JSON.stringify(data, '', 2)) : data, `  返回结果: `, JSON.parse(JSON.stringify(result, '', 2)))
						// window.console.log(`请求路径: ${config.url}`, `  请求参数: `, data, `  返回结果: `, result)
					}
					switch (Number(code)) {
						case 5: // 登录超时
							window.$message({
								message: result.detail,
								type: 'warning'
							})
							window.$VUE.$router.push({
								name: 'login'
							})
							reject(result)
							break
						case 0: // 成功
							resolve(result)
							break
						case 1:
							if (options && options.alertMsg) {
								window.$alert(result.detail, '温馨提示', {
									confirmButtonText: '确定'
								})
								reject(result)
							} else if (options && options.hideMsg) {
                                reject(result)
							} else {
								window.$message({
									message: result.detail,
									type: 'warning'
								})
								reject(result)
							}
							break
						case 8: // 未授权
							let errorText = flag ? result.detail : `${result.detail};data:${JSON.stringify(config)}`
							window.$message({
								message: errorText,
								type: 'warning'
							})
							window.$VUE.$router.push({
								name: 'home'
							})
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
                loadingArr.length > 0 && loadingArr.map(item => {
                    item.close()
                })
				reject(err)
			})
	})
}

const portalAxios = (type, url, data, domId, options = {}) => {
	return defaultAxios(type, url, data, domId, 'portalIp', options)
}
const axiosFileStream = (url, param, data) => { // 文件上传 param: 正常的参数 data 所选文件
	let showInfo = (url, param, data) => {
		// 是否是生产环境
		let flag = common.productionEnv()
		if (!flag) {
			window.console.log(`请求路径: ${url}`, `  请求参数: `, param ? JSON.parse(JSON.stringify(param, '', 2)) : param, `  返回结果: `, JSON.parse(JSON.stringify(data, '', 2)))
			// window.console.log(`请求路径: ${config.url}`, `  请求参数: `, data, `  返回结果: `, result)
		}
	}
	return new Promise((resolve, reject) => {
		let obj = {
			url,
			param,
			data,
			sucess(data) {
				showInfo(url, param, data)
				resolve(data)
			},
			error(data) {
				showInfo(url, param, data)
				window.$message({
					message: data.detail,
					type: 'warning'
				})
				reject(data)
			}
		}
		common.fetchFileStreams(obj)
	})
}
const axiosDownload = (type = 'get', url, data, fileName) => { // 文件下载 data: 正常的参数 fileName:excel文件名
	axios.defaults.timeout = config.downloadTimeout
	return new Promise((resolve, reject) => {
		type = type.toLowerCase()
		let configuration = {
			responseType: 'blob',
			method: type,
			url: (config.baseIp || '') + config.portalIp + url
		}
		// headers只有在跟注册 登录相关的接口并且'jwt'保存有值才有
		if (localStorage.getItem('jwt')) {
			configuration.headers = {
				Authorization: `Bearer${localStorage.getItem('jwt')}`
			}
		}

		let paramData = {
			param: base64encode(JSON.stringify({
				entity: data
			}))
        }
		if (type === 'get') {
			configuration.params = paramData
		} else if (type === 'post') {
			configuration.data = querystringify(paramData)
		}
		axios(configuration).then(data => {
			if (data.status == 200) {
				console.log(data.data.type)
				// 如果返回的不是文件流 则判定为没有查到数据
				if (['application/json', 'text/html', 'text/xml'].includes(data.data.type)) {
					reject(new Error())
					return window.$message({
						message: ' 没有相关的导出数据',
						type: 'warning'
					})
				}
				let fileNameHeaders = data.headers['content-disposition']
				// 防止后台没有返回文件名的情况
				try {
					fileName = fileName || decodeURI(fileNameHeaders.split('=')[1])
				} catch (e) {
					fileName = fileName || ''
				}
				let url = window.URL.createObjectURL(data.data)
				let link = document.createElement('a')
				link.style.display = 'none'
				link.href = url
				link.setAttribute('download', fileName)
				document.body.appendChild(link)
				link.click()
				resolve('下载成功')
			} else {
				window.$message({
					message: ' 系统开小差了，请稍后重试...',
					type: 'warning'
				})
			}
		}).catch((err) => {
			window.$message({
				message: '网络错误,请稍后重试...,',
				type: 'warning'
			})
			reject(err)
		})
	})
}
export default defaultAxios
export {
	portalAxios,
	axiosFileStream,
	axiosDownload
}
