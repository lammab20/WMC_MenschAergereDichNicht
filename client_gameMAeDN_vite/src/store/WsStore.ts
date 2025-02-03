import {create} from "zustand/react";

interface IWsStore {
    isConnected: boolean;
    setIsConnected: (isConnected: boolean) => void;
}

export const useWsStore = create<IWsStore>((set) => ({
    isConnected: false,
    setIsConnected: (isConnected) =>  {
        console.log("WsStore:isConnected", isConnected);
        set({isConnected})
    },
}));