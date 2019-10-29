import React from "react";
import axios from "./axios";

export default class AddProfileInfo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            age: "",
            city: "",
            country: "",
            mother_tongue: "",
            idioms: "",
            link: "",
            editing: false
        };
        this.saveProfileButton = this.saveProfileButton.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.handleChangeOnProfileInfo = this.handleChangeOnProfileInfo.bind(
            this
        );
    }

    componentDidMount() {
        axios
            .get("/profileinfo")
            .then(data => {
                this.setState({
                    age: data.data.age,
                    city: data.data.city,
                    country: data.data.country,
                    mother_tongue: data.data.mother_tongue,
                    idioms: data.data.idioms,
                    link: data.data.link
                });
            })
            .catch(error => console.log("error in getProfile:", error));
    }

    saveProfileButton() {
        console.log("saveProfileButton is running!!!");

        axios
            .post("/addinfo", this.state)
            .then(res => {
                console.log("RES FROM axios.post /addinfo", res);
                console.log("this.props on profileinfo:", this.props);
                this.props.setProfile(this.state);
                this.setState({
                    editing: false
                });
                console.log("This.state on post /addinfo:", this.state);
            })
            .catch(error => {
                console.log("error in profileinfo:", error);
            });
    }

    handleClick() {
        this.setState({
            editing: true
        });
    }

    handleChangeOnProfileInfo(e) {
        this.setState({
            editing: true,
            [e.target.name]: e.target.value
        });
    }

    render() {
        let addInfo;
        if (this.state.editing) {
            addInfo = (
                <div className="add-info-container">
                    <form className="set-profile-form">
                        <label htmlFor="city">City</label>
                        <input
                            type="text"
                            name="city"
                            placeholder="Gay – Georgia"
                            defaultValue={this.state.city}
                            onChange={this.handleChangeOnProfileInfo}
                        />
                        <label htmlFor="country">Country</label>
                        <input
                            type="text"
                            name="country"
                            placeholder="USA"
                            defaultValue={this.state.country}
                            onChange={this.handleChangeOnProfileInfo}
                        />

                        <label htmlFor="age">Age</label>
                        <input
                            type="number"
                            name="age"
                            placeholder="Forever young"
                            defaultValue={this.state.age}
                            onChange={this.handleChangeOnProfileInfo}
                        />

                        <label htmlFor="mother_tongue">Mother Toungue</label>
                        <input
                            type="text"
                            name="mother_tongue"
                            placeholder="Akkadian"
                            defaultValue={this.state.mother_tongue}
                            onChange={this.handleChangeOnProfileInfo}
                        />

                        <label htmlFor="idioms">Other Idioms</label>
                        <input
                            type="text"
                            name="idioms"
                            placeholder="Spanish, English, Portuguese"
                            defaultValue={this.state.idioms}
                            onChange={this.handleChangeOnProfileInfo}
                        />

                        <label htmlFor="link">Web Page</label>
                        <input
                            type="url"
                            name="link"
                            placeholder="www.mywebsite.com"
                            defaultValue={this.state.link}
                            onChange={this.handleChangeOnProfileInfo}
                        />
                        <button
                            className="save-profile-info-button"
                            onClick={this.saveProfileButton}
                        >
                            {" "}
                            Save Profile{" "}
                        </button>
                    </form>
                </div>
            );
        } else if (
            !this.state.age &&
            !this.state.city &&
            !this.state.country &&
            !this.state.mother_tongue &&
            !this.state.idioms &&
            !this.state.link
        ) {
            addInfo = (
                <div className="add-info-container">
                    <button
                        className="add-profile-info-button"
                        onClick={this.handleClick}
                    >
                        Set Profile
                    </button>
                </div>
            );
        } else {
            addInfo = (
                <div className="add-info-container">
                    <h2>
                        {this.state.age} years old based in {this.state.city} -{" "}
                        {this.state.country}
                    </h2>
                    <h2>
                        Speaks {this.state.idioms} and has{" "}
                        {this.state.mother_tongue} as mother tongue
                    </h2>
                    <h2>
                        You can find some cool informations on {this.state.link}
                    </h2>
                    <button
                        className="update-profile-info-button"
                        onClick={this.handleClick}
                    >
                        Update Profile
                    </button>
                </div>
            );
        }

        return addInfo;
    }
}
