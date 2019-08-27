import auth0 from 'auth0-js';
import Cookies from 'js-cookie';
import axios from 'axios';
import jwt from 'jsonwebtoken';

import { getCooksFromReq } from '../lib/utils';

import getConfig from 'next/config';

const { publicRuntimeConfig } = getConfig();

class Auth0 {
    constructor() {
        this.auth0 = new auth0.WebAuth({
            domain: nextpizzeria.auth0.com,
            clientID: `${publicRuntimeConfig.client_id}`,
            redirectUri: `${publicRuntimeConfig.base_url}/login-success`,
            responseType: 'token id_token',
            scope: 'openid'
        });
        this.handleAuthentication = this.handleAuthentication.bind(this);
        this.isAuthenticated = this.isAuthenticated.bind(this);
    }

    handleAuthentication() { 
        return new Promise((resolve, reject)=>{
            this.auth0.parseHash((err, authResult) => {
                if (authResult && authResult.accessToken && authResult.idToken) {
                    this.setSession(authResult);
                    resolve();
                } else if (err) {
                    reject();
                }
            });
        })
      }
      setSession(authResult){
        let expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime());
        Cookies.set('x-jwt-exp', expiresAt);
        Cookies.set('x-jwt', authResult.idToken);
      }

    logout(){
        Cookies.remove('x-jwt-exp');
        Cookies.remove('x-jwt');
        this.auth0.logout({
            clientID: `${publicRuntimeConfig.client_id}`,
            returnTo: `${publicRuntimeConfig.base_url}`
        })
    }

    login(){
        this.auth0.authorize();
    }

    async getJWKS(){
        const res = await axios.get('https://nextpizzeria.auth0.com/.well-known/jwks.json')
        const jwks = res.data
        return jwks;
    }

    certToPEM(cert){
        cert = cert.match(/.{1,64}/g).join('\n');
        cert = `-----BEGIN CERTIFICATE-----\n${cert}\n-----END CERTIFICATE-----\n`;
        return cert;
    }



    async verifyToken(token){
        if(token) {
            const jwks = await this.getJWKS();
            const certificate = this.certToPEM(jwks.keys[0].x5c[0]);
            try {
                const decodedVerify = jwt.verify(token, certificate);
                const expiresAt = decodedVerify.exp * 1000;

                return (decodedVerify && new Date().getTime() < expiresAt ? true : false)
            } catch {
                return false
            }
        }
    }

    async isAuthenticated(req){
        if(process.browser){
            const token = Cookies.get('x-jwt');
            const verifyToken = await this.verifyToken(token);

            return verifyToken;
        } else {
            const token = getCooksFromReq(req, 'x-jwt');
            const verifyToken = await this.verifyToken(token);

            return verifyToken;
        }
    }


}

const auth0Serv = new Auth0();
export default auth0Serv;