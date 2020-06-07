import React from 'react';
import Logo from '../../Logo/Logo'
import NavigationItems from '../NavigationItems/NavigationItems'
import classes from './SideDrawer.module.css'
import Backdrop from '../../UI/Backdrop/Backdrop'
import Aux from '../../../hoc/Auxiliary'

const sideDrawer = (props) => {

    let sdAttachedClasses = [classes.SideDrawer, classes.Close];
    if (props.showSD) { sdAttachedClasses = [classes.SideDrawer, classes.Open] };

    return (
        <Aux>
            <Backdrop showing={props.showSD} clicked={props.sdCloser}/>
            
            <div className={sdAttachedClasses.join(' ')}>
                {/* Logo styler */}
            <div className={classes.Logo}> 
            <Logo />
            </div>
            <nav onClick={props.sdCloser}>
            <NavigationItems isAuth={props.isAuth} />
        </nav>
    </div></Aux>
        
    )
}


export default sideDrawer;