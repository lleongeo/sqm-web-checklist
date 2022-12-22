import React, { Suspense, useEffect, useState } from 'react'
import { BrowserRouter, HashRouter, Route, Routes } from 'react-router-dom'
import './scss/style.scss'
import { AuthenticatedTemplate, UnauthenticatedTemplate, useMsal } from '@azure/msal-react'
import { loginRequest } from 'src/config/authConfig'
import { API_URL_BASE, API_KEY } from 'src/service/constants/index'
import { useSelector, useDispatch } from 'react-redux'
import { GET_USER } from './redux/actions/actionTypes/auth'

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
)

const DefaultLayout = React.lazy(() => import('./layout/DefaultLayout'))

const ProfileContent = () => {
  return (
    <HashRouter>
      <Suspense fallback={loading}>
        <Routes>
          <Route path="*" name="Home" element={<DefaultLayout />} />
        </Routes>
      </Suspense>
    </HashRouter>
  )
}

const App = () => {
  const { instance, accounts } = useMsal()
  const [user, setUser] = useState(null)
  const selectedLanguage = useSelector(state => state.ux.language)
  const dispatch = useDispatch()

  useEffect(() => {
    const handleLogin = async (loginType) => {
      if (loginType === "redirect") {
        await instance
          .loginRedirect(loginRequest)
          .catch((err) => console.log({ err }))
      }
    }

    if (accounts.length > 0) return

    async function fetchData() {
      await handleLogin("redirect")
    }
    fetchData()
  }, [accounts, instance])

  useEffect(() => {
    const retrieveUser = (email) => {
      fetch(`${API_URL_BASE}account`, {
        method: "GET",
        headers: new Headers({
          "Content-Type": "application/json",
          "apikey": API_KEY,
          "language": selectedLanguage,
          email,
        })
      })
        .then(response => response.json())
        .then(response => {
          setUser(response)
          dispatch({
            type: GET_USER,
            payload: response
          })
        })
        .catch(function (err) {
          console.log("Fetch Error :-S", err)
        })
    }
    if (accounts.length <= 0 || user !== null) return
    else retrieveUser(accounts[0].username)
  }, [accounts, user, dispatch, selectedLanguage])

  return (
    <div className="App">
      <AuthenticatedTemplate>
        <ProfileContent />
      </AuthenticatedTemplate>

      <UnauthenticatedTemplate>
        {`No hay ninguna sesion iniciada, por favor recargue la pagina para iniciar sesion.`}
      </UnauthenticatedTemplate>
    </div>
  )
}

export default App
