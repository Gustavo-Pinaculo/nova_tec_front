<script lang="ts">
	import MainButton from "$components/assets/buttons/MainButton.svelte";
	import MainInput from "$components/assets/inputs/MainInput.svelte";
	import MainSelect from "$components/assets/inputs/MainSelect.svelte";
	import sanitizar from "$lib/sanitizers/sanitizers";
	import toast from "$lib/utils/toasts.svelte";

    type pedido = {
        quantidade: string,
        produto: string,
        tamanho: string,
        pintura: string,
        tecido: string,
        camisa: string,
        preco: string,
        gola: string,
        obs: string
    }

    interface Props {
        produtoAdicionado: pedido;
        action: VoidFunction;
        close: VoidFunction;
        nomeCliente: string;
        produtos: any[];
        detalhes: Record<string, any[]>;
        conditional: boolean;
    }

    let mostrarDetalhes = $state(false);
    let amarraCheck = $state<HTMLInputElement>();
    let {
        produtoAdicionado = $bindable(),
        nomeCliente = $bindable(),
        produtos = $bindable(),
        detalhes = $bindable(),
        conditional = $bindable(false),
        action,
        close,
    } : Props = $props();

    let body = $state<pedido>({
        quantidade: '',
        produto: '',
        tamanho: '',
        pintura: '',
        tecido: '',
        camisa: '',
        preco: '',
        gola: '',
        obs: '',
    })

    function validateBody(){    
        if(!body.produto) return toast.error('Erro ao adicionar pedido', 'Selecione um produto');
        if(!body.tamanho) return toast.error('Erro ao adicionar pedido', 'Selecione um tamanho');
        if(!body.quantidade) return toast.error('Erro ao adicionar pedido', 'Selecione uma quantidade');
        if(!body.preco) return toast.error('Erro ao adicionar pedido', 'Selecione um preco');
        if(mostrarDetalhes){
            if(!body.pintura) return toast.error('Erro ao adicionar pedido', 'Selecione uma pintura');
            if(!body.tecido) return toast.error('Erro ao adicionar pedido', 'Selecione um tecido');
            if(!body.camisa) return toast.error('Erro ao adicionar pedido', 'Selecione uma camisa');
            if(!body.gola) return toast.error('Erro ao adicionar pedido', 'Selecione uma gola');
        }
        produtoAdicionado = body
        action()
        clear(false)
    }
    function clear(closeAfter:boolean = true){
        body = {
            quantidade: '',
            produto: '',
            tamanho: '',
            pintura: '',
            tecido: '',
            camisa: '',
            preco: '',
            gola: '',
            obs: '',
        }
        if(closeAfter) close()
    }
</script>

{#snippet detalhesCamisa()}
    <div class="grid grid-cols-2 gap-2">
        <div class="grid-span-1">
            <MainSelect label="Pinturas" mandatory={true} bind:value={body.pintura} options={detalhes.pinturas}/>
        </div>
        <div class="grid-span-1">
            <MainSelect label="Tecidos" mandatory={true} bind:value={body.tecido} options={detalhes.tecidos}/>
        </div>
        <div class="grid-span-1">
            <MainSelect label="Camisas" mandatory={true} bind:value={body.camisa} options={detalhes.camisas}/>
        </div>
        <div class="grid-span-1">
            <MainSelect label="Golas" mandatory={true} bind:value={body.gola} options={detalhes.golas}/>
        </div>
    </div>
{/snippet}

{#if conditional}
    <div class="fixed w-full h-full flex items-center justify-center bg-[#F5F5F680]">
        <div class="bg-white w-[450px] rounded-lg p-3 gap-4 flex flex-col relative shadow-[0px_4px_4px_rgba(0,0,0,0.25)]">
            <h4 class="font-semibold">Detalhe o produto do pedido de {nomeCliente}</h4>
            <MainSelect label='Selecione o produto' bind:value={body.produto} options={produtos}/>
            <div class="grid grid-cols-3 gap-2 {body.produto !== '' ? '' : 'pointer-events-none opacity-20'}">
                <div class="grid-span-1">
                    <MainInput label="Tamanho" mandatory={true} bind:value={body.tamanho} sanitize={(v) => {return v}}/>
                </div>
                <div class="grid-span-1">
                    <MainInput label="Quantidade" mandatory={true} bind:value={body.quantidade} sanitize={(v) => sanitizar.numero(v)}/>
                </div>
                <div class="grid-span-1">
                    <MainInput label="Preço" mandatory={true} bind:value={body.preco} sanitize={(v) => sanitizar.reais(v)}/>
                </div>
                <div class="col-span-3">
                    <textarea placeholder="Observações" class="w-full outline-none text-sm border border-[#00000066] rounded-lg p-2" bind:value={body.obs}></textarea>
                </div>
                <div class="col-span-3">
                    <button class="flex items-center gap-2" onclick={() => amarraCheck!.click()}>
                        <input bind:this={amarraCheck} type="checkbox" bind:checked={mostrarDetalhes} /> Mostrar detalhes
                    </button>
                </div>
            </div>
            {#if mostrarDetalhes}
                {@render detalhesCamisa()}
            {/if}
            <div class="flex flex-col w-full gap-2 justify-center">
                <MainButton padding={'p-1'} bg={'bg-[#3E9830]'} action={validateBody} label="Adicionar"/>
                <MainButton padding={'p-1'} bg={'bg-gray-600'} action={clear} label="Cancelar"/>
            </div>
        </div>
    </div>
{/if}