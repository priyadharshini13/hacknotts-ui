
import React, { Component } from 'react';
import './Login.css';
import HomePage from './HomePage';



class Login extends Component {

    constructor() {

        super();
        this.state = {
            email: '',
            password: '',
            redirect: '',
            error_message: ''
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        // if (authenticationService.currentUserValue) { 
        //     this.props.history.push('/');
        // }

    }

    handleChange(e) {
        let target = e.target;// input
        let value = target.type === 'checkbox' ? target.checked : target.value; //value of the input
        let name = target.name; //name attribute of the input

        this.setState({
            [name]: value
        });
    }

    componentDidMount() {
        console.log('COMPONENT HAS MOUNTED');
    }


    async handleSubmit(e) {
        e.preventDefault();
        console.log('handleSubmit: The form is submitted with following data:');
        console.log(this.state);
        sessionStorage.setItem('email', this.state.email);
        sessionStorage.setItem('password', this.state.password);
        this.setState({ redirect: true });

        // try {

        //     let response = await fetch("http://localhost:3030/api/login",
        //         {
        //             headers: { 'Content-Type': 'application/json' },
        //             method: 'POST',
        //             mode: 'cors',
        //             body: JSON.stringify(this.state)
        //         }
        //     )
        //     let responseJson = await response.json();
        //     if (responseJson.auth) {
        //         let user_id = responseJson.user_id;
        //         let user_name = responseJson.user;
        //         let jwt_token = responseJson.token;
        //         sessionStorage.setItem('user_id', user_id);
        //         sessionStorage.setItem('user_name', user_name);
        //         sessionStorage.setItem('jwt_token', jwt_token);
        //         this.setState({ redirect: true });
        //         console.log('responseJson: ', responseJson);
        //         console.log('mess ', responseJson.message);
        //         this.setState({ error_message: responseJson.message })
        //         return responseJson;
        //     }
        //     else {
        //         sessionStorage.removeItem('jwt_token');
        //         sessionStorage.removeItem('user_id');
        //         sessionStorage.removeItem('user_name');
        //         // location.reload(true);
        //         console.log('responseJson: ', responseJson);
        //         console.log('mess ', responseJson.message);
        //         this.setState({ error_message: responseJson.message })
        //         return responseJson;
        //     }


        // } catch (error) {
        //     console.error(error);
        // }
    }


    render() {
        if(this.state.redirect){
            return (<div><HomePage></HomePage></div>)
        }
      else{
            return (
                <div className="Login"> 
                    {/* <h3 className="title">Login</h3> */}
                    <div>
                        <form className="FormFields" onSubmit={this.handleSubmit}>

                            <div className="FormField">

                                <label className="Form_label" htmlFor="name">Email Id</label>
                                <input type="text" id="email" className="FormField_input"
                                    placeholder="Enter the emailId" name="email" value={this.state.email} onChange={this.handleChange}></input>
                                <div className="FormField">
                                    <label className="Form_label" htmlFor="name">Password</label>
                                    <input type="text" id="password" className="FormField_input"
                                        placeholder="Enter the password" name="password" value={this.state.password} onChange={this.handleChange}></input>

                                </div>
                                <div><span className="error-msg">{this.state.error_message}</span></div>
                                <div>
                                    <button className="button">Login</button>
                                    {/* <Link to="/login">New member? Sign Up</Link> */}
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            );
        }
    }
    
}

export default Login;