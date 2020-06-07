import { takeEvery,all,takeLatest } from 'redux-saga/effects';

import { authLogOutSaga, authSessLogOutSaga, authSaga, checkAuthStatusSaga } from './auth';
import { burgerPurchaseSaga, fetchOrdersSaga } from './order';
import { setIngredientsSaga } from './burgerBuilder';

import * as actionTypes from '../actions/actionTypes';


export function* watchAuth() {
    yield all([
        takeEvery(actionTypes.INIT_AUTH_LOGOUT, authLogOutSaga),
        takeEvery(actionTypes.INIT_AUTH_SESS_LOGOUT, authSessLogOutSaga),
        takeEvery(actionTypes.INIT_AUTH, authSaga),
        takeEvery(actionTypes.INIT_CHECK_AUTH_STATUS, checkAuthStatusSaga),
        ])
    
}


export function* watchOrder() {
    yield takeLatest(actionTypes.INIT_BURGER_PURCHASE, burgerPurchaseSaga); 
    yield takeEvery(actionTypes.INIT_FETCH_ORDERS,fetchOrdersSaga)
}

export function* watchBurgerBuilder() {
    yield takeEvery(actionTypes.INIT_SET_INGREDIENTS, setIngredientsSaga);
    yield takeEvery(actionTypes.BURGER_PURCHASE_SUCCESS, setIngredientsSaga);
   
 //   yield takeEvery(actionTypes.LOAD_INGREDIENTS, fetchOrdersSaga);
}
