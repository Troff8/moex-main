import React from 'react'
import PropTypes from 'prop-types'
import styles from './Block.css'

const Block = ({ name }) => {
    return (
        <div className={styles.block}>
            <div className={styles.infoName}>{name}</div>
        </div>
    )
}

Block.propTypes = {
    name: PropTypes.string
}

export default Block
