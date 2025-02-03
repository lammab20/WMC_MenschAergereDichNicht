import { WebSocket } from "ws";
import DispatcherMsgFromClient from "./DispatcherMsgFromClient";
import { IMessage } from "../model/IMessage";
import SpielLogic from "../services/SpielLogic";

export const CONFIG_PORT = 8765;

export class WSHandlerServer {
    // Konstruktor erhält das Set aller aktiven Clients
    constructor(
        private readonly clients: Set<WebSocket>,
        // Optional: SpielLogic könnte hier später übergeben werden
        // private readonly gameLogic: SpielLogic
    ) {
        console.log("WSHandlerServer-Konstr");
        // Grundlegende Handler-Einrichtung
        this.setupHandler();
    }

    // Richtet Event-Handler für den angegebenen Socket ein.
    // Falls kein Socket übergeben wird, wird nur das Clients-Set ausgegeben.
    setupHandler(socket?: WebSocket): void {
        console.log("[WSHandlerServer]: Clients:", this.clients.forEach(c => console.log(c)));
        if (!socket) return;

        // Nachrichtenevent: Nachricht parsen und an Dispatcher weiterleiten
        socket.on("message", (message) => {
            console.log("Received message:");
            DispatcherMsgFromClient.dispatchMsgFromClient(JSON.parse(message.toString()));
        });

        // Bei Verbindungsabbruch Socket aus Clients entfernen
        socket.on("close", () => {
            console.log("Connection closed");
            this.clients.delete(socket);
        });

        // Socket-Fehler protokollieren
        socket.on("error", (error) => {
            console.error("[WSHandlerServer]: Socket-Fehler", error);
        });
    }

    // Sendet eine Nachricht an alle verbundenen Clients
    sendToAll(msg: IMessage): void {
        const messageString = JSON.stringify(msg);
        this.clients.forEach(c => this.sendMessage(c, messageString));
    }

    // Sendet eine Nachricht an einen einzelnen Client, sofern der Socket offen ist
    private sendMessage(client: WebSocket, message: string): void {
        if (client.readyState === WebSocket.OPEN) {
            client.send(message);
        } else {
            console.error("Websocket is not open. Cannot send message");
        }
    }
}

export default WSHandlerServer;
