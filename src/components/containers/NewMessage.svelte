<script>
    import { getContext } from 'svelte'
    import sendButtonSrc from '../../assets/buttons/send.svg'
    import kissSrc from '../../assets/kiss.svg'

    const { getSocket } = getContext('socket')
    const socket = getSocket()

    let message = ''
    let isSending = false

    let kisses = []
    const heartNumber = 5

    function sendMessage () {
        socket.emit('message new', message)
        message = ''

        for (const i of [...Array(heartNumber).keys()]) {
            setTimeout(() => {
                kisses = [...kisses, 0];
            }, 300 * i)
        }

        isSending = true;



        setTimeout(() => {
            kisses = []
        },2000 * heartNumber)
    }
</script>

<style>
    form {
        margin-bottom: 46px;
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

    .input-container {
        width: 70%;
        margin: auto;
        border-radius: 50px;
        /*debug*/
        /*border: black solid 1px;*/
        border: none;
        box-shadow: #00000010 0 3px 6px;
        display: flex;
        justify-content: space-between;
        font-family: 'Aracne';
    }

    .input-container > button {
        position: relative;
        height: 40px;
        display: inline-block;
        background: none;
        border: none;
        margin-right: 30px;
        transform: rotate(0) scale(1);
        transition: transform 0.5s cubic-bezier(1, -0.5, -0.5, 1);
    }
    .input-container > button > img {
        transform: scale(2) translateY(-2px);
        transform-origin: top;
        height: 50%;
    }

    .bounce {
        transform: scale(1.3) rotate(-15deg);
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

    <div class="input-container">
        <input placeholder="Partage ton amour de l'autre..." bind:value={message} type="text" name="new-message" id="new-message">
        <button type="submit">
            <img src={sendButtonSrc} alt="send">
            {#each kisses as kiss}
                <img class="floating" src={kissSrc} alt="love">
            {/each}
        </button>
<!--        <input type="submit" value=">">-->
    </div>
</form>
