import React, { useState, useEffect } from 'react';

import Login from './../login/Login';
import inMemoryJwt from './../../services/inMemoryJwtService';
import { ajaxValidateToken, ajaxLogout } from './../../services/authenticationService';

const Validator = () => {
    const [showSuccessMsg, setShowSuccessMsg] = useState(false);
    const [showErrorMsg, setShowErrorMsg] = useState(false);
    const [isUserLogged, setIsUserLogged] = useState(false);

    useEffect(() => {
        if (inMemoryJwt.getToken()) {
            setIsUserLogged(true);
        }
    }, []);

    const logoutHandler = event => {
        event.preventDefault();

        ajaxLogout()
            .then(() => {
                inMemoryJwt.deleteToken();
                setIsUserLogged(false);
            }).catch(console.error);
    };

    const checkTokenValidityHandler = event => {
        event.preventDefault();

        ajaxValidateToken()
            .then(() => {
                setShowSuccessMsg(true);

                setTimeout(() => {
                    setShowSuccessMsg(false);
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
        <div className="Validator">
            <button type="button" onClick={checkTokenValidityHandler}>Check token validity</button>

            {
                isUserLogged ?
                <button type="button" onClick={logoutHandler}>Logout</button>
                :
                <Login setIsUserLogged={setIsUserLogged} />
            }

            {
                showSuccessMsg ?
                <div>Success: Token is valid</div>
                : null
            }

            {
                showErrorMsg ?
                <div>Error: Token is invalid</div>
                : null
            }
        </div>
    ); 
}

export default Validator;
