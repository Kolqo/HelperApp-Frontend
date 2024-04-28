import React, { useStatem, useEffect, useState } from "react";
import axios from "axios";
import styles from "./selected.module.css";
import Request from "../../../../components/request/request";
import Button from "../../../../components/button/button";
import ButtomDrawer from "../../../../components/buttomDrawer/buttomDrawer";

export default function selected() {
  const [responseData, setResponseData] = useState([]);
  const [currId, setCurrId] = useState();
  const [arr, setArr] = useState([]);
  const [currItem, setCurrItem] = useState([]);

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
      url: "/api/v1/select/findSelects",
      headers: {
        Authorization: "Bearer " + window.localStorage.getItem("jwt"),
      },
    };

    axios
      .request(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
        setResponseData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
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
        console.log(JSON.stringify(response.data));
        location.reload();
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

  function handleButtomDrawler(item) {
    console.log(item.id);
    setCurrItem(item);
  }

  return (
    <>
      <div className={styles.container}>
        <div className={styles.requestContainer}>
          <Request
            responseData={responseData}
            onClickButton={handleClick}
            onClick={handleClickShow}
            onHandleButtomDrawler={handleButtomDrawler}
            // onClick={handleClickShow}
          />
        </div>
        {arr.length > 0 && (
          <Button onClick={handleSendData} className={styles.buttonLike}>
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
