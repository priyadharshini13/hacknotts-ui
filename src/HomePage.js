import React, { Component } from 'react';
import './Home.css';
import PaymentForm from './PaymentForm';

import { BrowserRouter as Router, Route } from 'react-router-dom';

class HomePage extends Component {
  constructor(){
      super()
      this.state={
          toggle:''
      }
    //   this.gotoPaymentPage = this.gotoPaymentPage.bind(this);

  }
  gotoPaymentPage= () => {
        //   return(<div><PaymentForm></PaymentForm></div>)
    this.setState({toggle:true}) ;
    // this.props.history.push('/import');
        this.props.history.push('/payment');
//   }}
}
    render() {
        if(this.state.toggle){
            return (
                <div className="payment" >
                    <Route path='/payment' component={PaymentForm}></Route>
                </div>
            )
        }
        else{
        return (
            <div className="home">
               <section >
                    <h1></h1>
               </section>
               <button className="continue-btn" onClick={this.gotoPaymentPage}>Continue</button>
            </div>
        );
    }
}
}
export default () => (
    <div>
        <Router>
            <Route component={HomePage} />
        </Router>
    </div>
);
