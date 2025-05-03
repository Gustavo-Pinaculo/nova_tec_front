<script>
    let {children} = $props();
</script>


<div class="w-full h-full flex flex-col items-center gap-4">
    <img src="/images/empty-list.webp" alt="">
    {@render children()}
</div>