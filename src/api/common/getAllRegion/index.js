import {
	portalAxios
} from '@/util/axios'
const getAllRegionInfo = (params) => portalAxios('post', '/atp-baseinfo/basRegionInfo/getRegionInfoList', params) // 获取城市机场
// 获取所有省市区接口(宠宝)
const getAllRegionInfoPet = (params) => portalAxios('post', '/transport/operation/common/getRegionInfoList', params)

export {
	getAllRegionInfo,
	getAllRegionInfoPet
}