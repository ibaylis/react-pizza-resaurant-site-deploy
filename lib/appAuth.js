import auth0 from 'auth0-js';
import Cookies from 'js-cookie';
import axios from 'axios';

import getConfig from 'next/config';
const { publicRuntimeConfig } = getConfig();

class Auth0 {
    constructor() {
        this.auth0= new auth0.WebAuth({
            domain: nextpizzeria.auth0.com,
            clientID: `${publicRuntimeConfig.client_id}`,
            redirectUri: `${publicRuntimeConfig.base_url}/login-success`,
            responseType: 'token id_token',
            scope: 'openid'
        });
        this.handleAuthentication = this.handleAuthentication.bind(this);
    }

    handleAuthentication() { 
        return new Promise((resolve, reject)=>{
            this.auth0.parseHash((err, authResult) => {
                if (authResult && authResult.accessToken && authResult.idToken) {
                    this.setSession(authResult);
                } else if (err) {
                    history.replace('/home');
                    console.log(err);
                    alert(`Error: ${err.error}. Check the console for further details.`);
                }
            });
        })
      }

    login(){
        this.auth0.authorize();
    }
}

const auth0Serv = new Auth0();
export default auth0Serv;