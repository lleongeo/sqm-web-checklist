import React, { useEffect, useState } from 'react'
import GvdGrid from '../../shared/Grid'
import { useDispatch, useSelector } from 'react-redux'
import { GetBodegasAction } from 'src/redux/actions/references/referencesActions'
import { CSpinner } from '@coreui/react'

const checkLocked = (props) => {
   const chk = props.dataItem.activo
   const icon = chk ?
      <i className="fal fa-check"></i> :
      <i className="fal fa-times"></i>
   return (<td>{icon}</td>)
}

const PosicionesBodegasGrid = () => {
   const lang = useSelector(state => state.ux.language)
   const bodegasValues = useSelector(state => state.references.bodegas)
   var dispatch = useDispatch()
   var [columns, setColumns] = useState(null)

   var gridConfig = {
      isCRUD: true,
      lang,
      module: 'posicionesBodegas',
      id: 'idPosicionBodega',
      idBodega: 'bodega',
      title: 'Posiciones Bodegas'
   }

   useEffect(() => {
      const fetchBodegas = () =>
         dispatch(GetBodegasAction())

      if (!bodegasValues || bodegasValues.length <= 0) fetchBodegas()

      if (bodegasValues && bodegasValues.length > 0)
         setColumns([
            { field: "idPosicionBodega", title: "Id", width: "80px", editable: false, filterable: false, hidden: true },
            { field: "posicion", title: "Posición", width: "150px", },
            { field: "descripcion", title: "Descripción", width: "320px" },
            { field: "localizacion", title: "Localización", width: "150px", editable: false },
            { field: "idBodega", title: "Bodega", width: "180px", type: 'list', values: bodegasValues },
            { field: "activo", title: "Activo", width: "80px", type: 'boolean', cell: checkLocked, filterable: false },
         ])
   }, [bodegasValues, dispatch])

   return (
      bodegasValues && bodegasValues.length > 0 && columns !== null ?
         <div className="animated fadeIn">
            <GvdGrid columns={columns} gridConfig={gridConfig} />
         </div>
         : <CSpinner color="primary" />
   )
}

export default PosicionesBodegasGrid
