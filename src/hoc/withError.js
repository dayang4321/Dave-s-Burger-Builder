import React, { Component } from 'react';
import Modal from '../components/UI/Modal/Modal';
import Aux from './Auxiliary';




const withError = (WrappedComponent, axios) => {
    return class extends Component {

        state = { error: null }
        
        UNSAFE_componentWillMount() {
           
           this.reqInterceptor = axios.interceptors.request.use(req => {
                this.setState({ error: null });
                return req
            })

           this.resInterceptor = axios.interceptors.response.use(res => res, err => { this.setState({ error: err }) })
        };
        componentWillUnmount() {
            //console.log('WillUnmount', this.reqInterceptor, this.resInterceptor)
            axios.interceptors.request.eject(this.reqInterceptor);
            axios.interceptors.response.eject(this.resInterceptor)
        }
        errorClearHandler = () => this.setState({ error: null });

        render() {
            return (
                <Aux>
                    <Modal showing={this.state.error} modalCloser={this.errorClearHandler}>{this.state.error? this.state.error.message  : null}</Modal>
                    <WrappedComponent {...this.props} />
                </Aux>
            )
        }
       
    
    }
}



export default withError