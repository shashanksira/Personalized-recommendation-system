import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './Home.css';
import RestuantBlock from '../../component/resturantBlock/resturantBlock';
import Questionary from '../Questionary/Questionary';
import { Row, Col, Slider } from 'antd';
import Recommend from '../Recom/Recom';
import WrappedSignUp from '../SignUp/signUp';
import Input from '../../component/input/Input'
import RegistrationForm from '../SignUp/signUp'
import SignUpPage from '../SignUpPage/SignUpPage'
import { BrowserRouter as Router, Route, Redirect, Link } from "react-router-dom";
import Welcome from '../Welcome/Welcome'
import Search from '../Search/Search'


function Register(props) {
    return (
        <div>
            <Welcome onClick = {this.props.handleFinishRegister()}/>
        </div>
    )
}
// function Search() {
//     return (
//         <div>
//            hi
//         </div>
//     )
// }
class Home extends Component {
    
handleFinishRegister = () => {
    this.props.history.push('/recom');
}
    render() {
        return (
            <Router>

                <div>
                    <ul className = 'ulMenu'>
                        <li className = 'listMenu'>
                            <Link className = 'link-menu' to="/regis">Register</Link>
                        </li>
                        <li className = 'listMenu'>
                            <Link className = 'link-menu' to="/recom">Recommend</Link>
                        </li>
                        <li className = 'listMenu'>
                            <Link className = 'link-menu' to="/search">Search</Link>
                        </li>
                    </ul>
                <Route className = 'contanier-home' path = '/regis' component = {Welcome} /> 
            <Route className = 'contanier-home' path = '/Recom' component = {Recommend} /> 
                <Route className = 'contanier-home' path = '/search' component = {Search} /> 
                </div>
            </Router>
        )
    }
}
export default Home;
