import {
	portalAxios
} from '@/util/axios'
const getCityPinyinMap = (params) => portalAxios('post', '/atp-baseinfo/basRegionInfo/getCityPinyinMap', params) // 获取城市机场
// 获取所有城市(宠宝)
const getCityPinyinMapPet = (params) => portalAxios('post', '/transport/operation/common/getCityPinyinMap', params)
export {
	getCityPinyinMap,
	getCityPinyinMapPet
}