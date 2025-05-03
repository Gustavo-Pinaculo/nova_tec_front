<script lang="ts">
	import MainButton from '$components/assets/buttons/MainButton.svelte';
	import MainInput from '$components/assets/inputs/MainInput.svelte';
	import sanitizar from '$lib/sanitizers/sanitizers';
	import toast from '$lib/utils/toasts.svelte';

	import { EnderecosController } from '$lib/enderecos/enderecos.controller';
    import { ClientesController, type cliente } from '$lib/controllers/clientes.controller';
	import validators from '$lib/sanitizers/validators';
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';

    const id = new URLSearchParams(window.location.search).get('id');
    const enderecosController = new EnderecosController();
    const clientesController = new ClientesController();
    const body: cliente = $state({
        name: '',
        cpf_cnpj: '',
        cep: '',
        city: '',
        street: '',
        district: '',
        state: '',
        number: '',
        whatsapp: ''
    })

    let updating = $state(false);
    let edition = $state(false);

    function resetForm(){
        body.name = '';
        body.cpf_cnpj = '';
        body.cep = '';
        body.city = '';
        body.street = '';
        body.district = '';
        body.state = '';
        body.number = '';
        body.whatsapp = '';
    }

    async function getEndereco(cep:string){
        const [res, err] = await enderecosController.enderecoPorCep(cep)
        if(err) return toast.error('Erro ao buscar endereço', err);
        body.city = res!.localidade;
        body.street = res!.logradouro;
        body.district = res!.bairro;
        body.state = res!.uf;
    }
    async function lidarCadastro(){
        if(updating) return;
        updating = true;
        const formData = new FormData();
        formData.append('name', body.name);
        formData.append('cpf_cnpj', body.cpf_cnpj);
        formData.append('city', body.city);
        formData.append('street', body.street);
        formData.append('district', body.district);
        formData.append('state', body.state);
        formData.append('number', body.number);
        formData.append('whatsapp', body.whatsapp);
        const [_, err] = edition ? await clientesController.editar(formData, id!) : await clientesController.cadastrar(formData);
        updating = false;
        if(err) return toast.error('Erro ao cadastrar cliente', err.message);
        toast.success('Sucesso', edition ? 'Cliente editado!' : 'Cliente cadastrado!');
        resetForm();
        goto('/clientes');
    }

    $effect(()=>{
        if(body.cep.length > 8) getEndereco(body.cep)
    })

    onMount(async() => {
        if(!id) return;
        const [res, err] = await clientesController.buscarCliente(id);
        if(err) return toast.error('Erro ao buscar cliente', err.message);
        edition = true;
        const data = res.data;
        body.name = data.name;
        body.cpf_cnpj = data.cpf_cnpj;
        body.cep = data.cep;
        body.city = data.city;
        body.street = data.street;
        body.district = data.district;
        body.state = data.state;
        body.number = data.number;
        body.whatsapp = data.whatsapp;
    })
</script>


<div class="w-full px-3 py-1.5 text-sm font-light bg-white text-sub-600 grid grid-cols-10 gap-4">
    <!-- Primeira linha do form -->
    <div class="col-span-6">
        <MainInput label="Nome" bind:value={body.name} validate={(value) => validators.validateFieldValue(value!)}/>
    </div>
    <div class="col-span-2">
        <MainInput label="CPF/CNPJ" bind:value={body.cpf_cnpj} sanitize={(v)=>sanitizar.cpfcnpj(v)} validate={(v) => validators.validateCpfCnpj(v ?? '')}/>
    </div>
    <div class="col-span-2">
        <MainInput label="CEP" bind:value={body.cep} sanitize={(v) => sanitizar.cep(v)} validate={(v) => validators.validateCep(v ?? '')}/>
    </div>
    <!-- Segunda linha do form -->
    <div class="col-span-2">
        <MainInput label="Cidade" bind:value={body.city} validate={(v)=>validators.validateFieldValue(v ?? '')}/>
    </div>
    <div class="col-span-2">
        <MainInput label="Rua" bind:value={body.street} validate={(v)=>validators.validateFieldValue(v ?? '')}/>
    </div>
    <div class="col-span-2">
        <MainInput label="Bairro" bind:value={body.district} validate={(v)=>validators.validateFieldValue(v ?? '')}/>
    </div>
    <div class="col-span-1">
        <MainInput label="Estado" bind:value={body.state} validate={(v)=>validators.validateState(v ?? '')}/>
    </div>
    <div class="col-span-1">
        <MainInput label="Número" bind:value={body.number} sanitize={(v) => sanitizar.numero(v)} validate={(v) => validators.validateEmptyField(v ?? '')}/>
    </div>
    <div class="col-span-2">
        <MainInput label="Whatsapp" bind:value={body.whatsapp} sanitize={(v) => sanitizar.telefone(v)} validate={(v) => validators.validatePhone(v ?? '')}/>
    </div>

    <!-- Terceira linha do form -->
    <div class="col-span-10 flex justify-end {updating ? 'pointer-events-none opacity-50' : ''}">
        <MainButton label="Salvar" action={lidarCadastro}/>
    </div>

</div>