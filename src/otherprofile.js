import React from "react";
import axios from "./axios";
import FriendButton from "./friendsbutton";


export class OtherProfile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        const {
            match: { params }
        } = this.props;

        console.log(params);
        axios.get(`/user/${params.id}.json`).then(({ data }) => {
            this.setState({
                first: data.first,
                id: data.id,
                image: data.image,
                last: data.last,
                bio: data.bio
            });
        });
    }

    render() {
        return (
            <div className="other-profile-container">
                <FriendButton id={this.props.match.params.id} />

                <h1>
                    {this.state.first} {this.state.last}
                </h1>
                <img
                    className="other-profile-picture"
                    src={this.state.image || "/default.jpg"}
                    isProfile={true}
                />
                <h2>About {this.state.first}</h2>
                <div className="display-bio-other-profile">
                    <h4>{this.state.bio}</h4>
                </div>

            </div>
        );
    }
}
