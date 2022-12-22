import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { API_URL_BASE, API_KEY } from 'src/service/constants/index'
import languageConfig from '../../config/languageConfig'
import { CCol, CLink, CListGroup, CListGroupItem, CRow } from '@coreui/react'

const ReferencesContainer = () => {
  const selectedLanguage = useSelector(state => state.ux.language)
  const user = useSelector(state => state.auth.user)
  const [referenceCards, setReferenceCard] = useState(null)

  useEffect(() => {
    fetch(`${API_URL_BASE}UserProfileUser?Email=${user.email}`, {
      method: "GET",
      headers: new Headers({
        "apikey": API_KEY,
        "language": "EN"
      })
    })
      .then(response => response.json())
      .then(response => {
        setReferenceCard(response.map(x => {
          let spl = x.nombreCategoria.split("/")
          x.alias = spl.length > 3 && spl[2] === "referencias" ?
            `menu${x.alias.split(" ").join("").replace("/", "")}` : ''
          return x
        }

        ).filter(x => x.alias !== ''))
      })

  }, [selectedLanguage])

  if (referenceCards !== null)
    console.log(referenceCards.filter(x => x !== null))


  return (

    <CListGroup>
      {
        !referenceCards || referenceCards.length <= 0 ? null :
          referenceCards.map((card, icard) => {
            return (
              <CLink key={icard} to={card.nombreCategoria} className="text-muted">
                <CListGroupItem key={card.idCategoria}>
                  <CRow>
                    <CCol xs="1">
                      <i className={`${card.icono} icons font-2xl`}></i>
                    </CCol>
                    <CCol xs="11">
                      {languageConfig[selectedLanguage][card.alias]}
                    </CCol>
                  </CRow>
                </CListGroupItem>
              </CLink>
            )
          })
      }
    </CListGroup>
  )
}

export default ReferencesContainer