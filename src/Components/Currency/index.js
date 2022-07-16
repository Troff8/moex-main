import React from 'react'
import PropTypes from 'prop-types'
import styles from './Currency.css'

const Currency = ({ title, currencyPrice, lastChangePrice, statusText }) => {
    return (
        <div className={styles.blockCurrencies}>
            <p>
                {title} : {currencyPrice}
            </p>
            <span> &nbsp;</span>
            <p className={statusText ? styles.textGreen : styles.textRed}>{lastChangePrice}</p>
        </div>
    )
}

Currency.propTypes = {
    title: PropTypes.string,
    currencyPrice: PropTypes.string,
    lastChangePrice: PropTypes.string,
    statusText: PropTypes.bool
}

export default Currency
