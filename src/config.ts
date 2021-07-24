import {IconProp} from "@fortawesome/fontawesome-svg-core";
import {faBullhorn, faFutbol, faGift, faKissWinkHeart, faSkiing, faVirus} from "@fortawesome/free-solid-svg-icons";

export type file = {
    filename: string;
    number: number | undefined;
    icon: IconProp | undefined;
}

export const files:file[] = [
    {number: 1, icon: undefined, filename: "mixes/Gebroeders Scooter - Totale Escalatie-GebroedersScooter_gebroeders-scooter-totale-escalatie.m4a"},
    {number: 2, icon: undefined, filename: "mixes/Gebroeders Scooter - Totale Escalatie 2.0-GebroedersScooter_gebroeders-scooter-totale-escalatie-20.m4a"},
    {number: 3, icon: undefined, filename: "mixes/Gebroeders Scooter - Totale Escalatie 3D-GebroedersScooter_gebroeders-scooter-totale-escalatie-3d.m4a"},
    {number: 4, icon: undefined, filename: "mixes/Gebroeders Scooter - Totale Escalatie 4-EVER-GebroedersScooter_totale-escalatie-4-ever.m4a"},
    {number: undefined, icon: faGift,  filename: "mixes/Gebroeders Scooter - Totale Kerstcalatie-GebroedersScooter_gebroeders-scooter-totale-kerstcalatie.m4a"},
    {number: 5, icon: undefined, filename: "mixes/Gebroeders Scooter - Totale Escalatie High 5-GebroedersScooter_gebroeders-scooter-totale-escalatie-high-5.m4a"},
    {number: undefined, icon: faFutbol,  filename: "mixes/Gebroeders Scooter - Totale WK-latie-GebroedersScooter_gebroeders-scooter-totale-wk-latie.m4a"},
    {number: 6, icon: undefined, filename: "mixes/Gebroeders Scooter - Totale Escalatie 6 On The Beach-GebroedersScooter_gebroeders-scooter-totale-escalatie-6-on-the-beach.m4a"},
    {number: undefined, icon: faKissWinkHeart,  filename: "mixes/Gebroeders Scooter - Totale ASScalatie-GebroedersScooter_gebroeders-scooter-totale-asscalatie.m4a"},
    {number: 7, icon: undefined, filename: "mixes/Gebroeders Scooter - Totale Escalatie 7UP-GebroedersScooter_gebroeders-scooter-totale-escalatie-7up.m4a"},
    {number: 8, icon: undefined, filename: "mixes/Gebroeders Scooter - Totale Escalatie 8BAAN-GebroedersScooter_gebroeders-scooter-totale-escalatie-8baan.m4a"},
    {number: 9, icon: undefined, filename: "mixes/Gebroeders Scooter - Totale Escalatie 9DARISCH!-GebroedersScooter_gebroeders-scooter-totale-escalatie-9darisch.m4a"},
    {number: undefined, icon: faSkiing,  filename: "mixes/Gebroeders Scooter - Totale Eskilatie-GebroedersScooter_gebroeders-scooter-totale-eskilatie.m4a"},
    {number: 10, icon: undefined, filename: "mixes/Gebroeders Scooter - Totale EscalaTIEN-GebroedersScooter_gebroeders-scooter-totale-escalatien.m4a"},
    {number: undefined, icon: faVirus,  filename: "mixes/Gebroeders Scooter - Totale Isolatie-GebroedersScooter_gebroeders-scooter-totale-isolatie.m4a"},
    {number: undefined, icon: faBullhorn,  filename: "mixes/Gebroeders Scooter - Totale Escalatie Centurion-GebroedersScooter_gebroeders-scooter-totale-escalatie-centurion.m4a"},
]