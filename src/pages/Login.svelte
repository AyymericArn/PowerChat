<script>
    import { auth, user } from '../stores/auth'
    import { onMount } from 'svelte';

    let username = 'didier'
    let avatarUrl = ''

    function login () {
        user.update(u => {
            return {...u, username: username}
        })
        auth.set(true)
    }

    onMount(() => {
        login()
    })
</script>

<form on:submit|preventDefault={login}>
    <input type="text" name="username" id="username" bind:value={username}>
    <input type="text" name="avatarUrl" id="avatarUrl" bind:value={avatarUrl}>
    <input type="submit" value="OK">
</form>
