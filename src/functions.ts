import {files} from "./config";
import {IconProp} from "@fortawesome/fontawesome-svg-core";

export type mix = {
    number: number | undefined;
    icon: IconProp | undefined;
    duration: number;
    filename: string;
    img: string;
    title: string;
}

export const getMixes = async (onProgress: (part: number, total: number) => void) => {
    const result: mix[] = [];
    // Update the progress
    const total = files.length
    let counter = 0
    onProgress(counter, total)

    for (const file of files) {
        const img = file.filename.replace(/.m4a\s*$/i, ".png")

        // Save the results
        result.push({
            number: file.number,
            icon: file.icon,
            duration: file.duration,
            img: img,
            title: file.title,
            filename: file.filename
        })

        // Update the progress
        counter++
        onProgress(counter, total)
    }

    return result;
}

export const getUrlParamInt = (key: string) => {
    const query = window.location.search
    const params = new URLSearchParams(query)
    const value = params.get(key)
    if (value !== null) {
        return parseInt(value)
    }
    return 0
}

export const orderMixes = (mixes: mix[], list: number[]) => {
    const result: mix[] = []
    list.forEach(i => {
        result.push(mixes[i])
    })
    return result
}