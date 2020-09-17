<script>
    import { auth, user } from '../stores/auth'
    import logoSrc from '../assets/logo.svg'
    import kissSrc from '../assets/buttons/send.svg'
    import bg1Src from '../assets/illustrations/login_layer1.svg'
    import bg2Src from '../assets/illustrations/login_layer2.svg'
    import bg3Src from '../assets/illustrations/login_layer3.svg'
    import { onMount } from 'svelte';
    import quotes from '../assets/datacollection/quotes.json'
    import nicknames from '../assets/datacollection/pseudos.json'

    let username = ''
    let quote = quotes[Math.floor(Math.random() * quotes.length)]

    let hasSubmitted = false
    let nickname = nicknames[Math.floor(Math.random() * nicknames.length)]

    function login () {
        user.update(u => {
            return {...u, username: username, nickname: nickname}
        })

        triggerAnimation()
        setTimeout(() => {
            hasSubmitted = true
        }, 1000)
    }
    
    function triggerAnimation () {
        
    }

    function next () {
        auth.set(true)
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
        cursor: pointer;
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
    
    @keyframes ouste {
        
    }

    /* hasSubmitted */
    .nickname {
        padding: 32px 60px;
        border-radius: 42px;
        background-color: #FFEAC3;
        margin-bottom: 22px;
    }

    .nickname p {
        text-align: center;
    }

    .nickname p:nth-of-type(1) {
        font-family: 'Ego';
        font-size: 17px;
    }

    .nickname p:nth-of-type(2) {
        font-family: 'BlackBubble';
        font-size: 22px;
    }

    .access {
        padding: 10px 16px;
        background-color: #FF5552;
        color: #FFBBF7;
        border-radius: 20px;
        border: none;
        font-family: 'Ego';
        font-size: 17px;
        cursor: pointer;
    }

</style>

<div class="login">
    {#if !hasSubmitted}

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

    {:else}

        <div class="nickname">
            <p>Ton petit surnom est :</p>
            <p>{nickname}</p>
        </div>

        <button class="access" on:click={next}>
            <img src="" alt="">
            Accéder au chat
        </button>

    {/if}

</div>
