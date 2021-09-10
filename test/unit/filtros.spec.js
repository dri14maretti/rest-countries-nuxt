import Filtros from '@/components/filtros';
import Vue from 'vue';
import Vuetify from "vuetify"
import { mount, createLocalVue } from '@vue/test-utils';
import { jest } from '@jest/globals';

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

    // Tentativa de testar a função que é chamada quando o tipo de filtro é alterado

    // test('Se quando pesquisar é pressionado, o filtro certo é selecionado', async () => {
    //     const wrapper = mount(Filtros, {
    //         localVue,
    //         vuetify,
    //     })

    //     const input = wrapper.find('#filtro');

    //     const update = jest.fn();

    //     wrapper.vm.$on('change', update);

    //     input.element.value = "region";
    //     input.trigger('@change');

    //     await wrapper.vm.$nextTick();

    //     expect(update).toHaveBeenCalled(); // Não chama a função
    // })

    test('se a função filtroSelecionado está trocando os valores que precisava trocar', () => {
        const wrapper = mount(Filtros, {
            localVue,
            vuetify,
        })

        wrapper.setData({ filter: { name: "Região", value: "region" } });

        wrapper.vm.filtroSelecionado();

        expect(wrapper.vm.isOther).toBe(false);
        expect(wrapper.vm.isRegion).toBe(true);
    })

    test('se, quando a other for selecionada, emite um evento', async () => {
        const wrapper = mount(Filtros, {
            localVue,
            vuetify,
        });

        const spy = jest.spyOn(wrapper.vm, 'outroFiltroSelecionado');

        wrapper.setData({ isOther: true })
        await wrapper.vm.$nextTick();

        const selectOutro = wrapper.find('#outro');

        selectOutro.trigger('change');

        expect(spy).toHaveBeenCalled();

    })

    test('Teste', async () => {
        const wrapper = mount(Filtros, {
            localVue,
            vuetify,
        })

        jest.spyOn(wrapper.vm, 'outroFiltroSelecionado');

        const autocomplete = wrapper.find('#filtro');
        const input = wrapper.find('input[type="text"]');

        wrapper.vm.filtroSelecionado();
        expect(wrapper.vm.isOther).toBe(true);

        expect(input.isVisible()).toBe(true);
        //expect(autocomplete.element.value).toBe("region");;

        input.vm.$emit('change', { target: { value: "region" } });
        wrapper.vm.$emit('filtroPassado', { name: "region" });

        expect(wrapper.vm.outroFiltroSelecionado).toHaveBeenCalled();
        await wrapper.vm.$nextTick();
        expect(wrapper.emitted('filtroPassado')[0][0]).toMatchObject({ name: "region" });

    })
})