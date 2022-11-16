import React, {useState, useContext} from 'react';
import { CognitoUserAttribute } from 'amazon-cognito-identity-js';
import {AccountContext} from "./Accounts";

const ChangeEmail = () => {

    const [newEmail, setNewEmail] = useState('');
    const [password, setPassword] = useState('');

    const {getSession, authenticate} = useContext(AccountContext);

    const onSubmit = event => {
        event.preventDefault();

        getSession()
            .then(({ user, email }) => {
                authenticate(email, password)
                    .then(() => {
;                       const attributes = [
                            new CognitoUserAttribute({ Name: 'email', Value: newEmail })
                        ]

                        user.updateAttributes(attributes, (err, res) => {
                            if(err) console.log('Error update email', err);
                            console.log('Email changed', res);
                        });
                    });
            });

    };

    return (
        <div>
            <form onSubmit={onSubmit}>
                <input
                    value={newEmail}
                    onChange={event => setNewEmail(event.target.value)}
                />
                <input
                    value={password}
                    onChange={event => setPassword(event.target.value)}
                />
                <button type="submit">Change Email</button>
            </form>
        </div>
    );
};

export default ChangeEmail;
