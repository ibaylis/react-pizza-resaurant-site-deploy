import App, { Container } from 'next/app';
import React from 'react';
import WithReduxStore from '../lib/with-redux-store';
import { Provider } from 'react-redux';

import MainLayout from '../components/layouts/mainLayout';

class MyApp extends App {

    render() {
        const { Component, pageProps, reduxStore } = this.props;

        return (
            <Container>
                <Provider store={reduxStore}>
                    <MainLayout>
                        <Component {...pageProps} />
                    </MainLayout>
                </Provider>
            </Container>
        )
    }
}

export default WithReduxStore(MyApp)