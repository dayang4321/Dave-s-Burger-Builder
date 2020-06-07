import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';

import Button from '@material-ui/core/Button'

const orderSummary = (props) => {

    const ingList = Object.keys(props.ingObj)
        .map((ingName) =>
        {
            const layers = ['No', 'A layer of ','Two Layers of ','Three Layers of ','Four Layers of ', 'Five Layers of ' ];
            
            return (<ListItem divider key={ingName}>
                {layers[props.ingObj[ingName]]} &nbsp;<span style={{ textTransform: 'capitalize' }}> {ingName}</span>
                 </ListItem>)})
    

    return (
        <div style={props.style}>
            <h3>Review Your Order</h3>
            <p style={{margin:'auto'}}>Your delicious burger contains:</p>
            <List>
            {ingList}
            </List>
            <p><b>Your Burger costs: ₦{props.price.toFixed(2)}</b> only.</p>
            <p>Continue to Checkout?</p>
            <Button variant="text" style={{color:"red", marginRight: '10%', fontFamily: 'inherit', fontWeight:'600'} }onClick={props.cancelPurchase}>CANCEL</Button>
            <Button variant="outlined" color="primary" style={{color:"blue", fontFamily: 'inherit', fontWeight:'600'} }onClick={props.checkout}>CONTINUE</Button>
         </div>
    )

}
    






export default orderSummary