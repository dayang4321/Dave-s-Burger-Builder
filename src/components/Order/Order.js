import React from 'react';
import classes from './Order.module.css';
import { timeConvert } from '../../shared/utility';




const order = (props) => {
    
    const customer = { ...props.customerData }
    const ingList = Object.keys(props.ingredients)
    .map((ingName) =>
        (<li key={ingName} style={{ display : 'inline-block', margin: '0 3px', padding:'0 2px', border : '0.7px solid #ccc'}} >
            <span style={{ textTransform: 'capitalize' }}>{ingName}</span>
        : {props.ingredients[ingName]}</li>));
    
    
    return(
        <div className={classes.Order}>
           
            <p>Ordered For: {customer.firstName + ' ' + customer.lastName  }</p>
            <p>The ingredients were: {ingList}</p>
            <p>It cost&nbsp;<b> ₦{props.price}</b>&nbsp;only</p>
            <p>Purchased on: {timeConvert(props.time)}</p>
    </div>
)}

export default order