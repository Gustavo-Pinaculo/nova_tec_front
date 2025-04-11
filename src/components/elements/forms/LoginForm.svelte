<script>
	import MainButton from "$components/assets/buttons/MainButton.svelte";
	import MainInput from "$components/assets/inputs/MainInput.svelte";
	import PassInput from "$components/assets/inputs/PassInput.svelte";

    let body = $state({
        username: '',
        password: ''
    })

    function login() {

    }

</script>

<div class="flex flex-col h-full justify-center gap-3">
    <span>
        <h4>Login</h4>
        <p>Preencha os campos para efetuar o login  </p>
        <MainInput bind:value={body.username} label="Usuário" placeholder="Usuário" mandatory={true}/>
        <PassInput bind:value={body.password} label="Senha" placeholder="Senha" mandatory={true} />
        <MainButton label="Entrar" action={login}/>
    </span>
</div>