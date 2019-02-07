import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Redirect, Link } from "react-router-dom";
import 'antd/dist/antd.css';
import RegistrationForm from '../SignUp/signUp';
import { Button } from 'antd';
import SignUpPage from '../SignUpPage/SignUpPage';
import { withRouter } from 'react-router-dom'
import './Welcome.css'

const SignUpBtn = withRouter(({ history }) => (
    <div className = 'signUp-btn'>
        <Button 
            type='button'
            onClick={() => {
                console.log(history)
                history.push('/signup')
            }
            }
        >
            New? Click Me To Sign Up!
    </Button>
        <Route path="/signup" component={SignUpPage} />
    </div>
))

class Welcome extends React.Component {
    constructor(props) {
        super(props);
        this.state = { disabled: false };
    }
    // handleClick = () => {
    //     this.setState({
    //         disabled: true
    //     })
    // }
    render() {
        const { match, location, history } = this.props;
        return (
            <Router>
                <div className = 'welcomeContainer'>
                    <h1 className = 'welcomeTitle'>Welcome to the resturant recommender!</h1>
                    <div className = 'btn-container'>
                    <SignUpBtn disabled={this.state.disabled3}>Sign Up
                </SignUpBtn>
                    <Button disabled={this.state.disabled}>Got account? Sign In Here</Button>
                    </div>
                    {/* <Route path="/signup" component={SignUpPage} /> */}
                </div>
            </Router>
        )

    };
}
export default Welcome;
