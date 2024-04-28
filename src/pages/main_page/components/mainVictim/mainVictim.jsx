import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./mainVictim.module.css";
import RequestVictim from "../../../../components/request/requestVictim";
import ButtomDrawer from "../../../../components/buttomDrawer/buttomDrawer";
import DeleteRequest from "../../../../components/deleteRequest/deleteRequest";

export default function mainVictim() {
  const [responseData, setResponseData] = useState([]);
  const [currId, setCurrId] = useState();
  const [currItem, setCurrItem] = useState([]);
  const [arr, setArr] = useState([]);
  const [used, setUsed] = useState(false);

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
    }else{
      setUsed(false);
    }
  }, [currId]);

  useEffect(() => {
    {!used && setCurrId(undefined)}
  }, [used])

  function fetchData() {
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: "/api/v1/post/findByReceiver",
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

  function handelDeletePost() {
    let data = JSON.stringify({
      output: arr,
    });
    
    let config = {
      method: 'delete',
      maxBodyLength: Infinity,
      url: '/api/v1/post/deletePost',
      headers: { 
        'Content-Type': 'application/json', 
        Authorization: "Bearer " + window.localStorage.getItem("jwt"),
      },
      data : data
    };
    
    axios.request(config)
    .then((response) => {
      location.reload();
    })
    .catch((error) => {
      console.log(error);
    });
    
  }

  function handleButtomDrawler(item) {
    setCurrItem(item);
  }

  return (
    <>
      <div className={styles.container}>
        <div className={styles.textMain}>
          <p>Your requests</p>
        </div>
        <div className={styles.requestContainer}>
          <RequestVictim
            responseData={responseData}
            onClickButton={handleClick}
            onClick={handleClickShow}
            onHandleButtomDrawler={handleButtomDrawler}
          />
        </div>
        {arr.length > 0 && (
          <DeleteRequest
            buttonTextOne="Delete"
            buttonTextTwo="Cancel"
            onClickOne={handelDeletePost}
            onClickTwo={() => setCurrId(undefined)}
          ></DeleteRequest>
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
