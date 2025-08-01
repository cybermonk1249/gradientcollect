<script>
    import { onMount  } from 'svelte';
    
    let canv;
    onMount(() => {
        import('$lib/threejs/gscene.js')
            .then(module => module.createScene(canv))
    })
    
</script>

<canvas bind:this={canv}></canvas>

<style>
    canvas {
        display: block;
        background-color: white;
        height: 200px;
        width: 200px;
        z-index: 5;
        position: relative;
    }
</style>
