import React from 'react';
import Cards from 'react-credit-cards';
import 'react-credit-cards/es/styles-compiled.css';
import Success from './Success';
import { BrowserRouter as Router, Route } from 'react-router-dom';

export class PaymentForm extends React.Component {
    constructor() {
        super();
        this.state = {
            cvc: '',
            expiry: '',
            focus: '',
            name: '',
            number: '',
            // amount: 300,
            email: sessionStorage.getItem('email'),
            redirect:''
        };
        this.handleInputFocus = this.handleInputFocus.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        // const [visible, setVisible] = useState(true);

        // const onDismiss = () => setVisible(false);

    }

    handleInputFocus = (e) => {
        this.setState({ focus: e.target.name });
    }

    handleInputChange = (e) => {
        const { name, value } = e.target;

        this.setState({ [name]: value });
    }
    async handleSubmit(e) {
        e.preventDefault();
        console.log('handleSubmit: The form is submitted with following data:');
        console.log(this.state);

        try {

            let response = await fetch("http://localhost:8000/api/card-details",
                {
                    headers: { 'Content-Type': 'application/json' },
                    method: 'POST',
                    mode: 'cors',
                    body: JSON.stringify(this.state)
                }
            )
            let responseJson = await response.json();
            console.log('responsejson :', responseJson);
            if (responseJson.code == '201') {
                console.log('res: ', responseJson.message);
                // alert()
                // this.setState({ visible: true });
                var res = window.confirm('Your credit score might decrease if you go with this transaction..! Would you still like to purchase?')
                if (res){
                    this.setState({redirect:true}) ;
                    // this.props.history.push('/import');
                        this.props.history.push('/success');
                    // (<div></div><Success></Success>)
                }
            }
            else {
                // return(<Success></Success>)
                this.setState({redirect:true});
                this.props.history.push('/success');

            }
            console.log('responseJson: ', responseJson)
        } catch (error) {
            console.error(error);
        }
        // try {

        //     let response = await fetch("http://localhost:8000/api/card-details",
        //         {
        //             headers: { 'Content-Type': 'application/json' },
        //             method: 'POST',
        //             mode: 'cors',
        //             body: JSON.stringify(this.state)
        //         }
        //     )
        //     let responseJson = await response.json();
        //     console.log('responseJson: ', responseJson)
        // } catch (error) {
        //     console.error(error);
        // }

    }
    render() {
        if(this.state.redirect){
            return (
                <div className="success" >
                    <Route path='/success' component={Success}></Route>
                </div>
            )
        }
        else{
        return (
            <div id="PaymentForm">
                <h2>Proceed with payment</h2>
{/* 
                <Alert color="danger" isOpen={this.state.visible}>
                   {
                       this.state.errormsg
                   }
                 </Alert> */}
                {/* <h2 id="amount" className="amount" value={this.state.amount}>Subscription amount:{this.state.amount} GBP</h2> */}
                <Cards
                    cvc={this.state.cvc}
                    expiry={this.state.expiry}
                    focus={this.state.focus}
                    name={this.state.name}
                    number={this.state.number}
                />
                <form onSubmit={this.handleSubmit}>
                    <input
                        type="text"
                        name="number"
                        placeholder="Card Number"
                        value={this.state.number}
                        onChange={this.handleInputChange}
                        onFocus={this.handleInputFocus}
                    /><br></br>
                    <input
                        type="text"
                        name="name"
                        value={this.state.name}
                        placeholder="Name as in card"
                        onChange={this.handleInputChange}
                        onFocus={this.handleInputFocus}
                    /><br></br>
                    <input
                        type="text"
                        name="cvc"
                        value={this.state.cvc}
                        placeholder="CVV"
                        onChange={this.handleInputChange}
                        onFocus={this.handleInputFocus}
                    /><br></br>
                    <input
                        type="text"
                        name="expiry"
                        value={this.state.expiry}
                        placeholder="expiry"
                        onChange={this.handleInputChange}
                        onFocus={this.handleInputFocus}
                    />

                    <div>
                        <button className="button">Pay</button>
                        {/* <Link to="/login">New member? Sign Up</Link> */}
                    </div>
                </form>
            </div>
        );
    }
}
}
// Don't forget to import the react-credit-cards/lib/styles.scss if you are using SASS in your project.
// Or you can import the CSS:

// Features
export default () => (
    <div>
        <Router>
            <Route component={PaymentForm} />
        </Router>
    </div>
);