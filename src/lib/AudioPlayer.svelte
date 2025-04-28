<script>
    import {Howl, Howler} from 'howler';
    import { parseFiles, audioData } from '$lib/audioData'
    import { onMount } from 'svelte';
    
    let promise = $state(false);
    
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

    let tracks = $state();
    let trackIndex = $state(0);
    let trackArtist = $state('');
    let trackTitle = $state('');
    
    // let isPlaying = $state(false);

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
            // isPlaying = false;
        } else {
            tracks[trackIndex].play();
            // isPlaying = true;
        }
    }

    const updateTags = () => {
        trackTitle = audioData[trackIndex].title;
        // trackCover = audioData[trackIndex].cover;
        trackArtist = audioData[trackIndex].artist;
    }

    const prevTrack = () => {
        // @ts-ignore
        tracks[trackIndex].stop();
        trackIndex -= 1;
        if (trackIndex <= 0) {
            trackIndex = audioData.length - 1;
        }
        updateTags();
        
        playPauseAudio();
        // tracks[trackIndex].play(trackIndex);
    }

</script>

<h1>
    {trackTitle} - {trackArtist}
</h1>

{#await promise then }
    <button onclick={playPauseAudio}>
        <img src={'/controls/play.png'} 
            alt="play" />
    </button>
    <button onclick={nextTrack}>
        <img src='/controls/end.png' alt="skip">
    </button>
{/await}

<style>
    h1 {
        color: white;
    }
</style>