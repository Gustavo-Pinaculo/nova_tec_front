<script lang='ts'>
    import MenuSuspenso from "$components/elements/modals/MenuSuspenso.svelte";
	import EmptyState from "$components/sections/layout/EmptyState.svelte";
	import MainButton from "$components/assets/buttons/MainButton.svelte";
    import Tabela from "$components/elements/tables/Tabela.svelte";
	import SvgChevr from "$components/assets/svg/SvgChevr.svelte";
	import toast from "$lib/utils/toasts.svelte";
	
	import { ClientesController } from "$lib/controllers/clientes.controller";
    import { goto } from "$app/navigation";
	import { onMount } from "svelte";

    const clientesController = new ClientesController()

    const headers = [
        { label:'Seleção', colSpan:'col-span-1' },
        // { label:'ID', colSpan:'col-span-1' },
        { label:'Cliente', colSpan:'col-span-3' },
        { label:'Documento Fiscal', colSpan:'col-span-1' },
        { label:'Status', colSpan:'col-span-1' },
        { label:'Ações', colSpan:'col-span-1' }
    ]

    let openFilters = $state(false)
    let clientes:any[] = $state([])
    let openDelete = $state(false)
    let deleting = $state(false)
    let selected = $state('')

    function prepararDeletar(id:string){
        selected = id
        openDelete = true
    }
    function prepararEditar(id:string){
        goto(`/editar-cliente?id=${id}`)
    }
    function resetModals(){
        openDelete = false
        deleting = false
        selected = ''
    }

    async function listarClientes(page:number){
        const [res, err] = await clientesController.listarClientes(1)
        if(err) return toast.error('Erro ao listar clientes', err)
        clientes = res.data.results
    }
    async function deletarCliente(){
        deleting = true
        const [_, err] = await clientesController.deletarCliente(selected)
        if(err) return toast.error('Erro ao deletar cliente', err)
        resetModals()
        await listarClientes(1)
        toast.success('Sucesso','Cliente deletado!')
    }

    onMount(async()=>{
        listarClientes(1)
    })
</script>

{#snippet header()}
    <div class="flex justify-between items-center w-full">
        <h1 class="font-bold">Clientes</h1>
        <span class="flex gap-3 items-center">
            <MainButton action={() => goto('/novo-cliente')} label="Novo Cliente"/>
        </span>
    </div>
{/snippet}

{#snippet filtros()}
    <button class="bg-white rounded-lg p-3 flex items-center justify-between relative shadow-[0px_4px_4px_rgba(0,0,0,0.25)]" onclick={() => openFilters=!openFilters}>
        <h4 class="font-semibold">Filtrar</h4>
            <SvgChevr props={{ class:`${ openFilters ? 'rotate-[180deg]' : ''}` }}/>
    </button>
{/snippet}

{#snippet tabela()}
    {#each clientes as {id, name, cpf_cnpj, is_active}, i}
        <div class="w-full px-3 py-1.5 text-sm font-light bg-white text-sub-600 grid grid-cols-7 last:rounded-b-lg gap-8 not-last:border-b border-[#25384B]">
            <div class="flex {headers[0].colSpan} text-sm font-medium">
                <input type="checkbox" name="" id="item-{i}">
            </div>
            <!-- <div class="flex {headers[1].colSpan} text-sm font-medium">
                {id}
            </div> -->
            <div class="flex {headers[1].colSpan} text-sm font-medium">
                {name}
            </div>
            <div class="flex {headers[2].colSpan} text-sm font-medium">
                {cpf_cnpj}
            </div>
            <div class="flex {headers[3].colSpan} text-sm font-medium">
                {!is_active ? 'Inativo' : 'Ativo'}
            </div>
            <div class="flex {headers[4].colSpan} text-sm font-medium">
                <MenuSuspenso opcoes={[{label:'Editar',action:()=>prepararEditar(id)},{label:'Deletar',action:()=>prepararDeletar(id)}]}/>
            </div>
        </div>
    {/each}
{/snippet}

{#snippet deleteModal()}
    {@const cliente = clientes.find(c => c.id === selected)}
    <div class="fixed w-full h-full flex items-center justify-center bg-[#F5F5F680]">
        <div class="bg-white w-[450px] rounded-lg p-3 gap-4 flex flex-col items-center justify-between relative shadow-[0px_4px_4px_rgba(0,0,0,0.25)]">
            <h4 class="font-semibold">Deseja realmente deletar o cliente {cliente.name}?</h4>
            <div class="flex gap-3 items-center {deleting ? 'pointer-events-none' : ''}">
                <MainButton padding={'p-1'} bg={'bg-gray-600'} action={() => resetModals()} label="Cancelar"/>
                <MainButton padding={'p-1'} bg={'bg-red-600'} action={() => deletarCliente()} label="Deletar"/>
            </div>
        </div>
    </div>
{/snippet}


{@render header()}
{@render filtros()}
{#if clientes.length > 0}
<Tabela {headers} children={tabela} gridCols="grid-cols-7"/>
{:else}
<EmptyState>
    <h3 class="font-bold text-2xl">Nenhum cliente encontrado</h3>
</EmptyState>
{/if}
{#if openDelete}
    {@render deleteModal()}
{/if}

