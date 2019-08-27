//Note if you change the name of this file, you will need to change the auth0 login on manage.auth0
import React, { Component } from 'react';
import Router from 'next/router';

import MainLayout from '../components/layouts/mainLayout';

import auth0Serv from '../lib/appAuth';

class LoginSuccess extends Component {
    state = {
        error: false
    }

    componentDidMount(){
        auth0Serv.handleAuthentication().then(()=>{
            Router.push('/admin')
        }).catch((err)=>{
            this.setState({error: true})
        })
    }

    render(){
        return(
            <>
                { !this.state.error ?
                    <div>Signing in ...</div>
                :
                    <div>Sorry something went wrong</div>
                }
            </>
        )
    }
}

export default LoginSuccess;