import React, { useState, useEffect } from "react";
import axios from "./axios";

export default function FriendButton(props) {
    const [friendshipStatus, setFriendshipStatus] = useState("");

    const handleClick = () => {
        console.log("handleClick is running!!!");
        console.log("friendship status:", friendshipStatus);

        if (friendshipStatus == "Make Friend Request") {
            console.log("made it to IF block");
            axios
                .post("/make-friend-request", props)
                .then(res => {
                    console.log("res.data /make-friend-request:", res.data);
                    setFriendshipStatus(res.data.buttontext);
                })
                .catch(function(error) {
                    console.log("ERROR IN POST /make-friend-request:", error);
                });
        } else if (friendshipStatus == "Cancel Friend Request") {
            axios
                .post("/cancel-friend-request", props)
                .then(res => {
                    console.log("res.data /cancel-friend-request:", res.data);
                    setFriendshipStatus(res.data.buttontext);
                })
                .catch(function(error) {
                    console.log("ERROR IN POST /cancel-friend-request:", error);
                });
        } else if (friendshipStatus == "Accept Friend Request") {
            axios
                .post("/accept-friend-request", props)
                .then(res => {
                    console.log("res.data:", res.data);
                    setFriendshipStatus(res.data.buttontext);
                })
                .catch(function(error) {
                    console.log("ERROR IN POST /check-friendship:", error);
                });
        } else {
            axios
                .post("/end-friendship", props)
                .then(res => {
                    console.log("res.data:", res.data);
                    setFriendshipStatus(res.data.buttontext);
                })
                .catch(function(error) {
                    console.log("ERROR IN POST /end-friendship:", error);
                });
        }
    };

    console.log(props.id);
    useEffect(() => {
        console.log("useEffect IS RUNNING!!!!!!");
        axios
            .get("/check-friendship/" + props.id)
            .then(res => {
                console.log("res.data:", res.data);
                setFriendshipStatus(res.data.buttontext);
            })
            .catch(function(error) {
                console.log("ERROR IN GET /check-friendship:", error);
            });
    }, []);

    let friendsButton;

    friendsButton = (
        <div>
            <button className="all-buttons" onClick={handleClick}>
                {friendshipStatus}
            </button>
        </div>
    );

    return friendsButton;
}
