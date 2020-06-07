import React from 'react'
import classes from './SDToggler.module.css'

const sdToggler = (props) => (
    <div className={classes.DrawerToggle} onClick={props.menuClick}>
        <div></div>
        <div></div>
        <div></div>
    </div>
)


export default sdToggler