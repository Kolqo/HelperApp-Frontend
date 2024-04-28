import React, { useState, useEffect } from "react";
import axios from 'axios';
import styles from "./profile.module.css";
import SettingsBox from "../../../../components/settingsBox/settingsBox";
import AccountSVG from "../../../../assets/settingsBoxSVG/accountSVG/accountSVG";
import ExitSVG from "../../../../assets/settingsBoxSVG/exitSVG/exitSVG";
import AboutSVG from "../../../../assets/settingsBoxSVG/aboutSVG/aboutSVG";
import SupportSVG from "../../../../assets/settingsBoxSVG/supportSVG/supportSVG";
import TelegramSVG from "../../../../assets/settingsBoxSVG/telegramSVG/telegramSVG";
import GmailSVG from "../../../../assets/settingsBoxSVG/gmailSVG/gmailSVG";
import ButtomDrawer from "../../../../components/buttomDrawer/buttomDrawer";
import { Link } from "react-router-dom";

export default function profile() {
  const [topValue, setTopValue] = useState("0px");
  const [registered, setRegistered] = useState(false);

  useEffect(() => {
    fetchData();
  }, [])

  const handleClickShow = () => {
    setTopValue("-420px");
  };
  const handleClickHide = () => {
    setTopValue("0px");
  };

  const redirectToEmail = () => {
    window.location.href = "mailto:kolqo.life@gmail.com";
  };

  const redirectToTelegram = () => {
    window.location.href = "https://t.me/KolqoUK";
  };

  function fetchData() {
    let url = "/api/v1/validate/checkValidToken/" + window.localStorage.getItem("jwt");
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: url,
      headers: {
        Authorization: "Bearer " + window.localStorage.getItem("jwt"),
      },
    };

    axios
      .request(config)
      .then((response) => {
        setRegistered(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function logOut(){
    localStorage.removeItem('jwt');
    window.location.href = "/";
  }

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  return (
    <div className={styles.afga}>
      <div className={styles.container}>
        <div className={styles.textBox}>Profile</div>
        <div className={styles.listSettings}>

         {registered ? (
            <SettingsBox
            className={styles.settignsBox}
            iconBox={<AccountSVG />}
            textBox="Log Out"
            onClick = {logOut}
            elementBox={<ExitSVG />}>
            </SettingsBox>) 
          : (<Link to="/" className={styles.link}>
              <SettingsBox
              className={styles.settignsBox}
              iconBox={<AccountSVG />}
              textBox="Sign In">
              </SettingsBox>
            </Link>)}
          <Link to="/about" className={styles.link}>
            <SettingsBox
              className={styles.settignsBox}
              iconBox={<AboutSVG />}
              textBox="About">
              </SettingsBox>
          </Link>
          <SettingsBox
            className={styles.settignsBox}
            iconBox={<SupportSVG />}
            onClick={handleClickShow}
            textBox="Support"
          ></SettingsBox>
        </div>
      </div>
      <ButtomDrawer topValue={topValue} onClick={handleClickHide}>
        <div className={styles.connection}>
          <SettingsBox
            className={styles.settignsBox}
            iconBox={<TelegramSVG />}
            onClick={redirectToTelegram}
            textBox="Telegram"
          ></SettingsBox>
          <SettingsBox
            className={styles.settignsBox}
            iconBox={<GmailSVG />}
            onClick={redirectToEmail}
            textBox="Gmail"
          ></SettingsBox>
        </div>
      </ButtomDrawer>
    </div>
  );
}
