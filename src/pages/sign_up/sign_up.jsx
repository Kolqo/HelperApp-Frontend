import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./sign_up.module.css";
import { Link } from "react-router-dom";
import Input from "../../components/input/input";
import Button from "../../components/button/button";
import Select from "../../components/select/select";
import SelectSVG from "../../assets/selectSVG/selectSVG";
import ShowIconSVG from "../../assets/showiconSVG/showicon";
import NonShowIconSVG from "../../assets/nonshowiconSVG/nonshowiconSVG";

export default function sign_up() {
  const [selected, setSelected] = useState("Who are you?");
  const [ifShow, seyIfShow] = useState(false);

  const [fullName, setfullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState(null);
  const [errorFullName, setErrorFullName] = useState(null);
  const [errorEmail, setErrorEmail] = useState(null);
  const [errorPassword, setErrorPassword] = useState(null);
  const [errorRole, setErrorRole] = useState(null);

  const options = ["One who gives help", "Someone who needs help"];

  useEffect(() => {
    handleError2();
  }, [error]);

  function handleError() {
    setError(null);
    setErrorFullName(null);
    setErrorEmail(null);
    setErrorPassword(null);
    setErrorRole(null);
  }

  function handleSendData() {
    let role =
      selected == "One who gives help"
        ? "ROLE_USER_HELPER"
        : selected == "Someone who needs help"
        ? "ROLE_USER_RECEIVER"
        : null;

    let data = JSON.stringify({
      fullName: fullName,
      email: email,
      password: password,
      role: role,
    });

    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: "/api/v1/accounts/register",
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios
      .request(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
        window.location.href = "/";
      })
      .catch((error) => {
        setError(error.response.data.detail);
      });
  }

  function handleError2() {
    if (error) {
      setErrorPassword(error.includes("password") ? error : null);
      setErrorEmail(error.includes("email") ? error : null);
      setErrorFullName(error.includes("fullName") ? error : null);
      setErrorRole(error.includes("role") ? error : null);
    }
  }

  return (
    <>
      <div className={styles.container}>
        <div className={styles.loginBox}>
          <h1>Sign Up</h1>
          <Select
            className={styles.selectTypeOfAccount}
            selected={selected}
            setSelected={setSelected}
            error={handleError}
            listOptions={options}
            children={<SelectSVG />}
            showError={<div className={styles.errorBox}>{errorRole}</div>}
          />
          <Input
            className={styles.inputEmail}
            placeholder="Full Name"
            type="text"
            error={handleError}
            setData={(e) => setfullName(e.target.value)}
            showError={<div className={styles.errorBox}>{errorFullName}</div>}
          ></Input>
          <Input
            className={styles.inputEmail}
            placeholder="Email"
            type="text"
            error={handleError}
            setData={(e) => setEmail(e.target.value)}
            showError={<div className={styles.errorBox}>{errorEmail}</div>}
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
          <Button className={styles.buttonSignIn} onClick={handleSendData}>
            Sign up
          </Button>
          <p>
            Already have an Account?{" "}
            <Link className={styles.link} to="/main_page">
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}
