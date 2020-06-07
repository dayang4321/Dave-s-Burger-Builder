import React from 'react';
import classes from './Burger.module.css'
import BurgerIngredient from './BurgerIngredient/BurgerIngredient'
//import {Grow} from '@material-ui/core'

const burger = (props) => {

    let ingredientArr = Object.keys(props.ingredients)
        .map(ingName => {
            return [...Array(props.ingredients[ingName])]
                .map((_, i) => { return <BurgerIngredient key={ingName + i} type={ingName} /> })
        }).reduce((arr, el) => {
            return arr.concat(el)
        });
    
  if ( ingredientArr.length === 0)  {ingredientArr = <p style={{ color: '#222'}}>Use the controls to fill me up!</p> }
    //console.log(ingredientArr);
    return (
        <div className={classes.Burger}>
            <BurgerIngredient type="bread-top" />
            {ingredientArr}
            <BurgerIngredient type="bread-bottom"/>
        </div>
    )
}

export default burger