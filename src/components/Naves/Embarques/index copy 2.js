import React, { useState } from 'react';
import { GvdGrid, GvdDatePicker, GvdSpinner } from '../../shared';
import { useSelector } from 'react-redux';
import { Row, Col, Button, Label, Alert } from 'reactstrap';
import languageConfig from '../../../config/languageConfig';
import showMessage from '../../../service/ShowMessage';
import { API_URL_BASE, API_KEY } from '../../../service/constants/index'
import moment from 'moment';
import Swal from 'sweetalert2';
import { DateRangeValidator } from '../../../service/helper';
import { GetColorHex } from '../../../service/kendo/StyleJs';
import { textAreaEditor, dropDownEditor } from '../../shared/Grid/Helper';
import kendo from '@progress/kendo-ui';
import $ from "jquery";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquare, faCheckSquare, faFileCheck, faFileTimes, faTrashAlt } from "@fortawesome/pro-light-svg-icons";

const Embarques = () => {

    const lang = useSelector(state => state.ux.language);
    const user = useSelector(state => state.auth.user);
    var [datetimeFrom, setDatetimeFrom] = useState(null);
    var [datetimeTo, setDatetimeTo] = useState(null);

    var [dataSource, setDataSource] = useState({
        url: {
            read: "Embarques",
            create: "Embarques",
            update: "Embarques",
            destroy: "Embarques",
        },
        model: {
            id: "idEmbarque",
            fields: {
                idEmbarque: { type: "number", editable: false },
                tipoEmbarque: { type: "string", editable: false },
                oficinaVentas: { type: "string", editable: false },
                creadoPor: { type: "string", editable: false },
                fechaPreferenteEmbarque: { type: "date", editable: false },
                cliente: { type: "string", editable: false },
                consignatario: { type: "string", editable: false },
                pais: { type: "string", editable: false },
                puertoDestino: { type: "string", editable: false },
                navePreferente: { type: "string", editable: false },
                navieraPref: { type: "string", editable: false },
                producto: { type: "string", editable: false },
                tonelaje: { type: "number", editable: false },
                capacidadSaco: { type: "number", editable: false },
                codigoSaco: { type: "string", editable: false },
                nctd: { type: "number", editable: false },
                tonsCont: { type: "number", editable: false },
                tipoCtd: { type: "number", editable: false },
                cantidadPalletBulto: { type: "number", editable: false },
                pallet: { type: "string", editable: false },
                observacionEtiqueta: { type: "string", editable: false },
                ordenVenta: { type: "number", editable: false },
                entrega: { type: "number", editable: false },
                fechaPedido: { type: "date", editable: false },
                denominacion: { type: "string", editable: false },
                condicionVenta: { type: "string", editable: false },
                informacionEmbarque: { type: "string", editable: false },
                posicion: { type: "number", editable: false },
                anno: { type: "number", editable: false },
                semana: { type: "number", editable: false },
                motivoRoleo: { type: "string", editable: false },
                comentarios: { type: "string", editable: false },
                ninttra: { type: "number", editable: false },
                bookingBl: { type: "string", editable: false },
                nave: { type: "string", editable: false },
                naviera: { type: "string", editable: false },
                transportista: { type: "string", editable: false },
                pol: { type: "string", editable: false },
                productoDisponible: { type: "date", editable: false },
                eta: { type: "date", editable: false },
                etd: { type: "date", editable: false },
                productoEspecifico: { type: "string", editable: false },
                claseProducto: { type: "string", editable: false },
                avisoDeCierreNitrato: { type: "date", editable: false },
                status: { type: "string", editable: false },
                cierreStacking: { type: "date", editable: false },
                swb: { type: "string", editable: false },
                textoCabecera: { type: "string", editable: false },
                comment: { type: "string", editable: false },
                ets: { type: "date", editable: false },
                ultimoDiaStacking: { type: "date", editable: false },
                gastosDestinoPrepaid: { type: "string", editable: false },
                claseCliente: { type: "string", editable: false },
                clienteFinal: { type: "string", editable: false },
                fechaCambio: { type: "date", editable: false },
                fechaCreacion: { type: "date", editable: false },
                usuarioCreacion: { type: "string", editable: false },
                validado: { type: "boolean", editable: true },
            }
        },
        render: false
    });

    var columns = [
        {
            width: "120px",
            field: "validado",
            title: "Validado",
            template: "#if (validado) {# <i class='fal fa-check'></i> #} else {# <i class='fal fa-times'></i> #}#"
        },
        {
            width: "120px", field: "fechaPedido",
            title: "FechaPedido",
            template: "#= kendo.toString(kendo.parseDate(fechaPedido), 'dd-MM-yyyy HH:mm:ss') #"
        },
        { width: "120px", field: "tipoEmbarque", title: "TipoEmbarque" },
        { width: "120px", field: "oficinaVentas", title: "OficinaVentas" },
        { width: "120px", field: "creadoPor", title: "CreadoPor" },
        {
            width: "120px", field: "fechaPreferenteEmbarque",
            title: "FechaPreferenteEmbarque",
            template: "#= kendo.toString(kendo.parseDate(fechaPreferenteEmbarque), 'dd-MM-yyyy HH:mm:ss') #"
        },
        { width: "120px", field: "cliente", title: "Cliente" },
        { width: "120px", field: "consignatario", title: "Consignatario" },
        { width: "120px", field: "pais", title: "Pais" },
        { width: "120px", field: "puertoDestino", title: "PuertoDestino" },
        { width: "120px", field: "navePreferente", title: "NavePreferente" },
        { width: "120px", field: "navieraPref", title: "NavieraPref" },
        { width: "120px", field: "producto", title: "Producto" },
        { width: "120px", field: "tonelaje", title: "Tonelaje" },
        { width: "120px", field: "capacidadSaco", title: "CapacidadSaco" },
        { width: "120px", field: "codigoSaco", title: "CodigoSaco" },
        { width: "120px", field: "nctd", title: "Nctd" },
        { width: "120px", field: "tonsCont", title: "TonsCont" },
        { width: "120px", field: "tipoCtd", title: "TipoCtd" },
        { width: "120px", field: "cantidadPalletBulto", title: "CantidadPalletBulto" },
        { width: "120px", field: "pallet", title: "Pallet" },
        { width: "120px", field: "observacionEtiqueta", title: "ObservacionEtiqueta" },
        { width: "120px", field: "ordenVenta", title: "OrdenVenta" },
        { width: "120px", field: "entrega", title: "Entrega" },
        { width: "120px", field: "denominacion", title: "Denominacion" },
        { width: "120px", field: "condicionVenta", title: "CondicionVenta" },
        { width: "120px", field: "informacionEmbarque", title: "InformacionEmbarque" },
        { width: "120px", field: "posicion", title: "Posicion" },
        { width: "120px", field: "anno", title: "Anno" },
        { width: "120px", field: "semana", title: "Semana" },
        { width: "120px", field: "motivoRoleo", title: "MotivoRoleo" },
        { width: "120px", field: "comentarios", title: "Comentarios" },
        { width: "120px", field: "ninttra", title: "Ninttra" },
        { width: "120px", field: "bookingBl", title: "BookingBl" },
        { width: "120px", field: "nave", title: "Nave" },
        { width: "120px", field: "naviera", title: "Naviera" },
        { width: "120px", field: "transportista", title: "Transportista" },
        { width: "120px", field: "pol", title: "Pol" },
        { width: "120px", field: "productoDisponible", title: "ProductoDisponible" },
        {
            width: "120px", field: "eta",
            title: "Eta",
            template: "#= kendo.toString(kendo.parseDate(eta), 'dd-MM-yyyy HH:mm:ss') #"
        },
        {
            width: "120px", field: "etd",
            title: "Etd",
            template: "#= kendo.toString(kendo.parseDate(etd), 'dd-MM-yyyy HH:mm:ss') #"
        },
        { width: "120px", field: "productoEspecifico", title: "ProductoEspecifico" },
        { width: "120px", field: "claseProducto", title: "ClaseProducto" },
        {
            width: "120px", field: "avisoDeCierreNitrato",
            title: "AvisoDeCierreNitrato",
            template: "#= kendo.toString(kendo.parseDate(avisoDeCierreNitrato), 'dd-MM-yyyy HH:mm:ss') #"
        },
        { width: "120px", field: "status", title: "Status" },
        {
            width: "120px", field: "cierreStacking",
            title: "CierreStacking",
            template: "#= kendo.toString(kendo.parseDate(cierreStacking), 'dd-MM-yyyy HH:mm:ss') #"
        },
        { width: "120px", field: "swb", title: "Swb" },
        { width: "120px", field: "textoCabecera", title: "TextoCabecera" },
        { width: "120px", field: "comment", title: "Comment" },
        { width: "120px", field: "ets", title: "Ets" },
        {
            width: "120px", field: "ultimoDiaStacking",
            title: "UltimoDiaStacking",
            template: "#= kendo.toString(kendo.parseDate(ultimoDiaStacking), 'dd-MM-yyyy HH:mm:ss') #"
        },
        { width: "120px", field: "gastosDestinoPrepaid", title: "GastosDestinoPrepaid" },
        { width: "120px", field: "claseCliente", title: "ClaseCliente" },
        { width: "120px", field: "clienteFinal", title: "ClienteFinal" },
        {
            width: "120px", field: "fechaCambio",
            title: "FechaCambio",
            template: "#= kendo.toString(kendo.parseDate(fechaCambio), 'dd-MM-yyyy HH:mm:ss') #"
        },
        {
            width: "120px", field: "fechaCreacion",
            title: "FechaCreacion",
            template: "#= kendo.toString(kendo.parseDate(fechaCreacion), 'dd-MM-yyyy HH:mm:ss') #"
        },
        { width: "120px", field: "usuarioCreacion", title: "UsuarioCreacion" },

    ]

    var gridConfig = {
        toolbar: ["excel"],
        user,
        lang,
        select: "multiple"
    }

    const handleOnClick = (e) => {

        var { error } = DateRangeValidator(datetimeFrom, datetimeTo);

        if (error) {
            Swal.fire({
                title: "Error",
                text: languageConfig[gridConfig.lang].filter.message,
                icon: 'error',
                confirmButtonColor: '#f27474',

            });
        } else {
            setDataSource({
                ...dataSource,
                ...dataSource.filter = { desde: moment(datetimeFrom).format(), hasta: moment(datetimeTo).add(23, 'hours').add(59, 'minutes').add(59, 'seconds').format() },
                ...dataSource.render = true
            });
        }
    }

    const handleOnChange = e => {
        setDatetimeFrom(e.target.name === "datetimeFrom" ? new Date(e.target.value) : datetimeFrom);
        setDatetimeTo(e.target.name === "datetimeTo" ? new Date(e.target.value) : datetimeTo);
    }

    const handleDisableFilterButton = () => {
        var from = moment(datetimeFrom).isValid();
        var to = moment(datetimeTo).isValid();

        if (from && to)
            return false;
        else
            return true;
    }

    const validateSelected = (val) => {
        var entityGrid = $(".k-grid").data("kendoGrid");
        var rows = entityGrid.select();
        let data = [];
        rows.each(function (index, row) {
            var selectedItem = entityGrid.dataItem(row);
            // selectedItem has EntityVersionId and the rest of your model
            data.push(selectedItem.idEmbarque);
        });

        fetch(`${API_URL_BASE}Embarques`, {
            method: "PUT",
            body: JSON.stringify({ Id: data.join(","), Validado: val }),
            headers: new Headers({
                "Content-Type": "application/json",
                "userkey": user.uid,
                "language": lang
            })
        })
            .then(response => response.json())
            .then(response => {
                $(".k-grid").data("kendoGrid").dataSource.read();
            })
            .catch(function (err) {
                console.log("Fetch Error :-S", err);
            });
    }

    const deleteSelected = () => {
        var entityGrid = $(".k-grid").data("kendoGrid");
        var rows = entityGrid.select();
        let data = [];
        rows.each(function (index, row) {
            var selectedItem = entityGrid.dataItem(row);
            // selectedItem has EntityVersionId and the rest of your model
            data.push(selectedItem.idEmbarque);
        });



        fetch(`${API_URL_BASE}Embarques`, {
            method: "DELETE",
            body: JSON.stringify(data.join(",")),
            headers: new Headers({
                "Content-Type": "application/json",
                "userkey": user.uid,
                "language": lang
            })
        })
            .then(response => response.json())
            .then(response => {
                $(".k-grid").data("kendoGrid").dataSource.read();
            })
            .catch(function (err) {
                console.log("Fetch Error :-S", err);
            });
    }

    return (
        <div>
            <Row>
                <Col xs="2" className="align-self-center">
                    <Label>{languageConfig[lang].filter.from}</Label>
                    <GvdDatePicker
                        name="datetimeFrom"
                        value={datetimeFrom}
                        onChange={handleOnChange}
                        lang={lang.toLowerCase()}
                    />

                </Col>
                <Col xs="2" className="align-self-center">
                    <Label>{languageConfig[lang].filter.to}</Label>
                    <GvdDatePicker
                        name="datetimeTo"
                        value={datetimeTo}
                        onChange={handleOnChange}
                        lang={lang.toLowerCase()}
                    />
                </Col>
                <Col xs="1" className="align-self-end">
                    <Button onClick={handleOnClick} size="sm" type="button" disabled={handleDisableFilterButton()} className="k-button">{languageConfig[lang].filter.buttonText}</Button>
                </Col>
                <Col xs="7" >
                    <br />
                    <Button onClick={deleteSelected} className="float-right ml-1" color="danger"><FontAwesomeIcon icon={faTrashAlt} size="lg" />{` ${languageConfig[lang].deleteSelected}`}</Button>
                    {"  "}
                    <Button onClick={() => validateSelected(0)} className="float-right ml-1" color="success"><FontAwesomeIcon icon={faFileTimes} size="lg" />{` ${languageConfig[lang].unvalidateSelected}`}</Button>
                    {"  "}
                    <Button onClick={() => validateSelected(1)} className="float-right ml-1" color="success"><FontAwesomeIcon icon={faFileCheck} size="lg" />{` ${languageConfig[lang].validateSelected}`}</Button>
                </Col>
            </Row>
            <Row>
                <Col xs="12">
                    <br />
                    <Alert color="secondary">
                        {languageConfig[lang].filter.alert}
                    </Alert>
                </Col>
            </Row>
            <Row>
                <Col xs="12">
                    
                    <GvdGrid dataSource={dataSource} columns={columns} gridConfig={gridConfig} />
                </Col>
            </Row>
        </div>

    )
}


export default Embarques;