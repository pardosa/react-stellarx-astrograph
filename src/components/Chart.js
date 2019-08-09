import React from 'react'
import gql from 'graphql-tag';
import { Query } from 'react-apollo';

import MyChart from './MyChart';

const CHART_QUERY = gql`{
    tradeAggregations(
        last: 168 # 7 days
        resolution: 3600000 # 1 hour
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

const Chart = () => {

    var xData = [], tData = [], vData = [];

    return <div className='container-fluid'>
    <div className='m-2'>
    <Query query={CHART_QUERY}>
        {
            ({loading, error, data}) => {
                if (loading) return <div className="loading">loading...</div>;
                if (error) {
                    console.log(error);
                    return (<span>Error!</span>);
                }

                if (data){
                    data.tradeAggregations.map((trade, i) => {
                        xData = [...xData, i];
                        tData = [...tData, [trade.open, trade.close, trade.low, trade.high]];
                        vData = [...vData, trade.counterVolume];
                        return null;
                    });
                    
                }
                return <MyChart xData={xData} tData={tData} vData={vData} />
            
            }
        }
    </Query>
  </div>
  </div>
}

export default Chart
