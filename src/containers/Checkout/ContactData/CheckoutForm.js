import React, { useState } from 'react';
import { connect } from 'react-redux';

import {Typography,TextField,FormControlLabel,Checkbox,Button,Grid} from '@material-ui/core';
import { inputChangeHandler } from '../../../shared/utility';

import * as actionTypes from '../../../store/actions/index'
import Spinner from '../../../components/UI/Spinner/Spinner';


const CheckoutForm = props => {

  const validPattern = {
    isAlphabet: /^[A-Za-z ,'-]+$/,
    isAlphaNumeric : /^[A-Z0-9a-z ,'-]*$/
  }
  const [orderForm, setOrderForm] = useState({
    firstName: {
        value: '',
        validation: {
          required: true,
          minLength: 2,
          maxLength: 16,
          isAlphaNumeric: true,
         pattern: validPattern.isAlphaNumeric
        },
        valid: false,
        touched: false
    },
    lastName: {
        value: '',
        validation: {
          required: true,
          minLength: 2,
          maxLength: 16,
          isAlphaNumeric: true,
         pattern: validPattern.isAlphaNumeric
        },
        valid: false,
        touched: false
      },
      address: {
      value: '',
      validation: {
        required: true,
        minLength: 3,
        maxLength: 35,
        isAlphaNumeric: true,
        pattern: validPattern.isAlphaNumeric
      },
      valid: false,
      touched: false
    },
    city: {
      value: '',
      validation: {
        required: true,
        minLength: 3,
        maxLength: 25,
        isAlphaNumeric: true,
        pattern: validPattern.isAlphaNumeric
      },
      valid: false,
      touched: false
    },
    state: {
      value: '',
      validation: {
        required: true,
        minLength: 3,
        maxLength: 25,
        isAlphabet: true,
        pattern: validPattern.isAlphabet
      },
      valid: false,
      touched: false
    },
    country: {
      value: '',
      validation: {
        required: true,
        minLength: 4,
        maxLength: 30,
        isAlphabet: true,
        pattern: validPattern.isAlphabet
      },
      valid: false,
      touched: false
    },
    zip: {
      value: '',
      validation: {
        required: true,
        minLength: 5,
        maxLength: 7,
        isAlphaNumeric: true,
        pattern: validPattern.isAlphaNumeric
      },
      valid: false,
      touched: false
    },
    loading: false,
    formIsValid: false
  })

//validation style handler
  const isValid = input => !orderForm[input].valid && orderForm[input].touched;



// input store
  const inputStore = {
    label:{
      firstName: "First Name",
      lastName: "Last Name",
      address: "Address",
      city: "City",
      state: "State/Province/Region",
      zip: "Zip / Postal Code",
      country: "Country",
    },
    autoComplete: {
      firstName: "given-name",
      lastName: "family-name",
      address: "shipping address-line1",
      city: "shipping address-level2",
      state: "shipping address-level1",
      zip: "shipping postal-code",
      country: "shipping country",
    },
    helperText: {      
      address: "Enter the delivery address",
      city: "Enter the name of the city",
      state: "Enter the name of the state",
      zip: "Enter a valid zip /postal code" ,
      country: "Enter your current country name",
    },
    
  }
//input validation props
const validProps = (input) => {
  return {
  minLength: orderForm[input].validation.minLength,
  maxLength: orderForm[input].validation.maxLength,
  }
}


//input fields creator
  const inputCreateHandler = (input,props) => {
    return (
      <TextField margin="none" required id={input} name={input} label={inputStore.label[input]} fullWidth autoComplete={inputStore.autoComplete[input]}
        onChange={event => { inputChangeHandler(event, input, orderForm, setOrderForm) }} 
        error={isValid(input)} inputProps={validProps(input)} size='small' helperText={inputStore.helperText[input]} {...props}   />
    )
  } 

const orderSubmitHandler = (event) => {
    event.preventDefault();
    const formData = {};
  for (let elem in orderForm) { formData[elem] = orderForm[elem].value };
    const order = {
        ingredients: props.ings,
        price: props.prc,
        CustomerData: formData,
      userId: props.userID,
        time: Date.now(),
  }
  //Send Order Request
    props.onBurgerPurchase(order, props.authToken);
  }

  let formBody = (
    <React.Fragment>
<Typography variant="h6" style={{ paddingTop: '10px', paddingLeft: '5%', paddingRight: '5%' }}>
  Fill this form to complete your order 
</Typography>
<form style={{width:'90%',padding:'0.75% 5% 2%'}}  onSubmit={orderSubmitHandler}  >
 <Grid container spacing={2}>
  <Grid item xs={12} sm={6}>
      {inputCreateHandler('firstName' )}
  </Grid>
  <Grid item xs={12} sm={6}>
      {inputCreateHandler('lastName')}
  </Grid>
  <Grid item xs={12} style={{paddingTop:'0px'}}>
    {inputCreateHandler('address')}
  </Grid>
  <Grid item xs={12} sm={6} style={{paddingTop:'0px'}}>
    {inputCreateHandler('city')}
  </Grid>
  <Grid item xs={12} sm={6} style={{paddingTop:'0px'}}>
          {inputCreateHandler('state')}
  </Grid>
  <Grid item xs={12} sm={6} style={{paddingTop:'0px'}}>
    {inputCreateHandler('zip')}
  </Grid>
  <Grid item xs={12} sm={6} style={{paddingTop:'0px'}}>
    {inputCreateHandler('country')}
  </Grid>
  <Grid item xs={12} style={{paddingTop:'0px'}}>
          <FormControlLabel control={<Checkbox color="secondary" name="saveAddress" value="yes" />}
      label="Use this address for payment details" />
    </Grid >
    <Grid container justify="space-between" direction="row">
      <Grid item ><Button onClick={props.closeModal} variant="text" style={{color:'#d9534f', borderColor:'#d9534f'}} >VIEW PREVIEW</Button></Grid>
      <Grid item> <Button  variant="contained" color="primary"  type="submit"> PLACE ORDER</Button></Grid>           
    </Grid>   
</Grid>
    </form>
    </React.Fragment>
  )
  
//display spinner while awaiting response
  if (props.load) {
    formBody=<Spinner/>
  };


  return (    
      <React.Fragment>
        <Typography component="h2" variant="h4" style={{ color:'#333'}} align="center"> Checkout </Typography>
          {formBody}
        </React.Fragment>
  );
}

const mapStateToProps = state => {
  return {
      ings: state.burgerBuilder.ingredients,
      prc: state.burgerBuilder.totalPrice,
      load: state.order.loading,
      authToken: state.auth.token,
      userID: state.auth.userId,
    
  }
};
const mapDispatchToProps = dispatch => {
  return {
      onBurgerPurchase: (order, token) => dispatch(actionTypes.burgerPurchase(order, token))
  }
};


export default connect(mapStateToProps,mapDispatchToProps)(CheckoutForm);

