import React, { useState } from 'react'
import styles from './select.module.css'

export default function select(props){
    const [isActive, setIsActive] = useState(false)

    return (
        <>
            <div className={`${styles.group} ${props.className}`} onClick={e => setIsActive(!isActive)}>
                <div className={styles.select}>
                    {props.selected}
                    {props.children}
                </div>
                {isActive && (
                    <div className={styles.dropdown_group}>
                        {props.listOptions.map((option, index) => (
                            <div 
                            key={index}
                            onClick={() => {
                                props.setSelected(option) 
                                setIsActive(false)
                                props.error()
                            }} 
                            className={styles.dropdown_item}
                            >
                                {option}
                            </div>
                        ))}
                    </div>
                )}
                {props.showError}
            </div>
        </>
    )
}