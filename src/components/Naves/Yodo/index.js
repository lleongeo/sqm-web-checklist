import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import NavesGrid from '../NavesGrid';


const Yodo = () => {

    const lang = useSelector(state => state.ux.language);
    const user = useSelector(state => state.auth.user);

    var columns = [
        { width: "120px", field: "dispch", title: "Dispch" },
        { width: "120px", field: "entregaSap", title: "EntregaSap" },
        { width: "120px", field: "ordenSap", title: "OrdenSap" },
        { width: "120px", field: "filial", title: "Filial" },
        { width: "120px", field: "customer", title: "Customer" },
        { width: "120px", field: "product", title: "Product" },
        { width: "120px", field: "mt", title: "Mt" },
        { width: "120px", field: "code", title: "Code" },
        { width: "120px", field: "nroBags", title: "NroBags" },
        { width: "120px", field: "palletKg", title: "PalletKg" },
        { width: "120px", field: "fcl", title: "Fcl" },
        { width: "300px", field: "destination", title: "Destination" },
        { width: "300px", field: "vessel", title: "Vessel" },
        { width: "120px", field: "shippingStatus", title: "ShippingStatus" },
        { width: "120px", field: "via", title: "Via" },
        { width: "200px", field: "etapol", title: "Etapol" },
        { width: "200px", field: "edtpol", title: "Edtpol" },
        { width: "200px", field: "etapod", title: "Etapod" },
        { width: "120px", field: "ctr", title: "Ctr" },
        { width: "120px", field: "edtmth", title: "Edtmth" },
        { width: "120px", field: "monthdis", title: "Monthdis" },
        { width: "120px", field: "yeardis", title: "Yeardis" },
        { width: "200px", field: "fechaDato", title: "FechaDato" },
    ]

    var gridConfig = {
        toolbar: ["excel"],
        user,
        lang,
        select: "multiple",
        module: "Yodo"
    }

    return (<NavesGrid columns={columns} gridConfig={gridConfig} />)
}


export default Yodo;