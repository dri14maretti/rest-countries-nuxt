import index from '../../pages/index.vue';
import $axios from './helpers/api.mock'
import Vue from 'vue';
import Vuetify from 'vuetify';
import { shallowMount, createLocalVue } from '@vue/test-utils';

Vue.use(Vuetify);

const localVue = createLocalVue();
localVue.prototype.$axios = $axios;
$axios.jsonOverwritesPath = 'index/'
let vuetify;

describe('index', () => {

    beforeAll(() => { vuetify = new Vuetify(); })

    const wrapper = shallowMount(index, {
        localVue,
        vuetify,
        $axios,
        data: () => ({})
    });

    test('se a página está buscando os dados na api corretamente', async () => {
        expect(wrapper.vm.paises.length).toBeGreaterThan(200);
    })
})