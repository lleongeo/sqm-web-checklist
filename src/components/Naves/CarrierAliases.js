import React from 'react'
import GvdGrid from 'src/components/shared/Grid'
import { useSelector } from 'react-redux'

const CarrierAliases = () => {
  const lang = useSelector(state => state.ux.language)

  var columns = [
    { field: "idCarrierAlias", title: "Id", width: "80px", editable: false, filterable: false, hidden: true },
    { field: "oicarrierName", title: "OI Carrier Name", width: "220px" },
    { field: "oicarrierId", title: "OI Carrier Id", width: "220px" },
    { field: "navesCarrierName", title: "Naves Carrier Name", width: "220px" },
  ]

  var gridConfig = {
    isCRUD: true,
    lang,
    module: 'carrieraliases',
    id: 'idCarrierAlias',
    title: 'Carrier Aliases'
  }

  return (<div className="animated fadeIn">
    <GvdGrid columns={columns} gridConfig={gridConfig} />
  </div>)
}

export default CarrierAliases
