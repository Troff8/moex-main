import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import Button from '../../Components/Block/Button'
import styles from './Header.css'
import appLogo from '../../images/logo.png'

const Header = ({ darkMode }) => {
    return (
        <div className={darkMode ? styles.headerNight : styles.headerLight}>
            <div className={styles.blockImageText}>
                <div className={styles.image}>
                    <Link to='/'>
                        <img className={styles.image} src={appLogo} />
                    </Link>
                </div>
                <div className={darkMode ? styles.infoTextNight : styles.infoTextLight}>
                    <p id={styles.textBig}>MOEX App</p>
                    <p id={styles.textSmall}>Приложение для визуализации аналитических данных Московской биржи</p>
                </div>
            </div>
            <div className={styles.rightMenu}>
                <Link to='/info'>
                    <Button title={'Приложение'} darkMode={darkMode} />
                </Link>
                <Link to='/exchange'>
                    <Button title={'МосБиржа'} darkMode={darkMode} />
                </Link>
            </div>
        </div>
    )
}

Header.propTypes = {
    darkMode: PropTypes.bool
}

export default Header
