<script>
	import apiService from '$lib/api/api';
	import { onMount } from 'svelte';

	let body = $state({
		name: ''
	});

	onMount(() => {
		initialize();
	});

	async function initialize() {
		await apiService.get('/user/user/me/').then((res) => {
			body.name = res[0].data.profile.name ?? res[0].data.username;
		});
	}
</script>

<div class="flex h-full w-full flex-col gap-4">
	<h2 class="font-montserrat mb-2 text-2xl text-[#797B7E]">Seja bem-vindo {body.name}!</h2>

	<div class="w-full rounded-lg bg-white p-3 shadow-md">
		<h3 class="font-montserrat">Cadastros</h3>
	</div>
	<div class="grid w-full grid-cols-10 gap-2">
		<div
			class="col-span-1 flex justify-center justify-items-center rounded-lg bg-white p-1 shadow-md"
		>
			<h3 class="font-montserrat text-xl">Pedidos</h3>
		</div>
		<div
			class="col-span-1 flex justify-center justify-items-center rounded-lg bg-white p-1 shadow-md"
		>
			<h3 class="font-montserrat text-xl">Clientes</h3>
		</div>
		<div class="col-span-1 flex justify-center rounded-lg bg-white p-1 shadow-md">
			<h3 class="font-montserrat text-xl">Produtos</h3>
		</div>
		<div
			class="col-span-1 flex justify-center justify-items-center rounded-lg bg-white p-1 shadow-md"
		>
			<h3 class="font-montserrat text-xl">Usuários</h3>
		</div>
	</div>

	<div class="w-full rounded-lg bg-white p-3 shadow-md">
		<h3 class="font-montserrat font-semibold">Pedidos</h3>
	</div>
	<!-- TODO: lista de pedidos -->

	<div class="grid w-full grid-cols-12 gap-4">
		<div class="col-span-6 rounded-lg bg-white p-3 shadow-md">
			<h3 class="font-montserrat font-semibold">Meu Cadastro</h3>
		</div>
		<div class="col-span-6 rounded-lg bg-white p-3 shadow-md">
			<h3 class="font-montserrat font-semibold">Relatórios</h3>
		</div>
	</div>
</div>
