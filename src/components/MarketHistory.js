import React, { Component } from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import History from './History';

const HISTORY_QUERY = gql`{
    trades(
        last: 20, 
        baseAsset: "native", 
        counterAsset: "ETH-GBVOL67TMUQBGL4TZYNMY3ZQ5WGQYFPFD5VJRWXR72VA33VFNL225PL5"
        )
    {
        pageInfo {
            startCursor
            endCursor
        }
        nodes {
            id
            price
            baseAmount
            baseAsset {
                id
                code
            }
            counterAsset {
                id
                code
            }
            ledgerCloseTime
        }
    }
}`
export class MarketHistory extends Component {
    render() {
        return (
            <div className="m-3">
                <h4>MARKET HISTORY</h4>
                <Query query={HISTORY_QUERY}>
                    {
                        ({loading, error, data}) => {
                            if (loading) return <div className="loading">loading...</div>;
                            if (error) {
                                console.log(error);
                                return (<span>Error!</span>);
                            }
                            
                            return <div className="table-dark table-responsive">
                              <div className="row table-active">
                                <div className="col-5 text-right">PRICE (ETH)</div>
                                <div className="col-3 text-right">SIZE</div>
                                <div className="col-4 text-right">WHEN</div>
                              </div>
                              {data.trades.nodes.map(node => (
                                  <History 
                                    key={node.id}
                                    price={node.price}
                                    size={node.baseAmount}
                                    when={node.ledgerCloseTime}
                                    />
                              ))}
                            </div>
                          ;
                        }
                    }
                </Query>
            </div>
        )
    }
}

export default MarketHistory
