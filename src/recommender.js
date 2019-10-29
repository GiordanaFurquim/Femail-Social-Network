import React, { useState, useEffect } from "react";
import axios from "./axios";
import { Profilepic } from "./profilepic";
import { Link } from "react-router-dom";

export function Recommender() {
    const [friends, setFriends] = useState([]);

    useEffect(() => {
        console.log("useEffect IS RUNNING!!!!!!");
        axios
            .get("/recomender/best-matches")
            .then(res => {
                console.log("res.data:", res.data);
                setFriends(res.data);
            })
            .catch(function(error) {
                console.log("ERROR IN GET /recomender/best-matches:id:", error);
            });
    }, []);

    return (
        <div className="find-match-container">
            <h1 className="h1-on-find-match">
                These are the best collaborators for you
            </h1>

            <div className="find-match-small-container">
                {friends.map(users => (
                    <div className="find-matches-wrapper" key={users.id}>
                        <Link to={`/user/${users.id}`}>
                            <h4 className="name-on-recommender">
                                {users.first} {users.last}
                            </h4>
                            <Profilepic url={users.image} />
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
}
