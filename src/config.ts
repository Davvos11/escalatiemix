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
    123.756, 188.461, 257.693, 308.927, 369.988, 429.658, 490.41,
    549.616, 615.646, 673.947, 731.541, 787.544, 853.729, 922.056,
    976.249, 1038.259, 1093.247, 1157.179, 1214.045, 1268.481, 1329.299,
    1391.486, 1454.645, 1514.889, 1570.385, 1630.938, 1688.311, 1751.272,
    1815.8, 1870.258, 1926.461, 1992.093, 2053.64, 2112.868, 2173.024,
    2238.347, 2288.477, 2348.639, 2417.533, 2473.559, 2537.337, 2589.388,
    2646.937, 2715.573, 2772.99, 2832.329, 2891.491, 2950.653, 3011.581,
    3068.822, 3129.773, 3186.925, 3246.021, 3316.202, 3369.777, 3423.263,
    3482.315, 3542.36, 3621.353, 3665.012, 3722.673, 3793.804, 3854.534,
    3915.131, 3973.608, 4029.811, 4155.533, 4208.909, 4263.698, 4321.667,
    4384.628, 4450.503, 4503.99, 4560.612, 4615.467, 4677.191, 4738.826,
    4796.288, 4858.674, 4922.495, 5039.935, 5046.671, 5111.31, 5158.856,
    5217.421, 5280.691, 5345.396, 5408.621, 5460.672, 5525.465, 5587.056,
    5651.805, 5701.516, 5764.388, 5822.511, 5888.541, 5942.734, 6017.002,
    6071.217, 6127.618
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
    },
    /*20*/{
        number: 11,
        icon: undefined,
        filename: "mixes/Gebroeders Scooter - Totale Escalatie Spuit 11-GebroedersScooter_gebroeders-scooter-totale-escalatie-spuit-11.m4a",
        duration: 6161.653,
        title: "Gebroeders Scooter - Totale Escalatie Spuit 11",
        toeters: undefined
    },
]

export const playlists: playlist[] = [
    {name: "Default", list: [20, 19, 11, 14, 9, 15, 7, 8, 12, 2, 10, 5, 6, 3, 1, 0, 13, 4]},
    {name: "Nice volgorde", list: [11, 14, 19, 9, 20, 15, 7, 8, 12, 2, 10, 5, 6, 3, 1, 0, 13, 4]},
    {name: "Alleen nice mixen", list: [11, 14, 19, 9, 20, 15, 7, 8, 12, 2, 10]},
    {name: "Chronologisch (centurion als laatste)", list: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 12, 13, 14, 15, 20, 11, 19]},
    {name: "Chronologisch", list: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 19, 20]},
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
