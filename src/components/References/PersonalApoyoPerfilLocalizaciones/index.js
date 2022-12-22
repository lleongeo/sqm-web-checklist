import React, { useEffect, useState } from 'react'
import GvdGrid from '../../shared/Grid'
import { useDispatch, useSelector } from 'react-redux'
import { GetLocalizacionesAction, GetPersonalApoyoPerfilesAction, GetPersonalApoyoAction } from 'src/redux/actions/references/referencesActions'
import { CSpinner } from '@coreui/react'

const PersonalApoyoPerfilLocalizacionesGrid = () => {
  var dispatch = useDispatch()
  const lang = useSelector(state => state.ux.language)
  const [columns, setColumns] = useState(null)

  const localizacionesValues = useSelector(state => state.references.localizaciones)
  const personalApoyoValues = useSelector(state => state.references.personalApoyo)
  const personalApoyoPerfilesValues = useSelector(state => state.references.personalApoyoPerfiles)

  var gridConfig = {
    isCRUD: true,
    hideEdit: true,
    lang,
    module: 'personalApoyoPerfilLocalizaciones',
    id: 'idPersonalApoyo',
    idPersonalApoyo: 'nombre',
    idPersonalApoyoPerfil: 'perfil',
    idLocalizacion: 'localizacion',
    title: 'Apoyo-Perfil-Localizaciones'
  }

  useEffect(() => {
    const fetchRef = () => {
      dispatch(GetLocalizacionesAction())
      dispatch(GetPersonalApoyoPerfilesAction())
      dispatch(GetPersonalApoyoAction())
    }

    if (
      !localizacionesValues || localizacionesValues.length <= 0 ||
      !personalApoyoValues || personalApoyoValues.length <= 0 ||
      !personalApoyoPerfilesValues || personalApoyoPerfilesValues.length <= 0
    )
      fetchRef()

    if (
      localizacionesValues && localizacionesValues.length > 0 &&
      personalApoyoValues && personalApoyoValues.length > 0 &&
      personalApoyoPerfilesValues && personalApoyoPerfilesValues.length > 0
    )
      setColumns([
        { field: "idPersonalApoyo", title: "Personal", width: "220px", type: 'list', values: personalApoyoValues, },
        { field: "idPersonalApoyoPerfil", title: "Perfil", width: "220px", type: 'list', values: personalApoyoPerfilesValues, },
        { field: "idLocalizacion", title: "Localización", width: "220px", type: 'list', values: localizacionesValues, },
      ])
  }, [localizacionesValues, dispatch])

  return (columns !== null ?
    <div className="animated fadeIn">
      <GvdGrid columns={columns} gridConfig={gridConfig} />
    </div>
    : <CSpinner color="primary" />
  )
}

export default PersonalApoyoPerfilLocalizacionesGrid
