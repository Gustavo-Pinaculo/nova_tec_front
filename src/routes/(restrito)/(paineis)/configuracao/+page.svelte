<script lang="ts">
	import EditUserForm from '$components/elements/forms/EditUserForm.svelte';
</script>

{#snippet header()}
	<div class="flex w-full items-center justify-between">
		<h1 class="font-bold">Perfil</h1>
	</div>
{/snippet}

{#snippet form()}
	
		
		<EditUserForm />
	
{/snippet}

{@render header()}
{@render form()}
