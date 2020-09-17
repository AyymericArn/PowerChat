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
    ul {
        padding: 38px;
        width: 25%;
        background-image: linear-gradient(#FFEAC3, #FFBBF7);
        margin: 0;
    }
</style>

<ul bind:this={ul}>
    <img src={logoSrc} alt="kisskisschatchat">
    {#each users as user, key}
        <User bind:user={user} key={key}/>
<!--        <UserAvatar user={user} MAX_X={containerRight} MAX_Y={containerBottom} />-->
    {/each}


</ul>
