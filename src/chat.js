import React, { useEffect, useRef } from "react";
import { socket } from "./socket";
import { useSelector } from "react-redux";
import { Profilepic } from "./profilepic";

export function Chat() {
    const chatMessages = useSelector(state => state && state.messages);

    const sendMessage = e => {
        if (e.key === "Enter") {
            e.preventDefault;
            console.log(e.target.value);
            socket.emit("my amazing chat message", e.target.value);
            e.target.value = "";
        }
    };

    const elementRef = useRef();

    useEffect(() => {
        console.log("chat mounted");
        console.log("elementRef:", elementRef.current);
        console.log("scroll top:", elementRef.current.scrollTop);
        console.log("scroll height:", elementRef.current.scrollHeight);
        console.log("client height:", elementRef.current.clientHeight);
        elementRef.current.scrollTop =
            elementRef.current.scrollHeight - elementRef.current.clientHeight;
    }, [chatMessages]);

    return (
        <div className="chat-container">
            <div className="chat-messages" ref={elementRef}>
                {chatMessages &&
                    chatMessages.map((users, index) => (
                        <div className="chat-text" key={index}>
                            <Profilepic url={users.image} />
                            {users.first} {users.last} says: {users.message}
                        </div>
                    ))}
            </div>
            <textarea
                className="text-area-chat"
                placeholder="SPEAK UPPPP!"
                onKeyDown={sendMessage}
            />
        </div>
    );
}
