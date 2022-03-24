import axios from "axios";

export async function fetchData(url) {
  try {
    const res = await axios.get(url)
    return res
  } catch (error) {
    console.log(error)
  }
}

export async function fetchDataForTenDays(valuteCode) {
  try {
    let url = 'https://www.cbr-xml-daily.ru/daily_json.js'
    let dataArray = []
    let dates = []
    for (let i = 0; i < 10; i++) {
      const res = await fetchData(url)
      dates.push(res.data.Date)
      dataArray.push(res.data.Valute[valuteCode])
      url = res.data.PreviousURL
    }
    const data = { dataArray, dates }
    return data

  } catch (error) {
    console.log(error)
  }
}