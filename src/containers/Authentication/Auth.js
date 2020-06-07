import React, { useState } from 'react';
import { connect } from 'react-redux';
import Axios from 'axios'

import {
  Avatar, Box, Container, Link, Typography, Button,
  TextField, FormControlLabel, Checkbox, Grid, makeStyles
} from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';

import * as actions from '../../store/actions/index'
import { inputChangeHandler } from '../../shared/utility';
import Spinner from '../../components/UI/Spinner/Spinner';


const useStyles = makeStyles((theme) => ({
    paper: {
      marginTop: theme.spacing(8),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.secondary.main,
    },
    form: {
      width: '100%',
      marginTop: theme.spacing(1),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
  }));



const Auth = props => {

    const classes = useStyles();

    

    const [authForm, setAuthForm] = useState({
        firstName: {
            value: '',
            validation: {
              required: true,
              minLength: 2,
              isAlphabet:true
            },
            valid: false,
            touched: false
        },
        lastName: {
            value: '',
            validation: {
              required: true,
              minLength: 2,
              isAlphabet: true
            },
            valid: false,
            touched: false
          },
          email: {
          value: '',
          validation: {
            required: true,
            isEmail: true,
          },
          valid: false,
          touched: false
        },
        password: {
          value: '',
          validation: {
            required: true,
            minLength: 6
          },
          valid: false,
          touched: false
        }
      });

    const [isSignup, setIsSignup] = useState(false);

    const [forgotPassword, setforgotPassword] = useState(false);

 
    // input store
  const inputStore = {
    label:{
      firstName: "First Name",
      lastName: "Last Name",
      email: "Email Address",
      password: "Password",
    
    },
    autoComplete: {
      email: "Enter a valid email",
      password:"current-password"
     
      
    },
    helperText: {      
      email: "Enter a valid email",
      password: "Password must be at least 6 characters",
    
    }
    

  }

//input fields creator
  const inputCreateHandler = (input,props) => {
    return (
      <TextField variant="outlined"  required id={input} name={input} label={inputStore.label[input]} fullWidth autoComplete={inputStore.autoComplete[input]}
        onChange={event => { inputChangeHandler(event, input, authForm, setAuthForm) }}
        error={isValid(input)} inputProps={lengthProps(input)} helperText={inputStore.helperText[input]} {...props}   />
    )
  } 
 
   
    const onAuthSubmit = (event) => {
        event.preventDefault();
        const customerInfo = {
            firstName: authForm.firstName.value,
            lastName: authForm.lastName.value,
            email: authForm.email.value,
        };
        props.onAuth(authForm.email.value, authForm.password.value, isSignup, customerInfo)
      
    }
    
    
    const forgotPasswordHandler = () => setforgotPassword(!forgotPassword);
    
    const switchSignupHandler = () => setIsSignup(!isSignup);

    const onPasswordReset = (event) => {
        event.preventDefault();
        const reqBody = {requestType:"PASSWORD_RESET", email:authForm.email.value}

        Axios.post('https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyBfZjDWFu8P_4Kb2CiUppaoSzCVfTAeN2o', reqBody)
            .then(response => { })
        .catch(err=>console.log(err))
  }
  const isValid = input => !authForm[input].valid && authForm[input].touched;

  const lengthProps = input => {
    return {
    minLength: authForm[input].validation.minLength,
    maxLength: authForm[input].validation.maxLength
  }}
    let formBody = null;

    if (props.authLoad) {
        formBody = <Spinner/>
    }
    else {
        if (isSignup) {
            formBody = ( <form className={classes.form}  onSubmit = {onAuthSubmit}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                  {inputCreateHandler('firstName', { autoFocus:true,  })}
                  </Grid>
                  <Grid item xs={12} sm={6}>
                  {inputCreateHandler('lastName',{margin: 'none'})}
                  </Grid>
                  <Grid item xs={12}>
                  {inputCreateHandler('email',{margin: 'none'})}
                  </Grid>
                  <Grid item xs={12}>
                  {inputCreateHandler('password',{margin: 'none'})}
                  </Grid>
                  
                </Grid>
                <Button className={classes.submit} type="submit" fullWidth variant="contained" color="primary">
                  Sign Up
                </Button>
                <Grid container justify="flex-end">
                  <Grid item>
                    <Link  href='#' onClick={switchSignupHandler} variant="body2">
                      Already have an account? Sign in
                    </Link>
                  </Grid>
                </Grid>
              </form>
           )
        }
        if (!isSignup && !forgotPassword) {        
            formBody = (<form className={classes.form} onSubmit={onAuthSubmit}>
              {inputCreateHandler('email', { margin:'normal', autoFocus:true })}
              {inputCreateHandler('password', { margin:'normal' })}
                <FormControlLabel control={<Checkbox value="remember" color="primary" />} label="Remember me"/>
              <Button type="submit" fullWidth variant="contained"
                color="primary" className={classes.submit}> Sign In </Button>
                <Grid container>
                  <Grid item xs>
                        <Link  href='#'  onClick={forgotPasswordHandler}  variant="body2">
                      Forgot password?
                    </Link>
                  </Grid>
                  <Grid item>
                    <Link href='#' onClick={switchSignupHandler} variant="body2">
                      {"Don't have an account? Sign up"}
                    </Link>
                  </Grid>
                </Grid>
              </form>)

        }
        if (!isSignup && forgotPassword) {
          formBody = (
            <form className={classes.form} onSubmit={onPasswordReset}>
              {inputCreateHandler('email', { margin:'normal', autoFocus:true })}
              <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
                Reset Password
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link href='#' onClick={forgotPasswordHandler} variant="body2">
                    Back to Sign in
                  </Link>
                </Grid>
                  <Grid item>
                    <Link href='#' onClick={switchSignupHandler} variant="body2">
                        {"Don't have an account? Sign Up"}
                    </Link>
                  </Grid>
                </Grid>
              </form>)             
        }
    }

    return (
        <Container component="div"  maxWidth="xs">
            <div style={props.style} className={classes.paper}>
              <Avatar className={classes.avatar}>
                <LockOutlinedIcon />
              </Avatar> <Typography component="h1" variant="h5">
            {isSignup ? 'Sign up' : 'Sign in'}
          </Typography>
                 {formBody}
            </div>
        <Box mt={8} position="fixed">   </Box>
            </Container>
     
        )     
 
};

const mapStateToProps = state => {
    return {
        authLoad: state.auth.authLoading,
        authError: state.auth.authError,
        isAuth: state.auth.token !== null,
        userId: state.auth.userId,
        token: state.auth.token,
    }
}

const mapDispatchToProps = dispatch => {
    return {
      onAuth: (email, password, isSignUp, customerInfo) => dispatch(actions.auth(email, password, isSignUp, customerInfo)),
      onError: () => dispatch(actions.authClearError())
    }
}

export default connect(mapStateToProps, mapDispatchToProps) (Auth)
