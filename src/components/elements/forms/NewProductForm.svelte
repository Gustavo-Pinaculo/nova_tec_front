<script lang="ts">
	import MainButton from '$components/assets/buttons/MainButton.svelte';
	import MainSelect from '$components/assets/inputs/MainSelect.svelte';
	import MainInput from '$components/assets/inputs/MainInput.svelte';
	import validators from '$lib/sanitizers/validators';
	import sanitizar from '$lib/sanitizers/sanitizers';
	import toast from '$lib/utils/toasts.svelte';

	import { ProdutosController, statusOptions, type produto } from '$lib/controllers/produtos.controller';
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';
	import { CategoriasController } from '$lib/controllers/categorias.controller';


    interface Props {
        registerCategories: boolean;
        categories: string[];
    }

    const id = new URLSearchParams(window.location.search).get('id');
    const categoriasController = new CategoriasController();
    const clientesController = new ProdutosController();
    const body: produto = $state({
        name: '',
        categories: [],
        price: '0',
        notes: '',
        quantity: '0',
        status: 'IN_ANALYSIS',
    })

    let { categories = $bindable(), registerCategories = $bindable() } = $props();
    let updating = $state(false);
    let edition = $state(false);
    let categorie = $state('');

    function resetForm(){
        body.name = '';
        body.categories = [];
        body.price = '0';
        body.notes = '';
        body.quantity = '0';
        body.status = 'IN_ANALYSIS';
    }
    function abrirCadastroCategorias(){
        registerCategories = true;
    }

    async function lidarCadastro(){
        if(updating) return;
        updating = true;
        const bodySend = {...body}
        bodySend.price = body.price.split('R$ ').join('').toString();
        const [_, err] = edition ? await clientesController.editarProduto(bodySend, id!)
            : await clientesController.cadastrarProduto(bodySend);
        updating = false;
        if(err) return toast.error('Erro ao cadastrar cliente', err.message);
        toast.success('Sucesso', edition ? 'Cliente editado!' : 'Cliente cadastrado!');
        resetForm();
        goto('/produtos');
    }

    $effect(() => {
        if(categorie) {
            const lista = categorie.split(',').map(c => c.trim()).filter(Boolean);
            body.categories = [...lista];
        }
    });

    onMount(async() => {
        if(!id) return;
        const [res, err] = await clientesController.buscarProduto(id);
        if(err) return toast.error('Erro ao buscar cliente', err.message);
        edition = true;
        const data = res.data;
        body.name = data.name;
        body.categories = data.categories;
        body.price = data.price;
        body.notes = data.notes;
        body.quantity = data.quantity;
        body.status = data.status;
    })
</script>


<div class="w-full px-3 py-1.5 text-sm font-light bg-white text-sub-600 grid grid-cols-10 gap-4">
    <!-- Primeira linha do form -->
    <div class="col-span-6">
        <MainInput label="Nome" bind:value={body.name} validate={(value) => validators.validateFieldValue(value!)}/>
    </div>
    <div class="col-span-2">
        <MainInput label="Preço" bind:value={body.price} sanitize={(v) => sanitizar.reais(v)} validate={(v) => validators.validateMoney(v ?? '')}/>
    </div>
    <div class="col-span-2">
        <MainInput label="Quantidade" bind:value={body.quantity} sanitize={(v) => sanitizar.numero(v)} validate={(v) => validators.validateEmptyField(v ?? '')}/>
    </div>
    <!-- Segunda linha do form -->
    <div class="col-span-2">
        <MainSelect label='Status' bind:value={body.status} options={statusOptions} mandatory={true}/>
    </div>
    {#if categories.length > 0}
        <div class="col-span-2">
            <MainSelect label='Categorias' bind:value={categorie} multiple={true} options={categories} mandatory={true}/>
        </div>
    {/if}
    <button class="p-2 gap-2 col-span-2 flex items-center bg-[#25384B] rounded-xl" onclick={abrirCadastroCategorias}>
        <img src="/icons/add-svgrepo-com.svg" alt="" class="w-5">
        <p class="text-white tex-sm font-medium">Adicionar categoria(s)</p>
    </button>
    <div class="col-span-10">
        <MainInput label="Observações" bind:value={body.notes} validate={(v) => validators.validateFieldValue(v ?? '')}/>
    </div>

    <!-- Terceira linha do form -->
    <div class="col-span-10 flex justify-end {updating ? 'pointer-events-none opacity-50' : ''}">
        <MainButton label="Salvar" action={lidarCadastro}/>
    </div>

</div>