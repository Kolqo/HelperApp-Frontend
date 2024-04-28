import React from 'react'
import styles from './field.module.css'

export default function field(props){
    return (
        <>
            <form>
                <textarea
                    className={`${styles.textareaClass} ${props.className}`}
                    rows={props.rows}
                    onChange={props.setData}
                />
            </form>
            {props.showError}
        </>
    )
}
