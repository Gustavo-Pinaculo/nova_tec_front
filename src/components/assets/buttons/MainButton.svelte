<script lang="ts">
    interface Props {
        label: string;
        action: VoidFunction;
    }

    let { label, action }: Props = $props();
</script>

<button class="bg-[#3E9830] min-w-48 p-4 rounded-lg text-white" onclick={action}>
    {label}
</button>