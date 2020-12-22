import { ajaxRefreshToken } from './authenticationService';

const inMemoryJWTManager = () => {
    let inMemoryJWT = null;
    let refreshTimeoutId;
    const storageKey = 'logout';

    window.addEventListener('storage', event => {
        if (event.key === storageKey) {
            inMemoryJWT = null;
        }
    });

    const refreshToken = expiration => {
        const delay = new Date(expiration).getTime() - new Date().getTime();
        // Fire five seconds before JWT expires
        const timeoutTrigger = delay - 5000;

        refreshTimeoutId = window.setTimeout(() => {
            ajaxRefreshToken()
                .then(res => {
                    const { token, tokenExpiration } = res.data;
                    setToken(token, tokenExpiration);
                }).catch(console.error);
        }, timeoutTrigger);
    };

    const abortRefreshToken = () => {
        if (refreshTimeoutId) {
            window.clearTimeout(refreshTimeoutId);
        }
    };

    const getToken = () => inMemoryJWT;

    const setToken = (token, tokenExpiration) => {
        inMemoryJWT = token;
        refreshToken(tokenExpiration);
        return true;
    };

    const deleteToken = () => {
        inMemoryJWT = null;
        abortRefreshToken();
        window.localStorage.setItem(storageKey, Date.now());
        return true;
    };

    return {
        getToken,
        setToken,
        deleteToken
    };
};

export default inMemoryJWTManager();
