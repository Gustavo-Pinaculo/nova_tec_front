<script lang="ts">
	import MainButton from '$components/assets/buttons/MainButton.svelte';
	import MainInput from '$components/assets/inputs/MainInput.svelte';
	import toast from '$lib/utils/toasts.svelte';

	import { EnderecosController } from '$lib/enderecos/enderecos.controller';
	import sanitizar from '$lib/sanitizers/sanitizers';
	import PassInput from '$components/assets/inputs/PassInput.svelte';

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

{#snippet header()}
    <div class="flex justify-between items-center w-full">
        <h1 class="font-bold">Novo Usuário</h1>
    </div>
{/snippet}

{#snippet formNovoUsuario()}
    <div class="w-full px-3 py-1.5 text-sm font-light bg-white text-sub-600 grid grid-cols-10 gap-4">
    <!-- Primeira linha do form -->
        <div class="col-span-6  ">
            <MainInput label="Nome" bind:value={body.nome} />
        </div>
        <div class="col-span-4">
            <MainInput label="CPF/CNPJ" bind:value={body.documentoFiscal} sanitize={(v)=>sanitizar.cpfcnpj(v)}/>
        </div>
    <!-- Segunda linha do form -->
        <div class="col-span-2">
            <MainInput label="CEP" bind:value={body.cep} sanitize={(v) => sanitizar.cep(v)}/>
        </div>
        <div class="col-span-2">
            <MainInput label="Cidade" bind:value={body.cidade} />
        </div>
        <div class="col-span-2">
            <MainInput label="Rua" bind:value={body.rua} />
        </div>
        <div class="col-span-2">
            <MainInput label="Bairro" bind:value={body.bairro} />
        </div>
        <div class="col-span-1">
            <MainInput label="Estado" bind:value={body.estado} />
        </div>
        <div class="col-span-1">
            <MainInput label="Número" bind:value={body.numero} sanitize={(v) => sanitizar.numero(v)}/>
        </div>
    <!-- Terceira linha do form -->
        <div class="col-span-2">
            <MainInput label="Whatsapp" bind:value={body.whatsapp} sanitize={(v) => sanitizar.telefone(v)}/>
        </div>
        <div class="col-span-2">
            <MainInput label="Email" bind:value={body.email}/>
        </div>
        <div class="col-span-2">
            <MainInput label="Permissão do usuário" bind:value={body.permissao}/>
        </div>
        <div class="col-span-2">
            <PassInput label="Senha" bind:value={body.senha}/>
        </div>
        <div class="col-span-2">
            <PassInput label="Confirme a Senha" bind:value={comparedPassword}/>
        </div>
    <!-- Quarta linha do form -->
        <div class="col-span-10 flex justify-end">
            <MainButton label="Salvar" action={() => console.log(body)}/>
        </div>
    </div>
{/snippet}


{@render header()}
<div class="w-full bg-white p-3 flex flex-col gap-3 rounded-lg shadow-[0px_4px_4px_rgba(0,0,0,0.25)]">
    <h3 class="font-semibold">Insira os dados do novo usuário</h3>
    {@render formNovoUsuario()}
</div>