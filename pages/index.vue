<template>
	<v-app light>
		<div class="nav">
			<navbar elevation="24" @voltarPressionado="voltar()"></navbar>
		</div>
		<div class="resto">
			<div v-if="telaExibicao">
				<v-container>
					<v-row>
						<v-col cols="12">
							<v-row justify="left">
								<filtros
									@filtroPassado="filtrarPaises($event)"
								></filtros></v-row></v-col
						><v-col
							><mostrar-paises
								v-if="paises[0].flag"
								:paisesRecebidos="paises"
								@receberPais="mudarDeTela($event)"
							></mostrar-paises></v-col
					></v-row>
				</v-container>
			</div>

			<div v-if="telaPais">
				<v-container
					><pais
						:paisRecebido="paisSelecionado"
						@retornandoRegiao="buscarPorRegiao($event)"
						>teste</pais
					></v-container
				>
			</div>
		</div>
	</v-app>
</template>

<script>
import Navbar from '../components/navbar.vue'
import Filtros from '../components/filtros.vue'
import MostrarPaises from '../components/mostrarPaises.vue'
import Pais from '../components/pais.vue'
import axios from 'axios'

export default {
	name: 'App',
	components: {
		Navbar,
		Filtros,
		MostrarPaises,
		Pais,
	},

	data() {
		return {
			paises: [
				{
					name: '',
					flag: '',
				},
			],
			telaExibicao: true,
			telaPais: false,
			paisSelecionado: {},
			paisesVizinhosDoSelecionado: [{}],
		}
	},

	created() {
		this.listarTodos()
	},

	methods: {
		filtrarPaises(valor) {
			this.listarTodos(valor)
		},

		voltar() {
			this.listarTodos()
			if (this.telaPais) this.mudarDeTela()
		},

		async listarTodos(value = 'all') {
			return await axios
				.get(`https://restcountries.eu/rest/v2/${value}`)
				.then((response) => {
					this.paises = response.data
				})
				.catch((error) => {
					window.alert(`Ocorreu um erro ${error}`)
				})
		},

		mudarDeTela(pais) {
			this.telaExibicao = !this.telaExibicao
			this.telaPais = !this.telaPais

			if (this.telaPais) {
				this.paisSelecionado = pais
			}
		},

		buscarPorRegiao(region) {
			this.mudarDeTela()
			this.listarTodos(`region/${region.toLowerCase()}`)
		},
	},
}
</script>

<style>
v-app {
	width: 100%;
	font-family: 'Montserrat', sans-serif;
	font-style: normal;
	font-weight: normal;
	font-size: 20px;
}

.resto {
	margin-top: 3rem;
	margin-left: 3rem;
}

@media (max-width: 600px) {
	.resto {
		margin-left: 2.2rem;
	}
}
</style>
