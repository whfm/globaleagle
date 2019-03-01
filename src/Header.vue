<template>
    <div class="hubHeader">        
        <p class="hubTitle">
            <img src="footer_global_eagle_white.svg" width="200" height="100" alt="globaleagle"> 
            - Temperature</p>            
    </div>
</template>

<script>
    export default{}
</script>

<style>

    .hubHeader {
        background-color: rgb(122,183,230);
        height: 75px;
    }

    .hubTitle {
        margin-top: -20px;
        font-size: 25px;
        color: white;
        padding-left: 20%;
    }

    .hubTitle a:hover{
        color: #595959;
        text-decoration: none;
    }

    ul.navbar-nav{
        margin: 0 auto;
    }

    nav.navbar ul.navbar-nav li.nav-item a{
        padding: 3px;
        color: #a6a6a6;
    }

    nav.navbar ul.navbar-nav li.nav-item a:hover{
        color: #4d4d4d;
        text-decoration: none;
    }

</style>