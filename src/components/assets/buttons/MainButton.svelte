<script lang="ts">
    interface Props {
        label: string;
        action: VoidFunction;
        padding?: string;
        bg?: string;
    }

    let { label, action, padding = 'p-4', bg = 'bg-[#3E9830]' }: Props = $props();
</script>

<button class="{bg} min-w-48 {padding} rounded-lg text-white" onclick={action}>
    {label}
</button>