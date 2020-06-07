import React, { useState } from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';

import Modal from '../../components/UI/Modal/Modal';

import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import CheckoutForm from './ContactData/CheckoutForm';



const Checkout = props => {
    
    const [checkoutState, setCheckoutState] = useState(false)
    const { completed } = props

    const previewCancelHandler = () => { props.history.goBack(); };
    
    //const exitCheckoutHandler = () => {props.history.push('/')}
    
    const checkoutContinueHandler = () => setCheckoutState(!checkoutState) ;
    
 //   const checkoutCancelHandler = () => setCheckoutState(!checkoutState);
    
    let summary;

  
    
    //redirect to home if user visits the page with bulding a burger
    if (!props.ings) { summary = <Redirect to='/' /> };
      
  const checkoutform = <CheckoutForm closeModal={checkoutContinueHandler}/>
    //if a burger is being built show checkout summary
    if (props.ings) {

        summary = (<div>
                    <CheckoutSummary ingredients={props.ings}
                        checkoutCancel={previewCancelHandler}
                        checkoutContinue={checkoutContinueHandler} />
            <Modal style={{ margin: '0 auto', height: 'auto', maxHeight: '92%' }}
             modalCloser={checkoutContinueHandler}   showing={checkoutState} >{checkoutform}</Modal>
        </div>)

    
          
    }
    
    return (
        completed ? <Redirect to='/' />: summary
                )
}


const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        pcsd: state.order.purchased,
        completed: state.order.orderCompleted,
          }
}

export default connect(mapStateToProps)(Checkout)