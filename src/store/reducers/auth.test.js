import reducer from './auth';
import * as actionTypes from '../actions/actionTypes'

describe('Auth Reducer', () => {
    it('should return the initial state', () => {
        expect(reducer(undefined,{})).toEqual({
            token: null,
            userId: null,
            authError: null,
            authLoading: false, 
            authComplete: false,   
        })
    })
    it('should store the token and user id upon successful authentication', () => {
        expect(reducer({
            token: 'a token',
            userId: 'a userId',
            authError: null,
            authLoading: false, 
            authComplete: true,
                
        },{ type: actionTypes.AUTH_SUCCESS,
            authData: {
                idToken: 'a token',
                localId: 'a userId'
            }})).toEqual({
            token: 'a token',
            userId: 'a userId',
            authError: null,
            authLoading: false, 
            authComplete: true,
        })
    })
    
})
