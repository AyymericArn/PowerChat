<script>
    import Messsage from "../Messsage.svelte";
    import { messageList } from "../../stores/messages";
    // array of Messages
    // export let messages = [
    //     {
    //         user: {username: 'robin'},
    //         text: 'je suis là',
    //         created: new Date()
    //     }
    // ]
    let messages

    const unsubscribe = messageList.subscribe(value => {
        messages = value
    })

    // onMount(() => {
    //
    // })
</script>

<ul>
    {#each messages as message}
        <Messsage bind:message={message}/>
    {/each}
</ul>