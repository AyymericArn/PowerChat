<script>
    import { getContext } from 'svelte'
    import sendButtonSrc from '../../assets/buttons/send.svg'
    import kissSrc from '../../assets/kiss.svg'

    const iconsSrc = {
        inlove: {
            src: require('../../assets/buttons/inlove.svg'),
            emoji: '😍'
        },
        shine: {
            src: require('../../assets/buttons/shine.svg'),
            emoji: '✨'
        },
        lips: {
            src: require('../../assets/buttons/lips.svg'),
            emoji: '💋'
        },
        rainbow: {
            src: require('../../assets/buttons/rainbow.svg'),
            emoji: '🌈'
        },
        heart: {
            src: require('../../assets/buttons/heart.svg'),
            emoji: '❤️'
        }
    }

    const { getSocket } = getContext('socket')
    const socket = getSocket()

    let message = ''
    let isSending = false

    let kisses = []
    const heartNumber = 5

    let emojis = []
    const emojiNumber = 5

    let keystrokes = []

    let buttonSub

    const sounds = {
      kissHover: new Audio(require('../../assets/sounds/Kiss_hoover.mp3')),
      kiss: new Audio(require('../../assets/sounds/kisses.mp3')),
    }

    const soundManager = {
      kissHover: () => sounds.kissHover.play(),
      kiss: () => sounds.kiss.play(),
    }

    function keystrokeHandler (e) {
        keystrokes = [...keystrokes, e.target.value.length * 5]
        setTimeout(() => {
            keystrokes.shift()
            keystrokes = keystrokes
        }, 500)
    }

    function setEmoji (e) {
        const target = e.currentTarget
        for (const i of [...Array(heartNumber).keys()]) {
            setTimeout(() => {
                emojis = [...emojis, {src: target.firstChild.src, left: e.clientX - target.parentNode.getClientRects()[0].left}];
            }, 300 * i)
        }
        setTimeout(() => {
            emojis = []
        },2000 * heartNumber)

        message += e.currentTarget.dataset.emoji
        setTimeout(() => {
            kisses = []
        }, 500)
    }

    function sendMessage () {
        socket.emit('message new', message)
        message = ''

        soundManager.kiss()

        for (const i of [...Array(heartNumber).keys()]) {
            setTimeout(() => {
                kisses = [...kisses, 0];
            }, 300 * i)
        }

        isSending = true;
        setTimeout(() => {
            isSending = false
        }, 1000)


        setTimeout(() => {
            kisses = []
        },2000 * heartNumber)
    }
</script>

<style>
    form {
        margin-bottom: 46px;
        display: flex;
    }
    #new-message {
        padding: 18px 30px;
        width: 90%;
        border-radius: 50px;
        border: none;
    }

    #new-message::placeholder, #new-message {
        font-family: 'Aracne';
        font-size: 23px;
    }

    #new-message, .input-container {

    }

    .floating {
        animation-name: float;
        animation-duration: 5s;
        animation-timing-function: ease-in-out;
        animation-iteration-count: 1;
        animation-fill-mode: forwards;
        height: 80px;
        position: absolute;
        top: 0;
        left: 0;
    }

    /*.floating.emoji {*/
    /*    ani*/
    /*}*/

    .input-container {
        width: 70%;
        /*debug*/
        /*border: black solid 1px;*/
        justify-content: space-between;
        font-family: 'Aracne';
    }

    .input-container, .reacts {
        border: none;
        box-shadow: #00000010 0 3px 6px;
        display: flex;
        margin: auto;
        border-radius: 50px;
    }

    .input-container > button, .reacts > button {
        position: relative;
        height: 40px;
        display: inline-block;
        background: none;
        border: none;
        margin-right: 30px;
        cursor: pointer;
        transition: transform 0.4s cubic-bezier(0,1.22,.37,1.11);
        will-change: transform;
    }

    .input-container > button:hover, .reacts > button:hover {
        transform: scale(1.2);
    }

    .reacts {
        position: relative;
        padding: 18px 30px;
    }

    .reacts > button {
        transform: scale(1);
        margin-right: initial;
    }
    
    .input-container > button > img {
        /*transform: rotate(0) scale(1);*/
        transform: scale(2) translateY(-2px);
        transition: transform 0.5s cubic-bezier(1, -0.5, -0.5, 1) !important;
        transform-origin: top;
        height: 50%;
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
</style>

<form on:submit|preventDefault={sendMessage}>
    <button>

    </button>
    <div class="reacts">
        {#each Object.values(iconsSrc) as icon}
                <button type="button" data-emoji={icon.emoji} on:click={setEmoji}>
                    <img src={icon.src} alt="">
                </button>
                {#each emojis as emoji}
                    <img style={`left:${emoji.left - 25}px;`} class="floating emoji" src={emoji.src} alt="love">
                {/each}
        {/each}
    </div>
    <div class="input-container">
        <input on:change={keystrokeHandler} placeholder="Partage ton amour de l'autre..." bind:value={message} type="text" name="new-message" id="new-message">
        {#each keystrokes as keystroke}
            <img class="floating" src={kissSrc} alt="love">
        {/each}
        <button on:mouseover={soundManager.kissHover} bind:this={buttonSub} type="submit">
            <img class={isSending ? 'bounce' : ''} src={sendButtonSrc} alt="send">
            {#each kisses as kiss}
                <img class="floating" src={kissSrc} alt="love">
            {/each}
        </button>
<!--        <input type="submit" value=">">-->
    </div>
</form>
