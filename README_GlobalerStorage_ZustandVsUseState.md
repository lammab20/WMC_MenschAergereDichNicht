### README_WS-Step1_Basis

# Globaler Store mit useState:
    SpielStore.ts
        export function useSpielStore() {
        const [spielerArray, setSpielerArray] = useState<Spieler[]>([]);
        const [status, setStatus] = useState<string>("Warten auf Spielstart");
        
            return {
                spielerArray,
                status,
                setSpielerArray,
                setStatus,
            };
        }

Vorteile

✅ useSpielStore Hook statt Global Store:

    Der Zustand wird lokal in der App.tsx verwaltet.
    setSpielerArray und setStatus aktualisieren den Zustand.

✅ Zustand bleibt bei Neu-Rendern erhalten:

    Kein MobX oder Redux notwendig.
    useState steuert den Zustand direkt in SpielStore.ts.

✅ Bessere Code-Struktur & Trennung von Logik und UI:

    SpielStore.ts verwaltet den Zustand.
    App.tsx nutzt den Zustand über useSpielStore.

+++++++++++++++++++++
# Globaler Store mit Zustand
    SpielStore.ts
        export const useSpielStore = create<ISpielStore>((set) => ({
        spielerArray: [],
        status: "Warten auf Spielstart",
        setSpielerArray: (spielerArray) => set({ spielerArray }),
        setStatus: (status) => set({ status }),
        }));

Vorteile von Zustand gegenüber useState

✅ Kein Prop Drilling:

    Der SpielStore ist global verfügbar, jede Komponente kann ihn nutzen.

✅ Weniger Boilerplate:

    Kein useState, useContext oder Redux nötig.

✅ Automatische Re-Rendering Steuerung:

    Zustand-abhängige Komponenten werden nur bei Änderungen neu gerendert.

✅ Leicht erweiterbar:

    Weitere Features (z.B. mehrere Spiele, mehr Spieler) lassen sich einfach hinzufügen.