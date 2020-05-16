import React, { Component } from "react";
import Auxilary from "../Auxilary/Auxilary";
import Modal from "../../component/UI/Modal/Modal";

const withErrorHandler = (WrappedComponent, axios) => {
  return class extends Component {
    
    constructor(props) {
      super(props)
    
      this.state = {
        error: null,
      }
    }
    
    componentWillMount() {
    this.reqInterceptor =  axios.interceptors.request.use((request) => {
        this.setState({ error: null });
        return request;
      });

    this.respInterceptor =  axios.interceptors.response.use(
        (response) => {
          return response;
        },
        (error) => {
          this.setState({ error: error });
        }
      );
    }

    errorConfirmedHandler = () => {
      this.setState({ error: null });

    };
    componentWillUnmount(){
      axios.interceptors.request.eject(this.reqInterceptor)
      axios.interceptors.response.eject(this.respInterceptor)
    }
    render() {
      return (
        <Auxilary>
          <Modal
            show={this.state.error}
            modalClosed={this.errorConfirmedHandler}
          >
            {this.state.error ? this.state.error.message : null}
          </Modal>
          <WrappedComponent {...this.props} />
        </Auxilary>
      );
    }
  };
};

export default withErrorHandler;
