export default function reducer(state = {}, action) {
    if (action.type === "GET_ALL_FRIENDS") {
        console.log("GET_ALL_FRIENDS in reducer:", action);
        state = {
            ...state,
            allFriends: action.allFriends
        };
    }

    if (action.type === "END_FRIENDSHIP") {
        console.log("END_FRIENDSHIP in reducer:", action);
        state = {
            ...state,
            allFriends: state.allFriends.filter(
                user => user.id != action.endFriendship
            )
        };
    }

    if (action.type === "ACCEPT_FRIEND_REQUEST") {
        console.log("ACCEPT_FRIEND_REQUEST in reducer:", action);
        state = {
            ...state,
            allFriends: state.allFriends.map(user => {
                if (user.id == action.acceptFriendRequest) {
                    return {
                        ...user,
                        accepted: true
                    };
                } else {
                    return {
                        ...user
                    };
                }
            })
        };
    }

    if (action.type === "GET_MESSAGES") {
        console.log("GET_MESSAGES in reducer:", action);
        state = {
            ...state,
            messages: action.messages
        };
    }

    if (action.type === "ADD_MESSAGE") {
        console.log("ADD_MESSAGE in reducer:", action);
        state = {
            ...state,
            messages: [...state.messages, action.msg]
        };
    }

    if (action.type === "INSERT_COLLABORATOR_SKILLS_INFO") {
        console.log("INSERT_COLLABORATOR_SKILLS_INFO in reducer:", action);
        state = {
            ...state,
            skills: action.skills
        };
    }

    return state;
}
