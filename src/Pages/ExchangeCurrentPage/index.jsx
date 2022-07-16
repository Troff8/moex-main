import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import ChangeDiagram from '../../Components/ChangeDiagram'
import ApiMoex from '../../core/api/ApiMoex'
import styles from './ExchangeCurrent.css'

const ExchangeCurrent = () => {
    const { ExchangeCurrent } = useParams()
    const [currentSecurity, setCurrentSecurity] = useState({})
    const [differenceStartYear, setDifferenceStartYear] = useState()
    const [differenceFullYear, setDifferenceFullYear] = useState()
    const [changeFullYearStatusText, setChangeFullYearStatusText] = useState()
    const [changeStartYearStatusText, setChangeStartYearStatusText] = useState()
    const [change, setChange] = useState()
    const [changeValueYears, setChangeValueYears] = useState()

    useEffect(async () => {
        const security = {}
        const infoSecurity = await ApiMoex.getFirstInfoDescriptionSecurity(ExchangeCurrent)
        security.Secid = infoSecurity.Secid
        security.Name = infoSecurity.Name
        security.Isin = infoSecurity.Isin
        security.Issuedate = infoSecurity.Issuedate
        security.LatName = infoSecurity.LatName

        const infoSecurity2 = await ApiMoex.getSecondInfoDescriptionSecurity(ExchangeCurrent)
        security.Open = infoSecurity2.open
        security.Low = infoSecurity2.low
        security.High = infoSecurity2.high
        security.Change = infoSecurity2.change
        security.LastChange = infoSecurity2.lastChange

        setCurrentSecurity(security)
        algChangeStartYear(security)
        algChangeFullYear(security)
        algChange(security)
        algChangeYears(infoSecurity.Secid, infoSecurity.Issuedate)
    }, [])

    const algChangeYears = async (name, startBidding) => {
        startBidding = startBidding.split('-')
        let date = new Date().toLocaleDateString('ru-RU')
        date = date.split('.')
        const year = date[2]
        const difference = Number(year) - Number(startBidding[0])
        if (difference > 5) {
            const arrYears = [year - 1, year - 2, year - 3, year - 4, year - 5]
            let arrValuesPrice = []
            const monthStart = 1
            const dayOver = 20
            for (let i = 0; i < arrYears.length; i++) {
                arrValuesPrice[i] = {
                    Years: arrYears[i],
                    StartPrice: await ApiMoex.getClosePriceStartYearForTable('6', monthStart, arrYears[i], name, monthStart + 5),
                    ClosePrice: await ApiMoex.getClosePriceEndYearForTable(dayOver, '12', arrYears[i], name, dayOver + 10)
                }
            }
            for (let i = 0; i < arrValuesPrice.length; i++) {
                arrValuesPrice[i].Change = (
                    Number(arrValuesPrice[i].ClosePrice * 100) / Number(arrValuesPrice[i].StartPrice) -
                    100
                ).toFixed(2)
            }
            console.log(arrValuesPrice)
            arrValuesPrice = arrValuesPrice.reverse()
            setChangeValueYears(
                arrValuesPrice.map((item, index) => {
                    return <ChangeDiagram key={index} objValues={item} />
                })
            )
        } else {
            const arrYears = []
            for (let i = 0; i < difference; i++) {
                arrYears[i] = year - (i + 1)
            }
            let arrValuesPrice = []
            let monthStart = 1
            const dayOver = 20
            for (let i = 0; i < arrYears.length; i++) {
                arrValuesPrice[i] = {
                    Years: arrYears[i],
                    StartPrice: await ApiMoex.getClosePriceStartYearForTable('6', monthStart, arrYears[i], name, monthStart + 5),
                    ClosePrice: await ApiMoex.getClosePriceEndYearForTable(dayOver, '12', arrYears[i], name, dayOver + 10)
                }
                if (arrValuesPrice[i].StartPrice === undefined) {
                    monthStart = 6
                    arrValuesPrice[i].StartPrice = await ApiMoex.getClosePriceStartYearForTable(
                        '6',
                        monthStart,
                        arrYears[i],
                        name,
                        monthStart + 6
                    )
                }
            }
            for (let i = 0; i < arrValuesPrice.length; i++) {
                arrValuesPrice[i].Change = (
                    Number(arrValuesPrice[i].ClosePrice * 100) / Number(arrValuesPrice[i].StartPrice) -
                    100
                ).toFixed(2)
            }
            arrValuesPrice = arrValuesPrice.reverse()
            setChangeValueYears(
                arrValuesPrice.map((item, index) => {
                    return <ChangeDiagram key={index} objValues={item} />
                })
            )
        }
    }
    const checkTextPercent = (percent) => {
        // true - green false - red
        let redStatus = false
        if (percent > 0) {
            redStatus = true
        }
        return redStatus
    }
    const algChange = async (objData) => {
        const open = Number(objData.Open)
        const lastChange = Number(objData.LastChange)
        const change = ((lastChange * 100) / open - 100).toFixed(1)
        setChange(change)
    }
    const algChangeStartYear = async (objData) => {
        let date = new Date().toLocaleDateString('ru-RU')
        date = date.split('.')
        const year = date[2]
        const closePriceStartYear = await ApiMoex.getClosePriceBeginningYear(year, ExchangeCurrent)
        const difference = (Number(objData.LastChange) - closePriceStartYear).toFixed(2)
        setDifferenceStartYear(difference)
        checkStartYearText(difference)
    }

    const algChangeFullYear = async (objData) => {
        let date = new Date().toLocaleDateString('ru-RU')
        date = date.split('.')
        const day = date[0]
        const month = date[1]
        const year = date[2] - 1
        const closePriceCurrentDateYear = await ApiMoex.getClosePriceFullYear(day, month, year, ExchangeCurrent)
        const difference = (+objData.LastChange - closePriceCurrentDateYear).toFixed(2)
        setDifferenceFullYear(difference)
        checkFullYearText(difference)
    }
    const checkFullYearText = (difference) => {
        // true - green false - red
        let redStatus = false
        if (difference > 0) {
            redStatus = true
        }
        setChangeFullYearStatusText(redStatus)
    }
    const checkStartYearText = (difference) => {
        // true - green false - red
        let redStatus = false
        if (difference > 0) {
            redStatus = true
        }
        setChangeStartYearStatusText(redStatus)
    }
    return (
        <div className={styles.block}>
            <div className={styles.headerText}>{ExchangeCurrent}</div>
            <div className={styles.infoBlocks}>
                <div className={styles.infoBlock}>
                    <p>Код ценной бумаги : {currentSecurity.Secid} </p>
                    <p>Полное наименование: {currentSecurity.Name} </p>
                    <p>ISIN код: {currentSecurity.Isin} </p>
                    <p>Дата начала торгов: {currentSecurity.Issuedate} </p>
                    <p>Английское наименование: {currentSecurity.LatName} </p>
                </div>
                <div className={styles.infoBlock}>
                    <p>OPEN : {currentSecurity.Open} </p>
                    <p>LOW : {currentSecurity.Low} </p>
                    <p>HIGH : {currentSecurity.High} </p>
                    <p>CHANGE : {change} % </p>
                    <p>
                        Изменение c начала года :
                        <span className={changeStartYearStatusText ? styles.textGreen : styles.textRed}>
                            {differenceStartYear}
                        </span>
                    </p>
                    <p>
                        Изменение за год :
                        <span className={changeFullYearStatusText ? styles.textGreen : styles.textRed}>{differenceFullYear}</span>
                    </p>
                </div>
            </div>
            <div className={styles.tableInfo}>
                <div className={styles.blockInfoTable}>{changeValueYears}</div>
            </div>
        </div>
    )
}

export default ExchangeCurrent
