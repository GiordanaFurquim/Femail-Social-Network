import React from "react";
import axios from "./axios";
import { Link } from "react-router-dom";

export default class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = { error: false };
        this.handleChange = this.handleChange.bind(this);
        this.registerButton = this.registerButton.bind(this);
    }
    handleChange(e) {
        console.log("e.target.value:", e.target.value);
        console.log("e.target.name:", e.target.name);

        this.setState(
            {
                [e.target.name]: e.target.value
            },
            () => console.log("this.state:", this.state)
        );
        console.log(this.state);
    }

    registerButton(e) {
        e.preventDefault();
        axios
            .post("/welcome", this.state)
            .then(res => {
                console.log("RES:", res);
                if (res.data.success) {
                    location.replace("/");
                } else {
                    this.setState({
                        error: true
                    });
                }
            })
            .catch(error => console.log(error));
        console.log("registerButton runs");
    }

    render() {
        return (
            <div>
                <header className="header-on-register">
                    <nav>
                        <p className="femail"> femail. </p>
                        <p className="login">
                            already a member?
                            <button className="login-button-header">
                                <Link to="/login">login</Link>
                            </button>
                        </p>
                    </nav>
                </header>

                {this.state.error && (
                    <h2>Uh Oh! Something went wrong registering you.</h2>
                )}
                <div className="register-container">
                    <form className="register-form">
                        <label htmlFor="first"> First </label>
                        <input
                            name="first"
                            placeholder="Mary"
                            onChange={this.handleChange}
                        />
                        <label htmlFor="last"> Last </label>
                        <input
                            name="last"
                            placeholder="Jane"
                            onChange={this.handleChange}
                        />

                        <label htmlFor="email"> Email </label>
                        <input
                            name="email"
                            placeholder="maryjane@420.com"
                            onChange={this.handleChange}
                        />

                        <label htmlFor="password"> Password </label>
                        <input
                            name="password"
                            type="password"
                            placeholder="Super Secret Password"
                            onChange={this.handleChange}
                        />

                        <button
                            className="register-button"
                            onClick={this.registerButton}
                        >
                            Sign In
                        </button>
                    </form>
                    <div className="register-image">
                        <img src="regis.png" />
                    </div>
                </div>
            </div>
        );
    }
}
