import React from 'react'
import PropTypes from 'prop-types'
import styles from './Button.css'

const Button = ({ darkMode, title }) => {
    return (
        <div className={styles.container}>
            <p className={darkMode ? styles.textNight : styles.textLight}>{title}</p>
        </div>
    )
}
Button.propTypes = {
    darkMode: PropTypes.bool,
    title: PropTypes.string
}

export default Button
