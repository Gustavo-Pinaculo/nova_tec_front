<script lang="ts">
	import { goto } from '$app/navigation';
	import MainSelect from '$components/assets/inputs/MainSelect.svelte';
	import { ClientesController } from '$lib/controllers/clientes.controller';
	import toast from '$lib/utils/toasts.svelte';
	import { onMount } from 'svelte';

    const clientesContorller = new ClientesController();

    let clienteSelecionado = $state('');
    let clientes = $state<any[]>([]);
    let page = $state(1);

    async function listarClientes(){
        const [res, err] = await clientesContorller.listarClientes(page);
        if(err) return toast.error('Erro ao buscar clientes', err.message);
        const clientesParaObj = res.data.results.map((c:any) => ({label:c.name, value:c.id}));
        clientes = [clientes, ...clientesParaObj];
        clientes = clientes.flat();
        if(res.data.next !== null){
            page++;
            return listarClientes();
        }
        page = 1;
        return;
    }

    onMount(() => {
        listarClientes();
    })

</script>

{#snippet header()}
    <div class="flex justify-between items-center w-full">
        <h1 class="font-bold">Novo Pedido</h1>
    </div>
{/snippet}

{@render header()}
<div class="w-full bg-white p-3 flex flex-col gap-3 rounded-lg shadow-[0px_4px_4px_rgba(0,0,0,0.25)]">
    <span class="flex w-full justify-between">
        <h3 class="font-semibold">Cliente</h3>
        <button class="p-2 gap-2 col-span-2 flex items-center bg-[#25384B] rounded-xl" onclick={()=>goto('/novo-cliente')}>
            <img src="/icons/add-svgrepo-com.svg" alt="" class="w-5">
            <p class="text-white tex-sm font-medium">Adicionar cliente</p>
        </button>
    </span>
    <MainSelect label='Selecione o cliente' bind:value={clienteSelecionado} options={clientes}/>
</div>