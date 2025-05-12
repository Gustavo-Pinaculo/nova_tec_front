<script lang="ts">
	import { goto } from "$app/navigation";
	import MenuSuspenso from "$components/elements/modals/MenuSuspenso.svelte";
	import Tabela from "$components/elements/tables/Tabela.svelte";
	import { ProdutosController, statusOptions } from "$lib/controllers/produtos.controller";
	import toast from "$lib/utils/toasts.svelte";

    const headers = [
        { label:'Seleção', colSpan:'col-span-1' },
        { label:'Nome', colSpan:'col-span-2' },
        { label:'Preço', colSpan:'col-span-1' },
        { label:'Quantidade', colSpan:'col-span-1' },
        { label:'Status', colSpan:'col-span-1' },
        { label:'Ações', colSpan:'col-span-1' }
    ];
    const produtosController = new ProdutosController()

    interface Props {
        produtos: any[],
        openDelete: boolean,
        selected: string
    }

    let {
        produtos = $bindable([]),
        openDelete = $bindable(false),
        selected = $bindable('')
    }: Props = $props();
    let deleting = $state(false)

    function prepararDeletar(id:string){
        selected = id
        openDelete = true
    }
</script>

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

<Tabela {headers} children={tabela} gridCols="grid-cols-7"/>