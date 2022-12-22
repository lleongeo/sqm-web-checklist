import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import NavesGrid from '../NavesGrid';

const LitioGrid = () => {

    const lang = useSelector(state => state.ux.language);
    const user = useSelector(state => state.auth.user);

    var columns = [

        {
            width: "120px"
            , field: "dispch"
            , title: "Dispch"
        }, {
            width: "120px"
            , field: "entregaSap"
            , title: "EntregaSap"
        }, {
            width: "120px"
            , field: "ordenSap"
            , title: "OrdenSap"
        }, {
            width: "120px"
            , field: "filial"
            , title: "Filial"
        }, {
            width: "120px"
            , field: "customer"
            , title: "Customer"
        }, {
            width: "120px"
            , field: "product"
            , title: "Product"
        }, {
            width: "120px"
            , field: "mt"
            , title: "Mt"
        }, {
            width: "120px"
            , field: "code"
            , title: "Code"
        }, {
            width: "120px"
            , field: "bagKg"
            , title: "BagKg"
        }, {
            width: "120px"
            , field: "country"
            , title: "Country"
        }, {
            width: "120px"
            , field: "destination"
            , title: "Destination"
        }, {
            width: "120px"
            , field: "vessel"
            , title: "Vessel"
        }, {
            width: "120px"
            , field: "line"
            , title: "Line"
        }, {
            width: "120px"
            , field: "pol"
            , title: "Pol"
        }, {
            width: "120px"
            , field: "shippingSatus"
            , title: "ShippingSatus"
        }, {
            width: "120px"
            , field: "via"
            , title: "Via"
        }, {
            width: "120px"
            , field: "etapol"
            , title: "Etapol"
            , template: "#= kendo.toString(kendo.parseDate(etapol), 'dd-MM-yyyy HH:mm:ss') #"
        }, {
            width: "120px"
            , field: "etspol"
            , title: "Etspol"
            , template: "#= kendo.toString(kendo.parseDate(etspol), 'dd-MM-yyyy HH:mm:ss') #"
        }, {
            width: "120px"
            , field: "ctndr40"
            , title: "Ctndr40"
        }, {
            width: "120px"
            , field: "ctndr20"
            , title: "Ctndr20"
        }, {
            width: "120px"
            , field: "monthDis"
            , title: "MonthDis"
        }, {
            width: "120px"
            , field: "yearDis"
            , title: "YearDis"
        }, {
            width: "120px"
            , field: "fechaDato"
            , title: "FechaDato"
            , template: "#= kendo.toString(kendo.parseDate(fechaDato), 'dd-MM-yyyy HH:mm:ss') #"
        }
    ]

    var gridConfig = {
        toolbar: ["excel"],
        user,
        lang,
        select: "multiple",
        module: "Litio"
    }

    return (<NavesGrid columns={columns} gridConfig={gridConfig} />)
}


export default LitioGrid;