<script>
    import {Howl, Howler} from 'howler';
    import { parseFiles, audioData } from '$lib/audioData'
    import { onMount } from 'svelte';
    import { base } from "$app/paths";

    
    // this doesnt quite work yet
    let promise = $state(false);
    
    let isPlaying = $state(false);
    let tracks = $state();
    let trackIndex = $state(0);
    let trackArtist = $state('');
    let trackTitle = $state('');

    // let playURL = $state('');
    // playURL = '{base}/controls/play.png';


    onMount(() => {
        const filePaths = [
            '/tracks/Gloaming 207_059 + cybermonk.mp3',
            '/tracks/5. sienna sleep 71.mp3',
        ]
        promise = parseFiles(filePaths)
            .then(() => {
                // load sounds once metadata has been read
                trackTitle = audioData[0].title;
                trackArtist = audioData[0].artist;
                // create playlist
                tracks = createPlaylist();
                // console.log(tracks);

            });
        console.log(audioData);
        
    });

    const nextTrack = () => {
        tracks[trackIndex].stop();
        trackIndex += 1;
        if (trackIndex == audioData.length) {
            trackIndex = 0;
        }
        playPauseAudio();
    }

    function createPlaylist() {
        let tracks = [];
        for (let i = 0; i < audioData.length; i++) {
            tracks[i] = new Howl({
                src: audioData[i].url,
                onend: nextTrack,
                autoplay: false
            })
        }
        return tracks;
    }

    function playPauseAudio() {
        updateTags(); 
        if (tracks[trackIndex].playing()) {
            tracks[trackIndex].pause();
            isPlaying = false;
        } else {
            tracks[trackIndex].play();
            isPlaying = true;
        }
    }

    const updateTags = () => {
        trackTitle = audioData[trackIndex].title;
        // trackCover = audioData[trackIndex].cover;
        trackArtist = audioData[trackIndex].artist;
    }

    const prevTrack = () => {
        tracks[trackIndex].stop();
        trackIndex -= 1;
        if (trackIndex <= 0) {
            trackIndex = audioData.length - 1;
        }
        updateTags();
        
        playPauseAudio();
        // tracks[trackIndex].play(trackIndex);
    }

    const skipToStart = () => {
        tracks[trackIndex].stop();
        tracks[trackIndex].seek(0);
        isPlaying = false;
    }

</script>




<div id="footer">
    
    <div id="player-controls">
        <button onclick={skipToStart} ondblclick={prevTrack}>
            <img src='{base}/controls/skip-to-start.png' alt="skip">
        </button>
        <button onclick={playPauseAudio}>
            <img src='{base}/controls/play.png' alt="play/pause" />
            <!-- <img src={isPlaying ? '/controls/pause.png' : '/controls/play.png'} alt="play" /> -->
        </button>
        <button onclick={nextTrack}>
            <img src='{base}/controls/end.png' alt="skip">
        </button>
    </div>
    {#await promise then }
    <div id="track-info">
        <p>
            {trackTitle} - {trackArtist}
        </p>
    </div>
    {/await}
</div>


<style>
    p {
        color: white;
        text-align: center;
    }

    #track-info {
        text-align: center;
        padding: 0 1rem 0 1rem;
        flex-grow: 1;
    }

    #footer {
        height: 4rem;
        width: 100vw;

        display: flex;
        color: white;
        grid-template-columns: 12rem calc(100vw - 12rem);
        border-top: white solid;
        position: fixed;
        bottom: 0;

        overflow: hidden;
        align-items: center;
    }

    #player-controls {
        height: 4rem;
        display: flex;
        border-right: white solid;
        justify-content: center;
        align-items: center;
        column-gap: 2rem;
        width: 12rem;
    }

    #player-controls img {
        object-fit: contain;
        width: 100%;
        height: 2rem;
        filter: invert(1.0);
    }

    #player-controls button {
        background-color: black;
        border: none;
        height: 2rem;
        width: 2rem;
        cursor: pointer;
    }


</style>