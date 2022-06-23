import React, { Component } from "react";
import Cookies from "js-cookie";
import jwt_decode from "jwt-decode";
import { Navigate } from "react-router-dom";
import { createBrowserHistory } from 'history'
import {useContext} from 'react'
import GraphsContext from "../../../context";
import "./index.css"
const  LoginForm = () =>  {

  const [username, setUsername] = React.useState("")
  const [password, setPassword] = React.useState("")
  const [ showSubmitError, setShowSubmitError] = React.useState(false)
  const [errorMsg, setErrorMsg] = React.useState("")

  const {ChangeUserName} = useContext(GraphsContext)


  

  const onChangeUsername = (event) => {
    setUsername(event.target.value );
  };

  const onChangePassword = (event) => {
    setPassword( event.target.value );
  };

  const onSubmitSuccess = (jwtToken) => {
    const decodedToken = jwt_decode(jwtToken);

    ChangeUserName(decodedToken.user_name)
    const history = createBrowserHistory();
    Cookies.set("jwt_token", jwtToken, {
      expires: 30,
      path: "/",
    });
    history.replace('/')
    history.go(0)
  };

  const onSubmitFailure = (errorMsg) => {
    setShowSubmitError(true, errorMsg );
    setErrorMsg(errorMsg)
  };

  const submitForm = async (event) => {
    event.preventDefault();
    const userDetails ={"username": username, "password": password};
    const url = "http://127.0.0.1:8000/effigo/api/dashboard/login/";
    const options = {
      method: "POST",
      headers: {
        "accept": "application/json",
      "Content-Type": "application/json"},
      body: JSON.stringify(userDetails)
    }
    const response = await fetch(url, options);
    const data = await response.json();
    if (response.ok === true) {
        if(data.access_token == undefined){
            onSubmitFailure(data.error_msg)
        }else{
            onSubmitSuccess(data.access_token)  
        }
    //   this.onSubmitSuccess(data.access_token);
    } else {
      onSubmitFailure(data.error_msg);
  }
  };

  const renderPasswordField = () => {
   
    return (
      <>
        {/* <label className="input-label" htmlFor="password">
          PASSWORD
        </label> */}
        <input
          type="password"
          id="password"
          className="password-input-field"
          value={password}
          onChange={onChangePassword}
          placeholder="Password"
        />
      </>
    );
  };

  const renderUsernameField = () => {
    
    return (
      <>
        {/* <label className="input-label" htmlFor="username">
          USERNAME
        </label> */}
        <input
          type="text"
          id="username"
          className="username-input-field"
          value={username}
          onChange={onChangeUsername}
          placeholder="Username"
        />
      </>
    );
  };



  

    const jwtToken = Cookies.get("jwt_token");

    if (jwtToken !== undefined) {
      return <Navigate to="/"/>;
    }
    return (
      <div className="login-form-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-logo-img.png"
          className="login-website-logo-mobile-image"
          alt="website logo"
        />
        <img
          src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-login-img.png" 
          className="login-image"
          alt="website login"
        />
        <form className="form-container" onSubmit={submitForm}>
          {/* <img
            src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-logo-img.png"
            
            alt="website logo"
          /> */}
          <img src="https://res.cloudinary.com/dptwgnj8t/image/upload/v1655205998/effigo-logo_zinm5a.jpg" alt='comapny-logo' className="login-website-logo-desktop-image" />
          <div className="input-container">{renderUsernameField()}</div>
          <div className="input-container">{renderPasswordField()}</div>
          <button type="submit"  className="login-button" >
            Login
          </button>
          {showSubmitError && <p className="error-message">* Invalid Username and Password</p>}
        </form>
      </div>
    );
  }


export default   LoginForm;