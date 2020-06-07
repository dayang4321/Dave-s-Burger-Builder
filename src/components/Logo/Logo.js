import React from 'react'
import classes from './Logo.module.css'
import burgerLogo from '../../assets/images/new-burger-logo.png'

const logo = (props) => (
    <div className={classes.Logo} >
        <img src={burgerLogo} alt = "Logo"/>
    </div>
)

export default logo