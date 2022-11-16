import React, { useState, useContext, useEffect } from "react";
import { AccountContext } from "./Accounts";

const Status = () => {
    const [status, setStatus] = useState(false);
    const { getSession, logout } = useContext(AccountContext);

    useEffect(() => {
        getSession()
            .then(session => {
                console.log('Session', session);
                setStatus(true);
            }).catch(err => console.log('User not logged in', err))
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    return(
        <div>
            { status ? (
                <div>
                    You are logged in.
                    <button onClick={logout}>Logout</button>
                </div>
            ) : 'Please Login'}
        </div>
    );
};

export default Status;