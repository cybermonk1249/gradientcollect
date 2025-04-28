<script>
    import { base } from "$app/paths";
    import { Hamburger } from 'svelte-hamburgers';
    import { fly } from 'svelte/transition';

    let open = $state(false);


</script>

<nav>
    <div class="fullheader">
        <div class="menu">
            <Hamburger 
                bind:open
                type="emphatic-r"
                ariaControls="innerheader"  
                --color="white"          
            />
        </div>
        {#if open}
            <div id="innerheader" transition:fly={{ x: "-100vw", duration: 1000, opacity: 1}}>
                <ul class="innerlinks">
                    <li><a class="headerlink" href="{base}/about">about</a></li>
                    <li><a class="headerlink" href="{base}/about">music</a></li>
                    <li><a class="headerlink" href="{base}/about">temp</a></li>
                </ul>
            </div>
        {/if}
        <div id="headerlogo">
            <a href="{base}/">
                <h1>Gradient</h1>
            </a>
        </div>
    </div>
</nav>

<style>
    * {
        margin: 0;
        padding: 0;
    }

    h1 {
        font-family: Rabegs;
        font-size: 1.5em;
        color: white;
    }

    nav {
        width: 100vw ;
        height: 4rem;
        border-bottom: solid white;
        border-top: solid white;
        
        /* background-image: url("/img/bluebg.jpg"); */
        filter:grayscale(1.0);
    }

    .fullheader {
        height: 4rem;
        display: grid;
        grid-template-columns: 4rem 1fr 4rem;
        grid-column-gap: 10px;
        overflow: hidden;
        height: 100%;
        
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
        border-right: white solid;
        height: 4rem;
        width: 4rem;
        z-index: 5;
        background-color: black;
        /* background-image: url("/img/bluebg.jpg"); */

    }

    a, li {
        list-style: none;
        text-decoration: none;
        color: black;
        font-family: Tektur;
        font-size: 1.5em;
        padding-top: 10px;
        padding-bottom: 10px;
    }

    ul {
        display: flex;
        justify-content: space-around;
        align-content: center;
        width: 100%;
        height: 100%;
    }

    #innerheader {
        position: absolute;
        width: calc(100vw - 4rem);
        height: 4rem;
        /* left: -100vw; */
        left: 4rem;
        background-color: white;
        /* z-index: 4; */
        border-right: black solid;
    }


    :global(Hamburger) {
        width: 100%;
        height: 100%;
        top: 20%;
    }
</style>