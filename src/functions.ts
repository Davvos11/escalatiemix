import {files} from "./config";
import {IconProp} from "@fortawesome/fontawesome-svg-core";

export type mix = {
    number: number | undefined;
    icon: IconProp | undefined;
    duration: number;
    filename: string;
    img: string;
    title: string;
    index: number;
}

export const getMixes = async (onProgress: (part: number, total: number) => void) => {
    const result: mix[] = [];
    // Update the progress
    const total = files.length
    let counter = 0
    onProgress(counter, total)

    for (let i = 0; i < files.length; i++){
        const file = files[i];
        const img = file.filename.replace(/.m4a\s*$/i, ".png")

        // Save the results
        result.push({
            number: file.number,
            icon: file.icon,
            duration: file.duration,
            img: img,
            title: file.title,
            filename: file.filename,
            index: i
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

export const getUrlParamIntArray = (key: string) => {
    const query = window.location.search
    const params = new URLSearchParams(query)
    const value = params.get(key)
    if (value !== null) {
        return value.split(",").map(s => parseInt(s))
    }
    return []
}

export const orderMixes = (mixes: mix[], list: number[]) => {
    const result: mix[] = []
    list.forEach(i => {
        result.push(mixes[i])
    })
    return result
}

export const setUrlParams = (params: [key: string, value: string | null][]) => {
    const query = getUrlParams()
    params.forEach(param => {
        if (param[1] !== null) {
            query[param[0]] = param[1]
        } else {
            delete query[param[0]]
        }
    })
    const newQuery = encodeUrlParams(query)
    window.history.pushState(null, document.title, newQuery)
}

const getUrlParams: () => {[id: string]: string} = () => {
    // Split all parameters
    const list = window.location.search.split("&")
    if (!list.includes("?")) {
        return {}
    }

    // Remove the question mark form the first query
    list[0] = list[0].split("?")[1]
    const result: {[id: string]: string} = {}

    list.forEach(item => {
        const keyValue = item.split("=")
        result[keyValue[0]] = keyValue[1]
    })

    return result;
}

const encodeUrlParams: (query: {[id: string]: string}) => string = (query) => {
    let result = "?"
    Object.entries(query).forEach(([key, value]) => {
        result += key + "=" + value + "&"
    })

    return result.replace(/&$/, "")
}