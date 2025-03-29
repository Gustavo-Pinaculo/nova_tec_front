<script>
	import { goto } from "$app/navigation";
	import toast from "$lib/utils/toasts.svelte";
	import { onMount } from "svelte";

    let { children } = $props();
    onMount(() => {
        if(!sessionStorage.getItem('nova-tec-token')) {
            toast.error('Acesso negado!', 'Voce precisa estar logado para acessar essa pagina!');
            goto('/login');
        }
    })
</script>

{@render children()}