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

export const getUrlParam = (key: string, defaultValue: string) => {
    const query = window.location.search
    const params = new URLSearchParams(query)
    const value = params.get(key)
    return value === null ? defaultValue : value;
}

export const getUrlParamBoolean = (key: string) => {
    const value = getUrlParam(key, '0');
    return '1yt'.includes(value[0].toLowerCase());
}

export const getUrlParamInt = (key: string) => {
    return parseInt(getUrlParam(key, '0')) || 0;
}

export const getUrlParamIntArray = (key: string) => {
    return getUrlParam(key, '').split(",").filter((s) => s.length > 0).map((s) => parseInt(s));
}

export const orderMixes = (mixes: mix[], list: number[]) => {
    const result: mix[] = []
    list.forEach(i => {
        result.push(mixes[i])
    })
    return result
}

export const generateUrlParams = (params: [key: string, value: string | null][]) => {
    const query = getUrlParams()
    params.forEach(param => {
        if (param[1] !== null) {
            query[param[0]] = param[1]
        } else {
            delete query[param[0]]
        }
    })
    return  encodeUrlParams(query)
}

export const setUrlParams = (params: [key: string, value: string | null][]) => {
    const newQuery = generateUrlParams(params)
    window.history.pushState(null, document.title, newQuery)
}

const getUrlParams: () => {[id: string]: string} = () => {
    // Split all parameters
    const list = window.location.search.split("&")
    if (!list[0].includes("?")) {
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