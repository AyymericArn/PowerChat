<script>
    import avatarSrc from '../assets/avatar.png'
    import { onMount } from 'svelte'
    import { getRandomInt } from '../utils'

    // state = idle, walking, talking
    let state = 'idle'
    const forces = { x: 0, y: 0 }
    let frameCounter = 1
    let seconds = getRandomInt(5)
    let initialPosition
    let container

    // props
    export const position = { x: 0, y: 0 }

    const behaviors = {
        idle: () => {
            forces.x = 0
            forces.y = 0
            state = 'idle'
        },

        talking: () => {
            forces.x = 0
            forces.y = 0
            state = 'idle'
        },

        walking: (x = true, y = true) => {
            if (x)
                forces.x = Math.round(100 * (Math.random() - 0.5)) / 100

            if (y)
                forces.y = Math.round(100 * (Math.random() - 0.5)) / 100
            state = 'idle'
        }
    }

    function changeState () {
        state = ['idle', 'walking', 'talking'][Math.floor(Math.random() * 3)]
        behaviors[state]()
    }

    function loadAnimation () {
        // bodymovin.loadAnimation({
        //     container: document.getElementById('bm'),
        //     renderer: 'svg',
        //     loop: true,
        //     autoplay: true,
        //     path: 'data.json'
        // })
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
        if (position.x > -initialPosition.x) {
            position.x += forces.x
        } else {
            position.x -= forces.x
        }

        if (position.y > -initialPosition.y) {
            position.y += forces.y
        } else {
            position.y -= forces.y
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
        animate()
    })

</script>

<style>
    .container {
        position: absolute;
    }

    .hidden {
        display: none;
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
    <div class={getAnimationClass()}></div>
    <img class={state === 'idle' ? '' : 'hidden'} src={ avatarSrc }>
</div>