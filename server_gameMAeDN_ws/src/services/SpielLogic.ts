import { ISpieler } from "../model/ISpieler";
import WSHandlerServer from "../ws/WSHandlerServer";

class SpielLogic {
    // Gesamtanzahl der Felder (Ziel erreicht, wenn Position >= CONFIG_FELDER)
    private static readonly CONFIG_FELDER = 20;
    // Array aller Spieler
    private spielerArray: ISpieler[] = [];
    // Index des aktuellen Spielers
    private aktuellerSpielerIndex = 0;

    // Singleton-Instanz
    private static instance: SpielLogic;

    // Privater Konstruktor mit optionalem WSHandler
    private constructor(private wsHandler?: WSHandlerServer) {}

    // Gibt die einzige Instanz zurück (Singleton)
    public static getInstance(newWsHandler?: WSHandlerServer): SpielLogic {
        if (!SpielLogic.instance) {
            SpielLogic.instance = new SpielLogic(newWsHandler);
        }
        return SpielLogic.instance;
    }

    // Führt einen Spielzug aus (Würfeln, Update, Gegner-Check, Spielerwechsel)
    handleWuerfeln(): void {
        console.log("Würfeln:");
        const aktuellerSpieler: ISpieler = this.spielerArray[this.aktuellerSpielerIndex];
        if (!this.wsHandler) return;

        // Simuliere Würfelwurf (1-6) und aktualisiere Position
        const wurf = Math.floor(Math.random() * 6) + 1;
        aktuellerSpieler.position += wurf;
        console.log("Aktueller Spieler:", aktuellerSpieler);

        // Sende Zug-Update an alle Clients
        this.wsHandler.sendToAll({
            type: "Zug",
            payload: this.spielerArray
        });

        // Gewinner-Check
        if (aktuellerSpieler.position >= SpielLogic.CONFIG_FELDER) {
            this.wsHandler.sendToAll({
                type: "Gewonnen",
                payload: aktuellerSpieler.id
            });
            this.resetSpiel();
            return;
        }

        // Prüfe, ob ein Gegner auf derselben Position steht
        const gegner: ISpieler | null = this.checkGegner(aktuellerSpieler);
        if (gegner) {
            gegner.position = 0;
            this.wsHandler.sendToAll({
                type: "Spieler Geschlagen",
                payload: { spielerArray: this.spielerArray, spielerGeschlagen: gegner.id }
            });
        }

        // Spielerwechsel: Nächsten Spieler bestimmen
        this.aktuellerSpielerIndex = (this.aktuellerSpielerIndex + 1) % this.spielerArray.length;
        this.wsHandler.sendToAll({
            type: "aktuellerSpieler",
            payload: this.aktuellerSpielerIndex
        });
    }

    // Gibt den Gegner zurück, falls ein anderer Spieler auf derselben Position steht
    private checkGegner(spieler: ISpieler): ISpieler | null {
        return this.spielerArray.find(s => s !== spieler && s.position === spieler.position) || null;
    }

    // Setzt alle Spielerpositionen zurück
    private resetSpiel(): void {
        this.spielerArray.forEach(s => s.position = 0);
    }

    // Speichert das Spieler-Array
    addSpieler(newSpielerArray: ISpieler[]): void {
        console.log("Spiel Logik: add spieler, Length:", newSpielerArray.length);
        this.spielerArray = newSpielerArray;
    }

    // Gibt eine Kopie des Spieler-Arrays zurück (nur id und position)
    getSpielerArray(): ISpieler[] {
        return this.spielerArray.map(({ id, position }) => ({ id, position }));
    }
}

export default SpielLogic;
