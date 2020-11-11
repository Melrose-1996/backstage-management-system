// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import '@/assets/styles/element-variables.scss'
import * as filters from '@/util/filters'
import '@/assets/styles/common.scss'
import '@/assets/fonts/iconfont.css'
import '@/directives/index'
import store from './store'
import common from '@/util/common'
import components from '@/components/common'
import echarts from 'echarts'
import 'echarts/map/js/china.js'
import llsweb from 'llsweb'
import llswebcss from 'llsweb/dist/llsweb.min.css'
Vue.prototype.$echarts = echarts
// import * as Sentry from '@sentry/browser';
// import * as Integrations from '@sentry/integrations';

// if (process.env.NODE_ENV === 'production') {
//     Sentry.init({
//         dsn: 'http://d70863b3c5c9448ebfd635ec440ae96b:fd0466e8e7924f55a04de7b3a070898f@10.202.161.16:9000/3',
//         release: 'pro@5.7',
//         integrations: [new Integrations.Vue({Vue, attachProps: true})]
//     });
// }
Vue.use(ElementUI)
Vue.use(llsweb)
Object.keys(components).forEach((key) => {
	Vue.component(key, components[key])
})

Object.keys(filters).forEach((key) => {
	Vue.filter(key, filters[key])
})

Vue.config.productionTip = false
const appVue = new Vue({
	router,
	store,
	render: (h) => h(App)
}).$mount('#app')

window.$message = appVue.$message
window.$loading = appVue.$loading
window.$alert = appVue.$alert
window.common = common
window.$VUE = appVue
window.$echarts = echarts
window.globalData = Object.create(null)
try {
	Vue.config.devtools = process.env.NODE_ENV === 'development'
	window.__VUE_DEVTOOLS_GLOBAL_HOOK__.Vue = App.constructor
} catch (e) {
	console.log(e)
}
