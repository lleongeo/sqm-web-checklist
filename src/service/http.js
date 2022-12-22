import { API_URL_BASE, API_KEY } from './constants'
import { ConvertToKendoGridValues } from './helper'

const GetDataAsync = async (url, headers) => {
  var _url = `${API_URL_BASE}${url}`
  var p = await fetch(_url, {
    method: "GET",
    headers: new Headers({ ...headers })
  })
  return p
}

const GetData = async (url, headers) => {
  try {
    var _url = `${API_URL_BASE}${url}`
    var p = await fetch(_url, {
      method: "GET",
      headers: new Headers({ ...headers })
    })
    let json = await p.json()
    return json
  } catch (error) {
    throw error
  }
}

const GetDataCombobox = async (url, text, value) => {
  try {
    var _url = `${API_URL_BASE}${url}`
    var p = await fetch(_url, {
      method: "GET",
      headers: new Headers({
        "apikey": API_KEY, "language": "ES"
      })
    })
    let json = await p.json()
    var textValueItems = ConvertToKendoGridValues(json, text, value)
    return textValueItems
  } catch (error) {
    throw error
  }
}

export {
  GetData,
  GetDataCombobox,
  GetDataAsync,
}
