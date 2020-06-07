import React, { Component } from 'react';
import Layout from './hoc/Layout/Layout';
import BurgerBuilder from '../src/containers/BurgerBuilder/BurgerBuilder'
import Checkout from './containers/Checkout/Checkout'
import Orders from './containers/Orders/Orders'
import Logout from './containers/Authentication/Logout/Logout';
import { Route, Switch, Redirect } from 'react-router-dom'
import Auth from './containers/Authentication/Auth';
import * as actions from './store/actions/index';

import './App.css';
import { connect } from 'react-redux';



class App extends Component {
  componentDidMount() {
    this.props.onCheckAuthStatus();
  }

 
  
  render() {

    let routes = (<Switch>
      <Route path='/' exact component={BurgerBuilder} />
      <Route path='/Auth' component={Auth} />
      <Redirect to='/'/>
    </Switch>);

    if (this.props.isAuth) {
      routes = (<Switch>
        <Route path='/' exact component={BurgerBuilder} />
        <Route path='/checkout' component={Checkout} />
        <Route path='/orders' component={Orders} />
        <Route path='/logout' component={Logout} />
        <Redirect to='/'/>
      </Switch>)
    }  

    return (
     
        <div>
          <Layout>
          {routes}
          
        </Layout>
      </div>
      
      
    );
    
  }
  
}
const mapStateToProps = state=> {
  return {
      isAuth: state.auth.token!==null
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onCheckAuthStatus: () => dispatch(actions.checkAuthStatus()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps) (App);
