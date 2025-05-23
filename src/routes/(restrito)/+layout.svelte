<script>
    import Sidebar from "$components/sections/layout/Sidebar.svelte";
	import toast from "$lib/utils/toasts.svelte";
	
    import { goto } from "$app/navigation";
	import { onMount } from "svelte";
	import apiService from "$lib/api/api";
	import { page } from "$app/state";

    let { children } = $props();
    let hasPermission = $state(false)

    async function getUserDetails() {
        const [user, err] = await apiService.get('/user/user/me/')
        if(err) return toast.error('Erro ao buscar dados do usuário', err)
        if(page.url.origin.includes('localhost')) console.log(user)
    }

    onMount(() => {
        //Descomente as linhas abaixo para que o conteúdo seja protegido, ou comente para desproteger
        if(!localStorage.getItem('nova-tec-token')) {
            toast.error('Acesso negado!', 'Voce precisa estar logado para acessar essa pagina!');
            goto('/login');
            return;
        }
        // getUserDetails();
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