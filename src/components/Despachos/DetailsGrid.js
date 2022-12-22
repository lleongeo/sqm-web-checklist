import React from 'react';
import { useSelector } from 'react-redux';
import CustomGrid from './CustomGrid';



const DespachosDetails = () => {

    const lang = useSelector(state => state.ux.language);
    const user = useSelector(state => state.auth.user);

    var columns = [
        { title: "Id", field: "idCheckListDespachosMasterLote", width: "80px" },
        { title: "Lote", field: "lote", width: "150px" },
        { title: "Fecha Creación", field: "fechaCreacion", width: "200px" },
        { title: "Producto", field: "producto", width: "200px" },
        { title: "Código", field: "codigo", width: "150px" },
        { title: "Envase", field: "envase", width: "150px" },
        { title: "Código Getin", field: "codigo_Getin", width: "150px" },
        { title: "Unidad", field: "unidad", width: "150px" },
        { title: "Serie", field: "serie", width: "150px" },
        { title: "SSCC", field: "sscc", width: "200px" },
        { title: "Orden Venta", field: "ordenVenta", width: "150px" },
        { title: "Nave", field: "nave", width: "150px" },
        { title: "Booking", field: "booking", width: "150px" },
        { title: "Contenedor", field: "contenedor", width: "150px" },
    ]

    var gridConfig = {
        toolbar: ["excel"],
        user,
        lang,
        select: "none",
        module: "DespachosDetails"
    }



    return (<CustomGrid columns={columns} gridConfig={gridConfig} />)
}


export default DespachosDetails;
