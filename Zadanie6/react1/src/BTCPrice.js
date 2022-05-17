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
        axios.get(`https://api.coindesk.com/v1/bpi/currentprice/PLN.json`)
            .then(res => {
                const pln = res.data.bpi.PLN.rate;
                console.log(pln);
                this.setState({plnPrice: pln});
            })
    }

    render() {
        return (
            <div>
                <h2>Current BTC Price in USD and PLN:</h2>
                <ul>
                    <li> {this.state.usdPrice} USD </li>
                    <li> {this.state.plnPrice} PLN</li>
                </ul>
            </div>
        )
    }
}