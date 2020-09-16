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
    })

</script>

<style>
    ul {
        overflow: scroll;
        max-height: 90vh;
    }
</style>

<ul bind:this={ul}>
    {#each messages as message}
        <Messsage bind:message={message}/>
    {/each}
</ul>