<script>
    import User from "../User.svelte";

    import { userList } from "../../stores/users";
    import UserAvatar from "../UserAvatar.svelte";
    import { onMount } from 'svelte'
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
        width: 40vw;
    }
</style>

<ul bind:this={ul}>
    {#each users as user}
<!--        <User bind:user={user}/>-->
        <UserAvatar user={user} MAX_X={containerRight} MAX_Y={containerBottom} />
    {/each}


</ul>
