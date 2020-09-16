<script>
    import { user } from '../stores/auth'

    export let message = {}
</script>

<style>

    li {
        list-style: none;
    }

    p {
        display: inline;
    }

    .own {
        color: cornflowerblue;
    }
</style>

<li class={message.user.username === $user.username ? 'own' : ''}>
    <p>{message.user.username}</p>
    <p>{message.created.toString()}</p>
    <p>{message.text}</p>
</li>