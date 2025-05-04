<script lang="ts">
	import MenuSuspenso from "$components/elements/modals/MenuSuspenso.svelte";
	import MainButton from "$components/assets/buttons/MainButton.svelte";
	import Tabela from "$components/elements/tables/Tabela.svelte";
	import SvgChevr from "$components/assets/svg/SvgChevr.svelte";
	import toast from "$lib/utils/toasts.svelte";
	
	import { ProdutosController } from "$lib/controllers/produtos.controller";
    import { goto } from "$app/navigation";
	import { onMount } from "svelte";
	import EmptyState from "$components/sections/layout/EmptyState.svelte";

    const produtosController = new ProdutosController()

    const headers = [
        { label:'Seleção', colSpan:'col-span-1' },
        { label:'ID', colSpan:'col-span-1' },
        { label:'Nome', colSpan:'col-span-3' },
        { label:'Status', colSpan:'col-span-1' },
        { label:'Ações', colSpan:'col-span-1' }
    ]

    let openFilters:boolean = $state(false)
    let produtos:any[] = $state([])

    onMount(async() => {
        const [res, err] = await produtosController.listarProdutos(1)
        if(err) return toast.error('Erro ao listar produtos', err)
        produtos = res.data.results
        console.log(produtos)
    })

</script>

{#snippet header()}
    <div class="flex justify-between items-center w-full">
        <h1 class="font-bold">Produtos</h1>
        <MainButton action={() => goto('/novo-produto')} label="Novo produto"/>
    </div>
{/snippet}

{#snippet filtros()}
    <button class="bg-white rounded-lg p-3 flex items-center justify-between relative shadow-[0px_4px_4px_rgba(0,0,0,0.25)]" onclick={() => openFilters=!openFilters}>
        <h4 class="font-semibold">Filtrar</h4>
        <SvgChevr props={{ class:`${ openFilters ? 'rotate-[180deg]' : ''}` }}/>
    </button>
{/snippet}

{#snippet tabela()}
    {#each headers as _, i}
        <div class="w-full px-3 py-1.5 text-sm font-light bg-white text-sub-600 grid grid-cols-7 last:rounded-b-lg gap-8 not-last:border-b border-[#25384B]">
            <div class="flex {headers[0].colSpan} text-sm font-medium">
                <input type="checkbox" name="" id="item-{i}">
            </div>
            <div class="flex {headers[1].colSpan} text-sm font-medium">
                {i}
            </div>
            <div class="flex {headers[2].colSpan} text-sm font-medium">
                Camiseta
            </div>
            <div class="flex {headers[3].colSpan} text-sm font-medium">
                Ativo
            </div>
            <div class="flex {headers[4].colSpan} text-sm font-medium">
                <MenuSuspenso opcoes={[{label:'Editar',action:()=>{console.log('editar')}},{label:'Deletar',action:()=>{console.log('deletar')}}]}/>
            </div>
        </div>
    {/each}
{/snippet}

{@render header()}
{@render filtros()}
{#if produtos.length > 0}
    <Tabela {headers} children={tabela} gridCols="grid-cols-7"/>
{:else}
    <EmptyState>
        <h3 class="font-bold text-2xl">Nenhum produto encontrado</h3>
    </EmptyState>
{/if}

