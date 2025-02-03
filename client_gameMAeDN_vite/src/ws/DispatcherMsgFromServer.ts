import { IMessage } from "../model/IMessage.ts";
import { ISpieler } from "../model/ISpieler.ts";
import { useSpielStore } from "../store/SpielStore.ts";

export class DispatcherMsgFromServer {
    static dispatchMsgFromServer = (msg: IMessage) => {
        console.log(`dispatchMsgFromServer: ${msg.type}`, msg);
        const spielStore = useSpielStore.getState();
        const { spielerArray, setStatus, setSpielerArray, setAktuellerSpieler } = spielStore;

        switch (msg.type) {
            case "Zug": {
                const updatedSpielerArray: ISpieler[] = msg.payload;
                setSpielerArray(updatedSpielerArray);
                setStatus(
                    updatedSpielerArray.length === 0
                        ? "Warte auf Spieler 1 und Spieler 2!"
                        : updatedSpielerArray.length === 1
                            ? `${updatedSpielerArray[0].id} wartet auf Spieler 2!`
                            : `${updatedSpielerArray[0].id} und ${updatedSpielerArray[1].id} spielen!`
                );
                break;
            }
            case "AktuellerSpieler":
                setAktuellerSpieler(spielerArray[msg.payload]);
                break;

            case "SpielerGeschlagen":
                setStatus(`${msg.payload.spielerGeschlagen} geschlagen und an den Start zurückgesetzt!`);
                setSpielerArray(msg.payload.spielerArray);
                break;

            case "Gewonnen":
                setStatus(`${msg.payload} hat gewonnen!`);
                break;

            default:
                console.log("Unbekannte Nachricht:", msg);
        }
    };
}

export default DispatcherMsgFromServer;
