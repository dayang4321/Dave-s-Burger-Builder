import React, { Component } from 'react';
import { connect } from 'react-redux'

import Aux from '../../hoc/Auxiliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner'
import withError from '../../hoc/withError'
import Auth from '../Authentication/Auth'
import * as actions from '../../store/actions/index'




export class BurgerBuilder extends Component {

    state = {
       purchasing: false,        
    }
    //If a burger is not being built, load a new one
    componentDidMount() {
        if (!this.props.building) { this.props.onLoadIngredients() }
    }
    //If the sum reducer of the ingredients objects returns null or 0, then the burger should not be purchasable 
    updatePurchaseState(ingredients) {
        const sum = Object.keys(ingredients)
            .map(igKey => { return ingredients[igKey]; })
            .reduce((sum, el) => { return sum + el; }, 0);  
     return sum > 0 
    };

    purchasingHandler = () => {this.setState({ purchasing: true })
    };

    cancelPurchaseHandler = () => { this.setState({  purchasing: false }) };

    checkoutHandler = (props) => {
        this.props.onBurgerPuchaseInit(); 
        this.props.history.push('/checkout');
     }

    render() {
        
       const disabledLessInfo = {
            ...this.props.ings
        };
        //should return an {key:true} when an ingredient has not been added
        for (let key in disabledLessInfo) {
            disabledLessInfo[key] = (disabledLessInfo[key] <= 0)
        };
        const disabledMoreInfo = {
            ...this.props.ings
        };
         //should return an {key:true} when an ingredient has up to 4 layers
        for (let key in disabledMoreInfo) {
            disabledMoreInfo[key] = disabledMoreInfo[key] >= 4
        };
        
        let orderSummary = (
            <OrderSummary style={{ marginLeft: '20px' }} ingObj={this.props.ings} price={this.props.prc}
            cancelPurchase={this.cancelPurchaseHandler} checkout={this.checkoutHandler}/>)
        
        let burger = (<Burger ingredients={this.props.ings} />)
        
         //should display spinner if an error occur
        if (!this.props.ings) { burger = <Spinner />; orderSummary = null }
        
        
        if (this.props.err) {
            burger = <p>Sorry we can't load your Burger</p>;  }

        return (
            <Aux>
                <Modal showing={this.state.purchasing} modalCloser={this.cancelPurchaseHandler}>
                    {this.props.isAuth ? orderSummary : <Auth style={{ width: '100%', marginTop: '10px' }}/>}  
                </Modal>               
                {burger}
                <BuildControls
                    ingredientAdded={this.props.onIngredientAdded} ingredientRemoved={this.props.onIngredientRemoved}
                    disabled={!this.props.ings}  disabledLess={disabledLessInfo} disabledMore={disabledMoreInfo}
                    price={this.props.prc} ordered={this.purchasingHandler}  isAuth={this.props.isAuth} 
                    purchasable={this.props.ings ? this.updatePurchaseState(this.props.ings) : null }
                    error={this.props.err}  />
            </Aux>
        )
        };
}

const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        prc: state.burgerBuilder.totalPrice,
        err: state.burgerBuilder.error,
        isAuth: state.auth.token !== null,
        building: state.burgerBuilder.building,
        authToken: state.auth.token, 
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onIngredientAdded: (ingName) => dispatch(actions.addIngredient(ingName)),
        onIngredientRemoved: (ingName) => dispatch(actions.removeIngredient(ingName)),
        onLoadIngredients: () => dispatch(actions.setIngredients()),
        onBurgerPuchaseInit: () => dispatch(actions.burgerPurchaseInit()),
        onFetchOrders: (token) => dispatch(actions.fetchOrders(token)),
        
    }
}


export default connect(mapStateToProps,mapDispatchToProps)(withError(BurgerBuilder, axios)) ;