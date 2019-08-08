import React from 'react'
import moment from 'moment';

const History = (props) => {
    const when = moment(props.when.replace('T',' ').replace('Z',''),"YYYY-MM-DD HH:mm:ss").toNow();
    return <div className="row small">
    <div className="col-5 text-right">{props.price.toLocaleString(undefined, {maximumFractionDigits:3})}</div>
    <div className="col-3 text-right">{props.size.toLocaleString(undefined, {maximumFractionDigits:3})}</div>
    <div className="col-4 text-right">{when}</div>
  </div>;
}

export default History
