import React, { Component } from 'react';
import classes from './Modal.module.css'
import Aux from '../../../hoc/Auxiliary'
import Backdrop from '../Backdrop/Backdrop'

class Modal extends Component {

    shouldComponentUpdate(nextProps, nextState) {
        return nextProps.showing !== this.props.showing || nextProps.children !== this.props.children
    }


    render() {
        return (
            <Aux>
                <Backdrop showing={this.props.showing} clicked={this.props.modalCloser}></Backdrop>
                <div className={classes.Modal} style={{
                    transform: this.props.showing ? "translateY(0)" : "translateY(-100vh)",
                    opacity: this.props.showing ? "1" : "0",...this.props.style
                }}>
                    {this.props.children}
                </div>
            </Aux>
    
        )
    }
}

export default Modal;