import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import RegistrationForm from '../SignUp/signUp';
import Questionary from '../Questionary/Questionary';
import './SignUpPage.css'

function SignUpPage() {
  // onClick = this.onClick;
  return (
    <Router>
      <div>
        <ul className = 'signUpMenu'>
          <li>
            <Link to="/signup">SignUp</Link>
          </li>
          <li>
            <Link to="/question">Question</Link>
          </li>
        </ul>

        <hr />

        <Route path="/signup" component={SignUp} />
        {/* <Route path="/question" component={Question} /> */}
        <Route path="/question" component={() => {
          return (
            <div>
              {/* <Questionary onClick = {onClick}></Questionary> */}
              <Questionary></Questionary>
            </div>
          );
        }} />
      </div>
    </Router>
  );
}

function SignUp() {
  return (
    <div>
      <RegistrationForm></RegistrationForm>
    </div>
  );
}

// function Question(props) {
//   return (
//     <div>
//       <Questionary onClick = {props.onClick}></Questionary>
//     </div>
//   );
// }


export default SignUpPage;