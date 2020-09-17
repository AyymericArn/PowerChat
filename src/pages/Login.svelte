<script>
    import { auth, user } from '../stores/auth'
    import logoSrc from '../assets/logo.svg'
    import kissSrc from '../assets/buttons/send.svg'
    import bg1Src from '../assets/illustrations/login_layer1.svg'
    import bg2Src from '../assets/illustrations/login_layer2.svg'
    import bg3Src from '../assets/illustrations/login_layer3.svg'
    import { onMount } from 'svelte';
    import quotes from '../assets/datacollection/quotes.json'

    let username = ''
    let quote = quotes[Math.floor(Math.random() * quotes.length)]

    let hasSubmitted = false


    function login () {
        user.update(u => {
            return {...u, username: username}
        })

    }

    function next () {
        // auth.set(true)
    }



    // onMount(() => {
    //     console.log(username)
    //     login()
    // })
</script>


<style>
    .login {
        height: 100vh;
        width: 100vw;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        background: #FFBBF7;
        position: relative;
        overflow: hidden;
    }

    .logo {
        width: 340px;
    }

    form {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
    }

    form input {
        border: none;
        box-shadow: #00000010 0 3px 6px;
        border-radius: 50px;
        padding: 9px 19px;
        font-size: 28px;
        font-family: Aracne;
        margin-top: 48px;
        margin-bottom: 28px;
        width: 340px;
        position: relative;
        z-index: 10;
    }

    form button {
        position: relative;
        z-index: 10;
        border: none;
        background: none;
    }

    form button img {
        width: 80px;
        height: 54px;
    }

    .illu {
        position: absolute;
        bottom: 0;
        left: 400px;
        z-index: 0;
    }

    .illu img {
        height: 1000px;
        position: absolute;
        bottom: 0;
    }

    .illu img:nth-of-type(1) {
        z-index: 6;
        bottom: -60px;
    }

    .illu .quote {
        position: absolute;
        left: 533px;
        bottom: 52px;
        z-index: 10;
        width: 583px;
        font-family: 'Aracne';
        font-size: 43px;
    }

</style>

<div class="login">
    <img class="logo" src={logoSrc} alt="kisskisschatchat">
    <form on:submit|preventDefault={login}>
        <input placeholder="Rentres ton petit prénom..." type="text" name="username" id="username" bind:value={username}>
    <!--    <input type="text" name="avatarUrl" id="avatarUrl" bind:value={avatarUrl}>-->
        <button type="submit">
            <img src={kissSrc} alt="OK">
        </button>
    </form>
    <div class="illu">
        <p class="quote">{quote}</p>
        <img src={bg1Src} alt="">
        <img src={bg2Src} alt="">
        <img src={bg3Src} alt="">
    </div>

</div>
