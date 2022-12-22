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

const LotesDespachoMasterGrid = () => {

  const user = useSelector(state => state.auth.user);
  const lang = useSelector(state => state.ux.language);

  var [datetimeFrom, setDatetimeFrom] = useState(null);
  var [datetimeTo, setDatetimeTo] = useState(null);
  var [nroLote, setNroLote] = useState(null);
  var [dataSource, setDataSource] = useState({
    url: {
      read: "GviewCheckListLotesDespachoMaster",
      create: "GviewCheckListLotesDespachoMaster",
      update: "GviewCheckListLotesDespachoMaster",
      destroy: "GviewCheckListLotesDespachoMaster",
    },
    model: {
      id: "idCheckListLotesDespachoMaster",
      fields: {
        idCheckListLotesDespachoMaster: { type: "number", editable: false },
        localizacion: { type: "string", editable: false },
        idTarjeta: { type: "string", editable: false },
        idLote: { type: "string", editable: false },
        fecha: { type: "date", editable: false },
        fechaAccion: { type: "date", editable: false },
        locked: { type: "boolean", editable: false },
        fechaCreacion: { type: "date", editable: false },
        email: { type: "string", editable: false },
        operador: { type: "string", editable: false },
        movilizador: { type: "string", editable: false },
      }
    },
    render: false
  });

  var columns = [
    {
      field: "localizacion",
      title: "Localización",
      width: "120px",
    },
    {
      field: "idTarjeta",
      title: "Tarjeta",
      width: "120px",
    },
    {
      field: "idLote",
      title: "Lote",
      width: "120px",
    },
    {
      field: "fecha",
      title: "Fecha",
      width: "120px",
      template: "#= kendo.toString(kendo.parseDate(fecha), 'dd-MM-yyyy') #"
    },
    {
      field: "fechaAccion",
      title: "Fecha Acción",
      width: "120px",
      template: "#= kendo.toString(kendo.parseDate(fechaAccion), 'dd-MM-yyyy') #"
    },
    {
      field: "locked",
      title: "Locked",
      width: "120px",
      template: "#if (locked) {# <i class='fal fa-lock'></i> #} else {# <i class='fal fa-unlock'></i> #}#"
    },
    {
      field: "email",
      title: "Email",
      width: "120px",
    },
    {
      field: "operador",
      title: "Operador",
      width: "120px",
    },
    {
      field: "movilizador",
      title: "Movilizador",
      width: "120px",
    },

  ]

  const handleOnClick = (e) => {
    var { error } = DateRangeValidator(datetimeFrom, datetimeTo);

    if (error || nroLote === null || !Number.isInteger(nroLote)) {
      Swal.fire({
        title: "Error",
        text: "El rango de fecha no puede exceder los 30 días y debe llenar el Nro de Lote con números enteros.",
        icon: 'error',
        confirmButtonColor: '#f27474',

      });
    } else {
      setDataSource({
        ...dataSource,
        ...dataSource.filter = {
          desde: moment(datetimeFrom).format(),
          hasta: moment(datetimeTo).add(23, 'hours').add(59, 'minutes').add(59, 'seconds').format(),
          lote: nroLote
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
        <Col xs="5" md="3" lg="3" xl="2" className="align-self-center">
          <Label>{languageConfig[lang].filter.nroLote}</Label>
          <br />
          <Input
            name="nroLote"
            value={nroLote}
            onChange={(e) => setNroLote(e.target.value)}
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

export default LotesDespachoMasterGrid;
