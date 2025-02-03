import { WebSocketServer, WebSocket } from "ws";
import SpielLogic from "../services/SpielLogic";
import WSHandlerServer from "./WSHandlerServer";

export class SpielWSS {
    // Set aller verbundenen Clients
    private readonly clients: Set<WebSocket> = new Set();

    // WebSocket-Server-Instanz
    private readonly wss: WebSocketServer;

    // Spiel-Logik (Singleton)
    private gameLogic?: SpielLogic;

    // WS-Handler für Events
    private wsHandler?: WSHandlerServer;

    // Timer für periodische Nachrichten
    private timer?: NodeJS.Timeout;

    constructor(readonly port: number) {
        // WebSocket-Server starten
        this.wss = new WebSocketServer({ port: port });
        console.log(`WebSocket server running on ws://localhost:${port}`);

        // WS-Handler initialisieren
        this.wsHandler = new WSHandlerServer(this.clients);

        // Spiel-Logik als Singleton abrufen und WS-Handler übergeben
        this.gameLogic = SpielLogic.getInstance(this.wsHandler);

        // Dummy-Spieler hinzufügen, falls nötig
        if (this.gameLogic.getSpielerArray().length <= 2) {
            this.gameLogic.addSpieler([
                { id: "Spieler1", position: 0 },
                { id: "Spieler2", position: 0 }
            ]);
        }

        // Verbindungen einrichten
        this.setupConnection();
    }

    // Listener für neue Client-Verbindungen
    private setupConnection(): void {
        console.log("WSS:setup:connection");
        this.wss.on("connection", (ws: WebSocket) => {
            console.log("Neuer Client verbunden");
            this.clients.add(ws);
            if (!this.wsHandler) {
                this.wsHandler = new WSHandlerServer(this.clients);
            }
            this.wsHandler.setupHandler(ws);
            if (!this.timer) {
                this.startTimer();
            }
        });
    }

    // Startet einen Timer, der alle 5 Sekunden eine Nachricht an alle Clients sendet
    private startTimer(): void {
        this.timer = setInterval(() => {
            if (this.wsHandler && this.gameLogic) {
                this.wsHandler.sendToAll({
                    type: "Timer Alarm",
                    payload: this.gameLogic.getSpielerArray()
                });
            }
        }, 5000);
    }
}
