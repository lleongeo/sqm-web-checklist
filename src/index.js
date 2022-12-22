import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import App from './App'
import store from './redux/store'
import reportWebVitals from './reportWebVitals'
import { MsalProvider } from "@azure/msal-react"
import { PublicClientApplication } from "@azure/msal-browser"
import { msalConfig } from 'src/config/authConfig'

const pca = new PublicClientApplication(msalConfig);
const root = ReactDOM.createRoot(document.getElementById('root'))

root.render(
  <MsalProvider instance={pca}>
    <Provider store={store}>
      <App />
    </Provider>
  </MsalProvider>,
)

reportWebVitals()
