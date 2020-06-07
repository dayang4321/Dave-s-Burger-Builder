import * as actionTypes from '../actions/actionTypes' 

const initialState = {
    ingredients: null,
    totalPrice: 150,
    error: false,
    building: false,
};

const INGREDIENT_PRICES = {
    salad: 50,
    cheese: 50,
    meat: 300,
    bacon: 150,
};

const reducer = (state = initialState, action) => {

    switch (action.type) {
        case actionTypes.LOAD_INGREDIENTS:
            return {
                ...state,
                ingredients: {
                    salad: action.ingredients.salad,
                    bacon: action.ingredients.bacon,
                    cheese: action.ingredients.cheese,
                    meat: action.ingredients.meat,
                },
                error: false,
                totalPrice: 150,
                building: false
            
            }
        case actionTypes.LOAD_INGREDIENTS_ERROR:
            return {
                ...state,
                error: true
            }
        
        case actionTypes.ADD_INGREDIENT:
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingredientName]: state.ingredients[action.ingredientName] + 1 
                },
                totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName],
                building: true,
         
            }
        case actionTypes.REMOVE_INGREDIENT:
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingredientName]: state.ingredients[action.ingredientName] - 1
                },
                totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientName],
                building: true,
            };
        
        default: return state
    }

    
}


export default reducer