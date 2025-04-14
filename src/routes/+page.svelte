<script>
	import { goto } from "$app/navigation";
	import { onMount } from "svelte";

    onMount(() => {
        if(localStorage.getItem('nova-tec-token')) {goto("/dashboard")}else {goto("/login")}
    })
</script>