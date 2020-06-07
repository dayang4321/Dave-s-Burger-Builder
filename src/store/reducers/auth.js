import * as actionTypes from '../actions/actionTypes';

const initialState = {
    token: null,
    userId: null,
    authError: null,
    authLoading: false, 
    authComplete: false,
   
}


const reducer = (state = initialState, action) => {

        switch (action.type) {
            case actionTypes.AUTH_START: 
                return {
                    ...state,
                    authLoading: true,
                    authError: null,
                    token: null,
                    userId: null,
                    authComplete: false,
                  
                }
            case actionTypes.AUTH_SUCCESS: 
                return {
                    ...state,
                    authLoading: false,
                    authError: null,
                    token: action.authData.idToken,
                    userId: action.authData.localId,
                    authComplete: true,
                    }
            case actionTypes.AUTH_FAIL:
                return {
                    ...state,
                    authLoading: false,
                    authComplete: false,
                    authError: action.error.response,
                }     
            case actionTypes.AUTH_RESET_ERROR:
                return {
                    ...state,
                    authError: null
                }
                case actionTypes.AUTH_LOGOUT:
                    return {
                        ...state,
                        token: null,
                        userId: null,
                        authLoading: false,
                        authError: null,
                        authComplete: false,                       
                    }    
            default: return state
        }
  
}


export default reducer;

