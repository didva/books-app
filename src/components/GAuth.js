import React, {useCallback, useContext, useEffect} from 'react';
import { googleLogout, useGoogleLogin } from "@react-oauth/google";
import UserContext from "../contexts/UserContext";
import GAuthApiService from "../services/GAuthApiSevice";

const GAuth = () => {
    const gauthApiService = GAuthApiService();
    const {user, setUser} = useContext(UserContext);
    const onSuccess = useCallback((response) => {
        const token = response.access_token;
        const expiresIn = response.expires_in;
        gauthApiService.getUser(token).then((user) => {
            setUser({
                token: token,
                name: user.name,
                email: user.email,
                picture: user.picture,
                expiresIn: expiresIn
            });
        });
    }, [setUser, gauthApiService]);
    const googleLogin = useGoogleLogin({
        scope: "https://www.googleapis.com/auth/books",
        onSuccess,
        onError: (error) => {
            console.log(error);
        }
    })
    const login = useCallback(() => {
        googleLogin();
    }, [googleLogin]);

    const logout = useCallback(() => {
        googleLogout();
        setUser(null);
    }, [setUser]);

    useEffect(() => {
        if (user) {
            const timeout = setTimeout(() => {
                logout();
                login();
            }, (user.expiresIn - 60) * 1000);
            return () => { clearTimeout(timeout) };
        }
    }, [user, login, logout]);

    return (
        <div>
            {user ? (
                <input value="Logout..." type="button" onClick={logout}/>
            ) : (
                <input value="Login" type="button" onClick={login}/>
            )}
        </div>
    );
}

export default GAuth;