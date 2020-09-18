<script>
    import User from "../User.svelte";

    import { userList } from "../../stores/users";
    import UserAvatar from "../UserAvatar.svelte";
    import { onMount } from 'svelte'
    import logoSrc from '../../assets/logo.svg';

    // array of Users
    let users
    let ul
    let containerRight = window.innerWidth * 0.4, containerBottom = window.innerHeight * 0.4

    const unsubscribe = userList.subscribe(value => {
        users = value
    })

    onMount(() => {
        containerRight = ul.getClientRects()[0].right, containerBottom = ul.getClientRects()[0].bottom
    })

    // export let userList = [{username: 'Robin'}, {username: 'Michel'}]
</script>

<style>

    img {
        margin-bottom: 40px;
    }
    .user-list {
        overflow-y: scroll;
        padding: 38px;
        width: 25%;
        height: 100vh;
        background-image: linear-gradient(#FFEAC3, #FFBBF7);
        margin: 0;
    }
    ul {
        position: relative;
        height: 80%;
        overflow-y: scroll;
        scrollbar-width: none;  /* Firefox */
    }

    ul::-webkit-scrollbar {
        display: none;
    }

    ul::before {
        display: inline-block;
        content: '';
        width: 100%;
        position: sticky;
        left: 0;
        top: 0;
        height: 50px;
        background-image: linear-gradient(#ffe4c9, transparent);
    }

    ul::after {
        display: inline-block;
        content: '';
        width: 100%;
        position: sticky;
        left: 0;
        bottom: 0;
        height: 50px;
        background-image: linear-gradient(transparent, #ffc0f0);
    }
</style>

<div class="user-list" bind:this={ul}>
    <img src={logoSrc} alt="kisskisschatchat">
    <ul>
        {#each users as user, key}
            <User bind:user={user} key={key}/>
    <!--        <UserAvatar user={user} MAX_X={containerRight} MAX_Y={containerBottom} />-->
        {/each}
    </ul>


</div>
