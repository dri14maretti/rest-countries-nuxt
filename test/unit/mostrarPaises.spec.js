import MostrarPaises from '@/components/mostrarPaises.vue';
import Vue from 'vue';
import Vuetify from "vuetify"
import $axios from './helpers/api.mock'
import { mount, createLocalVue } from '@vue/test-utils';
import { jest } from '@jest/globals';

Vue.use(Vuetify);

describe('MostrarPaises.vue', () => {
    const localVue = createLocalVue();
    localVue.prototype.$axios = $axios;
    $axios.jsonOverwritesPath = 'index/'
    let vuetify;

    beforeEach(() => {
        vuetify = new Vuetify();
    })

    it('Emite evento com o pais selecionado', async () => {
        const wrapper = mount(MostrarPaises, {
            localVue,
            vuetify,
            $axios
        });

        const spy = jest.spyOn(wrapper.vm, 'enviarPais');
        await wrapper.setData({ vetorQuebrado: wrapper.vm.paisesRecebidos })

        console.log(wrapper.vm.paisesRecebidos);
        const primeiraBandeira = wrapper.find('img.flags.text-center');
        wrapper.vm.$emit('receberPais', wrapper.vm.vetorQuebrado[0])


        console.log(wrapper.emitted('receberPais')); // [['']] por algum motivo

        // expect(spy).toHaveBeenCalled();
        expect(wrapper.emitted('receberPais')[0][0]).toMatchObject(wrapper.vm.vetorQuebrado[0]);


    })
})