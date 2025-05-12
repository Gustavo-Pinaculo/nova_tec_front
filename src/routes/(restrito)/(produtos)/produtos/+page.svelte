<script lang="ts">
	import DeletarCategoria from "$components/elements/modals/DeletarCategoria.svelte";
	import TabelaCategorias from "$components/sections/tables/TabelaCategorias.svelte";
	import CriarCategorias from "$components/elements/modals/CriarCategorias.svelte";
    import DetailsSection from "$components/sections/layout/DetailsSection.svelte";
	import TabelaProdutos from "$components/sections/tables/TabelaProdutos.svelte";
	import DeletarProduto from "$components/elements/modals/DeletarProduto.svelte";
	import EmptyState from "$components/sections/layout/EmptyState.svelte";
	import MainButton from "$components/assets/buttons/MainButton.svelte";
	import SvgChevr from "$components/assets/svg/SvgChevr.svelte";
	import toast from "$lib/utils/toasts.svelte";
	
	import { ProdutosController, type produto } from "$lib/controllers/produtos.controller";
	import { CategoriasController } from "$lib/controllers/categorias.controller";
    import { goto } from "$app/navigation";
	import { onMount } from "svelte";

    const menus = [ 'Produtos', 'Materiais', 'Categorias' ];
    const categoriasController = new CategoriasController();
    const produtosController = new ProdutosController();

    let categoriaSelecionada = $state<{name:string, id:string}>({name:'', id:''})
    let produtoSelecionado = $state<{name:string, id:string}>({name:'', id:''})
    let openFilters:boolean = $state(false)
    let cadastrarCategoria = $state(false)
    let categoriasACadastrar = $state('')
    let deleteCategoria = $state(false)
    let categorias:any[] = $state([])
    let deleteProduto = $state(false)
    let produtos:any[] = $state([])
    let deleting = $state(false)
    let loading = $state(false)
    let menuAtivo = $state(2)
    let selected = $state('')
    let page = $state(1)

    function resetModals(){
        deleteCategoria = false
        deleteProduto = false
        deleting = false
        selected = ''
    }

    async function deletarProduto(){
        deleting = true
        const [_, err] = await produtosController.deletarProduto(selected)
        if(err) {
            deleting = false
            return toast.error('Erro ao deletar produto', err)
        }
        resetModals()
        await listarProdutos()
        toast.success('Sucesso','Produto deletado!')
    }
    async function deletarCategoria(){
        deleting = true
        const [_, err] = await categoriasController.deletarCategoria(selected)
        if(err) {
            deleting = false
            return toast.error('Erro ao deletar categoria', err)
        }
        resetModals()
        await listarCategorias()
        toast.success('Sucesso','Categoria deletada!')
    }
    async function listarProdutos() {
        const [res, err] = await produtosController.listarProdutos(page)
        if(err) return toast.error('Erro ao listar produtos', err)
        produtos = res.data.results as produto[]
    }
    async function listarCategorias(){
        const [res, err] = await categoriasController.listarCategorias()
        if(err) return toast.error('Erro ao listar categorias', err)
        categorias = res.data
    }
    async function registrarCategorias() {
        loading = true;
        const categorias = categoriasACadastrar.split(',').map(c => c.trim()).filter(Boolean);
        try {
            const promises = categorias.map(categoria => {
                const formData = new FormData();
                formData.append('name', categoria);
                return categoriasController.cadastrarCategoria(formData);
            });
            await Promise.all(promises);
            toast.success('Sucesso', 'Categoria(s) cadastrada(s)!');
            await listarCategorias();
            cadastrarCategoria = false;
        } catch (err: any) {
            toast.error('Erro ao cadastrar categoria', err.message || 'Erro desconhecido');
        } finally {
            loading = false;
        }
    }

    $effect(() => {
        if(selected !== '')
            produtoSelecionado = produtos.find(c => c.id === selected)
    })

    onMount(async() => {
        listarProdutos()
        listarCategorias()
    })
</script>

{#snippet header()}
    <div class="flex justify-between items-center w-full">
        <h1 class="font-bold">Produtos e Materiais</h1>
        <span class="flex gap-2 items-center">
            <MainButton action={() => goto('/novo-produto')} label="Novo produto"/>
            <MainButton action={() => cadastrarCategoria = true} label="Nova categoria"/>
        </span>
    </div>
{/snippet}

{#snippet tabs()}
    <div class="bg-white rounded-xl p-1 gap-1 flex items-center relative shadow-[0px_4px_4px_rgba(0,0,0,0.25)] w-fit">
        {#each menus as m, i}
            <button onclick={() => menuAtivo = i} class="p-2 gap-2 flex rounded-lg items-center {menuAtivo === i ? 'bg-[#25384B] text-white' : 'bg-gray-100'}">
                <h4 class="font-semibold">{m}</h4>
            </button>
        {/each}
    </div>
{/snippet}

{#snippet filtros()}
    <button class="bg-white rounded-lg p-3 flex items-center justify-between relative shadow-[0px_4px_4px_rgba(0,0,0,0.25)]" onclick={() => openFilters=!openFilters}>
        <h4 class="font-semibold">Filtrar</h4>
        <SvgChevr props={{ class:`${ openFilters ? 'rotate-[180deg]' : ''}` }}/>
    </button>
{/snippet}


{@render header()}
{@render tabs()}
{#if menuAtivo === 0}
    {@render filtros()}
    {#if produtos.length > 0}
        <TabelaProdutos bind:openDelete={deleteProduto} bind:produtos bind:selected/>
    {:else}
        <EmptyState>
            <h3 class="font-bold text-2xl">Nenhum produto encontrado</h3>
        </EmptyState>
    {/if}
{:else if menuAtivo === 1}
    <DetailsSection/>
{:else}
    {#if categorias.length > 0}
        <TabelaCategorias bind:openDelete={deleteCategoria} bind:categorias bind:selected/>
    {:else}
        <EmptyState>
            <h3 class="font-bold text-2xl">Nenhuma categoria encontrada</h3>
        </EmptyState>
    {/if}
{/if}
{#if deleteProduto}
    <DeletarProduto bind:produto={produtoSelecionado} {resetModals} {deletarProduto} bind:deleting/>
{/if}
{#if deleteCategoria}
    <DeletarCategoria bind:categoria={categoriaSelecionada} {resetModals} {deletarCategoria} bind:deleting/>
{/if}
{#if cadastrarCategoria}
    <CriarCategorias {registrarCategorias} closeModal={() => cadastrarCategoria = false} bind:loading bind:categoriasACadastrar/>
{/if}