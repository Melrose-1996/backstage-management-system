import Vue from 'vue'
import Vuex from 'vuex'
import common from './common/common.js'
import cDialog from './components/cDialog.js'
import baseData from './baseData'
Vue.use(Vuex)
const store = new Vuex.Store({
	modules: {
		common: common,
		cDialog: cDialog,
		baseData: baseData
	}
})

export default store