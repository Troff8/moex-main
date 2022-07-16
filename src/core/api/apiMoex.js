import axios from 'axios'

class ApiMoex {
    getCurrencyExchangeRateUrl(ticker) {
        return `https://iss.moex.com/iss/engines/currency/markets/selt/boards/CETS/securities/${ticker}.json?iss.meta=off&iss.only=marketdata`
    }

    getStockExchangeRateUrl(ticker) {
        return `https://iss.moex.com/iss/engines/stock/markets/index/securities/${ticker}/securities.json?iss.meta=off&iss.only=marketdata`
    }

    getChangeYears = async (currency, year) => {
        const response = await axios.get(
            `https://iss.moex.com/iss/history/engines/stock/markets/shares/boards/TQBR/securities/${currency}.json?from=${year}-1-5&till=${year}-1-5`
        )
        if (response.status === 200) {
            const indexClose = response.data.history.columns.indexOf('CLOSE')
            const priceClose = response.data.history.data[0][indexClose]
            return priceClose
        }
    }

    getCurrency = async (currency) => {
        const response = await axios.get(this.getCurrencyExchangeRateUrl(currency))
        if (response.status === 200) {
            const numIndexStatusCurrency = response.data.marketdata.columns.indexOf('LAST')
            const getcurrency = response.data.marketdata.data[0][numIndexStatusCurrency].toFixed(2)

            const numIndexLastChange = response.data.marketdata.columns.indexOf('CHANGE')
            const currencyChange = response.data.marketdata.data[0][numIndexLastChange].toFixed(2)
            return {
                currency: getcurrency,
                lastChange: currencyChange
            }
        }
    }

    getInfoStocks = async (share) => {
        const response = await axios.get(this.getStockExchangeRateUrl(share))
        if (response.status === 200) {
            const indexCurrentValue = response.data.marketdata.columns.indexOf('CURRENTVALUE')
            const currentValue = response.data.marketdata.data[0][indexCurrentValue].toFixed(2)

            const numIndexLastChange = response.data.marketdata.columns.indexOf('LASTCHANGE')
            const lastChange = response.data.marketdata.data[0][numIndexLastChange].toFixed(2)

            const numIndexMonthChange = response.data.marketdata.columns.indexOf('MONTHCHANGEPRC')
            const monthChange = response.data.marketdata.data[0][numIndexMonthChange].toFixed(2)

            const numIndexYearChange = response.data.marketdata.columns.indexOf('YEARCHANGEPRC')
            const yearChange = response.data.marketdata.data[0][numIndexYearChange].toFixed(2)

            return {
                currency: currentValue,
                lastChange: lastChange,
                monthChange,
                yearChange
            }
        }
    }

    getTopList = async () => {
        const arrList = []
        const response = await axios.get('https://iss.moex.com/iss/statistics/engines/stock/markets/index/analytics/MOEX10.json')
        if (response.status === 200) {
            response.data.analytics.data.forEach((element) => {
                arrList.push(element[2])
            })
        }
        return arrList
    }

    getFullList = async () => {
        const arr = []
        const response = await axios.get(
            'https://iss.moex.com/iss/statistics/engines/stock/markets/index/analytics/IMOEX.json?limit=100'
        )
        if (response.status === 200) {
            response.data.analytics.data.forEach((element) => {
                arr.push(element[2])
            })
        }
        return arr
    }

    getFirstInfoDescriptionSecurity = async (current) => {
        const index = {}
        const response = await axios.get(`https://iss.moex.com/iss/securities/${current}.json`)
        if (response.status === 200) {
            const arrListValue = response.data.description.data
            for (let i = 0; i < arrListValue.length; i++) {
                for (let j = 0; j < arrListValue[i].length; j++) {
                    if (arrListValue[i][j] === 'SECID') {
                        index.SecidI = i
                    }
                    if (arrListValue[i][j] === 'NAME') {
                        index.NameI = i
                    }
                    if (arrListValue[i][j] === 'ISIN') {
                        index.IsinI = i
                    }
                    if (arrListValue[i][j] === 'ISSUEDATE') {
                        index.IssuedataI = i
                    }
                    if (arrListValue[i][j] === 'LATNAME') {
                        index.LatnameI = i
                    }
                }
            }
            const Secid = response.data.description.data[index.SecidI][2]
            const Name = response.data.description.data[index.NameI][2]
            const Isin = response.data.description.data[index.IsinI][2]
            const Issuedate = response.data.description.data[index.IssuedataI][2]
            const LatName = response.data.description.data[index.LatnameI][2]
            return {
                Secid,
                Name,
                Isin,
                Issuedate,
                LatName
            }
        }
    }

