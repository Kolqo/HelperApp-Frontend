import React from 'react'
import styles from './input.module.css'

export default function input(props){
    return (
        <>
            <div className={`${styles.group} ${props.className}`}>
                <input 
                    className={`${styles.inputClass} ${props.inputclassName}`}
                    value = {props.value} 
                    onClick={props.error} 
                    onChange={props.setData} 
                    onKeyDown={props.onKeyPress}
                    type={props.type} 
                    placeholder={props.placeholder} 
                />
                <div 
                    className={`${styles.iconBox} ${props.iconclassName}`} 
                    onClick={e => props.setClick(!props.click)} 
                >
                    {props.iconOne}
                    {props.click?props.showIcon:props.nonShowIcon}
                </div>
                {props.showError}
            </div>
        </>
    )
}
