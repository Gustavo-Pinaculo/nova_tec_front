<script>
	import MainButton from "$components/assets/buttons/MainButton.svelte";
	import Tabela from "$components/elements/tables/Tabela.svelte";
	
    import { goto } from "$app/navigation";
	import MenuSuspenso from "$components/elements/modals/MenuSuspenso.svelte";
	import SvgChevr from "$components/assets/svg/SvgChevr.svelte";

    const headers = [
        { label:'Seleção', colSpan:'col-span-1' },
        { label:'ID', colSpan:'col-span-1' },
        { label:'Cliente', colSpan:'col-span-2' },
        { label:'Documento Fiscal', colSpan:'col-span-1' },
        { label:'Status', colSpan:'col-span-1' },
        { label:'Ações', colSpan:'col-span-1' }
    ]

    let openFilters = $state(false)

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
    {#each headers as _, i}
        <div class="w-full px-3 py-1.5 text-sm font-light bg-white text-sub-600 grid grid-cols-7 last:rounded-b-lg gap-8 not-last:border-b border-[#25384B]">
            <div class="flex {headers[0].colSpan} text-sm font-medium">
                <input type="checkbox" name="" id="item-{i}">
            </div>
            <div class="flex {headers[1].colSpan} text-sm font-medium">
                {i}
            </div>
            <div class="flex {headers[2].colSpan} text-sm font-medium">
                Nome do cliente aqui
            </div>
            <div class="flex {headers[3].colSpan} text-sm font-medium">
                Documento fiscal do cliente aqui
            </div>
            <div class="flex {headers[4].colSpan} text-sm font-medium">
                Ativo
            </div>
            <div class="flex {headers[5].colSpan} text-sm font-medium">
                <MenuSuspenso opcoes={[{label:'Editar',action:()=>{console.log('editar')}},{label:'Deletar',action:()=>{console.log('deletar')}}]}/>
            </div>
        </div>
    {/each}
{/snippet}

{@render header()}
{@render filtros()}
<Tabela {headers} children={tabela} gridCols="grid-cols-7"/>

