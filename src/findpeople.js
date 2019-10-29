import React, { useState, useEffect } from "react";
import axios from "./axios";
import { Profilepic } from "./profilepic";
import { Link } from "react-router-dom";

export function FindPeople() {
    const [friends, setFriends] = useState([]);
    const [userSearch, setUserSearch] = useState("");

    useEffect(() => {
        console.log("useEffect IS RUNNING!!!!!!");
        axios
            .get("/findusers")
            .then(res => {
                console.log("res.data:", res.data);
                setFriends(res.data);
            })
            .catch(function(error) {
                console.log("ERROR IN GET /findusers:", error);
            });
    }, []);

    useEffect(() => {
        console.log("useEffect2 IS RUNNING!!!!!!");
        axios
            .get("/findusers/" + userSearch)
            .then(res => {
                console.log("res.data:", res.data);
                setFriends(res.data);
            })
            .catch(function(error) {
                console.log("ERROR IN GET /findusers:", error);
            });
    }, [userSearch]);
    console.log(userSearch);

    return (
        <div className="find-users-container">
            <div className="find-users-small-container">
                <h1>Users Finder</h1>
                <input
                    onChange={e => setUserSearch(e.target.value)}
                    placeholder="find other women using this platform"
                />
                <h2>
                    we have new members on our community.  woop, woop!{" "}
                </h2>

                {friends.map(users => (
                    <div className="find-users-wrapper" key={users.id}>
                        <Link to={`/user/${users.id}`}>
                            <h4>
                                {users.first} {users.last}
                            </h4>
                            <Profilepic url={users.image} />
                        </Link>
                    </div>
                ))}
            </div>
            <div className="find-users-image">
                <img src="birds.gif" />
            </div>
        </div>
    );
}
