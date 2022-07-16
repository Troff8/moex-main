import React, { useState, useEffect } from 'react'
import ApiMoex from '../../core/api/ApiMoex'
import Block from '../../Components/Block'
import Currency from '../../Components/Currency'
import Stock from '../../Components/Stock'
import styles from './MainPage.css'
import { Link } from 'react-router-dom'

const MainPage = () => {
    const [currencyUSD, setCurrencyUSD] = useState({})
    const [currencyEURO, setCurrencyEURO] = useState({})
    const [infoImoex, setInfoImoex] = useState({})
    const [infoRTS, setInfoRTS] = useState({})
    const [listStock, setListStock] = useState([])
    const [listFullStock, setListFullStock] = useState([])
    const [imoexStatusText, setimoexStatusText] = useState([])
    const [rtsStatusText, setrtsStatusText] = useState([])
    const [usdStatusText, setusdStatusText] = useState()
    const [euroStatusText, seteuroStatusText] = useState()

    useEffect(async () => {
        getApiListFull()
        const usd = await ApiMoex.getCurrency('USD000UTSTOM')
        setCurrencyUSD(usd)
        const euro = await ApiMoex.getCurrency('EUR_RUB__TOM')
        setCurrencyEURO(euro)
        const imoex = await ApiMoex.getInfoStocks('IMOEX')
        const rts = await ApiMoex.getInfoStocks('RTSI')
        setInfoImoex(imoex)
        setInfoRTS(rts)
        checkUsdText(usd)
        checkEuroText(euro)
        checkImoexText(imoex)
        checkRtsText(rts)
    }, [])
    const checkUsdText = (usd) => {
        // true - green false - red
        let redStatus = false
        if (usd.lastChange > 0) {
            redStatus = true
        }
        setusdStatusText(redStatus)
    }
    const checkEuroText = (euro) => {
        // true - green false - red
        let redStatus = false
        if (euro.lastChange > 0) {
            redStatus = true
        }
        seteuroStatusText(redStatus)
    }

    const checkImoexText = (imoex) => {
        // true - green false - red
        const arrValueStatusText= [true, true, true]
        if (imoex.lastChange < 0) {
            arrValueStatusText[0] = false
        }
        if (imoex.monthChange < 0) {
            arrValueStatusText[1] = false
        }
        if (imoex.yearChange < 0) {
            arrValueStatusText[2] = false
        }
        setimoexStatusText(arrValueStatusText)
    }
    const checkRtsText = (rts) => {
        // true - green false - red
        const arrValueStatusText = [true, true, true]
        if (rts.lastChange < 0) {
            arrValueStatusText[0] = false
        }
        if (rts.monthChange < 0) {
            arrValueStatusText[1] = false
        }
        if (rts.yearChange < 0) {
            arrValueStatusText[2] = false
        }
        setrtsStatusText(arrValueStatusText)
    }
    const getApiListTop = async () => {
        setListFullStock([])
        const listNames = await ApiMoex.getTopList()
        viewTopList(listNames)
    }
    const viewTopList = (list) => {
        setListStock(
            list.map((item, index) => {
                return (
                    <Link key={index} to={`/promotion/${item}`}>
                        <Block key={index} name={item} />
                    </Link>
                )
            })
        )
    }
    const viewFullList = (list) => {
        setListFullStock(
            list.map((item, index) => {
                return (
                    <Link key={index} to={`/promotion/${item}`}>
                        <Block key={index} name={item} />
                    </Link>
                )
            })
        )
    }

    const getApiListFull = async () => {
        setListStock([])
        const listNames = await ApiMoex.getFullList()
        viewFullList(listNames)
    }
    return (
        <>
            <div className={styles.blockInfo}>
                <div className={styles.containerBlockCurrencies}>
                    <Currency
                        title={'USD'}
                        currencyPrice={currencyUSD.currency}
                        lastChangePrice={currencyUSD.lastChange}
                        StatusText={usdStatusText}
                    />
                    <Currency
                        title={'EUR'}
                        currencyPrice={currencyEURO.currency}
                        lastChangePrice={currencyEURO.lastChange}
                        usdStatusText={euroStatusText}
                    />
                </div>

                <Stock
                    title={'IMOEX'}
                    currency={infoImoex.currency}
                    lastChange={infoImoex.lastChange}
                    monthChange={infoImoex.monthChange}
                    yearChange={infoImoex.yearChange}
                    statusText={imoexStatusText}
                />
                <Stock
                    title={'RTS'}
                    currency={infoRTS.currency}
                    lastChange={infoRTS.lastChange}
                    monthChange={infoRTS.monthChange}
                    yearChange={infoRTS.yearChange}
                    statusText={rtsStatusText}
                />
            </div>
            <div className={styles.switchTextBlock}>
                <p onClick={() => getApiListTop()}>Топ-10 </p>
                <p>/</p>
                <p onClick={() => getApiListFull()}>Полный список</p>
            </div>

            <div className={styles.blocksListStocks}>
                {listStock}
                {listFullStock}
            </div>
        </>
    )
}

export default MainPage
