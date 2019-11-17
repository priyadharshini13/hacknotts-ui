import React, { Component } from 'react';
import PaymentForm from './PaymentForm';
// import SideNav from './SideNav.js';


class Landing extends Component {
  
    render() {
        return (
            <div>
                {/* <SideNav></SideNav>s */}
                <h1>Payment</h1>
                <PaymentForm></PaymentForm>
            </div>
        );
    }
}
export default Landing;
