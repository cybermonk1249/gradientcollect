<script>
    import { base } from "$app/paths";
    import { Hamburger } from 'svelte-hamburgers';
    import { fly } from 'svelte/transition';

    import AudioPlayer from "$lib/AudioPlayer.svelte"

    import Navbar from "$lib/Navbar.svelte"

    let open = $state(false);

</script>

<Navbar>

</Navbar>

<div class="player">
    <!-- icon -->
     <AudioPlayer>

     </AudioPlayer>
</div>

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

    :global(body) {
        margin: 0;
        background-color: black;
    }
    
    * {
        margin: 0;
        padding: 0;
    }
    

    .player {
        position: static;
        bottom: 0px;

        width: 100vw ;
        height: 4rem;
        border-bottom: solid white;
        /* border-top: solid white; */
        
        /* background-image: url("/img/bluebg.jpg"); */
        filter:grayscale(1.0);
    }

    
</style>