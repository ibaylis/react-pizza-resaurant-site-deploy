import React from 'react';
import { initializeStore } from '../store';
import axios from 'axios';
import auth0Serv from '../lib/appAuth';

const isServer = typeof window === 'undefined'
const __NEXT_REDUX_STORE__ = '__NEXT_REDUX_STORE__'

function getOrCreateStore (initialState) {
    if (isServer) {
        return initializeStore(initialState)
    }

    if (!window[__NEXT_REDUX_STORE__]) {
        window[__NEXT_REDUX_STORE__] = initializeStore(initialState)
    }
    return window[__NEXT_REDUX_STORE__]
}

export default App => {
    return class AppWithRedux extends React.Component {
        static async getInitialProps (appContext) {
            const reduxStore = getOrCreateStore()
            let siteData;
            let userAuth;

            appContext.ctx.reduxStore = reduxStore

            let appProps = {}
            if (typeof App.getInitialProps === 'function') {
                appProps = await App.getInitialProps(appContext)
            }

            try {
                const response = await axios.get(`http://localhost:3000/api/v1/site`);
                siteData = response.data[0]
            } catch {
                console.error('Error')
            }

            userAuth = await auth0Serv.isAuthenticated(appContext.ctx.req);

            return {
                ...appProps,
                siteData,
                userAuth,
                initialReduxState: reduxStore.getState()
            }
        }

        constructor (props) {
            super(props)
            this.reduxStore = getOrCreateStore(props.initialReduxState)
        }
 
        render() {
            return <App {...this.props} reduxStore={this.reduxStore} />
        }
    }
}