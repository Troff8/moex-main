import React, { useState } from 'react'
import Header from './Header'
import Main from './Main'
import styles from './App.css'
const App = () => {
    const [darkMode, setDarkMode] = useState(false)
    return (
        <div className={darkMode ? styles.appNight : styles.appLight}>
            <div className={styles.temsBlock}>
                <span className={darkMode ? styles.greyColor : styles.yellowColor}>☀︎</span>
                <input type='checkbox' onChange={() => setDarkMode(!darkMode)} />
                <span className={darkMode ? styles.nightColor : styles.greyColor}>☽</span>
            </div>

            <Header darkMode={darkMode} />
            <Main darkMode={darkMode} />
        </div>
    )
}

export default App
