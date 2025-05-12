<script lang="ts">
	import MainButton from "$components/assets/buttons/MainButton.svelte";

    interface Props {
        registrarCategorias: VoidFunction;
        closeModal: VoidFunction;
        loading: boolean;
        categoriasACadastrar: string;
    }

    let {
        closeModal,
        registrarCategorias,
        loading = $bindable(false),
        categoriasACadastrar = $bindable('')
    }: Props = $props();
</script>


<div class="fixed w-full h-full flex items-center justify-center bg-[#F5F5F680]">
    <div class="bg-white w-[450px] rounded-lg p-3 gap-4 flex flex-col relative shadow-[0px_4px_4px_rgba(0,0,0,0.25)]">
        <h4 class="font-semibold">Insira as categorias que deseja cadastrar</h4>
        <p class="text-sm text-[#212529]">Adicione as categorias em linha separadas por vírgula.<br> Ex: Categoria 1, Categoria 2</p>
        <textarea class="w-full outline-none text-sm border border-[#00000066] rounded-lg p-2" bind:value={categoriasACadastrar}></textarea>
        <div class="flex w-full gap-3 justify-center {loading ? 'pointer-events-none' : ''}">
            <MainButton padding={'p-1'} bg={'bg-gray-600'} action={closeModal} label="Cancelar"/>
            <MainButton padding={'p-1'} bg={'bg-[#3E9830]'} action={registrarCategorias} label="Registrar"/>
        </div>
    </div>
</div>