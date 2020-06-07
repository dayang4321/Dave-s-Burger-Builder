import * as actionTypes from '../actions/actionTypes' 

const initialState = {
    orders: [],
    loading: false, 
    purchased: false,
    orderLoading: false,
    orderCompleted: false,
    ordersLoaded: false,
   };



const reducer = (state = initialState, action) => {
  
    switch (action.type) {
        case actionTypes.BURGER_PURCHASE_INIT: 
            return {
                ...state,
                purchased: false,
                orderCompleted: false,
            }
        case actionTypes.BURGER_PURCHASE_ATTEMPT:
            return {
                ...state,
                loading: true,
                orderCompleted: false
            }
        
        case actionTypes.BURGER_PURCHASE_SUCCESS:
            // const newOrder = {
            //     ...action.orderData,
            //     id: action.orderId,
               
            // };
            return {
                ...state,
           //     orders: state.orders.concat(newOrder),
                loading: false,
                purchased: true,
                orderCompleted: true,
            }
        case actionTypes.BURGER_PURCHASE_FAIL:
            return {
                ...state,
                loading: false,
                orderCompleted: false,
            }
        case actionTypes.FETCH_ORDERS_START:
            return {
                ...state,
                orderLoading: true,
                
            }
        case actionTypes.FETCH_ORDERS_SUCCESS:
            return {
                    ...state,
                orderLoading: false,
              
                orders: [].concat(action.orders)
            }
        case actionTypes.FETCH_ORDERS_FAIL:
                return {
                        ...state,
                    orderLoading: false,  
                 
                    }
        default: return state
    }

    
}

export default reducer