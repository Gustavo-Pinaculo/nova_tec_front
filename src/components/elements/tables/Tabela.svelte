<script lang='ts'>
    import type { Snippet } from "svelte";

    interface Props {
        children: Snippet;
        gridCols:string
        headers:{
            label:string,
            colSpan:string
        }[]
    }

    let {children,gridCols,headers: header}:Props = $props();
</script>

<div class="flex flex-col gap-2 shadow-[0px_4px_4px_rgba(0,0,0,0.25)] rounded-lg">
    <div class="w-full px-4 py-5 text-sm font-light rounded-t-lg bg-weak-50 text-sub-600 grid {gridCols} gap-8 bg-[#25384B]">
        {#each header as h}
            <div class="flex {h.colSpan} text-white text-sm font-bold">
                {h.label}
            </div>
        {/each}
    </div>
    <div class="flex flex-col text-sm">
        {@render children()}
    </div>
</div>

