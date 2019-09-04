import React from 'react';
import Header from '../includes/header';
import Head from 'next/head';

const MainLayout = (props) => (
    <>
        <Head>
            <title>Pizzeria</title>

            <meta name="keywords" content="pizza, ham, cheese, pepperoni, sausage" />
            <meta name="description" content="Welcome to your pizza store" />            

            <meta property="og:title" content="Pizzeria" />
            <meta property="og:locale" content="en_US" />
            <meta property="og:url" content={`${props.baseUrl}`} />
            <meta property="og:type" content="website" />
            <meta property="og:description" content="Super awesome and tasty pizzas" />

            <link href="https://fonts.googleapis.com/css?family=Overlock:400,700|Roboto:300,400,500,700&display=swap" rel="stylesheet"></link>
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.8.2/css/all.min.css"></link>
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.3.1/css/bootstrap.min.css"></link>
            <link rel="stylesheet" href="/static/css/styles.css"></link>

        </Head>
        <div className="mainLayout_container">
            <Header {...props} />
            <div className="main_container">
                {props.children}
            </div>
        </div>
    </>
)

export default MainLayout;