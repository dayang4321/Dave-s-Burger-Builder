import { put } from 'redux-saga/effects';
import * as actions from '../actions/index';
import axios from 'axios';

export function* setIngredientsSaga(action) {
    
    try {
        const response = yield axios.get('https://dave-s-burger-builder.firebaseio.com/ingredients.json')
        yield put(actions.loadIngredients(response.data))
    }
    catch (error) { yield put(actions.burgerLoadError()) }        
    };