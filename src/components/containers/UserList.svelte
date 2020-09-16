<script>
    import User from "../User.svelte";

    import { userList } from "../../stores/users";
    import UserAvatar from "../UserAvatar.svelte";
    import { onMount } from 'svelte'
    // array of Users
    let users
    let ul

    /**
     * @type Function
     * @returns {{x: number, y: number}}
     */
    let getRandomPosition = () => null;
    $: randomPosition = getRandomPosition()

    const unsubscribe = userList.subscribe(value => {
        users = value
    })

    function addUser() {

    }

    for (const user of users) {
        addUser()
    }

    onMount(() => {
        getRandomPosition = () => {
            return { x: (Math.random() * ul.innerWidth), y: (Math.random() * ul.innerHeight) }
        }
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
        <UserAvatar position={randomPosition} />
    {/each}


</ul>
