import React, { useEffect, useState } from 'react'
import GvdGrid from 'src/components/shared/Grid/GridWithFilter'
import { useDispatch, useSelector } from 'react-redux'
import { GetLocalizacionesAction, GetBodegasAction, GetPosicionesBodegaAction } from 'src/redux/actions/references/referencesActions'
import { CSpinner } from '@coreui/react'

const ControlDescargaGrid = () => {
   var dispatch = useDispatch()
   const lang = useSelector(state => state.ux.language)
   const [columns, setColumns] = useState(null)
   const [pending, setPending] = useState(false)
   const localizacionesValues = useSelector(state => state.references.localizaciones)
   const bodegasValues = useSelector(state => state.references.bodegas)
   const posicionesBodegasValues = useSelector(state => state.references.posicionesBodega)

   var gridConfig = {
      isCRUD: true,
      lang,
      module: 'tocopilla',
      id: 'idChekListControlDescargaProductos',
      idLocalizacion: 'localizacion',
      idBodega: 'bodega',
      idPosicionesBodega: 'posicion',
      title: 'Control Descarga'
   }

   useEffect(() => {
      const fetchRef = () => {
         setPending(true)
         dispatch(GetLocalizacionesAction())
         dispatch(GetBodegasAction())
         dispatch(GetPosicionesBodegaAction())
      }

      if (
         (!localizacionesValues || localizacionesValues.length <= 0 ||
            !bodegasValues || bodegasValues.length <= 0 ||
            !posicionesBodegasValues || posicionesBodegasValues.length <= 0)
         && pending === false
      )
         fetchRef()

      if (
         localizacionesValues && localizacionesValues.length > 0 &&
         bodegasValues && bodegasValues.length > 0 &&
         posicionesBodegasValues && posicionesBodegasValues.length > 0
      )
         setColumns([
            { field: 'idChekListControlDescargaProductos', title: 'Id', width: '80px', editable: false, filterable: false, hidden: true },
            { field: 'nroMovimiento', title: 'NroMovimiento', width: '140px', editable: false },
            { field: 'fechaTransaccion', title: 'FechaTransaccion', width: '200px', type: 'date', editable: false },
            { field: 'filial', title: 'Filial', width: '150px', editable: false },
            { field: 'nroGuia', title: 'Nro Guia', width: '120px', editable: false },
            { field: 'origen', title: 'Origen', width: '220px', editable: false },
            { field: 'producto', title: 'Producto', width: '200px', editable: false },
            { field: 'patenteCamion', title: 'Patente Camion', width: '140px', editable: false },
            { field: 'cantOrigen', title: 'CantOrigen', width: '100px', editable: false },
            { field: 'cantRecepcion', title: 'CantRecepcion', width: '100px', type: 'number' },
            //{ field: 'idCentro', title: 'IdCentro', width: '100px', editable: false },
            { field: "idCentro", title: "Centro", width: "220px", editable: false, type: 'list', values: localizacionesValues, },
            //{ field: 'idCancha', title: 'IdCancha', width: '100px' },
            { field: "idCancha", title: "Cancha", width: "220px", type: 'list', values: bodegasValues, cascadeFrom: 'idCentro' },
            //{ field: 'idSector', title: 'IdSector', width: '100px' },
            { field: "idSector", title: "Sector", width: "220px", type: 'list', values: posicionesBodegasValues, cascadeFrom: 'idCancha' },
            { field: 'loteDestino', title: 'LoteDestino', width: '100px' },
            { field: 'loteInterno', title: 'LoteInterno', width: '100px' },
            { field: 'comentario', title: 'Comentario', width: '100px' },
            { field: 'estado', title: 'Estado', width: '100px', editable: false },
            { field: 'fechaModificacion', title: 'FechaModificacion', width: '200px', type: 'date', editable: false },
            { field: 'usuarioModificacion', title: 'UsuarioModificacion', width: '200px', editable: false },
         ])
   }, [localizacionesValues, bodegasValues, posicionesBodegasValues, pending, dispatch])
   console.log({ localizacionesValues, bodegasValues, posicionesBodegasValues })
   return (columns !== null ?
      <div className="animated fadeIn">
         <GvdGrid columns={columns} gridConfig={gridConfig} />
      </div>
      : <CSpinner color="primary" />
   )
}

export default ControlDescargaGrid
