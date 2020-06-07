
import { put } from 'redux-saga/effects';
import * as actions from '../actions/index';
import axios from '../../axios-orders';
import { sweetAlert } from '../../components/UI/Alert/SweetAlert'

export function* burgerPurchaseSaga (action) {
    yield put(actions.burgerPurchaseAttempt());
    try {
        yield sweetAlert({
            icon: 'success',
            title: 'You have successfully placed your order',
            showConfirmButton: false,
            timer: 1750
          
           })
        const response = yield axios.post('/orders.json?auth=' + action.token, action.orderData);
        yield put(actions.burgerPurchaseSuccess(response.data.name, action.orderData));
        
    }
    catch (error) {
        yield put(actions.burgerPurchaseFail(error))
        yield  yield sweetAlert({
            icon: 'error',
            
            showConfirmButton: false,
            timer: 2000
          
           })
    };
}

export function* fetchOrdersSaga(action) {
  
    yield put(actions.fetchOrdersStart());
        const queryParams = '?auth=' + action.token + '&orderBy="userId"&equalTo="' + action.userId + '"';
        
    try {
        const response = yield axios.get('/orders.json' + queryParams)
        const fetchedOrders = [];
        for (let key in response.data) {
            fetchedOrders.push({ ...response.data[key], id: key })
        };
        yield put(actions.fetchOrdersSuccess(fetchedOrders));
        // this.setState({ loading: false, orders:fetchedOrders }); 
    }
    catch(error){
            yield put(actions.fetchOrdersFail(error))
            //this.setState({loading:false})
            }
          
        } 
