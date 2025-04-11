<script lang="ts">
    import SvgPrint from "$components/assets/svg/SvgPrint.svelte";
    interface Props {
        action?: VoidFunction;
    }

    let { action }: Props = $props();
</script>

<button onclick={action} class="bg-[#0364C5] rounded-lg p-3 flex items-center justify-between">
    <SvgPrint />
</button>