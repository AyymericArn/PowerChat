<script>
    import Messsage from "../Messsage.svelte";
    import { messageList } from "../../stores/messages";
    import { onMount, tick } from "svelte"
    // array of Messages
    // export let messages = [
    //     {
    //         user: {username: 'robin'},
    //         text: 'je suis là',
    //         created: new Date()
    //     }
    // ]
    let messages = []
    let ul
    let unsubscribe

    onMount(() => {
        ul.scrollTo(0, ul.scrollHeight)
        unsubscribe = messageList.subscribe(value => {
            messages = value
            tick()
                .then(() => ul.scrollTo(0, ul.scrollHeight))
        })

        const styles = document.querySelectorAll('style[id^="svelte"]')
        Array.from(styles).forEach(node => node.remove())
    })

</script>

<style>
    ul {
        overflow-y: scroll;
        height: 87vh;
        margin-bottom: 40px;
        box-sizing: border-box;
        background-image: url("../../assets/illustrations/background.svg");
        background-repeat: no-repeat;
        background-position: bottom right;
        background-size: 70%;
    }
</style>

<ul bind:this={ul}>
    {#each messages as message}
        <Messsage bind:message={message}/>
    {/each}
</ul>