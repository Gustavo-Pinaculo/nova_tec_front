<script lang="ts">
	import MainButton from '$components/assets/buttons/MainButton.svelte';
	import MainInput from '$components/assets/inputs/MainInput.svelte';
	import sanitizar from '$lib/sanitizers/sanitizers';
	import toast from '$lib/utils/toasts.svelte';

	import { EnderecosController } from '$lib/enderecos/enderecos.controller';
    import { ClientesController, type cliente } from '$lib/controllers/clientes.controller';
	import validators from '$lib/sanitizers/validators';
	import { sinal } from '$lib/utils/sinalizador';

    const enderecosController = new EnderecosController();
    const clientesController = new ClientesController();

    const body: cliente = $state({
        nome: '',
        documentoFiscal: '',
        cep: '',
        cidade: '',
        rua: '',
        bairro: '',
        estado: '',
        numero: '',
        whatsapp: ''
    })

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
$inspect($sinal)
</script>


<div class="w-full px-3 py-1.5 text-sm font-light bg-white text-sub-600 grid grid-cols-10 gap-4">
    <!-- Primeira linha do form -->
    <div class="col-span-6">
        <MainInput label="Nome" bind:value={body.nome} validate={(value) => validators.validateFieldValue(value!)}/>
    </div>
    <div class="col-span-2">
        <MainInput label="CPF/CNPJ" bind:value={body.documentoFiscal} sanitize={(v)=>sanitizar.cpfcnpj(v)} validate={(v) => validators.validateCpfCnpj(v ?? '')}/>
    </div>
    <div class="col-span-2">
        <MainInput label="CEP" bind:value={body.cep} sanitize={(v) => sanitizar.cep(v)} validate={(v) => validators.validateCep(v ?? '')}/>
    </div>
    <!-- Segunda linha do form -->
    <div class="col-span-2">
        <MainInput label="Cidade" bind:value={body.cidade} validate={(v)=>validators.validateFieldValue(v ?? '')}/>
    </div>
    <div class="col-span-2">
        <MainInput label="Rua" bind:value={body.rua} validate={(v)=>validators.validateFieldValue(v ?? '')}/>
    </div>
    <div class="col-span-2">
        <MainInput label="Bairro" bind:value={body.bairro} validate={(v)=>validators.validateFieldValue(v ?? '')}/>
    </div>
    <div class="col-span-1">
        <MainInput label="Estado" bind:value={body.estado} validate={(v)=>validators.validateState(v ?? '')}/>
    </div>
    <div class="col-span-1">
        <MainInput label="Número" bind:value={body.numero} sanitize={(v) => sanitizar.numero(v)} validate={(v) => validators.validateEmptyField(v ?? '')}/>
    </div>
    <div class="col-span-2">
        <MainInput label="Whatsapp" bind:value={body.whatsapp} sanitize={(v) => sanitizar.telefone(v)} validate={(v) => validators.validatePhone(v ?? '')}/>
    </div>

    <!-- Terceira linha do form -->
    <div class="col-span-10 flex justify-end">
        <MainButton label="Salvar" action={() => clientesController.cadastrar(body)}/>
    </div>

</div>