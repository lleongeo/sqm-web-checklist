import React, { useEffect, useState } from 'react'
import GvdGrid from '../../shared/Grid'
import { useDispatch, useSelector } from 'react-redux'
import { GetCondicionesAction } from '../../../redux/actions/references/referencesActions'
import { GvdSpinner } from '../../shared'

const checkLocked = (props) => {
   const chk = props.dataItem.activo
   const icon = chk ?
      <i className="fal fa-check"></i> :
      <i className="fal fa-times"></i>
   return (<td>{icon}</td>)
}

const DefectosGrid = () => {
   const lang = useSelector(state => state.ux.language)
   const condicionesValues = useSelector(state => state.references.condiciones)
   var dispatch = useDispatch()
   var [columns, setColumns] = useState(null)

   var gridConfig = {
      isCRUD: true,
      lang,
      module: 'defectos',
      id: 'idDefecto',
      idCondicion: 'condicion',
      title: 'Defectos'
   }

   useEffect(() => {
      const fetchCondiciones = () =>
         dispatch(GetCondicionesAction())

      if (!condicionesValues || condicionesValues.length <= 0) fetchCondiciones()

      if (condicionesValues && condicionesValues.length > 0)
         setColumns([
            { field: "idDefecto", title: "Id", width: "80px", editable: false, filterable: false, hidden: true },
            { field: "codigoDefecto", title: "Código Defecto", width: "120px", filter: 'number', type: 'number' },
            { field: "defecto", title: "Defecto", width: "350px", },
            { field: "idCondicion", title: "Condición", width: "120px", type: 'list', values: condicionesValues },
            { field: "descripcion", title: "Descripción", width: "350px" },
            { field: "activo", title: "Activo", width: "80px", type: 'boolean', cell: checkLocked, filterable: false },
         ])
   }, [condicionesValues, dispatch])
   console.log({ condicionesValues })
   return (
      condicionesValues && condicionesValues.length > 0 && columns !== null ?
         <div className="animated fadeIn">
            <GvdGrid columns={columns} gridConfig={gridConfig} />
         </div>
         : <GvdSpinner />
   )
}

export default DefectosGrid;

