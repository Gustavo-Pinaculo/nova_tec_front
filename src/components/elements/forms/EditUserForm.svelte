<script lang="ts">
	import { UsuariosController, type usuario } from '$lib/controllers/usuarios.controller';
	import MainButton from '$components/assets/buttons/MainButton.svelte';
	import MainInput from '$components/assets/inputs/MainInput.svelte';
	import PassInput from '$components/assets/inputs/PassInput.svelte';
	import { sendSignal, Signal } from '$lib/utils/sinalizador';
	import validators from '$lib/sanitizers/validators';
	import sanitizar from '$lib/sanitizers/sanitizers';
	import toast from '$lib/utils/toasts.svelte';
	import apiService from '$lib/api/api';
	import { onMount } from 'svelte';

	const usuarioController = new UsuariosController();
	const body = $state<usuario>({
		username: '',
		cpf_cnpj: '',
		email: '',
		user_permissions: [],
		password: '',
		status: 'ACTIVE',
		cellphone: ''
	});

	let permissoes = $state<string>('');
	let compararSenha = $state('');

	onMount(() => {
		initialize();
	});

	async function initialize() {
		const [user, err] = await apiService.get('/user/user/me/');

		if (err) return toast.error('Erro ao carregar os dados do usuario', err.message);
		body.email = user.data.email;
		body.username = user.data.profile.name;
		body.cellphone = user.data.profile.phone;
	}

	function validate(): boolean {
		sendSignal(Signal.VALIDAR_INPUTS);
		let message = '';
		if (body.username.length < 3) message = 'O nome deve ter pelo menos 3 letras';
		if (validators.validateEmail(body.email ?? '') !== '') message = 'Email inválido';
		// if (validators.validatePassword(body.password ?? '') !== '') message = 'Senha inválida';
		// if (body.password !== compararSenha) message = 'As senhas devem ser iguais';
		if (message !== '') {
			toast.error('Erro ao registrar o usuario', message);
			return false;
		}
		return true;
	}

	async function mudaInfoUser() {
		
	}

	async function mudaSenha() {
		}
</script>

<div
	class="flex w-full flex-col gap-3 rounded-lg bg-white p-3 shadow-[0px_4px_4px_rgba(0,0,0,0.25)]"
>
	<div class="text-sub-600 grid w-full grid-cols-10 gap-4 bg-white px-3 py-1.5 text-sm font-light">
		<div class="col-span-10">
			<h3 class="font-semibold">Dados do Usuario</h3>
		</div>
		<div class="col-span-4">
			<MainInput
				label="Nome"
				bind:value={body.username}
				validate={(v) => validators.validateFieldValue(v ?? '')}
			/>
		</div>
		<div class="col-span-4">
			<MainInput
				label="Email"
				bind:value={body.email}
				validate={(v) => validators.validateEmail(v ?? '')}
			/>
		</div>
		<div class="col-span-2">
			<MainInput
				label="Telefone"
				bind:value={body.cellphone!}
				sanitize={(v) => sanitizar.telefone(v)}
				validate={(v) => validators.validatePhone(v ?? '')}
			/>
		</div>

		<div class="col-span-10 flex justify-end">
			<MainButton label="Salvar" action={mudaInfoUser} />
		</div>
	</div>
</div>
<div
	class="flex w-full flex-col gap-3 rounded-lg bg-white p-3 shadow-[0px_4px_4px_rgba(0,0,0,0.25)]"
>
	<div class="text-sub-600 grid w-full grid-cols-10 gap-4 bg-white px-3 py-1.5 text-sm font-light">
		<div class="col-span-10">
			<h3 class="font-semibold">Redefinir Senha</h3>
		</div>
		<div class="col-span-3">
			<PassInput
				label="Nova Senha"
				bind:value={body.password}
				validate={(v) => validators.validatePassword(v ?? '')}
			/>
		</div>
		<div class="col-span-3">
			<PassInput
				label="Confirme a Senha"
				bind:value={compararSenha}
				validate={(v) => validators.validateEqualityFields(v ?? '', body.password ?? '', 'Senha')}
			/>
		</div>
		<div class="col-span-10 flex justify-end">
			<MainButton label="Salvar" action={mudaSenha} />
		</div>
	</div>
</div>
