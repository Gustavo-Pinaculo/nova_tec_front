<script lang="ts">
    import MainSelect from '$components/assets/inputs/MainSelect.svelte';
	import toast from '$lib/utils/toasts.svelte';

	import { ClientesController } from '$lib/controllers/clientes.controller';
	import { ProdutosController } from '$lib/controllers/produtos.controller';
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';
	import ModalNovoPedido from '$components/elements/modals/ModalNovoPedido.svelte';
	import { DetalhesController } from '$lib/controllers/detalhes.controller';
	import TabelaDePedidos from '$components/elements/tables/TabelaDePedidos.svelte';

    const clientesContorller = new ClientesController();
    const produtosController = new ProdutosController();
    const detalhesController = new DetalhesController();
    const headers = [
        { label:'Nome', colSpan:'col-span-3' },
        { label:'Preço', colSpan:'col-span-1' },
        { label:'Quantidade', colSpan:'col-span-1' },
        { label:'Tecido', colSpan:'col-span-1' },
        { label:'Gola', colSpan:'col-span-1' },
        { label:'Camisa', colSpan:'col-span-1' },
        { label:'Pintura', colSpan:'col-span-1' },
        { label:'Ações', colSpan:'col-span-1' }
    ]

    let listaPedidos = $state<{design:string, cliente:string, produtos:any[]}[]>([]);
    let adicionarNovoPedido = $state(false);
    let produtoAdicionado = $state<any>();
    let adicionarProduto = $state(false);
    let produtoSelecionado = $state('');
    let clienteSelecionado = $state('');
    let adicionarPedido = $state(false);
    let produtos = $state<any[]>([]);
    let clientes = $state<any[]>([]);
    let pedidos = $state<any[]>([]);
    let registrando = $state(false);
    let novoPedido = $state(false);
    let nomeCliente = $state('');
    let pageProdutos = $state(1);
    let pageClientes = $state(1);
    let indexPedido = $state(0);
    let detalhes = $state<Record<string, any[]>>({
        pinturas: [],
        tecidos: [],
        camisas: [],
        golas: [],
    });

    function adicionarPedidoALista() {
        if(registrando) return;
        registrando = true;
        const modeloPedido = {
            cliente: clienteSelecionado,
            design: '',
            produtos: [],
        }
        if (!listaPedidos[indexPedido]) listaPedidos[indexPedido] = modeloPedido;
        listaPedidos[indexPedido].produtos.push(produtoAdicionado);
        listaPedidos = listaPedidos.filter(Boolean);
        novoPedido = false;
        registrando = false;
    }
    function lidarComPedido(register:boolean = false, index: number = 0){
        adicionarNovoPedido = register;
        indexPedido = index;
        novoPedido = !novoPedido
    }
    function adicionarDesign(i:number){
        if(!listaPedidos[indexPedido].design) {
            listaPedidos[indexPedido].design = 'Design ' + (i + 1);
        }
    }
    function deletarPedido(i:number){
        listaPedidos.splice(i, 1);
        listaPedidos = [...listaPedidos];
    }

    async function listarClientes(){
        const [res, err] = await clientesContorller.listarClientes(pageClientes);
        if(err) return toast.error('Erro ao buscar clientes', err.message);
        const clientesParaObj = res.data.results.map((c:any) => ({label:c.name, value:c.id}));
        clientes = [clientes, ...clientesParaObj];
        clientes = clientes.flat();
        if(res.data.next !== null){
            pageClientes++;
            return listarClientes();
        }
        pageClientes = 1;
        return;
    }
    async function listarProdutos(){
        const [res, err] = await produtosController.listarProdutos(pageProdutos);
        if(err) return toast.error('Erro ao buscar produtos', err.message);
        const produtosParaObj = res.data.results.map((c:any) => ({label:c.name, value:c.id}));
        produtos = [produtos, ...produtosParaObj];
        produtos = produtos.flat();
        if(res.data.next !== null){
            pageProdutos++;
            return listarProdutos();
        }
        pageProdutos = 1;
        return;
    }
    async function listarDetalhes() {
        const results = await detalhesController.listarDetalhes();
        const [
            [tecidosData, tecidosError],
            [golasData, golasError],
            [camisasData, camisasError],
            [pinturasData, pinturasError],
        ] = results;
        const err = [tecidosError, golasError, camisasError, pinturasError];
        if(err.some(Boolean))
            return toast.error('Erro ao listar detalhes', err.join(', '));
        detalhes = {
            tecidos: [...tecidosData.data.results.map((c:any) => ({label:c.name, value:c.id}))],
            golas: [...golasData.data.results.map((c:any) => ({label:c.name, value:c.id}))],
            camisas: [...camisasData.data.results.map((c:any) => ({label:c.name, value:c.id}))],
            pinturas: [...pinturasData.data.results.map((c:any) => ({label:c.name, value:c.id}))]
        }
    }
    async function finalizarPedido(){
        toast.alert('Finalização de pedido em andamento', 'Essa funcionalidade ainda não foi implementada');
    }

    $effect(() => {
        if(clienteSelecionado !== '') {
            nomeCliente = clientes.find((c:any) => c.value === clienteSelecionado).label
            adicionarPedido = true
        }
    })

    onMount(() => {
        listarClientes();
        listarProdutos();
        listarDetalhes();
    })

</script>

{#snippet button(label:string, action:VoidFunction, conditional?:boolean, hasPlus:boolean = false)}
    <button class="p-2 gap-2 col-span-2 flex items-center {conditional ? 'bg-[#3E9830]' : 'bg-[#c8e4c4] pointer-events-none'} rounded-xl" onclick={action}>
        {#if hasPlus}
            <img src="/icons/add-svgrepo-com.svg" alt="" class="w-5">
        {/if}
        <p class="text-white tex-sm font-medium">{label}</p>
    </button>
{/snippet}

{#snippet resumo()}
    <div class="w-full bg-white p-3 flex justify-between gap-3 rounded-lg shadow-[0px_4px_4px_rgba(0,0,0,0.25)]">
        <span class="flex flex-col gap-1">
            <h3 class="font-semibold">Resumo do pedido</h3>
            <p class="text-sm text-[#797B7E]">R$ 0,00</p>
        </span>
        <span class="flex gap-3">
            {@render button('Adicionar Pedido', () => lidarComPedido(true, listaPedidos.length ?? 0), adicionarPedido, true)}
            {@render button('Finalizar Pedido', finalizarPedido, pedidos.length > 0)}
        </span>
    </div>
{/snippet}

<div class="flex justify-between items-center w-full">
    <h1 class="font-bold">Novo Pedido</h1>
</div>
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
{@render resumo()}
<TabelaDePedidos {headers} bind:produtos {detalhes} bind:listaPedidos 
    {deletarPedido} {adicionarDesign} bind:adicionarPedido {lidarComPedido}/>

<ModalNovoPedido bind:conditional={novoPedido} bind:produtoAdicionado bind:detalhes 
    bind:produtos bind:nomeCliente close={lidarComPedido} action={adicionarPedidoALista}/>