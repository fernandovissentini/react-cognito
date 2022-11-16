import React, {createContext} from "react";
import {AuthenticationDetails, CognitoUser} from "amazon-cognito-identity-js";
import UserPool from "../UserPool";

const AccountContext = createContext();

const Account = props => {

    const getSession = async () =>
        await new Promise((resolve, reject) => {
            const user = UserPool.getCurrentUser();
            if (user) {
                user.getSession(async (err, session) => {
                    if (err) reject();
                    else {
                        const attributes = await new Promise((resolve, reject) => {
                            user.getUserAttributes((err, attributes) => {
                                if (err) return reject(err)

                                const results = {};
                                attributes.map( attribute => results[attribute.Name] = attribute.Value)
                                resolve(results);
                            });
                        })
                        resolve({
                            user,
                            ...session,
                            ...attributes
                        });
                    }
                });
            }
            else {
                reject();
            }
        });

    const authenticate = async (Username, Password) => {
        await new Promise((resolve, reject) => {
            const user = new CognitoUser({Username, Pool: UserPool});
            const authDetails = new AuthenticationDetails({Username, Password})

            user.authenticateUser(authDetails, {
                onSuccess: data => {
                    console.log(data);
                    resolve(data);
                },

                onFailure: err => {
                    console.log(err);
                    reject(err);
                },

                newPasswordRequired: data => {
                    console.log('New password required', data);
                    resolve(data);
                }
            });

        });
    };

    const logout = () => {
        const user = UserPool.getCurrentUser();
        if (user) user.signOut();
    }

    return (
        <AccountContext.Provider value={{
            authenticate,
            getSession,
            logout
        }}>
            {props.children}
        </AccountContext.Provider>
    );
};

export {Account, AccountContext};