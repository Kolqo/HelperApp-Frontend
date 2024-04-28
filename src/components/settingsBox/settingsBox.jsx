import React from 'react'
import styles from './settingsBox.module.css'

export default function select(props){

    // const click = () => {
    //     props.setIfClick(props.ifClick)
    // }

    return (
        <>
            <div className={`${styles.group} ${props.className}`} onClick={props.onClick}>
                <div className={styles.iconBox}>{props.iconBox}</div>
                <div className={styles.textBox}>{props.textBox}</div>
                <div className={styles.elementBox}>{props.elementBox}</div>
            </div>
        </>
    )
}