<script>
    import { user } from '../stores/auth'
    import { userList } from '../stores/users'

    export let message = {}

    let author = $userList.find(u => u.username === message?.user.username)
</script>

<style>

    li {
        animation: pop 0.5s ease 1 both;
        list-style: none;
        display: block;
        padding: 16px 24px;
        box-shadow: #00000010 0 3px 6px;
        background: white;
        margin: 10px 40px;
        max-width: 75%;
        width: max-content;
        border-radius: 50px;
    }

    p {
        width: max-content;
    }

    p:first-of-type {
        font-family: 'BlackBubble';
        font-size: 16px;
    }
    p:last-of-type {
        font-family: 'Ego';
        font-size: 17px;
        width: 100%;
        word-break: break-all;
    }

    @keyframes pop {
        0% {transform: scale(0) rotate(10deg);}
        65% {transform: scale(1.1) rotate(-5deg)}
        100% {transform: scale(1) rotate(0)}
    }

    .own {
        color: cornflowerblue;
        margin-left: auto;
    }
</style>

<li class={message.user.username === $user.username ? 'own' : ''}>
    <p style={'color: #' + author?.color + ';'}>{message.user.username}</p>
    <p>{message.text}</p>
</li>