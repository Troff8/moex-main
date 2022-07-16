import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import styles from './ChangeDiagram.css'

const ChangeDiagram = ({ objValues }) => {
    const [style, setStyle] = useState({})
    useEffect(() => {
        algHeight()
    }, [])
    const algHeight = () => {
        let color
        let heightValue
        if (objValues.Change > 0) {
            heightValue = objValues.Change * 1.5
            color = 'rgb(27, 96, 185)'
        }
        if (objValues.Change < 0) {
            heightValue = -1.5 * objValues.Change
            color = 'red'
        }
        const objListStyles = {
            height: `${heightValue}px`,
            backgroundColor: color
        }
        setStyle(objListStyles)
    }
    return (
        <div className={styles.stringTable}>
            <div>{objValues.Change} %</div>
            <div style={style}></div>
            <div>{objValues.Years}</div>
        </div>
    )
}

ChangeDiagram.propTypes = {
    objValues: PropTypes.object
}

export default ChangeDiagram
