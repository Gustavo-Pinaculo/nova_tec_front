<script lang="ts">

    interface Props {
        headers: {
            colSpan: string;
            label: string;
        }[];
        produtos: any[];
        detalhes: Record<string, any[]>;
        listaPedidos: any[];
        deletarPedido: (index: number) => void;
        adicionarDesign: (index: number) => void;
        adicionarPedido: boolean;
        lidarComPedido: (adicionar: boolean, index: number) => void;
    }

    let {
        headers,
        listaPedidos = $bindable([]),
        produtos = $bindable([]),
        detalhes = $bindable({}),
        deletarPedido,
        adicionarDesign,
        adicionarPedido = $bindable(false),
        lidarComPedido
    }:Props = $props()
</script>

{#snippet button(label:string, action:VoidFunction, conditional?:boolean, hasPlus:boolean = false)}
    <button class="p-2 gap-2 col-span-2 flex items-center {conditional ? 'bg-[#3E9830]' : 'bg-[#c8e4c4] pointer-events-none'} rounded-xl" onclick={action}>
        {#if hasPlus}
            <img src="/icons/add-svgrepo-com.svg" alt="" class="w-5">
        {/if}
        <p class="text-white tex-sm font-medium">{label}</p>
    </button>
{/snippet}

{#if listaPedidos.length > 0}
    
    {#each listaPedidos as pedidos, i}
        <div class="w-full bg-white p-3 flex flex-col gap-3 rounded-lg shadow-[0px_4px_4px_rgba(0,0,0,0.25)]">
            <div class="flex items-center justify-between w-full">
                <h3 class="font-semibold">Pedido #{(i + 1).toString().padStart(3, '0')}</h3>
                <span class="flex gap-3">
                    {@render button('Adicionar Produto', () => lidarComPedido(false, i), adicionarPedido, true)}
                    {@render button('Adicionar Design', () => adicionarDesign(i), adicionarPedido, true)}
                    <button class="p-2 rounded-xl bg-red-300" onclick={() => deletarPedido(i)}>
                        <img src="/icons/delete-icon.svg" alt="">
                    </button>
                </span>
            </div>
            <div class="grid grid-cols-10 gap-2 bg-[#25384B] p-2 rounded-lg">
                {#each headers as {colSpan, label} }
                    <div class="{colSpan}">
                        <p class="text-sm text-white font-medium">{label}</p>
                    </div>
                {/each}
            </div>
            {#if pedidos && pedidos.produtos}
                {#each pedidos.produtos as pedido }
                    <div class="grid grid-cols-10 gap-2 p-2">
                        <div class="col-span-3">
                            <p class="text-lg">{produtos.find((c:any) => c.value === pedido.produto).label}</p>
                        </div>
                        <div class="col-span-1">
                            <p class="text-lg">{pedido.preco}</p>
                        </div>
                        <div class="col-span-1">
                            <p class="text-lg">{pedido.quantidade}</p>
                        </div>
                        <div class="col-span-1">
                            <p class="text-lg">{pedido.tecido !== '' ? detalhes.tecidos.find((c:any) => c.value === pedido.tecido)!.label : '--'}</p>
                        </div>
                        <div class="col-span-1">
                            <p class="text-lg">{pedido.gola !== '' ? detalhes.golas.find((c:any) => c.value === pedido.gola)!.label : '--'}</p>
                        </div>
                        <div class="col-span-1">
                            <p class="text-lg">{pedido.camisa !== '' ? detalhes.camisas.find((c:any) => c.value === pedido.camisa)!.label : '--'}</p>
                        </div>
                        <div class="col-span-1">
                            <p class="text-lg">{pedido.pintura !== '' ? detalhes.pinturas.find((c:any) => c.value === pedido.pintura)!.label : '--'}</p>
                        </div>
                    </div>
                {/each}
            {/if}
        </div>
    {/each}
{/if}