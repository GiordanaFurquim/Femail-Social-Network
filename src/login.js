import React from "react";
import axios from "./axios";
import { Link } from "react-router-dom";

export default class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = { error: false };
        this.loginButton = this.loginButton.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    loginButton(e) {
        e.preventDefault();
        console.log("THIS.STATE:", this.state);
        axios
            .post("/login", this.state)
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
        console.log("loginButton runs");
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

    render() {
        return (
            <div>
                <header className="header-on-login">
                    <nav>
                        <p>femail.</p>
                    </nav>
                </header>

                {this.state.error && <h2>Ops! Something went wrong.</h2>}
                <div className="login-container">
                    <form className="login-form">
                        <label htmlFor="email"> Email </label>
                        <input
                            name="email"
                            placeholder="amazing@anne.com"
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
                            className="login-button"
                            onClick={this.loginButton}
                        >
                            Login
                        </button>
                    </form>
                    <div className="login-image">
                        <img
                            title="GIF By Harmonie Aupetit"
                            alt="Hair Women GIF By Harmonie Aupetit."
                            src="youmustgif.gif"
                        />
                    </div>
                </div>
            </div>
        );
    }
}
