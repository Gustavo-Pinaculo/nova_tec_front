<script lang="ts">
	import MainButton from "$components/assets/buttons/MainButton.svelte";

    interface Props {
        categoria: {name:string, id:string};
        resetModals: VoidFunction;
        deletarCategoria: VoidFunction;
        deleting: boolean;
    }

    let { categoria: produto = $bindable(), resetModals, deletarCategoria, deleting = $bindable(false) }: Props = $props();

</script>


<div class="fixed w-full h-full flex items-center justify-center bg-[#F5F5F680]">
    <div class="bg-white w-[450px] rounded-lg p-3 gap-4 flex flex-col items-center justify-between relative shadow-[0px_4px_4px_rgba(0,0,0,0.25)]">
        <h4 class="font-semibold">Deseja realmente deletar a categoria: {produto.name}?</h4>
        <div class="flex gap-3 items-center {deleting ? 'pointer-events-none' : ''}">
            <MainButton padding={'p-1'} bg={'bg-gray-600'} action={() => resetModals()} label="Cancelar"/>
            <MainButton padding={'p-1'} bg={'bg-red-600'} action={() => deletarCategoria()} label="Deletar"/>
        </div>
    </div>
</div>