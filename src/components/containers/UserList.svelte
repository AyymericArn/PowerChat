<script>
    import User from "../User.svelte";

    import { userList } from "../../stores/users";
    // array of Users
    let users

    const unsubscribe = userList.subscribe(value => {
        users = value;
    });

    // export let userList = [{username: 'Robin'}, {username: 'Michel'}]
</script>

<ul>
    {#each users as user}
        <User bind:user={user}/>
    {/each}
</ul>
