<script>
    // import { onMount  } from 'svelte';

    import { base } from "$app/paths";
    import { Hamburger } from 'svelte-hamburgers';
    import { fly } from 'svelte/transition';

    
    import Navbar from "$lib/Navbar.svelte"
    import AudioPlayer from "$lib/AudioPlayer.svelte"
    

    import GThree from "$lib/GThree.svelte"

    let open = $state(false);
    
    

</script>

<Navbar></Navbar>

<div id="grdlogo">
    <GThree></GThree>
</div>

<div class="player">
    <!-- icon -->
     <AudioPlayer></AudioPlayer>
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
    

    
    
</style>
