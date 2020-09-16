<script>
    export let message = {}
</script>

<li>
    <p>{message.user.username}</p>
    <p>{message.created.toString()}</p>
    <p>{message.text}</p>
</li>