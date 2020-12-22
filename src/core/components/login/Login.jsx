import React, { useState } from 'react';

import { ajaxLogin } from './../../services/authenticationService';
import inMemoryJwt from './../../services/inMemoryJwtService';

const Login = ({ setIsUserLogged }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showSuccessMsg, setShowSuccessMsg] = useState(false);
    const [showErrorMsg, setShowErrorMsg] = useState(false);

    const onChangeHandler = event => {
        const value = event.target.value;

        switch(event.target.name) {
            case 'username':
                setUsername(value);
                break;
            case 'password':
                setPassword(value);
                break;
            default:
                break;
        }
    };

    const onSubmitHandler = event => {
        event.preventDefault();

        const user = {
            username,
            password
        };

        ajaxLogin(user)
            .then(res => {
                setShowSuccessMsg(true);
                const { token, tokenExpiration } = res.data;
                inMemoryJwt.setToken(token, tokenExpiration);

                setTimeout(() => {
                    setIsUserLogged(true);
                }, 3000);
            }).catch(err => {
                console.error(err);
                setShowErrorMsg(true);

                setTimeout(() => {
                    setShowErrorMsg(false);
                }, 3000);
            });
    };

    return (
        <div className="Login">
            <form onSubmit={onSubmitHandler}>
                <div>
                    <label htmlFor="username">Username:</label>
                    <input name="username" value={username} onChange={onChangeHandler} />
                </div>
                
                <div>
                    <label htmlFor="password">Password:</label>
                    <input name="password" value={password} type="password" onChange={onChangeHandler} />
                </div>

                <button type="submit">Login</button>
            </form>

            {
                showSuccessMsg ?
                <div>Success</div>
                : null
            }

            {
                showErrorMsg ?
                <div>Error</div>
                : null
            }
        </div>
    );
}

export default Login;
