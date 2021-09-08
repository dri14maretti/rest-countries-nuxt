<template>
	<v-container>
		<v-row justify="center">
			<v-col cols="12">
				<a>
					<img
						class="flags text-center"
						v-for="pais of vetorQuebrado"
						v-on:click="enviarPais(pais)"
						:src="pais.flag"
						:key="pais.name"
						:alt="pais.name"
					/>
				</a>
				<v-pagination
					v-model="page"
					:length="Math.ceil(paisesRecebidos.length / totalVisivel)"
					:total-visible="totalVisivel"
					color="#6d2080"
					@input="metodoPaginacao()"
				>
				</v-pagination>
			</v-col>
		</v-row>
	</v-container>
</template>

<script>
export default {
	setup() {},
	props: {
		paisesRecebidos: {
			type: Array,
			default: {
				name: '',
				flag: '',
			},
		},
	},
	data: () => ({
		page: 1,
		totalVisivel: 12,
		vetorQuebrado: [],
	}),
	mounted() {
		this.metodoPaginacao()
	},

	methods: {
		metodoPaginacao() {
			this.vetorQuebrado = []

			for (
				let i = this.totalVisivel * (this.page - 1);
				i < this.totalVisivel * this.page;
				i++
			) {
				if (i < this.paisesRecebidos.length)
					this.vetorQuebrado.push(this.paisesRecebidos[i])
			}
		},

		enviarPais(paisEscolhido) {
			this.$emit('receberPais', paisEscolhido)
		},
	},

	watch: {
		paisesRecebidos() {
			this.metodoPaginacao()
		},
	},
}
</script>

<style>
.flags {
	width: 20rem;
	margin-right: 3rem;
	margin-bottom: 2rem;
	cursor: pointer;
}
</style>
