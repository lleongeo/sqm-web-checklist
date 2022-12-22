import React, { useState } from 'react';
import GvdGrid from '../shared/Grid';
import { useSelector } from 'react-redux';
import moment from "moment";
import { Row, Col, Button, Label, Alert } from 'reactstrap';
import { GvdDatePicker } from '../shared';
import languageConfig from '../../config/languageConfig';
import { DateRangeValidator } from '../../service/helper';
import Swal from 'sweetalert2';
import Input from 'reactstrap/lib/Input';

const LotesDespachoDetailsGrid = () => {

  const user = useSelector(state => state.auth.user);
  const lang = useSelector(state => state.ux.language);

  var [datetimeFrom, setDatetimeFrom] = useState(null);
  var [datetimeTo, setDatetimeTo] = useState(null);
  var [dataSource, setDataSource] = useState({
    url: {
      read: "GviewCheckListLotesDespachoDetails",
      create: "GviewCheckListLotesDespachoDetails",
      update: "GviewCheckListLotesDespachoDetails",
      destroy: "GviewCheckListLotesDespachoDetails",
    },
    model: {
      id: "idCheckListLotesDespachoDetails",
      fields: {
        idCheckListLotesDespachoDetails: { type: "number", editable: false },
        idCheckListLotesDespachoMaster: { type: "number", editable: false },
        localizacion: { type: "string", editable: false },
        idTarjeta: { type: "number", editable: false },
        idPallet: { type: "number", editable: false },
        codigoDefecto: { type: "number", editable: false },
        nroTarjeta: { type: "number", editable: false },
        condicion: { type: "string", editable: false },
        observaciones: { type: "string", editable: false },
        fechaCreacion: { type: "date", editable: false },
        usuarioCreacion: { type: "string", editable: false },
      }
    },
    render: false
  });

  var columns = [
    {
      field: "idTarjeta",
      title: "Tarjeta",
      width: "120px",
    },
    {
      field: "idPallet",
      title: "Pallet",
      width: "120px",
    },
    {
      field: "codigoDefecto",
      title: "Código Defecto",
      width: "120px",
    },
    {
      field: "nroTarjeta",
      title: "NroTarjeta",
      width: "120px",
    },
    {
      field: "condicion",
      title: "Condicion",
      width: "120px",
    },
    {
      field: "observaciones",
      title: "Observaciones",
      width: "120px",
    },

    {
      field: "usuarioCreacion",
      title: "Usuario Creación",
      width: "120px",
    },
    {
      field: "fechaCreacion",
      title: "Fecha Creación",
      width: "120px",
      template: "#= kendo.toString(kendo.parseDate(fechaCreacion), 'dd-MM-yyyy') #"
    },


  ]

  const handleOnClick = (e) => {
    var { error } = DateRangeValidator(datetimeFrom, datetimeTo);

    if (error) {
      Swal.fire({
        title: "Error",
        text: "El rango de fecha no puede exceder los 30 días.",
        icon: 'error',
        confirmButtonColor: '#f27474',

      });
    } else {
      setDataSource({
        ...dataSource,
        ...dataSource.filter = {
          desde: moment(datetimeFrom).format(),
          hasta: moment(datetimeTo).add(23, 'hours').add(59, 'minutes').add(59, 'seconds').format()
        },
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

  var gridConfig = {
    toolbar: ["excel"],
    user,
    lang
  }

  return (
    <div className="animated fadeIn">
      <Row>
        <Col xs="5" md="3" lg="3" xl="2" className="align-self-center">
          <Label>{languageConfig[lang].filter.from}</Label>
          <br />
          <GvdDatePicker
            name="datetimeFrom"
            value={datetimeFrom}
            onChange={handleOnChange}
            lang={lang.toLowerCase()}
          />

        </Col>
        <Col xs="5" md="3" lg="3" xl="2" className="align-self-center">
          <Label>{languageConfig[lang].filter.to}</Label>
          <br />
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
        <Col xs="12" >

          <GvdGrid dataSource={dataSource} columns={columns} gridConfig={gridConfig} />
        </Col>
        <div id="details"></div>
      </Row>
    </div>
  );
}

export default LotesDespachoDetailsGrid;
