import * as io from "socket.io-client";
import { chatMessages, addChatMessage } from "./actions";
export let socket;

export const init = store => {
    if (!socket) {
        socket = io.connect();

        socket.on("message from server", msg => {
            console.log(
                `Got message from the front and about to start redux stuff by
                dispatching and action! My message: ${msg}`,
                msg
            );
            store.dispatch(addChatMessage(msg));
        });

        socket.on("chatMessages", msgs => store.dispatch(chatMessages(msgs)));
    }
};
