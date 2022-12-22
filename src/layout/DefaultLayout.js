import React, { useEffect, useState } from 'react'
import { AppContent, AppSidebar, AppHeader } from '../components/index'
import { useSelector, useDispatch } from 'react-redux'
import { API_URL_BASE, API_KEY } from 'src/service/constants/index'
import navigation from 'src/_nav'
import * as d3 from 'd3'
import routes from 'src/routes'
import { setMenuRaw } from 'src/redux/actions/ux/uxActions'
import { useMsal } from '@azure/msal-react'
import { CNavGroup, CNavItem } from '@coreui/react'

const DefaultLayout = () => {
  const selectedLanguage = useSelector(state => state.ux.language)
  const [navigationx, setNavigation] = useState(navigation)
  const [routesx, setRoutes] = useState(routes)
  const { accounts } = useMsal()
  const dispatch = useDispatch()

  useEffect(() => {
    const preFillRootTree = (root, response) => {
      let list = response.filter(r => r.idCategoria === root.data.idCategoria)
      if (list.length <= 0)
        return null
      let data = list[0]
      return {
        idCategoria: data.idCategoria,
        idCategoriaPadre: data.idCategoriaPadre,
        name: data.alias,
        component: !root.hasOwnProperty("children") || root.children.length <= 0 ? CNavItem : CNavGroup,
        url: data.nombreCategoria,
        to: data.nombreCategoria,
        icon: data.icono,
        readOnly: data.soloLectura,
        items:
          !root.hasOwnProperty("children") ? null :
            root.children.length <= 0 ? null :
              root.children.map(child => preFillRootTree(child, response))
      }
    }

    if (accounts[0].username !== undefined) {
      // Fetch WorkflowItem Tree
      fetch(`${API_URL_BASE}UserProfileUser?Email=${accounts[0].username}`, {
        method: "GET",
        headers: new Headers({
          "apikey": API_KEY,
          "language": selectedLanguage
        })
      })
        .then(response => response.json())
        .then(response => {
          let categories = response
            .map(x => {
              if (x.idCategoriaPadre === null) x.idCategoriaPadre = 0
              return x
            })
          categories.push({ idCategoria: 0, idCategoriaPadre: "" })
          let root = d3.stratify()
            .id(function (d) { return d.idCategoria })
            .parentId(function (d) { return d.idCategoriaPadre })
            (categories)
          let preFill = preFillRootTree(root, categories)
          let navi = {
            items: []
          }
          preFill.items.map(x => navi.items.push(x))
          setNavigation(!preFill || !preFill.items ? navigation : navi.items)
          dispatch(setMenuRaw(response))
        })
        .catch(function (err) {
          console.log("Fetch Error :-S", err)
        })

      fetch(`${API_URL_BASE}Mensajes/Menu`, {
        method: "GET",
        headers: new Headers({
          "apikey": API_KEY,
          "language": selectedLanguage
        })
      })
        .then(response => response.json())
        .then(response => {
          setRoutes(routes.map(r => r.name = r.code !== 0 ? response.filter(res => res.codigo === r.code)[0].titulo : ''))
        })
        .catch(function (err) {
          console.log("Fetch Error :-S", err)
        })
    }

  }, [selectedLanguage, API_KEY, API_URL_BASE, accounts, dispatch])

  return (
    <div>
      <AppSidebar items={navigationx} />
      <div className="wrapper d-flex flex-column min-vh-100 bg-light">
        <AppHeader items={routesx} />
        <div className="body flex-grow-1 px-3">
          <AppContent />
        </div>
      </div>
    </div>
  )
}

export default DefaultLayout
