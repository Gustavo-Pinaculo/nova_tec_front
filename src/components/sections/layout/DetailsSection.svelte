<script lang="ts">
	import { DetalhesController } from "$lib/controllers/detalhes.controller";
	import toast from "$lib/utils/toasts.svelte";
	import { onMount } from "svelte";
	import EmptyState from "./EmptyState.svelte";
	import { goto } from "$app/navigation";
	import MainButton from "$components/assets/buttons/MainButton.svelte";
	import MainInput from "$components/assets/inputs/MainInput.svelte";

    const headers = [ 'Pinturas', 'Tecidos', 'Camisas', 'Golas' ]
    const detalhesController = new DetalhesController();

    let itemSelecionado = $state<{id:string, name:string}>();
    let itensACadastrar = $state('');
    let pinturas = $state<any[]>([]);
    let tecidos = $state<any[]>([]);
    let camisas = $state<any[]>([]);
    let openDeletar = $state(false);
    let openAdicao = $state(false);
    let openEdicao = $state(false);
    let golas = $state<any[]>([]);
    let bloqueado = $state(false);
    let loading = $state(false);
    let tipo = $state('');

    function lidarComAdicao(index:number){
        openAdicao = true;
        tipo = headers[index].toLowerCase().slice(0, -1);
    }
    function lidarComEdicao(id:string, index:number){
        const tipos = [ pinturas, tecidos, camisas, golas ];
        tipo = headers[index].toLowerCase().slice(0, -1);
        openEdicao = true;
        itemSelecionado = tipos[index].find(i => i.id === id);
    }
    function lidarComDelecao(id:string, index:number){
        const tipos = [ pinturas, tecidos, camisas, golas ];
        tipo = headers[index].toLowerCase().slice(0, -1);
        openDeletar = true;
        itemSelecionado = tipos[index].find(i => i.id === id);
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
        tecidos = tecidosData.data.results;
        golas = golasData.data.results;
        camisas = camisasData.data.results;
        pinturas = pinturasData.data.results;
    }
    async function registrarMateriais(){
        if (bloqueado) return;
        bloqueado = true;

        loading = true;
        const itens = itensACadastrar.split(',').map(i => i.trim()).filter(Boolean);
        if(itens.length === 0) {
            toast.error('Erro ao registrar materiais', 'Nenhum item foi cadastrado');
            loading = false;
            bloqueado = false;
            return;
        }
        const promises = itens.map(item => {
            const formData = new FormData();
            formData.append('name', item);
            return detalhesController.registrarMaterial(formData, tipo);
        });
        await Promise.all(promises);
        await listarDetalhes();
        openAdicao = false;
        loading = false;
        bloqueado = false;
        itensACadastrar = '';
    }
    async function editarMaterial(novoNome:string){
        const formData = new FormData();
        formData.append('name', novoNome);
        await detalhesController.editarMaterial(itemSelecionado!.id, formData, tipo);
        await listarDetalhes();
        openEdicao = false;
    }
    async function deletarMaterial(){
        await detalhesController.deletarMaterial(itemSelecionado!.id, tipo);
        await listarDetalhes();
        openDeletar = false;
    }

    onMount(async() => {
        await listarDetalhes();
    })
</script>

