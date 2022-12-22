import React from 'react'
import GvdGrid from '../../shared/Grid'
import { useSelector } from 'react-redux'

const LocalizacionesGrid = () => {
   const lang = useSelector(state => state.ux.language)

   var columns = [
      { field: "idLocalizacion", title: "Id", width: "80px", editable: false, filterable: false, hidden: true },
      { field: "localizacion", title: "Localización", width: "220px" },
      { field: "descripcion", title: "Descripción", width: "220px" },
   ]

   var gridConfig = {
      isCRUD: true,
      lang,
      module: 'localizaciones',
      id: 'idLocalizacion',
      title: 'Localizaciones'
   }

   return (
      <div className="animated fadeIn">
         <GvdGrid columns={columns} gridConfig={gridConfig} />
      </div>
   )
}

export default LocalizacionesGrid
