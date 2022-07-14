import {IconProp} from "@fortawesome/fontawesome-svg-core";
import {faBullhorn, faFutbol, faGift, faKissWinkHeart, faSkiing, faVirus} from "@fortawesome/free-solid-svg-icons";

export type file = {
    filename: string;
    number: number | undefined;
    icon: IconProp | undefined;
    duration: number
    title: string
    toeters: number[] | undefined
}

export type playlist = {
    name: string;
    list: number[]
}

const toetersCenturion = [
    42, 108, 167, 223, 283, 340, 412, 459, 514, 574,
    635, 699, 756, 812, 874, 935, 995, 1046, 1107, 1173,
    1235, 1288, 1348, 1411, 1471, 1530, 1594, 1653, 1712, 1769,
    1829, 1887, 1945, 2004, 2064, 2125, 2194, 2245, 2305, 2374,
    2431, 2489, 2555, 2606, 2664, 2729, 2784, 2850, 2919, 2975,
    3039, 3104, 3160, 3215, 3279, 3341, 3398, 3465, 3520, 3577,
    3643, 3700, 3753, 3808, 3874, 3931, 3988, 4050, 4113, 4175,
    4228, 4280, 4341, 4408, 4467, 4521, 4578, 4645, 4701, 4764,
    4829, 4888, 4953, 5004, 5071, 5125, 5188, 5243, 5308, 5374,
    5431, 5488, 5556, 5612, 5667, 5731, 5783, 5846, 5902, 5970,
    6020
]

const toetersCenturion2 = [
    123, 188, 258, 308, 370, 430, 490, 550, 615, 674,
    732, 787, 853, 922, 976, 1038, 1093, 1157, 1214, 1268,
    1329, 1391, 1454, 1514, 1570, 1631, 1688, 1751, 1815, 1870,
    1926, 1992, 2054, 2113, 2173, 2239, 2288, 2348, 2417, 2473,
    2537, 2589, 2646, 2716, 2773, 2832, 2891, 2951, 3011, 3069,
    3130, 3187, 3246, 3316, 3369, 3423, 3482, 3542, 3621, 3665,
    3723, 3794, 3855, 3915, 3973, 4030, 4155, 4209, 4264, 4321,
    4385, 4450, 4504, 4561, 4616, 4677, 4739, 4797, 4859, 4922,
    4980, 5047, 5111, 5159, 5217, 5280, 5345, 5409, 5460, 5525,
    5587, 5651, 5701, 5764, 5823, 5888, 5942, 6017, 6071, 6128
]


