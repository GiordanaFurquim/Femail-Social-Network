import React from "react";
import axios from "./axios";
import { Profilepic } from "./profilepic";
import { Uploader } from "./uploader";
import Profile from "./profile";
import { BrowserRouter, Route, Link } from "react-router-dom";
import { OtherProfile } from "./otherprofile";
import { FindPeople } from "./findpeople";
import Friends from "./friends";
import { Chat } from "./chat";
import FindCollaborator from "./findcollaborator";
import { Recommender } from "./recommender";

export class App extends React.Component {
    constructor() {
        super();
        this.state = {
            first: "",
            last: "",
            url: "",
            uploaderIsVisible: false
        };
        console.log("this.state on App:", this.state);

        this.showModal = this.showModal.bind(this);
        this.setBio = this.setBio.bind(this);
        this.updatePicture = this.updatePicture.bind(this);
        this.hideModal = this.hideModal.bind(this);
        this.setProfile = this.setProfile.bind(this);
    }

    showModal() {
        this.setState({
            uploaderIsVisible: true
        });
    }

    hideModal() {
        this.setState({
            uploaderIsVisible: false
        });
    }

    updatePicture(uploadedUrl) {
        console.log("UPLOADED URL:", uploadedUrl);
        this.setState({
            image: uploadedUrl,
            uploaderIsVisible: false
        });
    }

    setBio(newBio) {
        this.setState({
            bio: newBio
        });
    }

    setProfile(newProfile) {
        console.log("newProfile", newProfile);
        this.setState({
            profile: newProfile
        });
    }

    componentDidMount() {
        console.log("App mounted!");

        axios
            .get("/users")
            .then(data => {
                console.log("MY DATA FROM APP /USERS:", data);
                this.setState({
                    first: data.data.first,
                    id: data.data.id,
                    image: data.data.image,
                    last: data.data.last,
                    bio: data.data.bio
                });
            })
            .catch(error => console.log("error in getProfile:", error));
    }

    render() {
        if (!this.state.first) {
            return null;
        }
        return (
            <BrowserRouter>
                <div>
                    <header className="header-on-app">
                        <div className="greeting-container">
                            <a id="logo" href="/">
                                <p className="femail-on-app"> femail.</p>
                                <p className="hi-on-app">
                                    Find your joy, {this.state.first}!
                                </p>
                            </a>
                        </div>
                        <nav>
                            <Link to="/chat">Chat Room</Link>
                            <Link to="/findcollaborator">Collaborator </Link>
                            <Link to="/friends">Friends</Link>
                            <Link to="/findpeople">Users Finder </Link>{" "}
                        </nav>
                        <div className="logout-container">
                            <div className="header-image">
                                <Profilepic
                                    onClick={this.showModal}
                                    url={this.state.image}
                                    showModal={this.showModal}
                                />
                            </div>
                            <button className="logout-button">
                                <a className="logout" href="/logout">
                                Logout
                                </a>
                            </button>
                        </div>
                    </header>

                    {this.state.uploaderIsVisible && (
                        <Uploader
                            updatePicture={this.updatePicture}
                            hideModal={this.hideModal}
                            url={this.state.image}
                        />
                    )}
                    <Route
                        exact
                        path="/"
                        render={() => (
                            <Profile
                                first={this.state.first}
                                last={this.state.last}
                                url={this.state.image}
                                bio={this.state.bio}
                                setBio={this.setBio}
                                showModal={this.showModal}
                                age={this.state.age}
                                city={this.state.city}
                                country={this.state.country}
                                mother_tongue={this.state.mother_tongue}
                                idioms={this.state.idioms}
                                link={this.state.link}
                                setProfile={this.setProfile}
                                profile={this.state.profile}
                            />
                        )}
                    />
                    <Route path="/user/:id" component={OtherProfile} />
                    <Route
                        path="/findpeople"
                        render={props => (
                            <FindPeople
                                key={props.match.image}
                                match={props.match}
                                history={props.history}
                            />
                        )}
                    />
                    <Route
                        path="/findcollaborator"
                        component={FindCollaborator}
                    />

                    <Route
                        path="/recomender/best-matches"
                        component={Recommender}
                    />
                    <Route path="/chat" component={Chat} />
                    <Route path="/friends" component={Friends} />
                    <footer>
                        <p>
                            from women to women.
                            <br />
                            <img className="copyright" src="copyright.png" />
                            Spiced Academy, 2019 Design by Giordana Furquim
                        </p>
                    </footer>
                </div>
            </BrowserRouter>
        );
    }
}
