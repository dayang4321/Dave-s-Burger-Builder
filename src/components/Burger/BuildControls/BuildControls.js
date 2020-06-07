import React from 'react';
import classes from './BuildControls.module.css'
import BuildControl from './BuildControl/BuildControl'


const controls = [
    { label: 'Salad', type: 'salad' },
    { label: 'Bacon', type: 'bacon' },
    { label: 'Cheese', type: 'cheese' },
    { label: 'Meat', type: 'meat' },
];



const buildControls = (props) => {

    let orderButton = (<button className={classes.OrderButton}
        disabled={!props.purchasable}
        onClick={props.ordered}
    > ORDER NOW! </button>);

    if (!props.isAuth) {
        orderButton = (<button className={classes.OrderButton}
            disabled={!props.purchasable}
        onClick={props.ordered}
        > LOGIN TO CONTINUE </button>);
        };

    
    return (
    <div className={classes.BuildControls}>
        <p>This burger is just <b>₦{props.price.toFixed(2)}!!</b></p>
        {controls.map(ctrl => (
            <BuildControl
                key={ctrl.label}
                disabled={props.disabled}
                label={ctrl.label}
                added={() => props.ingredientAdded(ctrl.type)}
                removed={() => props.ingredientRemoved(ctrl.type)}
                error={props.error}
                disabledLess={props.disabledLess[ctrl.type]}
                disabledMore={props.disabledMore[ctrl.type]}
            />))}
       {orderButton}
      
    </div>
)}


export default buildControls