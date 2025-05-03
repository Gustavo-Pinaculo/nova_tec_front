<script lang="ts">
	import MenuSuspenso from "$components/elements/modals/MenuSuspenso.svelte";
	import PrintButton from "$components/assets/buttons/PrintButton.svelte";
	import MainButton from "$components/assets/buttons/MainButton.svelte";
	import Tabela from "$components/elements/tables/Tabela.svelte";
	import SvgChevr from "$components/assets/svg/SvgChevr.svelte";
	
    import { goto } from "$app/navigation";
	import { UsuariosController } from "$lib/controllers/usuarios.controller";
	import toast from "$lib/utils/toasts.svelte";
	import { onMount } from "svelte";

    const usuariosController = new UsuariosController()

    const headers = [
        { label:'Seleção', colSpan:'col-span-1' },
        // { label:'ID', colSpan:'col-span-1' },
        { label:'Funcionário', colSpan:'col-span-3' },
        { label:'Nível', colSpan:'col-span-1' },
        { label:'Status', colSpan:'col-span-1' },
        { label:'Ações', colSpan:'col-span-1' }
    ]

    let openFilters = $state(false)
    let usuarios:any[] = $state([])
    let openDelete = $state(false)
    let deleting = $state(false)
    let selected = $state('')
    let page = $state(1)

    function prepararDeletar(id:string){
        selected = id
        openDelete = true
    }

    function resetModals(){
        openDelete = false
        deleting = false
        selected = ''
    }

    async function listarUsuarios(){
        const [res, err] = await usuariosController.listar(page)
        if(err) return toast.error('Erro ao listar usuários', err)
        usuarios = res.data.results
        console.log(usuarios)
    }
    async function deletarUsuario(){
        const [_, err] = await usuariosController.deletar(selected)
        if(err) return toast.error('Erro ao deletar usuário', err)
        resetModals()
        listarUsuarios()
    }

    onMount(async() => {
        listarUsuarios()
    })
</script>

{#snippet header()}
    <div class="flex justify-between items-center w-full">
        <h1 class="font-bold">Usuários</h1>
        <span class="flex gap-3 items-center">
            <PrintButton/>
            <MainButton action={() => goto('/novo-usuario')} label="Novo Usuário"/>
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
    {#each usuarios as {is_active, username, user_permissions, id}, i}
        <div class="w-full px-3 py-1.5 text-sm font-light bg-white text-sub-600 grid grid-cols-7 last:rounded-b-lg gap-8 not-last:border-b border-[#25384B]">
            <div class="flex {headers[0].colSpan} text-sm font-medium">
                <input type="checkbox" name="" id="item-{i}">
            </div>
            <!-- <div class="flex {headers[1].colSpan} text-sm font-medium">
                {i}
            </div> -->
            <div class="flex {headers[1].colSpan} text-sm font-medium">
                {username}
            </div>
            <div class="flex {headers[2].colSpan} text-sm font-medium">
                {user_permissions}
            </div>
            <div class="flex {headers[3].colSpan} text-sm font-medium">
                {is_active ? 'Ativo' : 'Inativo'}
            </div>
            <div class="flex {headers[4].colSpan} text-sm font-medium">
                <MenuSuspenso opcoes={[{label:'Editar',action:()=>{console.log('editar')}},{label:'Deletar',action:()=>prepararDeletar(id)}]}/>
            </div>
        </div>
    {/each}
{/snippet}


{#snippet deleteModal()}
    {@const cliente = usuarios.find(c => c.id === selected)}
    <div class="fixed w-full h-full flex items-center justify-center bg-[#F5F5F680]">
        <div class="bg-white w-[450px] rounded-lg p-3 gap-4 flex flex-col items-center justify-between relative shadow-[0px_4px_4px_rgba(0,0,0,0.25)]">
            <h4 class="font-semibold">Deseja realmente deletar o usuário {cliente.username}?</h4>
            <div class="flex gap-3 items-center {deleting ? 'pointer-events-none' : ''}">
                <MainButton padding={'p-1'} bg={'bg-gray-600'} action={() => resetModals()} label="Cancelar"/>
                <MainButton padding={'p-1'} bg={'bg-red-600'} action={() => deletarUsuario()} label="Deletar"/>
            </div>
        </div>
    </div>
{/snippet}


{@render header()}
{@render filtros()}
<Tabela {headers} children={tabela} gridCols="grid-cols-7"/>
{#if openDelete}
    {@render deleteModal()}
{/if}

