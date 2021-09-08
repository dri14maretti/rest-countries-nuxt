import Filtros from '@/components/filtros';
import Vue from 'vue';
import Vuetify from "vuetify"
import { mount, createLocalVue } from '@vue/test-utils';

Vue.use(Vuetify);

describe('Filtros', () => {

    const localVue = createLocalVue();
    let vuetify

    beforeEach(() => {
        vuetify = new Vuetify();
    })

    test('Se a variável isRegion for false, não deverá aparecer na tela um select de regiao', () => {
        const wrapper = mount(Filtros, {
            localVue,
            vuetify,
        })

        const selectRegiao = wrapper.find('#regiao');

        // Espera que a variável dentro de expect() seja o valor dentro de toBe()
        expect(selectRegiao.exists()).toEqual(false);
    })

    // testa se existe o id de regiao no caso de ter sido selecionado o filtro de regiao e a varia´vale isRegion seja true

    test('Se a variável isRegion for true e isOher for false, deverá aparecer um select de região', async () => {
        const wrapper = mount(Filtros, {
            localVue,
            vuetify,
        })

        wrapper.setData({ isRegion: true });
        await wrapper.vm.$nextTick();
        const selectRegiao = wrapper.find('#regiao');
        const selectOutro = wrapper.find('#outro');

        expect(selectRegiao.exists()).toBe(true);
        expect(selectOutro.exists()).toBe(false);
    })

    test('Se a variável isOther for false, não mostrar o input de other', () => {
        const wrapper = mount(Filtros, {
            localVue,
            vuetify,
        })

        const selectOutro = wrapper.find('#outro');

        expect(selectOutro.exists()).toBe(false);
    });

    test('Se a variável isOther for true e a isRegion for false, deverá aparecer o input de other e não aparecer o select de region', async () => {
        const wrapper = mount(Filtros, {
            localVue,
            vuetify,
            data: () => ({
                filter: { name: "país" }
            })
        })

        wrapper.setData({ isOther: true });
        await wrapper.vm.$nextTick();
        const selectRegiao = wrapper.find('#regiao');
        const selectOutro = wrapper.find('#outro');

        expect(selectRegiao.exists()).toBe(false);
        expect(selectOutro.exists()).toBe(true);
    })
})