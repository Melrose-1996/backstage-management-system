import config from '@/config'
import {
	base64encode
} from '@/util/base64'
let FLAG = true
let download = (url, data) => {
	if (!FLAG) {
		return
	}
	FLAG = false
	setTimeout(v => {
		FLAG = true
	}, 1000)

	let fromData = encodeURIComponent(base64encode(JSON.stringify({
		entity: data
	})))
	window.open(`${config.portalIp}${url}?param=${fromData}&Authorization=${localStorage.getItem('jwt')}`)
}
export default download
