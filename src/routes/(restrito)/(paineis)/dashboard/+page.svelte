<script lang="ts"> 
	
	import { goto } from '$app/navigation';
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

	const routeMap: Record<string, string> = {
		pedidos: '/novo-pedido',
		clientes: '/novo-cliente',
		produtos: '/novo-produto',
		usuarios: '/novo-usuario',
		categoria: '/produtos?tab=2&novo=categoria',
		pinturas: '/produtos?tab=1&novo=pintura',
		tecidos: '/produtos?tab=1&novo=tecido',
		camisas: '/produtos?tab=1&novo=camisa',
		golas: '/produtos?tab=1&novo=gola'
	};

	function navigator(path: string) {
		const route = routeMap[path];
		if (route) goto(route);
	}
</script>

<div class="flex h-full w-full flex-col gap-4">
	<h1 class="font-montserrat mb-2 text-2xl text-[#797B7E]">Seja bem-vindo {body.name}!</h1>

	<div class="w-full rounded-lg bg-white p-3 shadow-md">
		<h3 class="font-montserrat font-semibold">Cadastros</h3>
	</div>
	<div class="grid w-full grid-cols-9 gap-2">
		<button class="col-span-1 flex justify-center rounded-lg bg-white p-1 shadow-md" onclick={() => navigator('pedidos')}>
			<h3 class="font-montserrat text-xl">Pedidos</h3>
		</button>
		<button	class="col-span-1 flex justify-center rounded-lg bg-white p-1 shadow-md" onclick={() => navigator('clientes')}>
			<h3 class="font-montserrat text-xl">Clientes</h3>
		</button>
		<button	class="col-span-1 flex justify-center rounded-lg bg-white p-1 shadow-md" onclick={() => navigator('produtos')}>
			<h3 class="font-montserrat text-xl">Produtos</h3>
		</button>
		<button class="col-span-1 flex justify-center rounded-lg bg-white p-1 shadow-md" onclick={() => navigator('usuarios')}>
			<h3 class="font-montserrat text-xl">Usuários</h3>
		</button>
		<button class="col-span-1 flex justify-center rounded-lg bg-white p-1 shadow-md" onclick={() => navigator('categoria')}>
			<h3 class="font-montserrat text-xl">Categoria</h3>
		</button>
		<button class="col-span-1 flex justify-center rounded-lg bg-white p-1 shadow-md"onclick={() => navigator('pinturas')}>
			<h3 class="font-montserrat text-xl">Pinturas</h3>
		</button>
		<button class="col-span-1 flex justify-center rounded-lg bg-white p-1 shadow-md"onclick={() => navigator('tecidos')}>
			<h3 class="font-montserrat text-xl">Tecidos</h3>
		</button>
		<button	class="col-span-1 flex justify-center rounded-lg bg-white p-1 shadow-md" onclick={() => navigator('camisas')}>
			<h3 class="font-montserrat text-xl">Camisas</h3>
		</button>
		<button class="col-span-1 flex justify-center rounded-lg bg-white p-1 shadow-md" onclick={() => navigator('golas')}>
			<h3 class="font-montserrat text-xl">Golas</h3>
		</button>
	</div>

	<div class="w-full rounded-lg bg-white p-3 shadow-md">
		<h3 class="font-montserrat font-semibold">Pedidos</h3>
	</div>

	<div class="grid w-full grid-cols-12 gap-4">
		<div class="col-span-6 rounded-lg bg-white p-3 shadow-md">
			<h3 class="font-montserrat font-semibold">Perfil</h3>
		</div>
		<div class="col-span-6 rounded-lg bg-white p-3 shadow-md">
			<h3 class="font-montserrat font-semibold">Relatórios</h3>
		</div>
	</div>
</div>
