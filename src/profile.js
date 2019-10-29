import React from "react";
import { Profilepic } from "./profilepic";
import BioEditor from "./bioeditor";
import AddProfileInfo from "./profileinfo";

export default function Profile({
    first,
    last,
    bio,
    url,
    setBio,
    setProfile,
    showModal,
    age,
    city,
    country,
    mother_tongue,
    idioms,
    link,
    profile
}) {
    return (
        <div className="profile-container">
            <h1 className="name-on-profile">
                {first} {last}
            </h1>
            <Profilepic url={url} showModal={showModal} isProfile={true} />
            <BioEditor bio={bio} setBio={setBio} />
            <AddProfileInfo
                age={age}
                city={city}
                country={country}
                mother_tongue={mother_tongue}
                idioms={idioms}
                link={link}
                setProfile={setProfile}
                profile={profile}
            />

        </div>
    );
}
