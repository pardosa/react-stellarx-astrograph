import React, { Component } from 'react'
import gql from 'graphql-tag';
import { Query } from 'react-apollo';

import Info from './Info';

const INFO_QUERY = gql`{
    tradeAggregations(
        last: 1 # 1 day
        resolution: 86400000 # 24 hours
        baseAsset: "native"
        counterAsset: "ETH-GBVOL67TMUQBGL4TZYNMY3ZQ5WGQYFPFD5VJRWXR72VA33VFNL225PL5"
    ) {
        tradeCount
        baseVolume
        counterVolume
        avg
        high
        low
        open
        close
    }
}`

export class InfoSummary extends Component {
    render() {
        return (
            <div className="m-3">
                <div>
                    <Query query={INFO_QUERY}>
                        {
                            ({loading, error, data}) => {
                                if (loading) return <div className="loading">loading...</div>;
                                if (error) {
                                    console.log(error);
                                    return (<span>Error!</span>);
                                }
                                
                                return data.tradeAggregations.map(trade => (
                                    <Info 
                                        key={trade.avg} 
                                        volume={trade.counterVolume} 
                                        close={trade.close} 
                                        open={trade.open} 
                                    />
                                ));
                                    
                            }
                        }
                    </Query>
                </div>
            </div>
        )
    }
}

export default InfoSummary
