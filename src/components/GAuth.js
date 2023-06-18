import React, {useCallback, useContext, useEffect} from "react";
import { googleLogout, useGoogleLogin } from "@react-oauth/google";
import UserContext from "../contexts/UserContext";
import GAuthApiService from "../services/GAuthApiSevice";
import Button from "react-bootstrap/Button";

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
    });
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
            return () => { clearTimeout(timeout); };
        }
    }, [user, login, logout]);

    return (
        <div>
            {user ? (
                <Button variant="danger" onClick={logout} size="sm">Logout...</Button>
            ) : (
                <Button variant="success" onClick={login} size="sm">Login</Button>
            )}
        </div>
    );
};

export default GAuth;