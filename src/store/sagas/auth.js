
import { put,delay,call } from 'redux-saga/effects';
import * as actionTypes from '../actions/actionTypes';
import * as actions from '../actions/index';
import Axios from 'axios';
import { sweetAlert } from '../../components/UI/Alert/SweetAlert';

export function* authLogOutSaga(action) {
    
    yield call([localStorage, 'removeItem'], 'token');
    yield call([localStorage, 'removeItem'], 'expirationTime');
    yield call([localStorage, 'removeItem'], 'userId');
    yield call([localStorage, 'removeItem'], 'firstName');
    yield call([localStorage, 'removeItem'], 'lastName');
    yield call([localStorage, 'removeItem'], 'email');
    yield put({
        type: actionTypes.AUTH_LOGOUT
    });
    sweetAlert({
        icon: 'info',
        title: 'Logged Out',
        showConfirmButton: false,
        timer: 1500,
       })
}

export function* authSessLogOutSaga(action) {
    yield delay(action.expirationTime * 1000);
    yield put(actions.authLogOut());
}

export function* authSaga(action) {
    
    yield put (actions.authStart());
    const authData = {
            email: action.email,
            password: action.password,
            returnSecureToken: true,
        } 
        let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBfZjDWFu8P_4Kb2CiUppaoSzCVfTAeN2o';
  
        if (!action.isSignup) {
            url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBfZjDWFu8P_4Kb2CiUppaoSzCVfTAeN2o';
        }
      
    try {
        const response = yield Axios.post(url, authData);
          yield sweetAlert({
            icon: 'success',
            title: 'Login Successful',
            showConfirmButton: false,
            timer: 1750
          
          });
       
        if (response && action.isSignup) {
            try { yield Axios.post('https://dave-s-burger-builder.firebaseio.com/customers.json?auth=' + response.data.idToken, { ...action.customer, userId:response.data.localId }) }
            catch (error) {
                yield put(actions.authFail(error));
                yield sweetAlert({
                    icon: 'error',
                    title: 'Oops...',
                    text: error.response.data.error.message,
                  
                   })
            };

        }
        let customerData;
        if (response) {
            try { 
                const fetchRes = yield Axios.get('https://dave-s-burger-builder.firebaseio.com/customers.json?auth=' + response.data.idToken + '&orderBy="userId"&equalTo="' + response.data.localId + '"');
                yield console.log(fetchRes)
                
                for (let key in fetchRes.data) {
                   customerData ={ ...fetchRes.data[key] }
                };
                yield put(actions.authSuccess(response.data.idToken, response.data.localId));
            }
            catch (error) {
                yield console.log(error)
            }
        }
       // alert(msg);
        const expirationDate = new Date(Date.now() + response.data.expiresIn * 1000);
        
        localStorage.setItem('token', response.data.idToken);
        localStorage.setItem('expirationTime', expirationDate);
        localStorage.setItem('userId', response.data.localId);
        localStorage.setItem('firstName', customerData.firstName);
        localStorage.setItem('lastName', customerData.lastName);
        localStorage.setItem('email', customerData.email);

        //console.log(response);
   
        yield put(actions.authSessLogOut(response.data.expiresIn))
    }
    catch(error){
           yield console.log(error.response.data.error.message);
        yield put(actions.authFail(error));
       yield sweetAlert({
            icon: 'error',
            title: 'Oops...',
            text: error.response.data.error.message,
          
           });

        }
        }

export function* checkAuthStatusSaga(action) {

    const token = localStorage.getItem('token');
    const expirationTime = new Date(localStorage.getItem('expirationTime')).getTime();
    const authTimeLeft = (new Date(localStorage.getItem('expirationTime')).getTime() - Date.now())/1000
    if (token && Date.now() < expirationTime) {
            yield put(actions.authSuccess(token, localStorage.getItem('userId')));
            yield put(actions.authSessLogOut(authTimeLeft))
                }
    else  yield put(actions.authLogOut())
            
        }
        