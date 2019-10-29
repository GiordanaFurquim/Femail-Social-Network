import axios from "./axios";

export function getAllFriends() {
    return axios.get("/friends/:get-all-friends.json").then(({ data }) => {
        console.log("data from /friends/:get-all-friends.json:", data);

        return {
            type: "GET_ALL_FRIENDS",
            allFriends: data
        };
    });
}

export function acceptFriendRequest(idOfAcceptFriendRequest) {
    return axios
        .post("/accept-friend-request-in-friends/:id", {
            id: idOfAcceptFriendRequest
        })
        .then(({ data }) => {
            console.log("/accept-friend-request-in-friends/:id:", data);

            return {
                type: "ACCEPT_FRIEND_REQUEST",
                acceptFriendRequest: idOfAcceptFriendRequest
            };
        });
}

export function endFriendship(idOfEndFriendship) {
    return axios
        .post("/end-friendship", {
            id: idOfEndFriendship
        })
        .then(({ data }) => {
            console.log("/end-friendship", data);

            return {
                type: "END_FRIENDSHIP",
                endFriendship: idOfEndFriendship
            };
        });
}

export function chatMessages(msgs) {
    return {
        type: "GET_MESSAGES",
        messages: msgs
    };
}

export function addChatMessage(msg) {
    console.log("made it to addChatMessage");
    return {
        type: "ADD_MESSAGE",
        msg: msg
    };
}

export function insertCollaboratorSkillsInfo(skills) {
    console.log("made it to insertCollaboratorSkillsInfo");
    return {
        type: "INSERT_COLLABORATOR_SKILLS_INFO",
        skills: skills
    };
}
