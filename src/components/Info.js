import React from 'react'

const Info = (props) => {
    return <div className="container">
        <div className="row text-center">
            <div className="col-sm">
                <h4>{props.volume.toLocaleString(undefined, {maximumFractionDigits:2})}</h4>
                24H Volume
            </div>
            <div className="col-sm">
                <h4>{props.close.toLocaleString(undefined, {maximumFractionDigits:2})}</h4>
                Last Price Per XLM
            </div>
            <div className="col-sm">
                <h4>{((props.close-props.open)/props.open * 100).toLocaleString(undefined, {maximumFractionDigits:3})} %</h4>
                24h Change
            </div>
        </div>
    </div>;
}

export default Info
