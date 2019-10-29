import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getAllFriends, endFriendship, acceptFriendRequest } from "./actions";
import { Profilepic } from "./profilepic";

export default function Friends() {
    const dispatch = useDispatch();

    const allFriends = useSelector(
        state =>
            state.allFriends &&
            state.allFriends.filter(user => user.accepted === true)
    );

    const pending = useSelector(
        state =>
            state.allFriends &&
            state.allFriends.filter(user => user.accepted === false)
    );
    console.log("pending in friends.js:", pending);
    console.log("Friends in friends.js:", allFriends);

    useEffect(() => {
        dispatch(getAllFriends());
    }, []);

    const handleClickOnAllFriends = idOfHandleClickOnAllFriends => {
        dispatch(endFriendship(idOfHandleClickOnAllFriends));
    };

    const handleClickOnPending = idOfAcceptFriendRequest => {
        dispatch(acceptFriendRequest(idOfAcceptFriendRequest));
    };

    return (
        <div className="friends-component-container">
            <h1>Pending Friend Requests</h1>
            <div className="friends">
                {pending &&
                    pending.map(users => (
                        <div className="single-friend" key={users.id}>
                            <h3>
                                {users.first} {users.last}
                            </h3>
                            <Link to={`/user/${users.id}`}>
                                <Profilepic url={users.image} />
                            </Link>
                            <button
                                className="accept-friendship-button"
                                onClick={() => handleClickOnPending(users.id)}
                            >
                                Accept Friend Request
                            </button>
                        </div>
                    ))}
            </div>

            <h1>All Friends</h1>
            <div className="friends">
                {allFriends &&
                    allFriends.map(users => (
                        <div className="single-friend" key={users.id}>
                            <h3>
                                {users.first} {users.last}
                            </h3>
                            <Link to={`/user/${users.id}`}>
                                <Profilepic url={users.image} />
                            </Link>
                            <button
                                className="end-friendship-button"
                                onClick={() =>
                                    handleClickOnAllFriends(users.id)
                                }
                            >
                                Unfriend
                            </button>
                        </div>
                    ))}
            </div>
        </div>
    );
}
