import * as actionTypes from './actionTypes';


export const addIngredient = (ingName) => {
    return {
        type: actionTypes.ADD_INGREDIENT,
        ingredientName: ingName,
    }
}

export const removeIngredient = (ingName) => {
    return {
        type: actionTypes.REMOVE_INGREDIENT,
        ingredientName: ingName,
    }
}

export const loadIngredients = (ingredients) => {
    return {
        type: actionTypes.LOAD_INGREDIENTS,
        ingredients: ingredients
    }
};

export const burgerLoadError = () => {
    return {
        type: actionTypes.LOAD_INGREDIENTS_ERROR,
    }
}

export const setIngredients = () => {
    return {
        type: actionTypes.INIT_SET_INGREDIENTS,
        }
};
