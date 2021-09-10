import Vue from 'vue';
import Vuetify from 'vuetify';
import Pais from '../../components/Pais.vue';
import { mount, createLocalVue } from '@vue/test-utils';

Vue.use(Vuetify);

describe('Pais.vue', () => {
    const localVue = createLocalVue();
    let vuetify;

    beforeEach(() => {
        vuetify = new Vuetify();
    })

    test('se os vizinhos são adicionados quando a função é chamada', () => {
        const wrapper = mount(Pais, {
            localVue,
            vuetify,
            propsData: {}
        });

        wrapper.vm.getVizinhos();
        expect(wrapper.vm.vizinhos.length).toBeGreaterThan(1);
    });



})