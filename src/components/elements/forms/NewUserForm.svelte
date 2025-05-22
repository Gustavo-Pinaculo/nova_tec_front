<script lang="ts">
	import MainButton from "$components/assets/buttons/MainButton.svelte";
    import MainInput from "$components/assets/inputs/MainInput.svelte";
    import PassInput from "$components/assets/inputs/PassInput.svelte";
	import validators from "$lib/sanitizers/validators";
	import sanitizar from '$lib/sanitizers/sanitizers';
	import toast from "$lib/utils/toasts.svelte";

    import { EnderecosController } from '$lib/enderecos/enderecos.controller';
	import { UsuariosController, type usuario } from "$lib/controllers/usuarios.controller";
	import { sendSignal, Signal } from "$lib/utils/sinalizador";
	import { goto } from "$app/navigation";

    const usuarioController = new UsuariosController();
    const enderecosController = new EnderecosController();
    const body = $state<usuario>({
        username: '',
        cpf_cnpj: '',
        email: '',
        user_permissions: [],
        password: '',
        status: 'ACTIVE'
        // cep: '',
        // cidade: '',
        // rua: '',
        // bairro: '',
        // estado: '',
        // numero: '',
        // whatsapp: '',
    })

    let permissoes = $state<string>('');
    let compararSenha = $state('');

    // async function getEndereco(cep:string){
    //     const [res, err] = await enderecosController.enderecoPorCep(cep)
    //     if(err) return toast.error('Erro ao buscar endereço', err);
    //     body.cidade = res!.localidade;
    //     body.rua = res!.logradouro;
    //     body.bairro = res!.bairro;
    //     body.estado = res!.uf;
    // }

    function validate():boolean{
        sendSignal(Signal.VALIDAR_INPUTS)
        let message = '';
        if(body.username.length < 3) message = 'O nome deve ter pelo menos 3 letras';
        if(validators.validateCpfCnpj(body.cpf_cnpj ?? '') !== '') message = 'CPF/CNPJ inválido';
        if(validators.validateEmail(body.email ?? '') !== '' ) message = 'Email inválido';
        // if(body.user_permissions.length === 0) message = 'Selecione pelo menos uma permissão';
        if(validators.validatePassword(body.password ?? '') !== '') message = 'Senha inválida';
        if(body.password !== compararSenha) message = 'As senhas devem ser iguais';
        if(message !== '') {
            toast.error('Erro ao registrar o usuario', message);
            return false
        }
        return true
    }

    async function registrar(){
        if(!validate()) return;
        const [_, err] = await usuarioController.cadastrar(body);
        if(err) return toast.error('Erro ao registrar o usuario', err.message);
        toast.success( 'Sucesso', 'Usuario registrado!');
        goto('/usuarios')
    }

    // $effect(()=>{
        // if(body.cep.length > 8) getEndereco(body.cep)
        // if(permissoes) body.user_permissions = permissoes.split(',');
    // })
</script>

<div class="w-full px-3 py-1.5 text-sm font-light bg-white text-sub-600 grid grid-cols-10 gap-4">
    <!-- Primeira linha do form -->
        <div class="col-span-6  ">
            <MainInput label="Nome" bind:value={body.username} validate={(v) => validators.validateFieldValue(v ?? '')}/>
        </div>
        <div class="col-span-4">
            <MainInput label="CPF/CNPJ" bind:value={body.cpf_cnpj} sanitize={(v)=>sanitizar.cpfcnpj(v)} validate={(v) => validators.validateCpfCnpj(v ?? '')}/>
        </div>
    <!-- Segunda linha do form -->
        <!-- <div class="col-span-2">
            <MainInput label="CEP" bind:value={body.cep} sanitize={(v) => sanitizar.cep(v)} validate={(v) => validators.validateCep(v ?? '')}/>
        </div>
        <div class="col-span-2">
            <MainInput label="Cidade" bind:value={body.cidade} validate={(v) => validators.validateFieldValue(v ?? '')}/>
        </div>
        <div class="col-span-2">
            <MainInput label="Rua" bind:value={body.rua} validate={(v) => validators.validateFieldValue(v ?? '')}/>
        </div>
        <div class="col-span-2">
            <MainInput label="Bairro" bind:value={body.bairro} validate={(v) => validators.validateFieldValue(v ?? '')}/>
        </div>
        <div class="col-span-1">
            <MainInput label="Estado" bind:value={body.estado} validate={(v) => validators.validateState(v ?? '')}/>
        </div>
        <div class="col-span-1">
            <MainInput label="Número" bind:value={body.numero} sanitize={(v) => sanitizar.numero(v)} validate={(v) => validators.validateEmptyField(v ?? '')}/>
        </div> -->
    <!-- Terceira linha do form -->
        <!-- <div class="col-span-2">
            <MainInput label="Whatsapp" bind:value={body.whatsapp} sanitize={(v) => sanitizar.telefone(v)} validate={(v) => validators.validatePhone(v ?? '')}/>
        </div> -->
        <div class="col-span-2">
            <MainInput label="Email" bind:value={body.email} validate={(v) => validators.validateEmail(v ?? '')}/>
        </div>
        <div class="col-span-2">
            <MainInput label="Permissão do usuário" bind:value={permissoes} validate={(v) => validators.validateEmptyField(v ?? '')}/>
        </div>
        <div class="col-span-2">
            <PassInput label="Senha" bind:value={body.password} validate={(v) => validators.validatePassword(v ?? '')}/>
        </div>
        <div class="col-span-2">
            <PassInput label="Confirme a Senha" bind:value={compararSenha} validate={(v) => validators.validateEqualityFields(v ?? '', body.password ?? '', 'Senha')}/>
        </div>
    <!-- Quarta linha do form -->
        <div class="col-span-10 flex justify-end">
            <MainButton label="Salvar" action={registrar}/>
        </div>
    </div>