<script>
    import avatarSrc from '../assets/avatar.png'
    import { onMount } from 'svelte'
    import { getRandomInt } from '../utils'
    import lottie from 'lottie-web'
    import walkAnimation from '../assets/walking.json'
    import talkAnimation from '../assets/talking.json'

    // state = idle, walking, talking
    let state = 'idle'
    const forces = { x: 0, y: 0 }
    let frameCounter = 1
    let seconds = getRandomInt(5)
    let initialPosition
    const position = { x: 0, y: 0 }
    let animationClass
    let anim

    // DOM refs
    let container
    let animDiv

    // props
    export let user
    export let MAX_X
    export let MAX_Y


    const behaviors = {
        idle: () => {
            forces.x = 0
            forces.y = 0
            state = 'idle'
            animationClass = getAnimationClass()
        },

        talking: () => {
            forces.x = 0
            forces.y = 0
            state = 'talking'
            animationClass = getAnimationClass()
            loadAnimation(talkAnimation)
        },
        
        walking: (x = true, y = true) => {
            if (x)
            forces.x = Math.round(100 * (Math.random() - 0.5)) / 100
            
            if (y)
                forces.y = Math.round(100 * (Math.random() - 0.5)) / 100
            
            loadAnimation(walkAnimation)
            state = 'walking'
            animationClass = getAnimationClass()
        }
    }

    function changeState () {
        state = ['idle', 'walking', 'talking'][Math.floor(Math.random() * 3)]
        behaviors[state]()
    }

    function loadAnimation (animation) {
        if (anim) anim.destroy()
        anim = lottie.loadAnimation({
            container: animDiv,
            renderer: 'svg',
            loop: true,
            autoplay: true,
            animationData: animation
        })
    }


    function getAnimationClass() {
        const baseClass = ''
        switch (state) {
            case 'walking':
                return baseClass + 'bm moving'
            case 'talking':
                return baseClass + 'bm'
            case 'idle':
                return baseClass + 'hidden'
        }
    }

    function animate () {
        frameCounter += 1
        requestAnimationFrame(animate)
        if (position.x > -initialPosition.x && position.x < MAX_X - 100) {
            position.x += forces.x
        } else {
            forces.x = -forces.x
            position.x += forces.x
        }

        if (position.y > -initialPosition.y && position.y < MAX_Y - 100) {
            position.y += forces.y
        } else {
            console.log('hey');
            
            forces.y = -forces.y
            position.y += forces.y
        }

        if (frameCounter % (60 * seconds) === 0) {
            console.log(frameCounter % (60 * seconds))
            frameCounter = 1
            changeState()
        }
    }

    onMount(() => {
        initialPosition = {
            x: container.getClientRects()[0].left,
            y: container.getClientRects()[0].top
        }

        position.x = Math.random() * (MAX_X - 100)
        position.y = Math.random() * (MAX_Y - 100)
        loadAnimation()
        animate()
    })

</script>

<style>
    .container {
        position: absolute;
        display: flex;
        flex-direction: column;
        justify-content: center;
    }

    span {
        text-align: center;
        text-shadow: white 0 1px 0, white 1px 0 0, white 1px 1px 0, white 0 0 0 ;
        /* background-color: white; */
    }

    .hidden {
        display: none;
    }

    .bm {
        height: 115px;
        width: 115px;
    }

    .container > div, .container > img {
        height: 115px;
    }
</style>

<div bind:this={container} class="container" style={`transform: translate(${position.x}px, ${position.y}px);`}>
    <!--{#if state === 'walking'}-->
    <!--    <div class="bm"></div>-->
    <!--{:else if state === 'talking'}-->
    <!--    <div class="bm"></div>-->
    <!--{:else}-->
    <!--    <img src={ avatarSrc }>-->
    <!--{/if}-->
    <span>{user.username}</span>
    <div bind:this={animDiv} class={animationClass}></div>
    <img class={state === 'idle' ? '' : 'hidden'} src={ avatarSrc }>
</div>