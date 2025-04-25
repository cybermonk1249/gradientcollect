<script>
    import { base } from "$app/paths";
    import Hamburger from "$lib/Hamburger.svelte";
</script>


<nav>
    <div class="fullheader">
        <div class="menu">
            <Hamburger />
        </div>
        <div id="headerlogo">
            <a href="{base}/">
                <h1>Gradient</h1>
            </a>
        </div>
        <div class="player">
            <!-- icon -->
        </div>
    </div>
</nav>

<!-- <p> paragraph </p> -->



<style>
    @font-face {
        font-family: Rabegs;
        src:
            url("/fonts/NCLRabegs-Demo.otf") format("opentype");
    }

    @font-face {
        font-family: reddit-mono;
        src: url("/fonts/RedditMono-VariableFont_wght.ttf") format("truetype-variations");
        font-weight: 200 900;
    }
    @font-face {
        font-family: Tektur;
        src:
            local("Tektur"),
            url("/fonts/Tektur-VariableFont_wdth,wght.ttf") format("truetype-variations");
        font-weight: 100 900;
    }

    * {
        margin: 0;
        padding: 0;
    }
    h1 {
        font-family: Rabegs;
        font-size: 2.5em;
    }

    nav {
        width: 100vw ;
        height: 4rem;
        border-bottom: solid black;
        border-top: solid black;
    }

    .fullheader {
        height: 4rem;
        display: grid;
        grid-template-columns: 4rem 1fr 4rem;
        grid-column-gap: 10px;
        overflow: hidden;
    }

    #headerlogo a {
        text-decoration: none;
        
        color: black;
    }
    #headerlogo {
        border-bottom: black solid;
        justify-content: center;
        align-items: center;
        text-align: center;
        height: 4rem;
    }

    .menu {
        border-right: black solid;
        height: 4rem;
        width: 4rem;
    }

    
</style>