import {
	getAllRegionInfo,
	getAllRegionInfoPet
} from '@/api/common/getAllRegion'
import {
	getAllAirportInfo
} from '@/api/common/selectAirPort'
import {
	getCityPinyinMap,
	getCityPinyinMapPet
} from '@/api/common/cCity'
import common from '@/util/common'
import { HOT_CITY, HOT_AIRPORT, HOT_CITY_PET } from '@/util/hotArea'
// import { HOT_CITY_PET } from '../../util/hotArea';
export default {
	state: {
		allRegion: [], // 省市区
		allRegionPet: [], // 省市区(宠宝)
		allAirport: {}, // 获取所有机场
		airportPinyin: {}, // 获取所有机场对象
		allCity: {}, // 所有城市
		allCityPet: {}, // 所有城市(宠宝)
		cityPinYin: {}, // 所有城市转拼音结构数据
		cityPinYinPet: {} // 所有城市转拼音结构数据(宠宝)
	},
	getters: {
		allRegion: state => state.allRegion,
		allRegionPet: state => state.allRegionPet,
		allAirport: (state) => state.allAirport,
		// airportPinyin: (state) => state.airportPinyin,
		allCity: (state) => state.allCity,
		allCityPet: (state) => state.allCityPet,
		cityPinYin: (state) => state.cityPinYin,
		cityPinYinPet: (state) => state.cityPinYinPet,
		airportPinyin: (state) => (flag) => {
			return state.airportPinyin[flag ? 'city' : 'air']
		}
	},
	mutations: {
		GET_REGION: (state, allRegion) => {
			state.allRegion = allRegion
		},
		GET_REGIONPET: (state, allRegionPet) => {
			state.allRegionPet = allRegionPet
		},
		GET_ALLAIRPORT: (state, allAirport) => {
			state.allAirport = allAirport
		},
		SET_AIRPORTPINYIN: (state, allAirport) => {
			state.airportPinyin = {
				city: common.dataFilter(allAirport, 'citySpelling', 'serviceAddress', HOT_AIRPORT.city),
				air: common.dataFilter(allAirport, 'airSpelling', 'airportName', HOT_AIRPORT.air)
			}
		},
		GET_CITY: (state, allCity) => {
			state.allCity = allCity
		},
		SET_CITYPINYIN: (state, allCity) => {
			state.cityPinYin = common.dataFilter(allCity, 'spelling', 'name', HOT_CITY)
		},
		GET_CITYPET: (state, allCityPet) => {
			state.allCityPet = allCityPet
		},
		SET_CITYPINYINPET: (state, allCityPet) => {
			state.cityPinYinPet = common.dataFilter(allCityPet, 'spelling', 'name', HOT_CITY_PET)
		}
	},
	actions: {
		setAllRegion({
			commit
		}) {
			return new Promise((resolve, reject) => {
				getAllRegionInfo().then(res => {
					if (res.code == 0 && res.entity != null) {
						commit('GET_REGION', res.entity)
						resolve(res.entity)
					}
				})
			})
		},
		setAllRegionPet({
			commit
		}) {
			return new Promise((resolve, reject) => {
				getAllRegionInfoPet().then(res => {
					if (res.code == 0 && res.entity != null) {
						commit('GET_REGIONPET', res.entity)
						resolve(res.entity)
					}
				})
			})
		},
		setAllAirport({
			commit
		}) {
			return new Promise((resolve, reject) => {
				getAllAirportInfo().then(res => {
					if (res.code == 0 && res.entity != null) {
						commit('GET_ALLAIRPORT', res.entity)
						commit('SET_AIRPORTPINYIN', res.entity)
						resolve(res.entity)
					}
				})
			})
		},
		setAllCity({
			commit
		}) {
			return new Promise((resolve, reject) => {
				getCityPinyinMap().then(res => {
					if (res.code == 0 && res.entity != null) {
						commit('GET_CITY', res.entity)
						commit('SET_CITYPINYIN', res.entity)
						resolve(res.entity)
					}
				})
			})
		},
		setAllCityPet({
			commit
		}) {
			return new Promise((resolve, reject) => {
				getCityPinyinMapPet().then(res => {
					if (res.code == 0 && res.entity != null) {
						commit('GET_CITYPET', res.entity)
						commit('SET_CITYPINYINPET', res.entity)
						resolve(res.entity)
					}
				})
			})
		}
	}
}