import {IconProp} from "@fortawesome/fontawesome-svg-core";
import {faBullhorn, faFutbol, faGift, faKissWinkHeart, faSkiing, faVirus} from "@fortawesome/free-solid-svg-icons";

export type file = {
    filename: string;
    number: number | undefined;
    icon: IconProp | undefined;
    duration: number
    title: string
}

export type playlist = {
    name: string;
    list: number[]
}

export const files:file[] = [
    {number: 1, icon: undefined, filename: "mixes/Gebroeders Scooter - Totale Escalatie-GebroedersScooter_gebroeders-scooter-totale-escalatie.m4a", duration: 3573.7832199546483, title: "Gebroeders Scooter - Totale Escalatie"},
    {number: 2, icon: undefined, filename: "mixes/Gebroeders Scooter - Totale Escalatie 2.0-GebroedersScooter_gebroeders-scooter-totale-escalatie-20.m4a", duration: 3701.8644897959184, title: "Gebroeders Scooter - Totale Escalatie 2.0"},
    {number: 3, icon: undefined, filename: "mixes/Gebroeders Scooter - Totale Escalatie 3D-GebroedersScooter_gebroeders-scooter-totale-escalatie-3d.m4a", duration: 3571.5940136054423, title: "Gebroeders Scooter - Totale Escalatie 3D"},
    {number: 4, icon: undefined, filename: "mixes/Gebroeders Scooter - Totale Escalatie 4-EVER-GebroedersScooter_totale-escalatie-4-ever.m4a", duration: 3666.1456689342403, title: "Gebroeders Scooter - Totale Escalatie 4-EVER"},
    {number: undefined, icon: faGift,  filename: "mixes/Gebroeders Scooter - Totale Kerstcalatie-GebroedersScooter_gebroeders-scooter-totale-kerstcalatie.m4a", duration: 2289.945396825397, title: "Gebroeders Scooter - Totale Kerstcalatie"},
    {number: 5, icon: undefined, filename: "mixes/Gebroeders Scooter - Totale Escalatie High 5-GebroedersScooter_gebroeders-scooter-totale-escalatie-high-5.m4a", duration: 3635.1238095238095, title: "Gebroeders Scooter - Totale Escalatie High 5"},
    {number: undefined, icon: faFutbol,  filename: "mixes/Gebroeders Scooter - Totale WK-latie-GebroedersScooter_gebroeders-scooter-totale-wk-latie.m4a", duration: 899.9524716553288, title: "Gebroeders Scooter - Totale WK-latie"},
    {number: 6, icon: undefined, filename: "mixes/Gebroeders Scooter - Totale Escalatie 6 On The Beach-GebroedersScooter_gebroeders-scooter-totale-escalatie-6-on-the-beach.m4a", duration: 3468.6831746031744, title: "Gebroeders Scooter - Totale Escalatie 6 On The Beach"},
    {number: undefined, icon: faKissWinkHeart,  filename: "mixes/Gebroeders Scooter - Totale ASScalatie-GebroedersScooter_gebroeders-scooter-totale-asscalatie.m4a", duration: 1391.1009523809523, title: "Gebroeders Scooter - Totale ASScalatie"},
    {number: 7, icon: undefined, filename: "mixes/Gebroeders Scooter - Totale Escalatie 7UP-GebroedersScooter_gebroeders-scooter-totale-escalatie-7up.m4a", duration: 3621.0525170068026, title: "Gebroeders Scooter - Totale Escalatie 7UP"},
    {number: 8, icon: undefined, filename: "mixes/Gebroeders Scooter - Totale Escalatie 8BAAN-GebroedersScooter_gebroeders-scooter-totale-escalatie-8baan.m4a", duration: 3677.941405895692, title: "Gebroeders Scooter - Totale Escalatie 8BAAN"},
    {number: undefined, icon: faBullhorn,  filename: "mixes/Gebroeders Scooter - Totale Escalatie Centurion-GebroedersScooter_gebroeders-scooter-totale-escalatie-centurion.m4a", duration: 6074.472925170068, title: "Gebroeders Scooter - Totale Escalatie Centurion"},
    {number: 9, icon: undefined, filename: "mixes/Gebroeders Scooter - Totale Escalatie 9DARISCH!-GebroedersScooter_gebroeders-scooter-totale-escalatie-9darisch.m4a", duration: 3612.646893424036, title: "Gebroeders Scooter - Totale Escalatie 9DARISCH!"},
    {number: undefined, icon: faSkiing,  filename: "mixes/Gebroeders Scooter - Totale Eskilatie-GebroedersScooter_gebroeders-scooter-totale-eskilatie.m4a", duration: 3944.2278458049886, title: "Gebroeders Scooter - Totale Eskilatie"},
    {number: 10, icon: undefined, filename: "mixes/Gebroeders Scooter - Totale EscalaTIEN-GebroedersScooter_gebroeders-scooter-totale-escalatien.m4a", duration: 3635.309569160998, title: "Gebroeders Scooter - Totale EscalaTIEN"},
    {number: undefined, icon: faVirus,  filename: "mixes/Gebroeders Scooter - Totale Isolatie-GebroedersScooter_gebroeders-scooter-totale-isolatie.m4a", duration: 4078.4856235827665, title: "Gebroeders Scooter - Totale Isolatie"},

    /*16*/{number: undefined, icon: undefined, filename: "centimerion/start.m4a", duration: 43.74, title: "Gebroeders Scooter - Totale Escalatie Centurion"},
    /*17*/{number: undefined, icon: faBullhorn, filename: "centimerion/middle.m4a", duration: 5979.132, title: "Gebroeders Scooter - Totale Escalatie Centurion"},
    /*18*/{number: undefined, icon: undefined, filename: "centimerion/end.m4a", duration: 51.651, title: "Gebroeders Scooter - Totale Escalatie Centurion"},

    {number: 2, icon: faBullhorn, filename: "mixes/Gebroeders Scooter - Totale Escalatie Centurion 2.0-GebroedersScooter_gebroeders-scooter-totale-escalatie-centurion-20.m4a", duration: 6161.653, title: "Gebroeders Scooter - Totale Escalatie Centurion 2.0"}
]

