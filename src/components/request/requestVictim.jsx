
import React, { useState } from "react";
import styles from "./requestVictim.module.css";
import TrashSVG from "../../assets/requestElementSVG/trashSVG/trashSVG";
import RedTrashSVG from "../../assets/requestElementSVG/redTrashSVG/redTrashSVG";

export default function select(props) {
  const [isRedTrash, setIsRedTrash] = useState(false);

  return (
    <>
      {props.responseData.map((item) => (
        <div key={item.id} className={styles.requestBox}>
          <div className={styles.requestBoxImage} onClick={() => {
                props.onClick()
                props.onHandleButtomDrawler(item)
            }}>
              <div className={styles.imageClass}>
                <img src={item.img} alt="Image from helper"/>
              </div>
          </div>
          <div className={styles.requestBoxDescritionAndIcons}>
            <div className={styles.requestBoxDescrition}>
              <div className={styles.requestBoxDescritionOne}>{item.name}</div>
              <div className={styles.requestBoxDescritionTwo}>{item.city}</div>
              <div className={styles.requestBoxDescritionThree}>
                {item.createdTimeStamp.substring(
                  0,
                  item.createdTimeStamp.indexOf("T")
                )}{" "}
                {item.createdTimeStamp.substring(
                  item.createdTimeStamp.indexOf("T") + 1,
                  item.createdTimeStamp.indexOf("T") + 6
                )}
              </div>
            </div>
            <div className={styles.requestIcons}>
              <div
                className={styles.requestBoxIconOne}
                onClick={() => {
                  props.onClickButton(item);
                  // props.imageOne(item)
                }}
              >
                
                {item.selected ? (
                  <RedTrashSVG fill="none" height="20" weight="20" />
                ) : (
                  <TrashSVG fill="none" height="18" weight="20" />
                )}
              </div>
              <div className={styles.requestBoxIconTwo}>{props.imageTwo}</div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
}
