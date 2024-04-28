import React from 'react'
import { Link } from 'react-router-dom'
import styles from './not_found.module.css'
import Button from '../../components/button/button'

export default function not_found(){
    return (
        <>
            <div className={styles.container}>
                <div className={styles.errorText}>
                    <h1>404</h1>
                    <h2>Сторінку не знайдено</h2>
                    <Link to="/"><Button className={styles.buttonBox}>На головну</Button></Link>
                </div>
            </div>
        </>
    )
}
