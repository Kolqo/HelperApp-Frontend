import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./sign_in.module.css";
import { Link } from "react-router-dom";
import Input from "../../components/input/input";
import Button from "../../components/button/button";
import ShowIconSVG from "../../assets/showiconSVG/showicon";
import NonShowIconSVG from "../../assets/nonshowiconSVG/nonshowiconSVG";

export default function sign_in() {
  const [ifShow, seyIfShow] = useState(false);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const [errorUsername, setErrorUsername] = useState(null);
  const [errorPassword, setErrorPassword] = useState(null);

  useEffect(() => {
    handleError2();
  }, [error])
  
  function handleError() {
    setError(null);
    setErrorPassword(null);
    setErrorUsername(null);
  }

  function handleSendData() {
    let data = JSON.stringify({
      email: email,
      password: password,
    });

    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: "/api/v1/authentication/login",
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios
      .request(config)
      .then((response) => {
        const token = response.data.token
        localStorage.setItem('jwt', token)
        window.location.href = "/main_page";
      })
      .catch((error) => {
        setError(error.response.data.detail);
      });
  }

  function handleError2(){
    if (error) {
      setErrorPassword(error.toLowerCase().includes("password") ? error : null);
      setErrorUsername(!error.toLowerCase().includes("password") ? error : null);
    }
  }


  return (
    <>
      <div className={styles.container}>
        <div className={styles.loginBox}>
          <h1>Sign In</h1>
          <Input
            className={styles.inputEmail}
            placeholder="Email"
            error={handleError}
            setData={(e) => setEmail(e.target.value)}
            type="text"
            showError={<div className={styles.errorBox}>{errorUsername}</div>}
          ></Input>
          <Input
            className={styles.inputPassword}
            iconclassName={styles.iconshow}
            placeholder="Password"
            type={ifShow ? "text" : "password"}
            click={ifShow}
            error={handleError}
            setData={(e) => setPassword(e.target.value)}
            setClick={seyIfShow}
            showIcon={<ShowIconSVG />}
            nonShowIcon={<NonShowIconSVG />}
            showError={<div className={styles.errorBox}>{errorPassword}</div>}
          ></Input>
          <Button  className={styles.buttonSignIn} onClick={handleSendData} >Sign In</Button>
          <p>
            Don't have an Account?{" "}
            <Link className={styles.link} to="/sign_up">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}
