<script lang="ts">
	import MenuSuspenso from "$components/elements/modals/MenuSuspenso.svelte";
	import MainButton from "$components/assets/buttons/MainButton.svelte";
	import Tabela from "$components/elements/tables/Tabela.svelte";
	import SvgChevr from "$components/assets/svg/SvgChevr.svelte";
	import toast from "$lib/utils/toasts.svelte";
	
	import { ProdutosController, statusOptions, type produto } from "$lib/controllers/produtos.controller";
    import { goto } from "$app/navigation";
	import { onMount } from "svelte";
	import EmptyState from "$components/sections/layout/EmptyState.svelte";
	import DetailsSection from "$components/sections/layout/DetailsSection.svelte";

    const produtosController = new ProdutosController()

    const headers = [
        { label:'Seleção', colSpan:'col-span-1' },
        { label:'Nome', colSpan:'col-span-2' },
        { label:'Preço', colSpan:'col-span-1' },
        { label:'Quantidade', colSpan:'col-span-1' },
        { label:'Status', colSpan:'col-span-1' },
        { label:'Ações', colSpan:'col-span-1' }
    ];
    const menus = [ 'Produtos', 'Materiais' ]

    let openFilters:boolean = $state(false)
    let produtos:any[] = $state([])
    let openDelete = $state(false)
    let deleting = $state(false)
    let menuAtivo = $state(1)
    let selected = $state('')
    let page = $state(1)
    
    function resetModals(){
        deleting = false
        openDelete = false
        selected = ''
    }
    function prepararDeletar(id:string){
        selected = id
        openDelete = true
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
    async function listarProdutos() {
        const [res, err] = await produtosController.listarProdutos(page)
        if(err) return toast.error('Erro ao listar produtos', err)
        produtos = res.data.results as produto[]
    }

    onMount(async() => {
        listarProdutos()
    })
</script>

{#snippet header()}
    <div class="flex justify-between items-center w-full">
        <h1 class="font-bold">Produtos e Materiais</h1>
        <MainButton action={() => goto('/novo-produto')} label="Novo produto"/>
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

{#snippet tabela()}
    {#each produtos as { name, price, quantity, status, is_active, id }, i}
    {@const stts = statusOptions.find(stt => stt.value == status)?.label }
        <div class="w-full px-3 py-1.5 text-sm font-light bg-white text-sub-600 grid grid-cols-7 last:rounded-b-lg gap-8 not-last:border-b border-[#25384B]">
            <div class="flex {headers[0].colSpan} text-sm font-medium">
                <input type="checkbox" name="" id="item-{i}">
            </div>
            <div class="flex {headers[1].colSpan} text-sm font-medium">
                {name}
            </div>
            <div class="flex {headers[2].colSpan} text-sm font-medium">
                R$ {price.toFixed(2).replace('.',',')}
            </div> 
            <div class="flex {headers[3].colSpan} text-sm font-medium">
                {quantity}
            </div>
            <div class="flex {headers[4].colSpan} text-sm font-medium">
                {stts} ({is_active ? 'Ativo' : 'Inativo'})
            </div>
            <div class="flex {headers[5].colSpan} text-sm font-medium">
                <MenuSuspenso opcoes={[{label:'Editar',action:()=>goto(`/editar-produto?id=${id}`)},{label:'Deletar',action:()=>prepararDeletar(id)}]}/>
            </div>
        </div>
    {/each}
{/snippet}

{#snippet deleteModal()}
    {@const cliente = produtos.find(c => c.id === selected)}
    <div class="fixed w-full h-full flex items-center justify-center bg-[#F5F5F680]">
        <div class="bg-white w-[450px] rounded-lg p-3 gap-4 flex flex-col items-center justify-between relative shadow-[0px_4px_4px_rgba(0,0,0,0.25)]">
            <h4 class="font-semibold">Deseja realmente deletar o cliente {cliente.name}?</h4>
            <div class="flex gap-3 items-center {deleting ? 'pointer-events-none' : ''}">
                <MainButton padding={'p-1'} bg={'bg-gray-600'} action={() => resetModals()} label="Cancelar"/>
                <MainButton padding={'p-1'} bg={'bg-red-600'} action={() => deletarProduto()} label="Deletar"/>
            </div>
        </div>
    </div>
{/snippet}

{#snippet details()}
    <DetailsSection/>
{/snippet}

{@render header()}
{@render tabs()}
{#if menuAtivo === 0}
    {@render filtros()}
    {#if produtos.length > 0}
        <Tabela {headers} children={tabela} gridCols="grid-cols-7"/>
    {:else}
        <EmptyState>
            <h3 class="font-bold text-2xl">Nenhum produto encontrado</h3>
        </EmptyState>
    {/if}
{:else}
    {@render details()}
{/if}
{#if openDelete}
    {@render deleteModal()}
{/if}