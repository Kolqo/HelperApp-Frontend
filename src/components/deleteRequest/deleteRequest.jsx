import React from 'react'
import styles from './deleteRequest.module.css'

export default function button(props){
    return (
        <>
            <div className={styles.group}>
                <div className={styles.buttonBox}>
                    <button className={styles.deleteButton} onClick={props.onClickOne}>{props.buttonTextOne}</button>
                </div>
            </div>
        </>
    )
}
