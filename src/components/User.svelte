<script>
    import avatarUrl from '../assets/avatar.svg'
    export let user = {}
    export let key = 0
    const colors = ['#00CCFF', '#142D52', '#FFBBF7', '#FF5552', '#FF2EFD']

</script>

<style>
    li {
        font-family: 'BlackBubble';
        font-size: 21px;
        list-style: none;
        margin-bottom: 5px;
        width: 100%;
        text-align: center;
        padding: 7px;
        border-radius: 50px;
        color: #FFEAC3;
    }

    li img {
      display: inline;
      height: 30px;
      transform: scale(1.5);
      transform-origin: top;
      color: #FFEAC3;
      margin-right: 25px;
    }
</style>

<li style={`background-color: ${colors[key % 5]};`} ><img src={avatarUrl} alt="">{user.username}</li>