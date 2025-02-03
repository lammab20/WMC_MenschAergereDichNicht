import {useEffect, useState} from "react";
import {useSpielStore} from "../store/SpielStore.ts";
import {ISpieler} from "../model/ISpieler.ts";
import WSHandlerClient from "../ws/WSHandlerClient.ts";
import {useWsStore} from "../store/WsStore.ts";

export const SpielDashboard = () => {
    //Globaler Storage mit Zustand
    const { aktuellerSpieler, spielerArray, status } = useSpielStore();
    const { isConnected } = useWsStore();

    //Lokaler Storage mit State
    // const [ws, setWS] = useState<WebSocket | null>(null);
    const [wsHandler, setWsHandler] = useState<WSHandlerClient | null>(null);

    //Init Connection
    useEffect(() => {
        //init WS Handler
        const newWsHandler = new WSHandlerClient();
        newWsHandler.connect(); //erzeugt Socket zum Server

        //Speichert Socket im Global Storage
        // const socket:WebSocket | null = newWsHandler.getSocket();
        // setWS(socket);
        setWsHandler(newWsHandler);

        return () => {
            console.log("**********useEffect-return():wsHandler=", wsHandler);
            if (!wsHandler) return;
            wsHandler.close();
        };
    }, []);


    //View Handler
    const handleWuerfeln = () => {
        console.log("wuerfeln:wsHandler=", wsHandler);
        if (!wsHandler) return;

        wsHandler.sendMessage({ type: "Wuerfeln" });

    };

    //View render
    return (
        <div style={{textAlign: "center", marginTop: "50px"}}>
            <h1>Mensch ärgere dich nicht</h1>
            <h2>{aktuellerSpieler ? "Spieler " + aktuellerSpieler.id +" am Zug"
                : "Drücke Würfeln zum Spielstart"}</h2>
            <h2>Status: {status}</h2>
            {spielerArray.map((s: ISpieler) => (
                <p key={s.id}>{s.id} - Position: {s.position}</p>
            ))}
            <button onClick={handleWuerfeln} disabled={!isConnected}>
                Würfeln
            </button>
        </div>
    );
};