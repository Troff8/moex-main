import React from 'react'
import PropTypes from 'prop-types'
import styles from './Stock.css'

const Stock = ({ title, currency, lastChange, monthChange, yearChange, statusText }) => {
    return (
        <div className={styles.blockStock}>
            <div className={styles.blockInfoStock}>
                {title} : {currency}
                <span className={statusText[0] ? styles.textGreen : styles.textRed}> {lastChange} </span>
            </div>
            <div>
                Изм. с начала месяца:
                <span className={statusText[1] ? styles.textGreen : styles.textRed}>{monthChange} </span>
            </div>
            <div>
                Изм. с начала года:
                <span className={statusText[2] ? styles.textGreen : styles.textRed}>{yearChange} </span>
            </div>
        </div>
    )
}

Stock.propTypes = {
    title: PropTypes.string,
    currency: PropTypes.string,
    lastChange: PropTypes.string,
    monthChange: PropTypes.string,
    yearChange: PropTypes.string,
    statusText: PropTypes.array
}

export default Stock