export const playlists:playlist[] = [
    {name: "Nice volgorde", list: [11, 14, 19, 9, 15, 7, 8, 12, 2, 10, 5, 6, 3, 1, 0, 13, 4]},
    {name: "Alleen nice mixen", list: [11, 14, 19, 9, 15, 7, 8, 12, 2, 10]},
    {name: "Chronologisch (centurion als laatste)", list: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 12, 13, 14, 15, 11, 19]},
    {name: "Chronologisch", list: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 19]},
    {name: "Centurioni", list: [11, 19]}
]

export const centurionLength = files[17].duration

export type Container = {
    name: string
    capacity: number
    empty_img: string | undefined
    full_img: string | undefined
    top: number
    bottom: number
    height: number
}

export const containers: Container[] = [
    {
        name: "Shotglas", capacity: 35,
        empty_img: "containers/shot-empty.png",
        full_img: "containers/shot-full.png",
        top: 37, bottom: 507, height: 700
    },
    {
        name: "Stapelglas", capacity: 200,
        empty_img: "containers/stapel-empty.png",
        full_img: "containers/stapel-full.png",
        top: 10, bottom: 379, height: 414
    },
    {name: "Amsterdammer", capacity: 250, empty_img: undefined, full_img: undefined, top: 0, bottom: 0, height: 0},
    {name: "Flesje", capacity: 300, empty_img: undefined, full_img: undefined, top: 0, bottom: 0, height: 0},
    {name: "Beugel", capacity: 450, empty_img: undefined, full_img: undefined, top: 0, bottom: 0, height: 0},
    {name: "Pul 0.4L", capacity: 400, empty_img: undefined, full_img: undefined, top: 0, bottom: 0, height: 0},
    {name: "Pul 0.5L", capacity: 500, empty_img: undefined, full_img: undefined, top: 0, bottom: 0, height: 0},
    {name: "Pitcher", capacity: 1500, empty_img: undefined, full_img: undefined, top: 0, bottom: 0, height: 0},
]

export const toeters: number[] = [
    1, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80, 85, 90, 95, 100, 105
]

// export const toeters: number[] = [
//     1, 5, 10
// ]
