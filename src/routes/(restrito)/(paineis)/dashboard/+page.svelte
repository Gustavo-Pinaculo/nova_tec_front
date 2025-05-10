<script>
	import apiService from '$lib/api/api';
	import { onMount } from 'svelte';

	let body = $state({
		name: ''
	});

	onMount(() => {
		initialize();
	});

	function initialize() {
        apiService.get('/user/user/me/').then((res) => {
            console.log(res);
        }).catch((err) => {
            console.error(err);
        });
    }
</script>

<div class="container flex h-screen">
	<h2 class="font-montserrat text-2xl text-[#797B7E]">Seja bem-vindo</h2>
</div>
