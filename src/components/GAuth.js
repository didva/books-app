import React, {useCallback, useContext, useEffect} from 'react';
import { googleLogout, useGoogleLogin } from "@react-oauth/google";
import UserContext from "../contexts/UserContext";

const GAuth = () => {
    const {user, setUser} = useContext(UserContext);
    const onSuccess = useCallback((response) => {
        const token = response.access_token;
        const expiresIn = response.expires_in;
        fetch(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${token}`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
                Accept: 'application/json'
            }
        }).then(
            response => response.json()
        ).then(user => {
            setUser({
                token: token,
                name: user.name,
                email: user.email,
                picture: user.picture,
                expiresIn: expiresIn
            });
        });
    }, [setUser]);
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
            {!user &&
                <input value="Login" type="button" onClick={login}/>
            }
            {user &&
                <input value="Logout..." type="button" onClick={logout}/>
            }
        </div>
    );
}

export default GAuth;