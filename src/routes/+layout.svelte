<script lang="ts">
	import Toaster from '$components/elements/toast/Toaster.svelte';
	import '../app.css';

	let { children } = $props();
</script>

<svelte:head><title>Nova Tec</title></svelte:head>
<Toaster/>

<div class="w-screen h-svh overflow-x-hidden overflow-y-auto bg-[#F5F5F6]">
	{@render children()}
</div>