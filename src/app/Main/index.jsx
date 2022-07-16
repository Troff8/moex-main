import React from 'react'
import { Routes, Route } from 'react-router-dom'
import MainPage from '../../Pages/MainPage'
import Info from '../../Pages/InfoPage'
import Exchange from '../../Pages/ExchangePage'
import ExchangeCurrent from '../../Pages/ExchangeCurrentPage'
import styles from './Main.css'

const Main = () => {
    return (
        <div className={styles.main}>
            <Routes>
                <Route path='/' element={<MainPage />} />
                <Route path='/info' element={<Info />} />
                <Route path='/exchange' element={<Exchange />} />
                <Route path='/promotion/:ExchangeCurrent' element={<ExchangeCurrent />} />
            </Routes>
        </div>
    )
}

export default Main
