import React, { Component } from 'react';
import Featured from '../components/includes/home/featured';
import PizzasList from '../components/includes/home/pizzas';

import axios from 'axios';

import getConfig from 'next/config';
const { publicRuntimeConfig } = getConfig;

class Home extends Component {
    static async getInitialProps() {
        let pizzasData;

        try {
            const response = await axios.get(`${publicRuntimeConfig.base_url}/api/v1/pizza`);
            pizzasData = response.data
        } catch {
            console.log('Error')
        }

        return {
            pizzasData
        }
    }


    render(){
        const { pizzasData } = this.props;
        return(
            <>
                <Featured pizzas={pizzasData} />
                <PizzasList pizzas={pizzasData} />
            </>
        )
    }
}

export default Home;