import React from 'react'
import styles from './navHelper.module.css'
import MainSVG from '../../../assets/navElementSVG/mainSVG/mainSVG'
import SelectedSVG from '../../../assets/navElementSVG/selectedSVG/selected'
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
                    className={`${styles.navElement} ${props.selected === 'selected' ? styles.active : ''}`}
                    onClick={() => props.setSelected('selected')}
                >
                    <div className={styles.elementBox}>
                        <SelectedSVG fill={props.selected === 'selected'?"black":"none"}/>
                    </div>
                    <div className={styles.navElementText}>Selected</div>
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
