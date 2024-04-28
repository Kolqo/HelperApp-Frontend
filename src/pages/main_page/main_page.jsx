import React, { useState, useEffect } from "react";
import axios from "axios";
import NavHelper from "../../components/nav/navHelper/navHelper";
import NavVictim from "../../components/nav/navVictim/navVictim";
import MainHelper from "./components/mainHelper/mainHelper";
import MainVictim from "./components/mainVictim/mainVictim"
import Profile from "./components/profile/profile";
import Selected from "./components/selected/selected";
import Add from "./components/add/add";

export default function main_page() {
  const [selected, setSelected] = useState("main");
  const [isReceiver, setIsReceiver] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  function fetchData() {
    let url =
      "/api/v1/validate/checkReceiver/" + window.localStorage.getItem("jwt");
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
        setIsReceiver(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <>
        {isReceiver ? 
        (
          <>
            {selected === "main" && <MainVictim/>}
            {selected === "add" && <Add />}
            {selected === "profile" && <Profile />}
            <NavVictim selected={selected} setSelected={setSelected}></NavVictim>
          </>
        ) : (
          <>
            {selected === "main" && <MainHelper/>}
            {selected === "selected" && <Selected />}
            {selected === "profile" && <Profile />}
            <NavHelper selected={selected} setSelected={setSelected}></NavHelper>
          </>
        )}
    </>
  );
}

// {selected === "main" && <MainHelper/>}
// {selected === "selected" && <Selected />}
// {selected === "profile" && <Profile />}

// {selected === "main" && isReceiver ? (<MainVictim />):(<MainHelper/>)}
// {selected === "selected" && isReceiver ? (<Add />):(<Selected/>)}
// {selected === "profile" && <Profile />}