{#snippet registrar()}
    <div class="fixed w-full h-full flex items-center justify-center bg-[#F5F5F680]">
        <div class="bg-white w-[450px] rounded-lg p-3 gap-4 flex flex-col relative shadow-[0px_4px_4px_rgba(0,0,0,0.25)]">
            <h4 class="font-semibold">Insira os materiais do tipo {tipo} que deseja cadastrar</h4>
            <p class="text-sm text-[#212529]">Adicione os materiais do tipo {tipo} em linha separadas por vírgula.<br> Ex: {tipo} 1, {tipo} 2</p>
            <textarea class="w-full outline-none text-sm border border-[#00000066] rounded-lg p-2" bind:value={itensACadastrar}></textarea>
            <div class="flex w-full gap-3 justify-center {loading ? 'pointer-events-none' : ''}">
                <MainButton padding={'p-1'} bg={'bg-gray-600'} action={() => openAdicao = false} label="Cancelar"/>
                <MainButton padding={'p-1'} bg={'bg-[#3E9830]'} action={registrarMateriais} label="Registrar"/>
            </div>
        </div>
    </div>
{/snippet}

{#snippet editar()}
{@const itemEditar = {'name': itemSelecionado!.name}}
    <div class="fixed w-full h-full flex items-center justify-center bg-[#F5F5F680]">
        <div class="bg-white w-[450px] rounded-lg p-3 gap-4 flex flex-col relative shadow-[0px_4px_4px_rgba(0,0,0,0.25)]">
            <h4 class="font-semibold">Edite o nome do material {itemSelecionado!.name}</h4>
            <MainInput label={`Novo nome do material ${itemSelecionado!.name}`} bind:value={itemEditar.name} mandatory={true}/>
            <div class="flex w-full gap-3 justify-center {loading ? 'pointer-events-none' : ''}">
                <MainButton padding={'p-1'} bg={'bg-gray-600'} action={() => openEdicao = false} label="Cancelar"/>
                <MainButton padding={'p-1'} bg={'bg-[#3E9830]'} action={()=> editarMaterial(itemEditar.name)} label="Editar"/>
            </div>
        </div>
    </div>
{/snippet}

{#snippet delecao()}
    <div class="fixed w-full h-full flex items-center justify-center bg-[#F5F5F680]">
        <div class="bg-white w-[450px] rounded-lg p-3 gap-4 flex flex-col relative shadow-[0px_4px_4px_rgba(0,0,0,0.25)]">
            <h4 class="font-semibold">Deseja deletar <strong>'{itemSelecionado!.name}'</strong> de {tipo}s</h4>
            <div class="flex w-full gap-3 justify-center {loading ? 'pointer-events-none' : ''}">
                <MainButton padding={'p-1'} bg={'bg-gray-600'} action={() => openDeletar = false} label="Cancelar"/>
                <MainButton padding={'p-1'} bg={'bg-[#3E9830]'} action={deletarMaterial} label="Deletar"/>
            </div>
        </div>
    </div>
{/snippet}

<div class="w-full grid grid-cols-4 gap-4 overflow-auto h-1/2">
    {#each [pinturas, tecidos, camisas, golas] as detalhe, index}
        <div class="col-span-1 bg-white p-3 flex flex-col gap-2 rounded-lg shadow-[0px_4px_4px_rgba(0,0,0,0.25)] mb-3">
            <span class="flex w-full justify-between items-center">
                <h3 class="font-semibold">{headers[index]}</h3>
                <button onclick={()=>lidarComAdicao(index)} class="p-1 gap-2 w-7 h-7 flex items-center bg-[#3E9830] rounded-sm" title={`Adicionar ${headers[index]}`}>
                    <img src="/icons/add-svgrepo-com.svg" alt="">
                </button>
            </span>
            {#if detalhe.length > 0}
                {#each detalhe as {name, id}}
                    <div class="w-full bg-white flex flex-col border-b border-[#00000033]">
                        <span class="flex w-full justify-between">
                            <h4 class="font-semibold">{name}</h4>
                            <span class="flex gap-2 items-center">
                                <button class="p-2 gap-2 col-span-2 flex items-center rounded-xl" onclick={()=>lidarComEdicao(id, index)}>
                                    <img src="/icons/edit-icon.svg" alt="" class="w-5">
                                </button>
                                <button class="p-2 gap-2 col-span-2 flex items-center rounded-xl" onclick={()=>lidarComDelecao(id, index)}>
                                    <img src="/icons/delete-icon.svg" alt="" class="w-5">
                                </button>
                            </span>
                        </span>
                    </div>
                {/each}
            {:else}
                <div class="w-full h-full flex items-center justify-center">
                    <div class="w-[250px]">
                        <EmptyState>
                            <p class="font-bold text-center">Não encontramos nada para a categoria: {headers[index]}.</p>
                        </EmptyState>
                    </div>
                </div>
            {/if}
        </div>
    {/each}
</div>
{#if openAdicao}
    {@render registrar()}
{/if}
{#if openDeletar}
    {@render delecao()}
{/if}
{#if openEdicao}
    {@render editar()}
{/if}