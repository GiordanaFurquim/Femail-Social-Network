import React from "react";
import axios from "./axios";

export default class BioEditor extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            bio: "",
            editing: false
        };

        this.handleChangeOnTextArea = this.handleChangeOnTextArea.bind(this);
        this.handleSaveChangeButton = this.handleSaveChangeButton.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    handleChangeOnTextArea(e) {
        console.log("handleChangeOnTextArea is running!!!", e.target.value);
        this.setState({
            editing: true,
            bio: e.target.value
        });
    }

    handleSaveChangeButton() {
        console.log("handleSaveChangeButton is running!!!");
        if (this.state.bio == "") {
            this.setState({
                editing: false
            });
            return;
        }
        axios.post("/update-bio", { bio: this.state.bio }).then(res => {
            console.log(res);
            this.setState({
                editing: false
            });
            this.props.setBio(this.state.bio);
        });
    }

    handleClick() {
        console.log("handleClick is running!!!");
        this.setState({
            editing: true
        });
    }

    render() {
        let editBio;

        if (this.state.editing) {
            editBio = (
                <div className="save-bio-container">
                    <textarea
                        className="bio-textarea"
                        onChange={this.handleChangeOnTextArea}
                        defaultValue={this.props.bio}
                    />
                    <button
                        className="save-bio-button"
                        onClick={this.handleSaveChangeButton}
                    >
                        Save
                    </button>
                </div>
            );
        } else if (!this.props.bio) {
            editBio = (
                <div className="save-bio-container">
                    {" "}
                    <button
                        className="add-bio-button"
                        onClick={this.handleClick}
                    >
                        Add Bio
                    </button>
                </div>
            );
        } else {
            editBio = (
                <div className="save-bio-container">
                    {this.props.bio}
                    <button
                        className="bioeditor-button"
                        onClick={this.handleClick}
                    >
                        Update Bio
                    </button>
                </div>
            );
        }

        return editBio;
    }
}
