import {
	portalAxios
} from '@/util/axios'
// 获取所有菜单接口
const getAllMenuInfo = (params) => portalAxios('post', '/auth/resource/getOperationCenterMenu', params)

// 获取收藏菜单列表
const getCollectMenuInfo = (params) => portalAxios('post', '/auth/resource/favoriteMenuList', params)

// 是否收藏
const isCollect = (params) => portalAxios('post', '/auth/resource/editFavoriteMenu', params)

// 搜索菜单 两个接口
const searchMenus = (params) => portalAxios('post', '/auth/resource/userSearchResource', params)

// 获取所有button权限列表
const getAllAuthButtons = (params) => portalAxios('post', '/auth/resource/listAllButton', params)

// 获取所有航空公司列表
const getAirlineInfo = (params) => portalAxios('post', '/atp-partner/parAirlineInfo/getAirlineInfoList', params)

// 获取基础下拉框数据
const getGlobalData = (params) => portalAxios('post', '/atp-baseinfo/basCatalogInfo/getCatalogInfoTypeMap', params)
export {
	getAllMenuInfo,
	getCollectMenuInfo,
	isCollect,
	searchMenus,
	getAllAuthButtons,
	getAirlineInfo,
	getGlobalData
}
