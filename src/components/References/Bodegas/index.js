import React, { useEffect, useState } from 'react'
import GvdGrid from '../../shared/Grid'
import { useDispatch, useSelector } from 'react-redux'
import { GetLocalizacionesAction } from '../../../redux/actions/references/referencesActions'
import { CSpinner } from '@coreui/react'

const checkLocked = (props) => {
   const chk = props.dataItem.activo
   const icon = chk ?
      <i className="fal fa-check"></i> :
      <i className="fal fa-times"></i>
   return (<td>{icon}</td>)
}

const BodegasGrid = () => {
   const lang = useSelector(state => state.ux.language)
   const localizacionesValues = useSelector(state => state.references.localizaciones)
   var dispatch = useDispatch()
   var [columns, setColumns] = useState(null)

   var gridConfig = {
      isCRUD: true,
      lang,
      module: 'bodegas',
      id: 'idBodega',
      idLocalizacion: 'localizacion',
      title: 'Bodega'
   }

   useEffect(() => {
      const fetchLocalizaciones = () =>
         dispatch(GetLocalizacionesAction())

      if (!localizacionesValues || localizacionesValues.length <= 0) fetchLocalizaciones()

      if (localizacionesValues && localizacionesValues.length > 0)
         setColumns([
            { field: "idBodega", title: "Id", width: "80px", editable: false, filterable: false, hidden: true },
            { field: "bodega", title: "Bodega", width: "160px" },
            { field: "descripcion", title: "Descripción", width: "200px" },
            { field: "idLocalizacion", title: "Localización", width: "180px", type: 'list', values: localizacionesValues },
            { field: "activo", title: "Activo", width: "80px", type: 'boolean', cell: checkLocked, filterable: false },
         ])
   }, [localizacionesValues, dispatch])

   return (
      localizacionesValues && localizacionesValues.length > 0 && columns !== null ?
         <div className="animated fadeIn">
            <GvdGrid columns={columns} gridConfig={gridConfig} />
         </div>
         : <CSpinner color="primary" />
   )
}

export default BodegasGrid
