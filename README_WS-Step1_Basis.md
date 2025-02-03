### README_WS-Step1_Basis

## Unser Schul-WebSocket Projekt
Für den Untericht werden die beidne Projekte für Client
und Server in einem Über-Ordner zusammengefasst, um eine einfacheren Überblick zu haben.

  # Client: React Vite (im Browser)
  # Server: Express

## WICHTIG: React(Browser)/ Express WebSocket-Event Unterschied
  # Express WebSocket-Event
        ws.onmessage = (event:MessageEvent) => {
            const recieved:string = event.data;

  # React(Browser)-Event
          ws.on('message', (message:string) => {

  # WICHTIG:   "ws.on('message'," ist nicht für Browser -WebSocket geeignet
Der WebSocket für Browser-Client (z.B. React)
Die WebSocket-Implementierung auf der Client-Seite
verwende  IMMER ws.onmessage () die native WebSocket-API des Browsers.
(obwohl die Anwendung in Node.js entwickelt und gebaut wurde).


## Client-Server-Kommunikationsaufbau:WebSocketServer
  # connect:


## Client und Server-Events und Handler:
Events sind gleich bei Client und:
  # open:
  # message:
  # error:
  # close:

Nur der Befehl zum Event abfangen ist Client und Server-Events seitig unterschiedlich.

## WebSocket Express vs. WebSocket React (Browser)

ws.on('eventkey')
z.B. ws.on ('message'), vs.ws.onmessage (

 Datentransfer als WebSocket-Frame Text
 send: JSON => string mit JSON.stringify()
 message: string => JSON mit JSON.parse()


### Message Dispatcher: Einfacher Typ-basierter Switch/Dispatcher
Von der eingehenden JSON-Nachricht wird je nach Interface ein Element auf Vorhandensein überprüft,
um zu entscheiden, welche Logik ausgeführt werden soll.

Diese Methode wird oft als Message Dispatcher oder Event Handler bezeichnet.

Solche Muster werden oft verwendet und haben unterschiedliche Namen und Konzepte,
abhängig davon, wie sie konkret umgesetzt werden.

  # Einfachste Variante:
   Das Prinzip, basiert darauf, das jedes Interface-Objekt unterschiedlichen Elemente (als eindeutige ID des Interfaces) hat.
   z. B. "connection" in IConnectionData). 
   Durch das Vorhandensein eines Elementes, wird ein Interface erkannt  und löst verschiedene Aktionen aus.

   Dies ist eine einfache und leicht verständliche Lösung. 

  # Alternative Varianten sind: 
  * Tiefergehende Valdierung mit Typprüfung aller Elemente vom Interface-Objekt
  * Diskriminator mit einem zusätzlichen Element, der einen eindeutigen Key für das Interface hat

### Error Handling bei WebSocket Anwendungen
Beide Error-Handling sind notwendig, weils ie für unterschiedliche Fehlererkennungen verwendet werden:
 * onError: Für WebSocket-Verbindungsprobleme, z. B. Netzwerkausfälle.
 * try/catch: Für potenziell fehlerhafte oder unerwartete Inhalte in onmessage.

Beides zusammen sorgt für eine robuste Fehlerbehandlung in deiner WebSocket-Anwendung.

 ## Error Handling im WebSocket-Event "message" (im Message Dispatcher)
try/catch: Interne Fehler der Message bzw. Buisness Verarbeitung

 ## Error Handling im WebSocket-Event "error"
Die onError-Callback-Funktion wird aufgerufen, wenn es zu einem Fehler in der WebSocket-Verbindung kommt,
z. B. Netzwerkprobleme oder Protokollfehler.
Wann brauchst du es?
Immer, wenn du wissen möchtest, ob es Probleme mit der Verbindung gibt, 
z. B. Netzwerkprobleme.
