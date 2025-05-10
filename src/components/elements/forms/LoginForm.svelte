<script>
	import MainButton from '$components/assets/buttons/MainButton.svelte';
	import MainInput from '$components/assets/inputs/MainInput.svelte';
	import PassInput from '$components/assets/inputs/PassInput.svelte';
	import toast from '$lib/utils/toasts.svelte';
	import { goto } from '$app/navigation';
	import apiService from '$lib/api/api';

	let body = $state({
		email: '',
		password: ''
	});

	async function login() {
		const [res, err] = await apiService.post('/user/token/', body);
		if (err) return toast.error('Erro ao efetuar login', err);

        localStorage.setItem('nova-tec-token', res.data.access);
        localStorage.setItem('nova-tec-refresh', res.data.refresh);

		toast.success('Login realizado com sucesso!', 'Você sera redirecionado para o dashboard.');
		goto('/dashboard');
	}
</script>

<div class="container flex w-full flex-col gap-3 p-10">
	<h1 class="flex justify-center">Login</h1>
	<MainInput bind:value={body.email} label="Usuário" placeholder="Usuário" mandatory={true} />
	<PassInput bind:value={body.password} label="Senha" placeholder="Senha" mandatory={true} />
	<MainButton label="Entrar" action={login} />
</div>
