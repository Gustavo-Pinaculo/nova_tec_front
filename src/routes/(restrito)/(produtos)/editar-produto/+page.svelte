<script lang="ts">
	import NewProductForm from '$components/elements/forms/NewProductForm.svelte';
	import MainButton from '$components/assets/buttons/MainButton.svelte';
	import { CategoriasController } from '$lib/controllers/categorias.controller';
	import toast from '$lib/utils/toasts.svelte';
	import { onMount } from 'svelte';
	import CriarCategorias from '$components/elements/modals/CriarCategorias.svelte';

    const categoriasController = new CategoriasController();

    let categories = $state<{value:string, label:string}[]>([]);
    let categoriasACadastrar = $state<string>('');
    let registerCategories = $state(false);
    let loading = $state(false);

    async function registrarCategorias() {
        loading = true;
        const categorias = categoriasACadastrar.split(',').map(c => c.trim()).filter(Boolean);
        try {
            const promises = categorias.map(categoria => {
                const formData = new FormData();
                formData.append('name', categoria);
                return categoriasController.cadastrarCategoria(formData);
            });
            await Promise.all(promises);
            toast.success('Sucesso', 'Categoria(s) cadastrada(s)!');
            buscarCategorias();
            registerCategories = false;
        } catch (err: any) {
            toast.error('Erro ao cadastrar categoria', err.message || 'Erro desconhecido');
        } finally {
            loading = false;
        }
    }
    async function buscarCategorias(){
        const [res, err] = await categoriasController.listarCategorias();
        if(err) return toast.error('Erro ao buscar categorias', err.message);
        const data:{id:string, name:string, is_active:boolean}[] = res.data;
        categories = data.filter(c => c.is_active).map(c => ({
            value: c.id, label: c.name
        }));

    }

    onMount(() => {
        buscarCategorias();
    })
</script>

{#snippet header()}
    <div class="flex justify-between items-center w-full">
        <h1 class="font-bold">Editar Produto</h1>
    </div>
{/snippet}

{@render header()}
<div class="w-full bg-white p-3 flex flex-col gap-3 rounded-lg shadow-[0px_4px_4px_rgba(0,0,0,0.25)]">
    <h3 class="font-semibold">Edite os dados do produto</h3>
    <NewProductForm bind:categories bind:registerCategories/>
</div>

{#if registerCategories}
    <CriarCategorias {registrarCategorias} closeModal={() => registerCategories = false} bind:loading bind:categoriasACadastrar/>
{/if}