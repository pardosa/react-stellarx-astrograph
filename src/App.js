import React, { Component } from 'react';
import ApolloClient from 'apollo-boost';
import {ApolloProvider} from 'react-apollo';

import Trades from './components/Trades';
import InfoSummary from './components/InfoSummary';
import MarketHistory from './components/MarketHistory';
import OrderBook from './components/OrderBook';
import Chart from './components/Chart';

const client = new ApolloClient({
  uri: "https://demo.astrograph.io/graphql"
});

class App extends Component {
  render() {
    return (
      <ApolloProvider client={client} >
      <div className="container-fluid">
        <div className="row mt-3">
          <div className="col-3">
          <Trades client={client}/>
          </div>
          <div className="col-6">
            <InfoSummary />
            <div className="row">
              <Chart />
            </div>
          </div>
          <div className="col-3">
            <OrderBook />
            <MarketHistory />
          </div>
        </div>
      </div>
      </ApolloProvider>
    );
  }
}

export default App;
