import React from 'react';
import Burger from '../../Burger/Burger';
import Button from '@material-ui/core/Button'
import classes from './CheckoutSummary.module.css';


const checkoutSummary = (props) => {



    return (
        <div className={classes.CheckoutSummary}>
            <h1 style={{color:'#222'}}>It's Looking Yummy!</h1>
            <div style={{width: '100%', margin: 'auto', paddingBottom: '10px', }}>
                <Burger ingredients={props.ingredients}/>
            </div>
            
            <Button variant="text" style={{color:"red", marginRight: '10%', fontFamily: 'inherit', fontWeight:'600'} }onClick={props.checkoutCancel}>BACK</Button>
            <Button variant="outlined" color="primary" style={{color:"blue", fontFamily: 'inherit', fontWeight:'600'} }onClick={props.checkoutContinue}>CONTINUE</Button>
            
           </div>     


    )


}


export default checkoutSummary