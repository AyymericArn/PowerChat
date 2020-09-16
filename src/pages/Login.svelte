<script>
    import { auth, user } from '../stores/auth'

    let username = ''

    function login () {
        user.update(u => {
            return {...u, username: username}
        })
        auth.set(true)
    }
</script>

<form on:submit|preventDefault={login}>
    <input type="text" name="username" id="username" bind:value={username}>
    <input type="submit" value="OK">
</form>