export const files: file[] = [
    {
        number: 1,
        icon: undefined,
        filename: "mixes/Gebroeders Scooter - Totale Escalatie-GebroedersScooter_gebroeders-scooter-totale-escalatie.m4a",
        duration: 3573.7832199546483,
        title: "Gebroeders Scooter - Totale Escalatie",
        toeters: undefined
    },
    {
        number: 2,
        icon: undefined,
        filename: "mixes/Gebroeders Scooter - Totale Escalatie 2.0-GebroedersScooter_gebroeders-scooter-totale-escalatie-20.m4a",
        duration: 3701.8644897959184,
        title: "Gebroeders Scooter - Totale Escalatie 2.0",
        toeters: undefined
    },
    {
        number: 3,
        icon: undefined,
        filename: "mixes/Gebroeders Scooter - Totale Escalatie 3D-GebroedersScooter_gebroeders-scooter-totale-escalatie-3d.m4a",
        duration: 3571.5940136054423,
        title: "Gebroeders Scooter - Totale Escalatie 3D",
        toeters: undefined
    },
    {
        number: 4,
        icon: undefined,
        filename: "mixes/Gebroeders Scooter - Totale Escalatie 4-EVER-GebroedersScooter_totale-escalatie-4-ever.m4a",
        duration: 3666.1456689342403,
        title: "Gebroeders Scooter - Totale Escalatie 4-EVER",
        toeters: undefined
    },
    {
        number: undefined,
        icon: faGift,
        filename: "mixes/Gebroeders Scooter - Totale Kerstcalatie-GebroedersScooter_gebroeders-scooter-totale-kerstcalatie.m4a",
        duration: 2289.945396825397,
        title: "Gebroeders Scooter - Totale Kerstcalatie",
        toeters: undefined
    },
    {
        number: 5,
        icon: undefined,
        filename: "mixes/Gebroeders Scooter - Totale Escalatie High 5-GebroedersScooter_gebroeders-scooter-totale-escalatie-high-5.m4a",
        duration: 3635.1238095238095,
        title: "Gebroeders Scooter - Totale Escalatie High 5",
        toeters: undefined
    },
    {
        number: undefined,
        icon: faFutbol,
        filename: "mixes/Gebroeders Scooter - Totale WK-latie-GebroedersScooter_gebroeders-scooter-totale-wk-latie.m4a",
        duration: 899.9524716553288,
        title: "Gebroeders Scooter - Totale WK-latie",
        toeters: undefined
    },
    {
        number: 6,
        icon: undefined,
        filename: "mixes/Gebroeders Scooter - Totale Escalatie 6 On The Beach-GebroedersScooter_gebroeders-scooter-totale-escalatie-6-on-the-beach.m4a",
        duration: 3468.6831746031744,
        title: "Gebroeders Scooter - Totale Escalatie 6 On The Beach",
        toeters: undefined
    },
    {
        number: undefined,
        icon: faKissWinkHeart,
        filename: "mixes/Gebroeders Scooter - Totale ASScalatie-GebroedersScooter_gebroeders-scooter-totale-asscalatie.m4a",
        duration: 1391.1009523809523,
        title: "Gebroeders Scooter - Totale ASScalatie",
        toeters: undefined
    },
    {
        number: 7,
        icon: undefined,
        filename: "mixes/Gebroeders Scooter - Totale Escalatie 7UP-GebroedersScooter_gebroeders-scooter-totale-escalatie-7up.m4a",
        duration: 3621.0525170068026,
        title: "Gebroeders Scooter - Totale Escalatie 7UP",
        toeters: undefined
    },
    {
        number: 8,
        icon: undefined,
        filename: "mixes/Gebroeders Scooter - Totale Escalatie 8BAAN-GebroedersScooter_gebroeders-scooter-totale-escalatie-8baan.m4a",
        duration: 3677.941405895692,
        title: "Gebroeders Scooter - Totale Escalatie 8BAAN",
        toeters: undefined
    },
    {
        number: undefined,
        icon: faBullhorn,
        filename: "mixes/Gebroeders Scooter - Totale Escalatie Centurion-GebroedersScooter_gebroeders-scooter-totale-escalatie-centurion.m4a",
        duration: 6074.472925170068,
        title: "Gebroeders Scooter - Totale Escalatie Centurion",
        toeters: toetersCenturion
    },
    {
        number: 9,
        icon: undefined,
        filename: "mixes/Gebroeders Scooter - Totale Escalatie 9DARISCH!-GebroedersScooter_gebroeders-scooter-totale-escalatie-9darisch.m4a",
        duration: 3612.646893424036,
        title: "Gebroeders Scooter - Totale Escalatie 9DARISCH!",
        toeters: undefined
    },
    {
        number: undefined,
        icon: faSkiing,
        filename: "mixes/Gebroeders Scooter - Totale Eskilatie-GebroedersScooter_gebroeders-scooter-totale-eskilatie.m4a",
        duration: 3944.2278458049886,
        title: "Gebroeders Scooter - Totale Eskilatie",
        toeters: undefined
    },
    {
        number: 10,
        icon: undefined,
        filename: "mixes/Gebroeders Scooter - Totale EscalaTIEN-GebroedersScooter_gebroeders-scooter-totale-escalatien.m4a",
        duration: 3635.309569160998,
        title: "Gebroeders Scooter - Totale EscalaTIEN",
        toeters: undefined
    },
    {
        number: undefined,
        icon: faVirus,
        filename: "mixes/Gebroeders Scooter - Totale Isolatie-GebroedersScooter_gebroeders-scooter-totale-isolatie.m4a",
        duration: 4078.4856235827665,
        title: "Gebroeders Scooter - Totale Isolatie",
        toeters: undefined
    },

    /*16*/{
        number: undefined,
        icon: undefined,
        filename: "centimerion/start.m4a",
        duration: 43.74,
        title: "Gebroeders Scooter - Totale Escalatie Centurion",
        toeters: undefined
    },
    /*17*/{
        number: undefined,
        icon: faBullhorn,
        filename: "centimerion/middle.m4a",
        duration: 5979.132,
        title: "Gebroeders Scooter - Totale Escalatie Centurion",
        toeters: undefined
    },
    /*18*/{
        number: undefined,
        icon: undefined,
        filename: "centimerion/end.m4a",
        duration: 51.651,
        title: "Gebroeders Scooter - Totale Escalatie Centurion",
        toeters: undefined
    },

    {
        number: 2,
        icon: faBullhorn,
        filename: "mixes/Gebroeders Scooter - Totale Escalatie Centurion 2.0-GebroedersScooter_gebroeders-scooter-totale-escalatie-centurion-20.m4a",
        duration: 6161.653,
        title: "Gebroeders Scooter - Totale Escalatie Centurion 2.0",
        toeters: toetersCenturion2
    }
]

export const playlists: playlist[] = [
    {name: "Default", list: [19, 11, 14, 9, 15, 7, 8, 12, 2, 10, 5, 6, 3, 1, 0, 13, 4]},
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
    {
        name: "Amsterdammer",
        capacity: 250,
        empty_img: "containers/amsterdammer-empty.png",
        full_img: "containers/amsterdammer-full.png",
        top: 18, bottom: 1170, height: 1278
    },
    {
        name: "Flesje 0.3L", capacity: 300,
        empty_img: "containers/fles-empty.png",
        full_img: "containers/fles-full.png",
        top: 31, bottom: 570, height: 600
    },
    {
        name: "Flesje 0.33L", capacity: 330,
        empty_img: "containers/fles-empty.png",
        full_img: "containers/fles-full.png",
        top: 31, bottom: 570, height: 600
    },
    {name: "Beugel", capacity: 450, empty_img: undefined, full_img: undefined, top: 0, bottom: 0, height: 0},
    {name: "Pul 0.4L", capacity: 400, empty_img: undefined, full_img: undefined, top: 0, bottom: 0, height: 0},
    {name: "Pul 0.5L", capacity: 500, empty_img: undefined, full_img: undefined, top: 0, bottom: 0, height: 0},
    {name: "Pitcher", capacity: 1500, empty_img: undefined, full_img: undefined, top: 0, bottom: 0, height: 0},
]
