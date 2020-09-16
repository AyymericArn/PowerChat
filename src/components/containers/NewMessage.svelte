<script>
    import { getContext } from 'svelte'

    const { getSocket } = getContext('socket')
    const socket = getSocket()

    let message = ''

    function sendMessage () {
        socket.emit('message new', message)
        message = ''
    }
</script>

<style>

</style>

<form on:submit|preventDefault={sendMessage}>
    <input bind:value={message} type="text" name="new-message" id="new-message">
    <input type="submit" value=">">
</form>
