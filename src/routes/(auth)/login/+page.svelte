<script>
	import LoginForm from "$components/elements/forms/LoginForm.svelte";

</script>

<div class="container flex h-screen items-center justify-center">
	<div class="logo-container d-flex flex h-1/2 w-1/4 justify-center rounded-tl-3xl rounded-bl-3xl bg-[#25384B] shadow-lg">
		<span class="flex items-center">
			<img class="w-35" src="/icons/logo.svg" alt="Logo Nova Tec" />
		</span>
	</div>

	<div class="logo-container d-flex flex items-center h-1/2 w-1/3 justify-center rounded-tr-3xl rounded-br-3xl bg-white shadow-lg">
		<LoginForm />
	</div>
</div>
