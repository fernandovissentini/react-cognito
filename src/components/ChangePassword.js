import React, {useState, useContext} from 'react';
import {AccountContext} from "./Accounts";

const ChangePassword = () => {

    const [password, setPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');

    const {getSession, authenticate} = useContext(AccountContext);

    const onSubmit = event => {
      event.preventDefault();

      getSession()
          .then(({ user, email }) => {
              authenticate(email, password)
                  .then(() => {
                      user.changePassword(password, newPassword, (err, res) => {
                          if(err) console.log(err);
                          console.log(res);
                      });
                  });
          });

    };

    return (
        <div>
            <form onSubmit={onSubmit}>
                <input
                    value={password}
                    onChange={event => setPassword(event.target.value)}
                />
                <input
                    value={newPassword}
                    onChange={event => setNewPassword(event.target.value)}
                />

                <button type="submit">Change Password</button>
            </form>
        </div>
    );
};

export default ChangePassword;
