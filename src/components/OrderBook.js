import React, { Component } from 'react';
import gql from 'graphql-tag';
import {Query, Subscription} from 'react-apollo';
import Order from './Order'

const ORDER_QUERY = gql`
{
    orderBook(
        limit: 20,
        selling: "native",
        buying: "ETH-GBVOL67TMUQBGL4TZYNMY3ZQ5WGQYFPFD5VJRWXR72VA33VFNL225PL5"
    ) {
        bids {
            price
            amount
        }
        asks {
            price
            amount
        }
    }
}`;

const SUBSCRIPTION = gql`
    subscription {
        offer(
            args: {
                #buyingAssetEq: "ETH-GBVOL67TMUQBGL4TZYNMY3ZQ5WGQYFPFD5VJRWXR72VA33VFNL225PL5"
                #sellingAssetEq: "native"
            }
        ) {
            accountID
            mutationType
            offerID
            values {
                id
                amount
                price
                buying {
                    code
                    id
                }
                selling {
                    code
                    id
                }
            }
        }
    }
`;

export class OrderBook extends Component {
    render() {
        return (
            <div className="m-3">
                <h4>ORDER BOOK</h4>
                <Query query={ORDER_QUERY}>
                    {
                        ({loading, error, data}) => {
                            if (loading) return <div className="loading">loading...</div>;
                            if (error) {
                                console.log(error);
                                return (<span>Error!</span>);
                            }

                            let sum = 0;
                            
                            return <div className="table-responsive overflow-auto" style={{
                                position: 'relative',
                                height: '250px',
                                overflow: 'scroll'
                              }}>
                                <div className="row table-dark">
                                    <div className="col-4 text-right">SIZE (XLM)</div>
                                    <div className="col-3 text-right">SUM</div>
                                    <div className="col-5 text-right">PRICE(ETH)</div>
                                </div>
                                <div className="row table-active">
                                    <div className="col-4 text-right">Bids:</div>
                                </div>
                                {
                                    data.orderBook.bids.map(function(bid, i){
                                        sum = bid.amount;
                                        return <Order 
                                            key={i}
                                            size={bid.amount}
                                            sum={sum}
                                            price={bid.price}
                                            />
                                    })
                                }
                                <div className="row table-active">
                                    <div className="col-4 text-right">Asks:</div>
                                </div>
                                {
                                    data.orderBook.asks.map(function(bid, i){
                                        sum = bid.amount;
                                        return <Order 
                                            key={i}
                                            size={bid.amount}
                                            sum={sum}
                                            price={bid.price}
                                            />
                                    })
                                }
                            </div>
                          ;
                        }
                    }
                </Query>
                <Subscription subscription={SUBSCRIPTION}>
                    {
                        ({loading, error, data}) => {
                            if (loading) return <div className="loading">loading...</div>;
                            if (error) {
                                console.log(error);
                                return (<span>Error!</span>);
                            }
                            console.log(data);
                            return null;
                        }
                    }
                </Subscription>
            </div>
        )
    }
}

export default OrderBook
