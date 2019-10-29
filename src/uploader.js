import React from "react";
import axios from "./axios";
import { Profilepic } from "./profilepic";

export class Uploader extends React.Component {
    constructor(props) {
        super(props);
        this.state = { error: false };
        this.handleChange = this.handleChange.bind(this);
        this.updateProfilePicButton = this.updateProfilePicButton.bind(this);
    }

    updateProfilePicButton(e) {
        e.preventDefault();

        let formData = new FormData();

        formData.append("file", this.state.files);

        axios
            .post("/users", formData)
            .then(res => {
                console.log("IMAGE ON /users:", res);
                this.props.updatePicture(res.data.image);
            })
            .catch(function(error) {
                console.log("ERROR IN POST /users:", error);
            });
    }
    handleChange(e) {
        console.log("handleChange is running!!!");
        console.log("files:", e.target.files[0]);
        this.setState({
            files: e.target.files[0]
        });
    }

    render() {
        console.log("this.props from uploader", this.props);
        return (
            <div>
                {this.state.error && (
                    <h2>Something went wrong while uploading your picture</h2>
                )}
                <div className="uploader-container">
                    <p onClick={this.props.hideModal}>X</p>
                    <form className="uploader-form">
                        <Profilepic url={this.props.url} isProfile={true} />
                        <input
                            className="input-file"
                            onChange={this.handleChange}
                            type="file"
                            name="file"
                            accept="image/*"
                        />
                        <button
                            className="uploader-button"
                            onClick={this.updateProfilePicButton}
                        >
                            Update Image
                        </button>
                    </form>
                </div>
            </div>
        );
    }
}
