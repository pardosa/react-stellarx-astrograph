import React, { useState } from 'react';
import gql from 'graphql-tag';
import { Query, Subscription } from 'react-apollo';

const TRADES_QUERY = gql`{
    tick(
        selling: "native"
        buying: "ETH-GBVOL67TMUQBGL4TZYNMY3ZQ5WGQYFPFD5VJRWXR72VA33VFNL225PL5"
    ) {
        bestBuy: bestAsk
        bestSell: bestBid
    }
}`

const SUBSCRIPTION = gql`
  subscription tick {
    tick(
        selling: "native",
        buying: "ETH-GBVOL67TMUQBGL4TZYNMY3ZQ5WGQYFPFD5VJRWXR72VA33VFNL225PL5"
    ) {
        bestBuy: bestAsk
        bestSell: bestBid
    }
  }
`;

const Trades = () => {
    const [buyActive, setBuyActive] = useState('active'); 
    const [sellActive, setSellActive] = useState('');
    const [unitPrice, setUnitPrice] = useState(0);
    const [quantity, setQuantity] = useState(0);
    const [total, setTotal] = useState(0); 

    const changeTradeType = (e) => {
        if (e.target.value === "buy"){
            setBuyActive('active');
            setSellActive('');
            setQuantity(0);
            setTotal(0);
        }else{
            setBuyActive('');
            setSellActive('active');
            setQuantity(0);
            setTotal(0);
        }
    }

    const updateForm = () => {
        setTotal(unitPrice * quantity);
    }

    const updateUnitPrice = (data) => {
        if (buyActive === "active"){
            setUnitPrice(data.tick.bestBuy);
        }else{
            setUnitPrice(data.tick.bestSell);
        }
        updateForm();
    }

    const updateQuantity = (e) => {
        setQuantity(e.target.value);
        updateForm();
    }

    const adjustQuantity = (e) => {
        setTotal(e.target.value);
        setQuantity(total / unitPrice);
    }

    return (
        <div className="m-3">
            <div className="btn-group btn-block" role="group" >
                <button type="button" className={"btn btn-outline-primary " + buyActive} value="buy" onClick={changeTradeType}>BUY</button>
                <button type="button" className={"btn btn-outline-primary " + sellActive} value="sell" onClick={changeTradeType}>SELL</button>
            </div>
            <div id="myTabContent" className="tab-content border">
                <div className="tab-pane fade show active m-3" id="buy">
                    <Query query={TRADES_QUERY}>
                        {
                            ({loading, error, data}) => {
                                if (loading) return <div className="loading">loading...</div>;
                                if (error) {
                                    console.log(error);
                                    return (<span>Error!</span>);
                                }

                                updateUnitPrice(data);

                                return <form>
                                    <fieldset>
                                    <div className="form-group row">
                                        <label className="col-sm-4 col-form-label">Unit Price</label>
                                        <div className="col-sm-6">
                                            <input type="text" className="form-control-plaintext border m-1 pl-2" id="unitPrice" value={unitPrice.toLocaleString(undefined, {maximumFractionDigits:7})} onChange={updateUnitPrice}  />
                                        </div>
                                        <label className="col-sm-2 col-form-label">ETH</label>
                                    </div>
                                    <div className="form-group row">
                                        <label className="col-sm-4 col-form-label">Quantity</label>
                                        <div className="col-sm-6">
                                            <input type="text" className="form-control-plaintext border m-1 pl-2" id="quantity" value={quantity} onChange={updateQuantity} />
                                        </div>
                                        <label className="col-sm-2 col-form-label">XLM</label>
                                    </div>
                                    <div className="form-group row">
                                        <label className="col-sm-4 col-form-label">Total</label>
                                        <div className="col-sm-6">
                                            <input type="text" className="form-control-plaintext border m-1 pl-2" id="total" value={total.toLocaleString(undefined, {maximumFractionDigits:7})} onChange={adjustQuantity} />
                                        </div>
                                        <label className="col-sm-2 col-form-label">ETH</label>
                                    </div>
                                    </fieldset>
                                </form>
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
                                if (data){
                                    console.log(data);
                                    if (data.tick !== null){
                                        updateUnitPrice(data);
                                    }

                                    return null;
                                }
                            }
                        }
                    </Subscription>
                </div>
                <div className="tab-pane fade" id="sell">
                    <p>Food truck fixie locavore, accusamus mcsweeney's marfa nulla single-origin coffee squid. Exercitation +1 labore velit, blog sartorial PBR leggings next level wes anderson artisan four loko farm-to-table craft beer twee. Qui photo booth letterpress, commodo enim craft beer mlkshk aliquip jean shorts ullamco ad vinyl cillum PBR. Homo nostrud organic, assumenda labore aesthetic magna delectus mollit.</p>
                </div>
            </div>
        </div>
    );
}

export default Trades
