<script lang="ts">
    import MessageList from "./containers/MessageList.svelte";
    import UserList from "./containers/UserList.svelte";
    import NewMessage from "./containers/NewMessage.svelte";
    import Login from '../pages/Login.svelte'

    import { userList } from '../stores/users'
    import { messageList } from '../stores/messages'
    import { auth, user } from '../stores/auth'
    import { setContext } from 'svelte'

    import io from 'socket.io-client'

    const socket = io('https://bddi-2019-chat.herokuapp.com/')

    const colors = ['00CCFF', '142D52', 'FFBBF7', 'FFEAC3', 'FF5552', 'FF2EFD']

    socket.on('users update', ({users}) => {
        userList.set(users.map((u, i) => {
            return {...u, color: colors[i % 6]}
        }))
    })

    socket.on('user registered', (infos) => {
        console.log(infos)
    })

    socket.on('messages update', ({messages}) => {
        messageList.set(messages)
    })

    socket.on('message new', ({message}) => {
        messageList.update(list => [...list, message])
    })

    socket.on('chat error', (infos) => {
        console.log(infos)
    })

    socket.on('disconnect', () => {
        auth.set(false)
    })

    setContext('socket', {
        getSocket: () => socket
    })

    let isRegistered = false
    const unsubscribe = auth.subscribe(value => {
        socket.emit('user register', $user)
        isRegistered = value
    })
</script>

<style>
    .app {
        display: flex;
    }
    h1 {
        font-size: 16px;
    }
    .messageSystem {
        width: 75%;
    }
</style>

<div class="app">
    <!--    routing-->
    {#if isRegistered}
        <UserList></UserList>
        <div class="messageSystem">
            <MessageList></MessageList>
            <NewMessage></NewMessage>
        </div>
    {:else}
        <Login/>
    {/if}
</div>
