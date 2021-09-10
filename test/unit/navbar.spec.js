import Vue from 'vue';
import Vuetify from 'vuetify';
import Navbar from '@/components/Navbar.vue';
import { mount, createLocalVue } from '@vue/test-utils';

Vue.use(Vuetify);

describe('navbar.vue', () => {
    const localVue = createLocalVue();
    let vuetify;

    beforeEach(() => {
        vuetify = new Vuetify();
    })

    it('volta e emite o evento', () => {
        const wrapper = mount(Navbar, {
            localVue,
            vuetify,
        })

        const spy = jest.spyOn(wrapper.vm, 'voltar');
        wrapper.find('.v-btn').trigger('click');

        expect(spy).toHaveBeenCalled();
    })
})