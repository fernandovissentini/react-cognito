import React from "react";
import Signup from "./components/Signup";
import Login from "./components/Login";
import { Account } from "./components/Accounts";
import Status from "./components/Status";
import Settings from "./components/Settings";

const APP = () => {

    return (
        <Account>
            <Status />
            <Signup />
            <Login />
            <Settings />
        </Account>
    );
};

export default APP;