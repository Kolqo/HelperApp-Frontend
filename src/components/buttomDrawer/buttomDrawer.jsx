import React from 'react'
import styles from './buttomDrawer.module.css'

export default function button(props){

    return (
        <>
            <div className={styles.group} style={{top: props.topValue}}>
                <div className={styles.buttonHide} onClick={props.onClick}></div>
                {props.children}
            </div>
        </>
    )
}
