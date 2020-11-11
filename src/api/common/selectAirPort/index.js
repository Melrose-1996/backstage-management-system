import {
	portalAxios
} from '@/util/axios'
const getAllAirportInfo = (params) => portalAxios('post', '/atp-baseinfo/basAirportInfo/getAirportInfoMap', params) // 获取城市机场
export {
	getAllAirportInfo
}