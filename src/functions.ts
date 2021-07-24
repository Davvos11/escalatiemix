import {files} from "./config";
import {IconProp} from "@fortawesome/fontawesome-svg-core";
import * as musicMetadata from 'music-metadata-browser';

export type mix = {
    number: number | undefined;
    icon: IconProp | undefined;
    duration: number | undefined;
    filename: string;
    img: musicMetadata.IPicture | undefined;
    title: string | undefined;
}

export const getMixes = async (onProgress: (part: number, total: number) => void) => {
    const result: mix[] = [];
    // Update the progress
    const total = files.length
    let counter = 0
    onProgress(counter, total)

    for (const file of files) {
        let img = undefined;
        let title = undefined;
        let duration = undefined;

        // Get metadata
        try {
            const meta = await musicMetadata.fetchFromUrl(file.filename)
            img = musicMetadata.selectCover(meta.common.picture)
            title = meta.common.title
            duration = meta.format.duration
        } catch (error) {
            console.error(`Could not load ${file.filename}`)
        }

        if (img === null) {
            img = undefined
        }

        // Save the results
        result.push({
            number: file.number,
            icon: file.icon,
            duration: duration,
            img: img,
            title: title,
            filename: file.filename
        })

        // Update the progress
        counter++
        onProgress(counter, total)
    }

    return result;
}