    getSecondInfoDescriptionSecurity = async (current) => {
        const response = await axios.get(
            `https://iss.moex.com/iss/engines/stock/markets/shares/boards/TQBR/securities/${current}.json`
        )
        if (response.status === 200) {
            const indexOpen = response.data.marketdata.columns.indexOf('OPEN')
            const open = response.data.marketdata.data[0][indexOpen]
            const indexLow = response.data.marketdata.columns.indexOf('LOW')
            const low = response.data.marketdata.data[0][indexLow]
            const indexHigh = response.data.marketdata.columns.indexOf('HIGH')
            const high = response.data.marketdata.data[0][indexHigh]
            const indexChange = response.data.marketdata.columns.indexOf('CHANGE')
            const change = response.data.marketdata.data[0][indexChange]
            const indexLastChange = response.data.marketdata.columns.indexOf('LAST')
            const lastChange = response.data.marketdata.data[0][indexLastChange]
            return {
                open,
                low,
                high,
                change,
                lastChange
            }
        }
    }

    getClosePriceBeginningYear = async (year, current) => {
        const response = await axios.get(
            `https://iss.moex.com/iss/history/engines/stock/markets/shares/boards/TQBR/securities/${current}.json?from=${year}-01-03&till=${year}-01-03`
        )
        if (response.status === 200) {
            const indexClose = response.data.history.columns.indexOf('CLOSE')
            const priceCloseStartYear = response.data.history.data[0][indexClose]

            return +priceCloseStartYear
        }
    }

    getClosePriceFullYear = async (day, month, year, current) => {
        if (month > 0 && month < 9) {
            month = '0' + month
        }
        if (day > 0 && day < 9) {
            day = '0' + day
        }
        const response = await axios.get(
            `https://iss.moex.com/iss/history/engines/stock/markets/shares/boards/TQBR/securities/${current}.json?from=${year}-${month}-${day}&till=${year}-${month}-${day}`
        )
        if (response.status === 200) {
            const indexClose = response.data.history.columns.indexOf('CLOSE')
            const priceClose = response.data.history.data[0][indexClose]
            return priceClose
        }
    }

    getClosePriceEndYearForTable = async (day, month, year, current, overDay) => {
        const response = await axios.get(
            `https://iss.moex.com/iss/history/engines/stock/markets/shares/boards/TQBR/securities/${current}.json?from=${year}-${month}-${day}&till=${year}-${month}-${overDay}`
        )
        if (response.status === 200 && response.data.history.data.length !== 0) {
            const indexClose = response.data.history.columns.indexOf('CLOSE')
            const priceClose = response.data.history.data[response.data.history.data.length - 1][indexClose]
            return priceClose
        } else {
            return undefined
        }
    }

    getClosePriceStartYearForTable = async (day, startMonth, year, current, overMonth) => {
        console.log(
            `https://iss.moex.com/iss/history/engines/stock/markets/shares/boards/TQBR/securities/${current}.json?from=${year}-${startMonth}-${day}&till=${year}-${overMonth}-${day}`
        )
        const response = await axios.get(
            `https://iss.moex.com/iss/history/engines/stock/markets/shares/boards/TQBR/securities/${current}.json?from=${year}-${startMonth}-${day}&till=${year}-${overMonth}-${day}`
        )
        if (response.status === 200 && response.data.history.data.length !== 0) {
            const indexClose = response.data.history.columns.indexOf('CLOSE')
            const priceClose = response.data.history.data[0][indexClose]
            return priceClose
        } else {
            return undefined
        }
    }
}
export default new ApiMoex()
