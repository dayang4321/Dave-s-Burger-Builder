import React from 'react';
import classes from './BuildControl.module.css'

const buildControl = (props) => (
    <div className={classes.BuildControl}>
        
        <button className={classes.Less} onClick={props.removed} disabled={(props.error||props.disabled)? true: props.disabledLess}>Less</button>
        <div className={classes.Label}>{props.label}</div>   
         <button className={classes.More} onClick={props.added}
          disabled={(props.error||props.disabled) ? true: props.disabledMore}
        >More</button>

    </div>
)

export default buildControl