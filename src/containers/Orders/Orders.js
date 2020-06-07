import React, {useEffect } from "react";
import Order from '../../components/Order/Order';
import axios from '../../axios-orders';
import withError from '../../hoc/withError';
import Spinner from '../../components/UI/Spinner/Spinner'
import { connect } from "react-redux";
import * as actions from '../../store/actions/index';


const Orders = props => {
    const { onFetchOrders, authToken, userID } = props;

    useEffect(() => {
      onFetchOrders(authToken,userID);
    },[onFetchOrders,authToken,userID]);
    
    let orderlist = <Spinner/>;
   
    if (!props.load) {
      
           orderlist = props.odrs.map(order => <Order
               key={order.id} ingredients={order.ingredients} price={order.price} customerData={order.CustomerData} time={order.time} />);
        if (props.odrs.length===0) {
            console.log(props.odrs, 'empty')
            orderlist =  (<h4 style={{padding:"0.5% 10%", color:'#333'}}>Seems like you're yet to try one of our delicious Burgers!</h4>)
        }

        console.log(props.odrs, 'non-empty')
    }
    
        
        return (
            <div>
                 <h3 style={{padding:"0.5% 10%", color:'#333'}}>Hi <span style={{ textTransform: 'capitalize' }} >{localStorage.getItem('firstName')}</span>, here are your previous orders:</h3>
                {orderlist}
            </div>
        );
    
}

const mapStateToProps = state => {
    return {
        odrs: state.order.orders,
        load: state.order.orderLoading,
        authToken: state.auth.token, 
        userID: state.auth.userId,
      //  fetched: state.order.ordersLoaded
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onFetchOrders: (token, userId) => dispatch(actions.fetchOrders(token,userId)),
    }
}

export default connect(mapStateToProps,mapDispatchToProps)( withError(Orders, axios))