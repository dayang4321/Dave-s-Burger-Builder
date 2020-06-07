import React from 'react'
import classes from './NavigationItems.module.css'
import NavigationItem from './NavigationItem/NavigationItem'
import { HomeRounded, RestaurantRounded, ExitToAppRounded, LockRounded } from '@material-ui/icons';






const navigationItems = (props) => (
    <ul className={classes.NavigationItems}>
    
       
            <NavigationItem link="/" ><div className={classes.svgDiv}>
                <HomeRounded fontSize="inherit" /></div><span>Burger Builder</span></NavigationItem> 
        {props.isAuth ? <NavigationItem link="/orders">
            <div className={classes.svgDiv}><RestaurantRounded fontSize="inherit" />
            </div><span>Orders</span></NavigationItem> : null}
        {props.isAuth ? <NavigationItem link="/logout">
            <div className={classes.svgDiv}><ExitToAppRounded fontSize="inherit" /></div><span>Logout</span></NavigationItem> : <NavigationItem link="/auth"><div  className={classes.svgDiv}><LockRounded fontSize="inherit" /></div><span>Login/Signup</span></NavigationItem>}
     
    </ul>

);

export default navigationItems