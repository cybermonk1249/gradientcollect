import { parseBlob } from "music-metadata";
import { base } from "$app/paths";


async function loadMetaData(filePath) {
    const response = await fetch(filePath);
    const blob = await response.blob();

    try {
        const data = await parseBlob(blob);
        const metadata = {
            title: data.common.title,
            artist: data.common.artist,
            album: data.common.album,
            url: filePath,
            duration: data.format.duration
        }
        // console.log("Succefully loaded metadata: \n");
        // console.log(metadata);

        return metadata;
        // console.log(data);
    } catch (error) {
        console.error('Error parsing metadata:', error.message);
    }
}

export const audioData = [];
export async function parseFiles(filePaths) {
    for (const filePath of filePaths) {
        const metadata = await loadMetaData(filePath);
        audioData.push(metadata)
    }
    
    return true;
}