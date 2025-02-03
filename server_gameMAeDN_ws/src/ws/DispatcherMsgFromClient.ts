import {IMessage} from "../model/IMessage";
import SpielLogic from "../services/SpielLogic";

class DispatcherMsgFromClient {
    static dispatchMsgFromClient(msg: IMessage
                                 // , gameLogic: SpielLogic
    ): void {
        switch (msg.type){
            case "Wuerfeln":
                SpielLogic.getInstance().handleWuerfeln();
                break;
            default:
                console.warn("Unknown message type: ", msg);
        }
    }
}

export default DispatcherMsgFromClient;