<template>
	<div data-app>
		<v-container fluid>
			<v-row justify="start">
				<v-col class="d-flex" cols="4" sm="2">
					<v-autocomplete
						v-model="filter"
						:items="tiposDeFiltro"
						item-text="name"
						item-value="value"
						label="Filtrar por"
						color="#6d2080"
						placeholder="Escolha uma das opções"
						@change="filtroSelecionado()"
						return-object
						id="filtro"
						dense
					></v-autocomplete>
				</v-col>

				<v-col class="d-flex" cols="4" sm="2">
					<v-autocomplete
						v-if="isRegion"
						data-testid="autov-autocomplete-region"
						v-model="filtroDeRegiaoSelecionado"
						:items="regions"
						item-text="name"
						item-value="value"
						label="Região"
						color="#6d2080"
						placeholder="Escolha a região"
						class="purple--text"
						id="regiao"
						return-object
						dense
					></v-autocomplete>
					<v-text-field
						v-if="isOther"
						v-model="filtroOutroSelecionado"
						:label="filter.name"
						:placeholder="`Digite ${
							this.filter.value === 'callingcode' ||
							this.filter.value === 'country'
								? 'o'
								: 'a'
						} ${this.filter.name.toLowerCase()}`"
						:name="filter.name"
						@change="outroFiltroSelecionado()"
						id="outro"
						dense
					></v-text-field>
				</v-col>

				<v-col class="d-flex" cols="4" sm="3">
					<v-btn
						v-on:click="filtrar()"
						color="#6d2080"
						:disabled="
							!filtroDeRegiaoSelecionado &&
							!filtroOutroSelecionado
						"
						><span style="color: #ebebeb">Pesquisar</span></v-btn
					>
				</v-col>
			</v-row>
		</v-container>
	</div>
</template>

<script>
export default {
	data: () => ({
		tiposDeFiltro: [
			{ id: 0, name: 'Região', value: 'region' },
			{ id: 1, name: 'Capital', value: 'capital' },
			{ id: 2, name: 'Língua', value: 'lang' },
			{ id: 3, name: 'País', value: 'name' },
			{ id: 4, name: 'Código de ligação', value: 'callingcode' },
		],
		filter: {},
		filtroDeRegiaoSelecionado: '',
		regions: [
			{ name: 'África', value: 'africa' },
			{ name: 'América', value: 'americas' },
			{ name: 'Asia', value: 'asia' },
			{ name: 'Europa', value: 'europe' },
			{ name: 'Oceania', value: 'oceania' },
		],
		isRegion: false,
		isOther: false,
		filtroOutroSelecionado: '',
	}),

	methods: {
		filtroSelecionado() {
			const filtroEscolhido = this.filter.value

			if (filtroEscolhido === 'region') {
				this.isRegion = true
				this.isOther = false
				this.filtroOutroSelecionado = ''
				return
			}

			this.filtroOutroSelecionado = ''
			this.filtroDeRegiaoSelecionado = ''
			this.isRegion = false
			this.isOther = true
		},

		regiaoSelecionada() {
			this.$emit(
				'filtroPassado',
				`${this.filter.value}/${this.filtroDeRegiaoSelecionado.value}`
			)
		},

		outroFiltroSelecionado() {
			this.$emit(
				'filtroPassado',
				`${
					this.filter.value
				}/${this.filtroOutroSelecionado.toLowerCase()}`
			)
		},

		filtrar() {
			if (this.filter.value == 'region') this.regiaoSelecionada()
			else this.outroFiltroSelecionado()
		},
	},
}
</script>
