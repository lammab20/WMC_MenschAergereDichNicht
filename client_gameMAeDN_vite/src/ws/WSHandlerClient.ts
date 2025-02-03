import {IMessage} from "../model/IMessage";
import DispatcherMsgFromServer from "./DispatcherMsgFromServer.ts";
import {useWsStore} from "../store/WsStore.ts";

export const CONFIG_PORT:number = 8765;

/*
    Jede Socket Kommunikation erfolgen ausschließlich in dieser Klasse
 */
export class WSHandlerClient {
    private socket: WebSocket | null = null;

    getSocket():WebSocket | null {
        return this.socket;
    }

    constructor() {
    }

    connect() {
        if (!this.socket || this.socket.readyState === WebSocket.CLOSED) {
            this.socket = new WebSocket(`ws://localhost:${CONFIG_PORT}`);
            console.log("********ws-creating:Client trying connecting to Server on Port...", CONFIG_PORT);

            this.handleConnection();
        }
    }

    handleConnection ():void {
        //Todo Global Storage WsStore Hook und Daten einbinden
        const wsStore = useWsStore.getState();
        const {setIsConnected} = wsStore;

        if(!this.socket){
            return
        }

        this.socket.onopen = () => {
            console.log("On Open : Socket = ", this.socket);
            setIsConnected(true);
        }

        this.socket.onclose = () => {
            console.log("On Close : Socket = ", this.socket);
            setIsConnected(false);
        }

        this.socket.onmessage =(event ) => {
            console.log("On message : Socket = ", this.socket);
            const msg:IMessage = JSON.parse(event.data);
            console.log("onmessage:msg=", msg);
            DispatcherMsgFromServer.dispatchMsgFromServer(msg);
        }

        this.socket.onerror = (error) => console.log("WebSocker err", error);

    }

    sendMessage(message: IMessage):void {
        //Todo: Wenn Socket Connection bereit, sende msg an Server
        if(this.socket && this.socket.readyState === WebSocket.OPEN){
            console.log("handler:sendMassage:message=",message);
            const msgString = JSON.stringify(message);
            this.socket.send(msgString);
        }else {
            console.error("WebSocket is not open. Cannot send message.");
        }
    }

    close() {
        //Todo: Wenn Socket Connection bereit, schließe Socket
        if(this.socket){
            this.socket.close();
        }
    }
}

export default WSHandlerClient;
