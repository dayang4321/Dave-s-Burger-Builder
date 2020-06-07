import React, { Component } from 'react';
import Aux from '../Auxiliary'
import classes from './Layout.module.css'
import Toolbar from '../../components/Navigation/Toolbar/Toolbar'
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer'
import { connect } from 'react-redux';



class Layout extends Component {

    state = {
        sideDrawerShowing : false
    }

    closeSideDrawerHandler = () => this.setState({ sideDrawerShowing: false })
    toggleSideDrawerHandler = () => this.setState((prevState) => {
        return { sideDrawerShowing: !prevState.sideDrawerShowing }
    })
    render() {
        return (
            <Aux>
                <Toolbar isAuth={this.props.isAuth} menuClick={this.toggleSideDrawerHandler}/> 
                <SideDrawer isAuth={this.props.isAuth} showSD={this.state.sideDrawerShowing} sdCloser={this.closeSideDrawerHandler}/>
            <main className={classes.Content}>
            {this.props.children}
            </main>
            </Aux>

        )
    }

}

const mapStateToProps = state=> {
    return {
        isAuth: state.auth.token!==null
    }
}
 


export default connect(mapStateToProps) (Layout)