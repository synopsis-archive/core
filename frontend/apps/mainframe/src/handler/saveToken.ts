import {IncomingMessageHandler} from "../types/handler";
import {fetch2} from "../utils/fetch";

export const saveToken: IncomingMessageHandler<"saveToken"> = (_message, context) => {
       if(_message.data.token === null) return;
       fetch2(context.config.secureBackendUrl, "/Pw/SetEduvidualToken", "POST", _message.data.token)
           .catch(e => console.log(e))
}
