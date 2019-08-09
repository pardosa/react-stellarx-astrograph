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
        xAxis: [{
            type: 'category',
            data: xaxis,
            boundaryGap : false,
            axisLine: { lineStyle: { color: '#777' } },
            min: 'dataMin',
            max: 'dataMax',
            axisPointer: {
                show: true
            }
        }, {
            type: 'category',
            gridIndex: 1,
            data: xaxis,
            scale: true,
            boundaryGap : false,
            splitLine: {show: false},
            axisLabel: {show: false},
            axisTick: {show: false},
            axisLine: { lineStyle: { color: '#777' } },
            splitNumber: 20,
            min: 'dataMin',
            max: 'dataMax',
            axisPointer: {
                type: 'shadow',
                label: {show: false},
                triggerTooltip: true,
                handle: {
                    show: true,
                    margin: 30,
                    color: '#B80C00'
                }
            }
        }],
        yAxis: [{
            scale: true,
            splitNumber: 2,
            axisLine: { lineStyle: { color: '#777' } },
            splitLine: { show: true },
            axisTick: { show: false },
            axisLabel: {
                inside: true,
                formatter: '{value}\n'
            }
        }, {
            scale: true,
            gridIndex: 1,
            splitNumber: 2,
            axisLabel: {show: false},
            axisLine: {show: false},
            axisTick: {show: false},
            splitLine: {show: false}
        }],
        grid: [{
            left: 20,
            right: 20,
            top: 40,
            height: 270
        }, {
            left: 20,
            right: 20,
            height: 50,
            top: 350
        }],
        series: [{
            name: 'Volume',
            type: 'bar',
            xAxisIndex: 1,
            yAxisIndex: 1,
            itemStyle: {
                normal: {
                    color: '#7fbe9e'
                },
                emphasis: {
                    color: '#140'
                }
            },
            data: volumeData
        }, {
            type: 'candlestick',
            data: tradeData,
            itemStyle: {
                normal: {
                    color: '#ef232a',
                    color0: '#14b143',
                    borderColor: '#ef232a',
                    borderColor0: '#14b143'
                },
                emphasis: {
                    color: 'black',
                    color0: '#444',
                    borderColor: 'black',
                    borderColor0: '#444'
                }
            }
        }]
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

                if (data){
                    data.tradeAggregations.map(function(trade, i) {
                        xData = [...xData, i];
                        tData = [...tData, [trade.open, trade.close, trade.low, trade.high]];
                        vData = [...vData, trade.counterVolume];
                        return null;
                    });
                }
                return <ReactEcharts
                option={option}
                onChartReady={onChartReady}
                style={{height: 500}} />
            
            }
        }
    </Query>
  </div>
  </div>
}

export default Chart
