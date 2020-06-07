import * as actionTypes from './actionTypes';


export const authStart = () => {
    return {
        type: actionTypes.AUTH_START,
    }
}
export const authSuccess = (token, userId, customerData) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        authData: {
            idToken: token,
            localId: userId
        },
      
    }
}

export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    };
};
export const authLogOut = () => {
  
    return {
        type: actionTypes.INIT_AUTH_LOGOUT
    };
}

export const authSessLogOut = (expirationTime) => {
    return {
        type: actionTypes.INIT_AUTH_SESS_LOGOUT,
        expirationTime: expirationTime,
    };
}

export const auth = (email, password, isSignup, customerInfo) => {
    return {
        type: actionTypes.INIT_AUTH,
        email: email,
        password: password,
        isSignup: isSignup,
        customer: customerInfo
    }
}
export const checkAuthStatus = () => {
    return {
        type: actionTypes.INIT_CHECK_AUTH_STATUS
        
    }
}

export const authClearError = () => {
    return {
        type: actionTypes.AUTH_RESET_ERROR
    }
} 

