<script lang="ts">
	import NewUserForm from '$components/elements/forms/NewUserForm.svelte';
</script>

{#snippet header()}
    <div class="flex justify-between items-center w-full">
        <h1 class="font-bold">Novo Usuário</h1>
    </div>
{/snippet}

{@render header()}
<div class="w-full bg-white p-3 flex flex-col gap-3 rounded-lg shadow-[0px_4px_4px_rgba(0,0,0,0.25)]">
    <h3 class="font-semibold">Insira os dados do novo usuário</h3>
    <NewUserForm/>
</div>