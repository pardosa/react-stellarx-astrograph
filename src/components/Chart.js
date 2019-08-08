import React, {useState, useEffect} from 'react'
import gql from 'graphql-tag';
import { Query } from 'react-apollo';

import ReactEcharts from "echarts-for-react";

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

    const [xaxis, setXaxis] = useState([]);
    const [tradeData, setTradeData] = useState([]);
    const [volumeData, setVolumeData] = useState([]);

    const colorList = ['#c23531','#2f4554', '#61a0a8', '#d48265', '#91c7ae','#749f83',  '#ca8622', '#bda29a','#6e7074', '#546570', '#c4ccd3'];

    const option = {
        title: {
          text:'7 days @ 6 hour Candlestick Chart',
        },
        color: colorList,
        tooltip: {
          trigger: 'axis'
        },
        grid: {
          top: 60,
          left: 30,
          right: 60,
          bottom:30
        },
        xAxis: {
            data: xaxis
        },
        yAxis: [{
            
        },
        {
            data: tradeData
        }
        ],
        series: [
          {
            name:'7 days @ 6 hour',
            type:'k',
            data: tradeData
          }
        ]
      };
    
    const onChartReady = (chart) => {
        chart.hideLoading();
    }

    var xData = [], tData = [], vData = [];

    const setChartData = () => {
        setXaxis(xData);
        setTradeData(tData);
        setVolumeData(vData);
    }

    useEffect(() => {
        setChartData();
    }, [xData, tData, vData]);

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

                if (!error){
                    data.tradeAggregations.map(function(trade, i) {
                        xData = [...xData, i];
                        tData = [...tData, [trade.open, trade.close, trade.low, trade.high]];
                        vData = [...vData, trade.counterVolume];
                    });
                }
                return <ReactEcharts
                option={option}
                onChartReady={onChartReady}
                style={{height: 400}} />
            
            }
        }
    </Query>
  </div>
  </div>
}

export default Chart
