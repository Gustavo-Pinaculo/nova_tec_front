<script lang="ts">
	import { goto } from "$app/navigation";
	import MenuSuspenso from "$components/elements/modals/MenuSuspenso.svelte";
	import Tabela from "$components/elements/tables/Tabela.svelte";
	import handleDate from "$lib/sanitizers/date";

    const headers = [
        { label:'Nome', colSpan:'col-span-4' },
        { label:'Criada em', colSpan:'col-span-1' },
        { label:'Status', colSpan:'col-span-1' },
        { label:'Ações', colSpan:'col-span-1' }
    ];

    interface Props {
        categorias: { name: string, is_active: boolean, id: string, created_at: string }[],
        openDelete: boolean,
        selected: string
    }

    let {
        categorias = $bindable([]),
        openDelete = $bindable(false),
        selected = $bindable('')
    }: Props = $props();

    function prepararDeletar(id:string){
        selected = id
        openDelete = true
    }
</script>

{#snippet tabela()}
    {#each categorias as { name, is_active, id, created_at }, i}
        <div class="w-full px-3 py-1.5 text-sm font-light bg-white text-sub-600 grid grid-cols-7 last:rounded-b-lg gap-8 not-last:border-b border-[#25384B]">
            <div class="flex {headers[0].colSpan} text-sm font-medium">
                {name}
            </div>
            <div class="flex {headers[1].colSpan} text-sm font-medium">
                {handleDate.formatISODate(created_at)}
            </div>
            <div class="flex {headers[2].colSpan} text-sm font-medium">
                {is_active ? 'Ativa' : 'Inativa'}
            </div>
            <div class="flex {headers[3].colSpan} text-sm font-medium">
                <MenuSuspenso opcoes={[{label:'Deletar',action:()=>prepararDeletar(id)}]}/>
                <!-- <MenuSuspenso opcoes={[{label:'Editar',action:()=>goto(`/editar-produto?id=${id}`)},{label:'Deletar',action:()=>prepararDeletar(id)}]}/> -->
            </div>
        </div>
    {/each}
{/snippet}

<Tabela {headers} children={tabela} gridCols="grid-cols-7"/>