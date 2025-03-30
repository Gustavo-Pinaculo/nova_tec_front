<script>
    import SidebarController, { activePage, hovered } from "$lib/controllers/sidebar.controller";
	import { onMount } from "svelte";

    onMount(() => {
        const savedPage = localStorage.getItem('novatec-activePage') || 0;
        SidebarController.setActivePage( Number(savedPage))
    })
</script>


<div class="flex h-full flex-col p-5 justify-between flex-start items-center bg-[#25384B]">
    <div class="flex flex-col gap-4 flex-start {$hovered ? 'items-start' : 'items-center justify-center'}">
        <span class="flex gap-4 mb-11 justify-start items-start">
            <button onclick={() => hovered.set(true)}>
                <img src="/icons/logo.svg" alt="" class="{$hovered ? 'w-[160px]' : 'w-[75px]'}">
            </button>
            {#if $hovered}
                <button class="pt-4" onclick={() => hovered.set(false)}>
                    <img src="/icons/close-icon.svg" alt="">
                </button>
            {/if}
        </span>
        {#each SidebarController.pages as {label}, i }
            {@const active = i === $activePage}
            <button title="{label}" class="flex w-full gap-2 {$hovered ? '' : 'justify-center'} items-center text-white text-xs {active ? 'font-bold border-2 border-white p-2 rounded-xl' : ''}" onclick={() => SidebarController.setActivePage(i)}>
                <img src={SidebarController.pages[i].icon} alt="">
                {#if $hovered}
                    {label}
                {/if}
            </button>
        {/each}
    </div>
    <button class="flex items-center w-full gap-6 text-white text-xs {$hovered ? '' : 'justify-center'}" onclick={SidebarController.logout}>
        <img src="/icons/logout-icon.svg" alt="">
        {#if $hovered}
            Sair
        {/if}
    </button>
</div>