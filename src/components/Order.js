import React from 'react'

const Order = (props) => {
    return <div className="row small table-dark">
        <div className="col-4 text-right">{props.size.toLocaleString(undefined, {maximumFractionDigits:2})}</div>
        <div className="col-3 text-right">{props.sum.toLocaleString(undefined, {maximumFractionDigits:2})}</div>
        <div className="col-5 text-right">{props.price.toLocaleString(undefined, {maximumFractionDigits:7})}</div>
    </div>;
}

export default Order;
