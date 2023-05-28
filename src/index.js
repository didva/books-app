import React from 'react';
import ReactDOM from 'react-dom/client';
import { GoogleOAuthProvider } from '@react-oauth/google';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
const googleClientId = "479216302275-n7sj2g938him09j56fgafml2qoavu2lp.apps.googleusercontent.com";

root.render(
    <GoogleOAuthProvider clientId={googleClientId}>
        <React.StrictMode>
            <App />
        </React.StrictMode>
    </GoogleOAuthProvider>
);
