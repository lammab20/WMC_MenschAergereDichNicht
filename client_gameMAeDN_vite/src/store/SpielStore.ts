import {create} from "zustand/react";
import {ISpieler} from "../model/ISpieler.ts";

interface ISpielStore {
    spielerArray: ISpieler[];
    status: string;
    aktuellerSpieler: ISpieler | null;
    setSpielerArray: (spielerArray: ISpieler[]) => void;
    setStatus: (status: string) => void;
    setAktuellerSpieler: (spieler: ISpieler) => void;
}

export const useSpielStore = create<ISpielStore>(
    (set) => ({
        spielerArray: [],
        status: "Warten auf Spielstart",
        aktuellerSpieler: null,
        setSpielerArray: (spielerArray) =>  {
            console.log("SpielStore:spielerArray", spielerArray);
            set({spielerArray})
        },
        setStatus: (status) => {
            console.log("SpielStore:status", status);
            set({status})
        },
        setAktuellerSpieler: (aktuellerSpieler) =>  {
            console.log("SpielStore:aktuellerSpieler", aktuellerSpieler);
            set({aktuellerSpieler})
        },
    }));