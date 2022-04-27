import React from 'react';
import axios from 'axios';

export default class BTCPrice extends React.Component {
    state = {
        usdPrice: 0.00,
        plnPrice: 0.00
    }

    componentDidMount() {
        axios.get(`https://api.coindesk.com/v1/bpi/currentprice/USD.json`)
            .then(res => {
                const usd = res.data.bpi.USD.rate;
                console.log(usd);
                this.setState({usdPrice: usd});
            })
    }

    render() {
        return (
            <div>
                BTC Price in USD: {this.state.usdPrice}
                BTC Price in PLN: {this.state.plnPrice}
            </div>
        )
    }
}