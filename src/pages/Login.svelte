<script>
    import { auth, user } from '../stores/auth'
    import logoSrc from '../assets/logo.svg'
    import sendSrc from '../assets/buttons/send.svg'
    import bg1Src from '../assets/illustrations/login_layer1.svg'
    import bg2Src from '../assets/illustrations/login_layer2.svg'
    import bg3Src from '../assets/illustrations/login_layer3.svg'
    import { onMount } from 'svelte';
    import quotes from '../assets/datacollection/quotes.json'
    import nicknames from '../assets/datacollection/pseudos.json'
    import kissSrc from '../assets/kiss.svg'

    let username = 'didier'
    let quote = quotes[Math.floor(Math.random() * quotes.length)]

    let hasSubmitted = false
    let isTransitionning = false
    let nickname = nicknames[Math.floor(Math.random() * nicknames.length)]

    let images = []

    const mousePosition = {
      x: 0, y: 0
    }

    let kisses = []
    const heartNumber = 5

    function login () {
        user.update(u => {
            return {...u, username: username, nickname: nickname}
        })

        triggerAnimation()

        setTimeout(() => {
            hasSubmitted = true
            isTransitionning = false
        }, 1000)
    }
    
    function triggerAnimation () {

      for (const i of [...Array(heartNumber).keys()]) {
          setTimeout(() => {
              kisses = [...kisses, 0];
          }, 300 * i)
      }

      isTransitionning = true
      for (const image of images) {        
        image.style = ``
      }

      setTimeout(() => {
          kisses = []
      },2000 * heartNumber)
    }

    function next () {
      isTransitionning = true
      setTimeout(() => {
        auth.set(true)
      }, 1000)
    }

    function parallax (e) {
      mousePosition.x = e.clientX - window.innerWidth/2
      mousePosition.y = e.clientY - window.innerHeight/2

      for (const image of images) {
          try {
               image.style = `transform: translate(${-mousePosition.x * 0.02 * parseFloat(image.dataset.depth)}px, ${-mousePosition.y * 0.02 * parseFloat(image.dataset.depth)}px);`
          } catch (e) {

          }
      }
    }

    onMount(() => {
        console.log(username)
        login()
    })
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

    .logo.transition {
      
      animation: pop 1 ease-out 0.5s;
      animation-direction: reverse;
      animation-fill-mode: both;
    }

    
    div.transition {
      animation: pop 1 ease-out 0.5s;
      animation-direction: reverse;
      animation-fill-mode: both;
    }

    button.transition {
      animation: pop 1 ease-out 0.5s;
      animation-direction: reverse;
      animation-fill-mode: both;
      animation-delay: 0.1s;
    }

    form {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
    }

    form.transition {
      
      animation: pop 1 ease-out 0.5s;
      animation-delay: 0.1s;
      animation-direction: reverse;
      animation-fill-mode: both;
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
        position: relative
    }

    form button img {
      transition: transform 0.2s ease;
        width: 80px;
        height: 54px;
      transform: scale(1);
    }

    form button img:hover {
      transform: scale(1.2);
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
        will-change: transform;
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
    
    /* .illu * {
    } */
    .illu img.transition, .illu p.transition {
      transition: transform ease-in 1s !important;
    }

    .illu img.transition:nth-of-type(1) {
      transform: translateY(900px);
    }
    .illu img.transition:nth-of-type(2) {
      transform: translateY(700px);
    }
    .illu img.transition:nth-of-type(3) {
      transform: translateY(600px);
    }
    .illu p.transition {
      transform: translateY(900px);
    }

    /* hasSubmitted */
    .nickname {
      
      animation: pop 1 ease-out 0.5s;
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
      animation: pop 1 ease-out 0.5s;
      animation-fill-mode: both;
      
      animation-delay: 0.5s;
        padding: 10px 16px;
        background-color: #FF5552;
        color: #FFBBF7;
        border-radius: 20px;
        border: none;
        font-family: 'Ego';
        font-size: 17px;
        cursor: pointer;
    }

    @keyframes pop {
      0% {transform: scale(0);}
      65% {transform: scale(1.2);}
      75% {transform: scale(1.2);}
      100% {transform: scale(1);}
    }

    @keyframes bounce {
        from {transform: scale(2) translateY(-2px);}
        to {transform: scale(2.3) rotate(-15deg) ;}
    }

    @keyframes float {
        0% {transform: translate(0px, 0px) scale(1); opacity: 1; animation-timing-function: ease-in-out;}

        10% {transform: translate(25px, -25px) scale(0.9); opacity: 0.9; animation-timing-function: ease-in-out;}

        20% {transform: translate(-10px, -50px) scale(0.8); opacity: 0.8; animation-timing-function: ease-in-out;}

        30% {transform: translate(10px, -75px) scale(0.7); opacity: 0.7; animation-timing-function: ease-in-out;}

        40% {transform: translate(-10px, -100px) scale(0.6); opacity: 0.6; animation-timing-function: ease-in-out;}

        50% {transform: translate(10px, -110px) scale(0.5); opacity: 0.5; animation-timing-function: ease-in-out;}

        60% {transform: translate(-10px, -150px) scale(0.4); opacity: 0.4; animation-timing-function: ease-in-out;}

        70% {transform: translate(10px, -175px) scale(0.3); opacity: 0.3; animation-timing-function: ease-in-out;}

        80% {transform: translate(-10px, -200px) scale(0.2); opacity: 0.2; animation-timing-function: ease-in-out;}

        90% {transform: translate(10px, -210px) scale(0.1); opacity: 0.1; animation-timing-function: ease-in-out;}

        100% {transform: translate(-10px, -250px) scale(0); opacity: 0; animation-timing-function: ease-in-out;}

    }

    .floating {
        animation-name: float;
        animation-duration: 5s;
        animation-timing-function: ease-in-out;
        animation-iteration-count: 1;
        animation-fill-mode: forwards;
        height: 80px;
        position: absolute;
        bottom: 20px;
        left: 100px;
    }
    .bounce {
        animation-name: bounce;
        animation-duration: 0.5s;
        animation-iteration-count: 2;
        animation-direction: alternate;
        /*transform: scale(3.3) rotate(-15deg) !important;*/
        /*transition: transform 0.5s cubic-bezier(1, -0.5, -0.5, 1) !important;*/
        /*transform-origin: center;*/
    }

</style>

<div class="login" on:mousemove={parallax}>
    {#if !hasSubmitted}

        <img class={isTransitionning ? 'transition logo' : 'logo'} src={logoSrc} alt="kisskisschatchat">
        <form class={isTransitionning ? 'transition' : ''} on:submit|preventDefault={login}>
            <input placeholder="Rentres ton petit prénom..." type="text" name="username" id="username" bind:value={username}>
        <!--    <input type="text" name="avatarUrl" id="avatarUrl" bind:value={avatarUrl}>-->
            <button type="submit">
                <img src={sendSrc} alt="OK">
                {#each kisses as kiss}
                    <img class="floating" src={kissSrc} alt="love">
                {/each}
            </button>
        </form>
        <div class="illu">
            <p class={isTransitionning ? 'transition quote' : 'quote'} bind:this={images[3]} data-depth="0.7">{quote}</p>
            <img class={isTransitionning ? 'transition' : ''} bind:this={images[0]} data-depth="0.7" src={bg1Src} alt="">
            <img class={isTransitionning ? 'transition' : ''} bind:this={images[1]} data-depth="0.3" src={bg2Src} alt="">
            <img class={isTransitionning ? 'transition' : ''} bind:this={images[2]} data-depth="0.4" src={bg3Src} alt="">
        </div>

    {:else}

        <div class={isTransitionning ? 'transition nickname' : 'nickname'}>
            <p>Ton petit surnom est :</p>
            <p>{nickname}</p>
        </div>

        <button class={isTransitionning ? 'transition access' : 'access'} on:click={next}>
            <img src="" alt="">
            Accéder au chat
        </button>

    {/if}

</div>
