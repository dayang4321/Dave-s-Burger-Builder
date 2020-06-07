import React, {Component} from 'react';
import classes from './BurgerIngredient.module.css';
import PropTypes from 'prop-types';
import {Grow} from '@material-ui/core'
class BurgerIngredient extends Component {
    state = { show: false }
    componentDidMount() {
        this.setState({show:true})
    }
    
    render() {
        let ingredient = null;



        switch (this.props.type) {
            case ('bread-bottom'): ingredient = <Grow in={this.state.show}><div className={classes.BreadBottom}></div></Grow>;
                break;
            case ('bread-top'):
                ingredient = (<Grow in={this.state.show}><div className={classes.BreadTop}>
                    <div className={classes.Seeds1}></div>
                    <div className={classes.Seeds2}></div>
                </div></Grow>);
                break;
            case ('meat'): ingredient = <Grow in={this.state.show}><div className={classes.Meat}></div></Grow>;
                break;
            case ('cheese'): ingredient = <Grow in={this.state.show}><div className={classes.Cheese}></div></Grow>;
                break;
            case ('bacon'): ingredient = <Grow in={this.state.show}><div className={classes.Bacon}></div></Grow>;
                break;
            case ('salad'): ingredient =  <Grow in={this.state.show}><div className={classes.Salad}></div></Grow>;
                break;
            default: ingredient = null;
            
        }
    
        return ingredient;
        
    }
}

BurgerIngredient.propTypes = {
    type: PropTypes.string.isRequired
}

export default BurgerIngredient