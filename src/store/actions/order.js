import * as actionTypes from './actionTypes';


export const burgerPurchaseInit = () => {
    return {
        type: actionTypes.BURGER_PURCHASE_INIT,
        }
}

export const burgerPurchaseSuccess = (id, orderData) => {
    return {
        type: actionTypes.BURGER_PURCHASE_SUCCESS,
        orderId: id,
        order: orderData,
    }
}    

export const burgerPurchaseFail = (error) => {
    return {
        type: actionTypes.BURGER_PURCHASE_FAIL,
        error: error
    }
}

export const burgerPurchaseAttempt = () => {
    return {
        type: actionTypes.BURGER_PURCHASE_ATTEMPT,
        }
}

export const burgerPurchase = (orderData, token) => {
    return {
        type: actionTypes.INIT_BURGER_PURCHASE,
        orderData: orderData,
        token: token,
    }
}

export const fetchOrdersStart = () => {
    return {
        type: actionTypes.FETCH_ORDERS_START,
    }
}

export const fetchOrdersSuccess = (orders) => {
    return {
        type: actionTypes.FETCH_ORDERS_SUCCESS,
        orders: orders
    }
}

export const fetchOrdersFail = (error) => {
    return {
        type: actionTypes.FETCH_ORDERS_FAIL,
        error: error 
    }
}

export const fetchOrders = (token, userId) => {
    return {
        type: actionTypes.INIT_FETCH_ORDERS,
        token: token,
        userId: userId
                 }
        } 