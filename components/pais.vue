<template>
	<v-container fluid>
		<v-row justify="center">
			<v-col class="d-flex">
				<img
					class="flags"
					v-bind="paisRecebido"
					:key="paisRecebido.name"
					:src="paisRecebido.flag"
					:alt="paisRecebido.name"
				/>

				<v-list>
					<v-list-item>
						<v-list-item-content
							><v-list-item-title
								>Nome:
								{{ paisRecebido.name }}</v-list-item-title
							>
						</v-list-item-content></v-list-item
					><v-list-item>
						<v-list-item-content
							><v-list-item-title
								>Capital:
								{{ paisRecebido.capital }}</v-list-item-title
							>
						</v-list-item-content></v-list-item
					><v-list-item>
						<v-list-item-content
							><v-list-item-title
								>Região:
								<a
									class="link-regiao"
									v-on:click="abrirRegiao()"
									>{{ paisRecebido.region }}</a
								></v-list-item-title
							>
						</v-list-item-content></v-list-item
					><v-list-item>
						<v-list-item-content
							><v-list-item-title
								>Sub-região:
								{{ paisRecebido.subregion }}</v-list-item-title
							>
						</v-list-item-content></v-list-item
					><v-list-item>
						<v-list-item-content
							><v-list-item-title>Línguas: </v-list-item-title>
							<v-list-item-title
								v-for="lingua of paisRecebido.languages"
								:key="lingua.nativeName"
								>{{ lingua.nativeName }}</v-list-item-title
							>
						</v-list-item-content></v-list-item
					></v-list
				>
			</v-col>
		</v-row>

		<h1>Vizinhos:</h1>

		<v-row justify="center">
			<v-col>
				<a>
					<img
						class="flags-vizinhas text-center"
						v-for="vizinho of vizinhos"
						v-on:click="trocarPais(vizinho)"
						:src="vizinho.flag"
						:key="vizinho.name"
						:alt="vizinho.name"
					/>
				</a>
			</v-col>
		</v-row>
	</v-container>
</template>

<script>
import axios from 'axios'
export default {
	data: () => ({
		vizinhos: [{}],
	}),
	props: ['paisRecebido'],

	created() {
		this.getVizinhos()
	},

	methods: {
		abrirRegiao() {
			this.$emit('retornandoRegiao', this.paisRecebido.region)
		},

		getVizinhos() {
			this.vizinhos = []

			this.paisRecebido.borders?.forEach((element) => {
				axios
					.get(`https://restcountries.eu/rest/v2/alpha/${element}`)
					.then((resposta) => {
						this.vizinhos.push(resposta.data)
					})
			})
		},

		trocarPais(paisParaTrocar) {
			this.paisRecebido = paisParaTrocar
			this.getVizinhos()
		},
	},
}
</script>

<style>
a {
	color: #6d2080;
	cursor: pointer;
}

h2 {
	margin-top: 2rem;
}

.flags-vizinhas {
	margin-top: 2rem;
	width: 15rem;
	margin-right: 1rem;
}

.link-regiao {
	cursor: pointer;
}
</style>
