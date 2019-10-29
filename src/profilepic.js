import React from "react";

export function Profilepic({ url, showModal, isProfile }) {
    console.log("URL from profilepic:", url);
    url = url || "/default.jpg";

    return (
        <div>
            <img
                className={isProfile ? "profile-pic" : "header-pic"}
                onClick={showModal}
                src={url}
            />
        </div>
    );
}
