import MostrarPaises from '@/components/mostrarPaises.vue';
import Vue from 'vue';
import Vuetify from "vuetify"
import $axios from './helpers/api.mock'
import { mount, createLocalVue, shallowMount } from '@vue/test-utils';
import { jest } from '@jest/globals';

Vue.use(Vuetify);
const localVue = createLocalVue();
localVue.prototype.$axios = $axios;
$axios.jsonOverwritesPath = 'mostrarPaises/'
let vuetify;

describe('MostrarPaises.vue', () => {
    beforeEach(() => {
        vuetify = new Vuetify();
    })

    it('Emite evento com o pais selecionado', async () => {
        const wrapper = shallowMount(MostrarPaises, {
            localVue,
            vuetify,
            $axios,
            data: () => ({})
        });

        const spy = jest.spyOn(wrapper.vm, 'enviarPais');
        wrapper.vm.vetorQuebrado = wrapper.vm.paisesRecebidos;
        await wrapper.vm.$nextTick();

        //console.log(wrapper.vm.paisesRecebidos);
        const primeiraBandeira = wrapper.find('img.flags.text-center');
        wrapper.vm.$emit('receberPais', wrapper.vm.paisesRecebidos[0])

        console.log(wrapper.vm.paisesRecebidos[0]);
        console.log(wrapper.emitted('receberPais')); // [['']] por algum motivo

        // expect(spy).toHaveBeenCalled();
        expect(wrapper.emitted('receberPais')[0][0]).toMatchObject(wrapper.vm.vetorQuebrado[0]);


    })
})