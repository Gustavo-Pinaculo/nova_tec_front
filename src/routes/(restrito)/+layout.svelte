<script>
    import Sidebar from "$components/sections/layout/Sidebar.svelte";
	import toast from "$lib/utils/toasts.svelte";
	
    import { goto } from "$app/navigation";
	import { onMount } from "svelte";

    let { children } = $props();
    let hasPermission = $state(false)

    onMount(() => {
        //Descomente as linhas abaixo para que o conteúdo seja protegido
        // if(!localStorage.getItem('nova-tec-token')) {
        //     toast.error('Acesso negado!', 'Voce precisa estar logado para acessar essa pagina!');
        //     goto('/login');
        //     return;
        // }
        hasPermission = true
    })
</script>

<div class="flex flex-start w-full h-full">
    <Sidebar/>
    {#if hasPermission}
    <div class="flex flex-col w-full h-full px-10 py-6 gap-7">
        {@render children()}
    </div>
    {/if}
</div>