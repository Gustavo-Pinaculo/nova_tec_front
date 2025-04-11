<script>
	import MainButton from "$components/assets/buttons/MainButton.svelte";
	import Tabela from "$components/elements/tables/Tabela.svelte";
	
    import { goto } from "$app/navigation";
	import MenuSuspenso from "$components/elements/modals/MenuSuspenso.svelte";

    const headers = [
        {
        label:'Seleção',
            colSpan:'col-span-1'
        },
        {
            label:'ID',
            colSpan:'col-span-1'
        },
        {
            label:'Nome',
            colSpan:'col-span-3'
        },
        {
            label:'Status',
            colSpan:'col-span-1'
        },
        {
            label:'Ações',
            colSpan:'col-span-1'
        }
    ]

</script>

{#snippet tabela()}
    {#each headers as _, i}
        <div class="w-full px-3 py-1.5 text-sm font-light bg-weak-50 text-sub-600 grid grid-cols-7 gap-8 not-last:border-b border-[#25384B]">
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

<h1 class="font-bold">Produtos</h1>
<div class="flex justify-end w-full">
    <MainButton action={() => goto('/novo-produto')} label="Novo produto"/>
</div>
<Tabela {headers} children={tabela} gridCols="grid-cols-7"/>

