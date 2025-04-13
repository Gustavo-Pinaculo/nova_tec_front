<script lang="ts">
	import MainButton from "$components/assets/buttons/MainButton.svelte";
    import MainInput from "$components/assets/inputs/MainInput.svelte";
    import PassInput from "$components/assets/inputs/PassInput.svelte";
	import validators from "$lib/sanitizers/validators";
	import sanitizar from '$lib/sanitizers/sanitizers';
	import toast from "$lib/utils/toasts.svelte";

    import { EnderecosController } from '$lib/enderecos/enderecos.controller';
	import { UsuariosController } from "$lib/controllers/usuarios.controller";

    const usuarioController = new UsuariosController();
    const enderecosController = new EnderecosController();
    const body = $state({
        nome: '',
        documentoFiscal: '',
        cep: '',
        cidade: '',
        rua: '',
        bairro: '',
        estado: '',
        numero: '',
        whatsapp: '',
        email: '',
        permissao: '',
        senha: '',
    })

    let comparedPassword = $state('');

    async function getEndereco(cep:string){
        const [res, err] = await enderecosController.enderecoPorCep(cep)
        if(err) return toast.error('Erro ao buscar endereço', err);
        body.cidade = res!.localidade;
        body.rua = res!.logradouro;
        body.bairro = res!.bairro;
        body.estado = res!.uf;
    }

    $effect(()=>{
        if(body.cep.length > 8) getEndereco(body.cep)
    })
</script>

<div class="w-full px-3 py-1.5 text-sm font-light bg-white text-sub-600 grid grid-cols-10 gap-4">
    <!-- Primeira linha do form -->
        <div class="col-span-6  ">
            <MainInput label="Nome" bind:value={body.nome} validate={(v) => validators.validateFieldValue(v ?? '')}/>
        </div>
        <div class="col-span-4">
            <MainInput label="CPF/CNPJ" bind:value={body.documentoFiscal} sanitize={(v)=>sanitizar.cpfcnpj(v)} validate={(v) => validators.validateCpfCnpj(v ?? '')}/>
        </div>
    <!-- Segunda linha do form -->
        <div class="col-span-2">
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
        </div>
    <!-- Terceira linha do form -->
        <div class="col-span-2">
            <MainInput label="Whatsapp" bind:value={body.whatsapp} sanitize={(v) => sanitizar.telefone(v)} validate={(v) => validators.validatePhone(v ?? '')}/>
        </div>
        <div class="col-span-2">
            <MainInput label="Email" bind:value={body.email} validate={(v) => validators.validateEmail(v ?? '')}/>
        </div>
        <div class="col-span-2">
            <MainInput label="Permissão do usuário" bind:value={body.permissao} validate={(v) => validators.validateEmptyField(v ?? '')}/>
        </div>
        <div class="col-span-2">
            <PassInput label="Senha" bind:value={body.senha} validate={(v) => validators.validatePassword(v ?? '')}/>
        </div>
        <div class="col-span-2">
            <PassInput label="Confirme a Senha" bind:value={comparedPassword} validate={(v) => validators.validateEqualityFields(v ?? '', body.senha ?? '', 'Senha')}/>
        </div>
    <!-- Quarta linha do form -->
        <div class="col-span-10 flex justify-end">
            <MainButton label="Salvar" action={usuarioController.cadastrar}/>
        </div>
    </div>