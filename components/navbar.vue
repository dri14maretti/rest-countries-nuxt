<template>
	<nav class="navbar navbar-light bg-light shadow">
		<div class="container-fluid">
			<a class="navbar-brand" href="#">
				<img src="../assets/footer_mova.svg" width="75" />
			</a>

			<v-btn
				class="botao-voltar-full navbar-toggler"
				type="button"
				elevation="2"
				color="#6d2080"
				outlined
				tile
				v-on:click="voltar()"
				><v-icon left dark>mdi-keyboard-return</v-icon> Voltar</v-btn
			>
		</div>
	</nav>
</template>

<script>
export default {
	name: 'Navbar',

	data: () => ({
		elevation: 4,
	}),

	methods: {
		voltar() {
			this.$emit('voltarPressionado')
		},
	},
}
</script>

<style>
nav {
	width: 100%;
}

v-btn {
	color: #6d2080;
}
</style>
