import React from 'react';
import classes from './Toolbar.module.css'
import Logo from '../../Logo/Logo'
import NavigationItems from '../NavigationItems/NavigationItems'
import SDToggler from './SDToggler/SDToggler'
import { Link } from 'react-router-dom'




const Toolbar = (props) => {


    return    ( <header className={classes.Toolbar}>
        <SDToggler menuClick={props.menuClick}/>
        <div className={classes.Logo}>
            <Link to='/'> <Logo /></Link>
        </div>
      
        
        <nav className={classes.DesktopOnly}>
        <NavigationItems isAuth={props.isAuth} />
        </nav>
    </header>
);
} 


export default Toolbar