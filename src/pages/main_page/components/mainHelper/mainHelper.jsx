import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./mainHelper.module.css";
import Input from "../../../../components/input/input";
import SearchSVG from "../../../../assets/searchSVG/searchSVG";
import Request from "../../../../components/request/request";
import Button from "../../../../components/button/button";
import ButtomDrawer from "../../../../components/buttomDrawer/buttomDrawer";

export default function mainHelper() {
  const [responseData, setResponseData] = useState([]);
  const [filteredResponseData, setfilteredResponseData] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [currId, setCurrId] = useState();
  const [currItem, setCurrItem] = useState([]);
  const [arr, setArr] = useState([]);
  const [text, setText] = useState("");

  const [topValue, setTopValue] = useState("0px");

  const handleClickShow = () => {
    setTopValue("-420px");
  };
  const handleClickHide = () => {
    setTopValue("0px");
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (currId !== undefined) {
      setArr((prev) => [...prev, currId]);
    }
  }, [currId]);

  function fetchData() {
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: "/api/v1/post/findAll",
      headers: {
        Authorization: "Bearer " + window.localStorage.getItem("jwt"),
      },
    };

    axios
      .request(config)
      .then((response) => {
        setResponseData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function handleClick(item) {
    const updatedData = [...responseData];
    const index = updatedData.findIndex((i) => i.id === item.id);
    if (index !== -1) {
      updatedData[index] = {
        ...updatedData[index],
        selected: !updatedData[index].selected,
      };
      setResponseData(updatedData);
    }

    if (arr.includes(item.id)) {
      setArr((prevArr) => prevArr.filter((iteme) => iteme !== item.id));
      setCurrId(undefined);
    } else {
      setCurrId(item.id);
    }
  }

  function handleSendData() {
    let data = JSON.stringify({
      output: arr,
    });

    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: "api/v1/select/makeSelect",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + window.localStorage.getItem("jwt"),
      },
      data: data,
    };

    axios
      .request(config)
      .then((response) => {
        location.reload();
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function handleSearch() {
    if (text.trim() !== "") {
      let url = "/api/v1/post/find/" + text.toLowerCase();
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
          setSearchResults(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      setSearchResults([]);
    }
  }

  function handleKeyPress(event) {
    if (event.key === "Enter") {
      handleSearch();
    }
  }

  function handleButtomDrawler(item) {
    console.log(item.id);
    setCurrItem(item);
  }

  return (
    <>
      <div className={styles.container}>
        <div className={styles.searchBox}>
          <Input
            className={styles.inputSearch}
            inputclassName={styles.inputClass}
            iconclassName={styles.iconInput}
            iconOne={<SearchSVG onClick={handleSearch} />}
            placeholder="Search"
            value={text}
            setData={(e) => setText(e.target.value)}
            type="text"
            onKeyPress={handleKeyPress}
          ></Input>
        </div>
        <div className={styles.requestContainer}>
          <Request
            responseData={
              searchResults.length > 0 ? searchResults : responseData
            }
            onClickButton={handleClick}
            onClick={handleClickShow}
            onHandleButtomDrawler={handleButtomDrawler}
          />
        </div>
        {arr.length > 0 && (
          <Button onClick={handleSendData} className={styles.buttonLike} >
            Submit
          </Button>
        )}
        <ButtomDrawer topValue={topValue} onClick={handleClickHide}>
          <div className={styles.buttomDrawerNumber}>
            <p>Phone Number</p>
            <div className={styles.numberBox}>{currItem.phone}</div>
          </div>
          <div className={styles.buttomDrawerDescription}>
            <p>Description</p>
            <div className={styles.desctiptionBox}>{currItem.description}</div>
          </div>
        </ButtomDrawer>
      </div>
    </>
  );
}
