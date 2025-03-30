<script>
	import { goto } from "$app/navigation";
	import toast from "$lib/utils/toasts.svelte";
	import { onMount } from "svelte";

    let { children } = $props();
    let hasPermission = $state(false)

    onMount(() => {
        if(!localStorage.getItem('nova-tec-token')) {
            toast.error('Acesso negado!', 'Voce precisa estar logado para acessar essa pagina!');
            goto('/login');
            return;
        }
        hasPermission = true
    })
</script>

{#if hasPermission}
    {@render children()}
{/if}