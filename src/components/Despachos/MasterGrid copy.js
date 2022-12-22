import React, { useEffect, useState } from 'react';
import { GvdGrid, GvdSpinner } from '../shared';
import { useDispatch, useSelector } from 'react-redux';
import { GetLocalizacionesAction, GetUsuariosAction, GetTransportistasAction, GetLugarRevisionesAction, GetTipoContenedoresAction, GetContenedoresStatusAction } from '../../redux/actions/references/referencesActions';
import $ from 'jquery';
import moment from "moment";
import { Row, Col, Button, Label, Alert, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { GvdDatePicker } from '../shared';
import languageConfig from '../../config/languageConfig';
import { DateRangeValidator } from '../../service/helper';
import Swal from 'sweetalert2';
import Select from 'react-select'
import { API_KEY, API_URL_BASE } from '../../service/constants/index';
import showMessage from '../../service/ShowMessage';

const ContenedoresMasterGrid = () => {

  const user = useSelector(state => state.auth.user);
  const lang = useSelector(state => state.ux.language);

  var [datetimeFrom, setDatetimeFrom] = useState(null);
  var [datetimeTo, setDatetimeTo] = useState(null);
  var [dataSource, setDataSource] = useState({
    url: {
      read: "CheckListContenedoresMaster",
      create: "CheckListContenedoresMaster",
      update: "CheckListContenedoresMaster",
      destroy: "CheckListContenedoresMaster",
    },
    model: {
      id: "idCheckListContenedoresMaster",
      fields: {
        idCheckListContenedoresMaster: { type: "number", editable: false },
        idLocalizacion: { type: "string", editable: false },
        fechaRegistroApp: { type: "string", editable: false },
        idUsuario: { type: "string", editable: false },
        idTransportistas: { type: "string", editable: false },
        idLugarRevisiones: { type: "string", editable: false },
        contenedor: { type: "string", editable: false },
        nselloNaviera: { type: "string", editable: false },
        booking: { type: "string", editable: false },
        producto: { type: "string", editable: false },
        ordenVenta: { type: "string", editable: false },
        nave: { type: "string", editable: false },
        naviera: { type: "string", editable: false },
        nselloSqm: { type: "string", editable: false },
        reparado: { type: "boolean", editable: false },
        censelloConEir: { type: "boolean", editable: false },
        ceabolladuras: { type: "boolean", editable: false },
        cemanillasFuncionando: { type: "boolean", editable: false },
        cecorrectoCierreApertura: { type: "boolean", editable: false },
        cedeformaciones: { type: "boolean", editable: false },
        cioxidoParedes: { type: "boolean", editable: false },
        cielementosSobresalenParedes: { type: "boolean", editable: false },
        ciorificios: { type: "boolean", editable: false },
        cibasuraElementosExtraños: { type: "boolean", editable: false },
        cihumedad: { type: "boolean", editable: false },
        cigrietasPiso: { type: "boolean", editable: false },
        cielementosSobresalenPiso: { type: "boolean", editable: false },
        cipisoLevantaHunde: { type: "boolean", editable: false },
        idTipoContenedores: { type: "string", editable: false },
        contenedorFondo: { type: "string", editable: false },
        contenedorAlto: { type: "string", editable: false },
        contenedorAncho: { type: "string", editable: false },
        idContenedoresStatus: { type: "string", editable: false },
        comentario: { type: "string", editable: false },
        locked: { type: "boolean", editable: true },
        fechaCreacion: { type: "string", editable: false },
        usuarioCreacion: { type: "string", editable: false },
        notificado: { type: "string", editable: false },
      }
    },
    render: false
  });

  const [selectedRow, setSelectedRow] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState({ label: "Seleccione estatus", value: 0 });

  const localizacionesValues = useSelector(state => state.references.localizaciones);
  const usuariosValues = useSelector(state => state.references.usuarios);
  const transportistasValues = useSelector(state => state.references.transportistas);
  const lugarRevisionesValues = useSelector(state => state.references.lugarRevisiones);
  const tipoContenedoresValues = useSelector(state => state.references.tipoContenedores);
  const contenedoresStatusValues = useSelector(state => state.references.contenedoresStatus);

  var localizaciones = () => dispatch(GetLocalizacionesAction());
  var usuarios = () => dispatch(GetUsuariosAction());
  var transportistas = () => dispatch(GetTransportistasAction());
  var lugarRevisiones = () => dispatch(GetLugarRevisionesAction());
  var tipoContenedores = () => dispatch(GetTipoContenedoresAction());
  var contenedoresStatus = () => dispatch(GetContenedoresStatusAction());

  var dispatch = useDispatch();

  const [wwwModal, setWwwModal] = useState(false);

  var columns = [
    { field: "idCheckListContenedoresMaster", title: "Id", width: "50px" },
    { field: "idLocalizacion", title: "IdLocalizacion", width: "150px", values: localizacionesValues },
    { field: "fechaRegistroApp", title: "FechaRegistroApp", width: "150px", template: "#= kendo.toString(kendo.parseDate(fechaRegistroApp), 'dd-MM-yyyy') #" },
    { field: "idUsuario", title: "IdUsuario", width: "150px", values: usuariosValues },
    { field: "idTransportistas", title: "IdTransportistas", width: "150px", values: transportistasValues },
    { field: "idLugarRevisiones", title: "IdLugarRevisiones", width: "150px", values: lugarRevisionesValues },
    { field: "contenedor", title: "Contenedor", width: "150px" },
    { field: "nselloNaviera", title: "NselloNaviera", width: "150px" },
    { field: "booking", title: "Booking", width: "150px" },
    { field: "producto", title: "Producto", width: "150px" },
    { field: "ordenVenta", title: "OrdenVenta", width: "150px" },
    { field: "nave", title: "Nave", width: "150px" },
    { field: "naviera", title: "Naviera", width: "150px" },
    { field: "nselloSqm", title: "NselloSqm", width: "150px" },
    { field: "reparado", title: "Reparado", width: "150px" },
    { field: "censelloConEir", title: "CenselloConEir", width: "150px" },
    { field: "ceabolladuras", title: "Ceabolladuras", width: "150px" },
    { field: "cemanillasFuncionando", title: "CemanillasFuncionando", width: "150px" },
    { field: "cecorrectoCierreApertura", title: "CecorrectoCierreApertura", width: "150px" },
    { field: "cedeformaciones", title: "Cedeformaciones", width: "150px" },
    { field: "cioxidoParedes", title: "CioxidoParedes", width: "150px" },
    { field: "cielementosSobresalenParedes", title: "CielementosSobresalenParedes", width: "150px" },
    { field: "ciorificios", title: "Ciorificios", width: "150px" },
    { field: "cibasuraElementosExtraños", title: "CibasuraElementosExtraños", width: "150px" },
    { field: "cihumedad", title: "Cihumedad", width: "150px" },
    { field: "cigrietasPiso", title: "CigrietasPiso", width: "150px" },
    { field: "cielementosSobresalenPiso", title: "CielementosSobresalenPiso", width: "150px" },
    { field: "cipisoLevantaHunde", title: "CipisoLevantaHunde", width: "150px" },
    { field: "idTipoContenedores", title: "IdTipoContenedores", width: "150px", values: tipoContenedoresValues },
    { field: "contenedorFondo", title: "ContenedorFondo", width: "150px" },
    { field: "contenedorAlto", title: "ContenedorAlto", width: "150px" },
    { field: "contenedorAncho", title: "ContenedorAncho", width: "150px" },
    { field: "idContenedoresStatus", title: "IdContenedoresStatus", width: "150px", values: contenedoresStatusValues },
    { field: "comentario", title: "Comentario", width: "150px" },
    { field: "notificado", title: "Notificado", width: "150px" },
    { field: "usuarioCreacion", title: "UsuarioCreacion", width: "150px" },
    {
      field: "fechaCreacion",
      title: "Fecha Creación",
      width: "120px",
      template: "#= kendo.toString(kendo.parseDate(fechaCreacion), 'dd-MM-yyyy') #"
    },
    {
      field: "locked",
      title: "Locked",
      width: "120px",
      template: "#if (locked) {# <i class='fal fa-lock'></i> #} else {# <i class='fal fa-unlock'></i> #}#"
    },
    {
      field: "opciones",
      title: "Opciones",
      width: "200px",
      command: [{
        name: "Cambiar Estatus"
        , iconClass: "k-icon k-i-cog"
        , click: function (e) {
          e.preventDefault();
          setSelectedRow(this.dataItem($(e.target).closest("tr")));
          setWwwModal(true);
        }
      }]
    }

  ]

  const handleOnClick = (e) => {
    var { error } = DateRangeValidator(datetimeFrom, datetimeTo);

    if (error) {
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
    user: user,
    //autoBind: true,
    lang: lang
  }

  const toggle = () => {
    setWwwModal(false);
  }

  const cambiarEstatus = () => {
    if (selectedStatus.Value === 0) {
      Swal.fire('Advertencia', 'Debe seleccionar un estatus del listado.', 'warning');
      return;
    }

    if (selectedStatus.Value === parseInt(selectedRow.idContenedoresStatus)) {
      Swal.fire('Advertencia', 'Debe seleccionar un estatus diferente al actual.', 'warning');
      return;
    }

    fetch(`${API_URL_BASE}CheckListContenedoresMaster/Estatus/${selectedRow.idCheckListContenedoresMaster}/${selectedStatus.Value}`, {
      method: "PUT",
      headers: new Headers({
        "Content-Type": "application/json",
        "apikey": API_KEY,
        "language": lang
      })
    })
      //.then(response => response.json())
      .then(response => {
        handleOnClick();
        showMessage({
          icon: 'success',
          title: languageConfig[lang].defaultConfirmEditSuccessTitle
        });
        setWwwModal(false);
      })
      .catch(function (err) {
        console.log("Fetch Error :-S", err);
      });

  }

  useEffect(() => {
    localizaciones();
    usuarios();
    transportistas();
    lugarRevisiones();
    tipoContenedores();
    contenedoresStatus();
  }, [])

  return (
    columns[1].values &&
      columns[3].values &&
      columns[4].values &&
      columns[5].values &&
      columns[28].values &&
      columns[32].values &&
      columns[1].values.length > 0 &&
      columns[3].values.length > 0 &&
      columns[4].values.length > 0 &&
      columns[5].values.length > 0 &&
      columns[28].values.length > 0 &&
      columns[32].values.length > 0 ?
      < div className="animated fadeIn" >
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

          {contenedoresStatusValues.length <= 0 || selectedRow === null ? null :
            <Modal visible={wwwModal} onClose={toggle}>
              <ModalHeader onClose={toggle}>Cambiar Estatus</ModalHeader>
              <ModalBody>
                <Row>
                  <Col xs="12">
                    <p>Estado actual: {contenedoresStatusValues.filter(x => x.value === parseInt(selectedRow.idContenedoresStatus)).length <= 0 ? "asd" : contenedoresStatusValues.filter(x => x.value === parseInt(selectedRow.idContenedoresStatus))[0].text}</p>
                    <hr />
                    <Select
                      value={selectedStatus}
                      onChange={setSelectedStatus}
                      options={contenedoresStatusValues.map(x => {
                        return {
                          label: x.text,
                          Value: x.value
                        }
                      })} />
                  </Col>
                </Row>
              </ModalBody>
              <ModalFooter>
                <Button color="primary" onClick={() => cambiarEstatus()}>Guardar</Button>{' '}
                <Button color="secondary" onClick={toggle}>Cancelar</Button>
              </ModalFooter>
            </Modal>}

        </Row>
      </div > : <GvdSpinner />
  );
}

export default ContenedoresMasterGrid;
