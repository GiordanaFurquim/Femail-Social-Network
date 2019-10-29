import React from "react";
import Register from "./register";
import Login from "./login";
import { HashRouter, Route, Redirect } from "react-router-dom";

export default class Welcome extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <HashRouter>
                <div className="register-wrapper">
                    <div>
                        <Route exact path="/" component={Register} />
                        <Route path="/login" component={Login} />
                    </div>
                    <footer>
                        <p>
                            From women to women.
                            <br />{" "}
                            <img className="copyright" src="copyright.png" />
                            Design by Giordana Furquim
                            <br />
                            Spiced Academy, 2019
                        </p>
                    </footer>
                </div>
            </HashRouter>
        );
    }
}
