import {
	portalAxios
} from '@/util/axios'

const getDistrictList = (params) => portalAxios('post', '/custom/cabin/resource/districtList', params)
const getCompanyList = (params) => portalAxios('post', '/leaguer/leaEnterprise/selectGroupEnterprise', params)
const getCompanyList1 = (params) => portalAxios('post', '/leaguer/leaEnterprise/getSpAscription', params)
const getAirportList = (params) => portalAxios('post', '/externalinterface/sccweb/getAirportListAPI', params)
const getAirlineList = (params) => portalAxios('post', '/externalinterface/sccweb/getAirlineListAPI', params)
const listKCSupplierInfo = params => portalAxios('post', '/leaguer/leaEnterprise/listKCSupplierInfo', params)
export {
	getDistrictList,
	getCompanyList,
	getCompanyList1,
	getAirportList,
	getAirlineList,
	listKCSupplierInfo
}