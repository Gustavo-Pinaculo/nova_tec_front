<script lang="ts">
	import NewProductForm from '$components/elements/forms/NewProductForm.svelte';
	import MainButton from '$components/assets/buttons/MainButton.svelte';
	import { CategoriasController } from '$lib/controllers/categorias.controller';
	import toast from '$lib/utils/toasts.svelte';
	import { onMount } from 'svelte';

    const categoriasController = new CategoriasController();

    let registerCategories = $state(false);
    let categories = $state<string[]>([]);
    let loading = $state(false);

    async function registrarCategorias(categories:string){
        loading = true;
        const formData = new FormData();
        categories.split(',').forEach(category => formData.append('name', category));
        const [_, err] = await categoriasController.cadastrarCategoria(formData);
        loading = false;
        if(err) return toast.error('Erro ao cadastrar categoria', err.message);
        toast.success('Sucesso', 'Categoria cadastrada!');
        buscarCategorias();
        registerCategories = false;
    }
    async function buscarCategorias(){
        const [res, err] = await categoriasController.listarCategorias();
        if(err) return toast.error('Erro ao buscar categorias', err.message);
        categories = res.data;
    }

    onMount(() => {
        buscarCategorias();
    })
</script>

{#snippet header()}
    <div class="flex justify-between items-center w-full">
        <h1 class="font-bold">Novo Produto</h1>
    </div>
{/snippet}

{#snippet registroDeCategorias()}
    <div class="fixed w-full h-full flex items-center justify-center bg-[#F5F5F680]">
        <div class="bg-white w-[450px] rounded-lg p-3 gap-4 flex flex-col relative shadow-[0px_4px_4px_rgba(0,0,0,0.25)]">
            <h4 class="font-semibold">Insira as categorias que deseja cadastrar</h4>
            <p class="text-sm text-[#212529]">Adicione as categorias em linha separadas por vírgula.<br> Ex: Categoria 1, Categoria 2</p>
            <textarea class="w-full outline-none text-sm border border-[#00000066] rounded-lg p-2" bind:value={categories}></textarea>
            <div class="flex w-full gap-3 justify-center {loading ? 'pointer-events-none' : ''}">
                <MainButton padding={'p-1'} bg={'bg-gray-600'} action={() => registerCategories = false} label="Cancelar"/>
                <MainButton padding={'p-1'} bg={'bg-[#3E9830]'} action={() => registrarCategorias('')} label="Registrar"/>
            </div>
        </div>
    </div>
{/snippet}

{@render header()}
<div class="w-full bg-white p-3 flex flex-col gap-3 rounded-lg shadow-[0px_4px_4px_rgba(0,0,0,0.25)]">
    <h3 class="font-semibold">Insira os dados do novo produtos</h3>
    <NewProductForm bind:categories bind:registerCategories/>
</div>

{#if registerCategories}
    {@render registroDeCategorias()}
{/if}