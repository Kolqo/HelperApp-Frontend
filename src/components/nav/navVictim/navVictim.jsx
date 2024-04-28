import React from 'react'
import styles from './navVictim.module.css'
import MainSVG from '../../../assets/navElementSVG/mainSVG/mainSVG'
import AddSVG from '../../../assets/navElementSVG/addSVG/addSVG'
import ProfileSVG from '../../../assets/navElementSVG/profileSVG/profile'

export default function input(props){
    return (
        <>
            <div className={styles.nav}>
                <div
                    className={`${styles.navElement} ${props.selected === 'main' ? styles.active : ''}`}
                    onClick={() => props.setSelected('main')}
                >
                    <div className={styles.elementBox}>
                        <MainSVG fill={props.selected === 'main'?"black":"none"}/> 
                    </div>
                    <div className={styles.navElementText}>Main</div>
                </div>
                <div
                    className={`${styles.navElement} ${props.selected === 'add' ? styles.active : ''}`}
                    onClick={() => props.setSelected('add')}
                >
                    <div className={styles.elementBox}>
                        <AddSVG fill={props.selected === 'add'?"black":"none"} cross={props.selected === 'add'?"white":"black"}/>
                    </div>
                    <div className={styles.navElementText}>Add</div>
                </div>
                <div
                    className={`${styles.navElement} ${props.selected === 'profile' ? styles.active : ''}`}
                    onClick={() => props.setSelected('profile')}
                >
                    <div className={styles.elementBox}>
                        <ProfileSVG fill={props.selected === 'profile'?"black":"none"}/>
                    </div>
                    <div className={styles.navElementText}>Profile</div>
                </div>
            </div>
        </>
    )
}
