import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import CustomGrid from '../CustomGrid';



const CheckListDetails = () => {

    const lang = useSelector(state => state.ux.language);
    const user = useSelector(state => state.auth.user);

    var columns = [
        { field: "idCheckListDetails", title: "Id", width: "80px" },
        { field: "idLote", title: "IdLote", width: "150px" },
        { field: "producto", title: "Producto", width: "200px" },
        { field: "envase", title: "Envase", width: "120px" },
        { field: "codigo", title: "Código", width: "120px" },
        { field: "unidad", title: "Unidad", width: "100px" },
        { field: "total_Unidades", title: "Total Unidades", width: "130px" },
        { field: "codigo_Getin", title: "Código Getin", width: "150px" },
        { field: "serie", title: "Serie", width: "120px" },
        { field: "sscc", title: "SSCC", width: "180px" },
        { field: "correlativo_Venta", title: "Correlativo Venta", width: "150px" },
        { field: "localizacion", title: "Localización", width: "130px" },
        { field: "idTarjeta", title: "IdTarjeta", width: "170px" },
        { field: "nroTarjeta", title: "NroTarjeta", width: "150px" },
        { field: "idPallet", title: "IdPallet", width: "100px" },
        { field: "codigoDefecto", title: "Código Defecto", width: "130px" },
        { field: "posicion", title: "Posición", width: "130px" },
        { field: "condicion", title: "Condición", width: "120px" },
        { field: "fechaCreacion", title: "Fecha Creación", width: "180px" },
        { field: "usuarioCreacion", title: "Usuario Creación", width: "180px" },
        { field: "observaciones", title: "Observaciones", width: "250px" },
    ]

    var gridConfig = {
        toolbar: ["excel"],
        user,
        lang,
        select: "single",
        module: "CheckListDetails"
    }



    return (<CustomGrid columns={columns} gridConfig={gridConfig} />)
}


export default CheckListDetails;
