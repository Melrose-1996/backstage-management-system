import ElementUI from 'element-ui'
import Vuex from 'vuex'
import cAirport from '@/components/common/cAirport'
import store from '@/store/index'
import {
    mount,
    shallowMount,
    createLocalVue
} from '@vue/test-utils'
const localVue = createLocalVue()
localVue.use(ElementUI)
localVue.use(Vuex)

describe('cAirport', () => {
    it('显示机场城市名', (done) => {
        const wrapper = shallowMount(cAirport, {localVue, store})
        setTimeout(() => {
            expect(wrapper.contains('.first_city_hot')).toBe(true)
            done()
        }, 100)
    })
})  