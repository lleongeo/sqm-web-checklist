import React, { useEffect, useState } from 'react';
import { GvdGrid, GvdDatePicker, GvdSpinner } from '../../shared';
import { useDispatch, useSelector } from 'react-redux';
import { GetLocalizacionesAction, GetCondicionesAction, GetDefectosAction, GetPosicionesBodegaAction, GetBodegasAction } from '../../../redux/actions/references/referencesActions';
import { textAreaEditor, dropDownEditor } from '../../shared/Grid/Helper';
import kendo from '@progress/kendo-ui';
import $ from "jquery";
import { Row, Col, Button, Label, Alert } from 'reactstrap';
import { CreateUrlImg } from '../../../service/storage';
import { emptyStringValidation } from '../../shared/Grid/Helper/validations';
import { carouselTemplate } from '../../../service/kendo/KendoTemplates';
import moment from 'moment';
import languageConfig from "../../../config/languageConfig"
import Swal from 'sweetalert2';
import { DateRangeValidator } from '../../../service/helper';
import { GetColorHex } from '../../../service/kendo/StyleJs';

const CheckListDetailsGrid = () => {

   var [datetimeFrom, setDatetimeFrom] = useState(null);
   var [datetimeTo, setDatetimeTo] = useState(null);

   const user = useSelector(state => state.auth.user);
   const lang = useSelector(state => state.ux.language);
   const localizacionesValues = useSelector(state => state.references.localizaciones);
   const condicionValues = useSelector(state => state.references.condiciones);
   //const bodegasValues = useSelector(state => state.references.bodegas);
   const defectosValues = useSelector(state => state.references.defectos);
   const posicionesBodegasValues = useSelector(state => state.references.posicionesBodega);

   var dispatch = useDispatch();

   var localizaciones = () => dispatch(GetLocalizacionesAction());
   var condiciones = () => dispatch(GetCondicionesAction());
   //var bodegas = () => dispatch(GetBodegasAction());
   var posicionesBodegas = () => dispatch(GetPosicionesBodegaAction());
   var defectos = () => dispatch(GetDefectosAction());

   var [dataSource, setDataSource] = useState({
      url: {
         read: "CheckListDetailsCrud",
         create: "CheckListDetailsCrud",
         update: "CheckListDetailsCrud",
         destroy: "CheckListDetailsCrud"
      },
      model: {
         id: "idCheckListDetails",
         fields: {
            idCheckListDetails: { type: "number", editable: false, nullable: true },
            idTarjeta: { type: "string", editable: false },
            locked: { type: "boolean", editable: false },
            idCheckListMaster: { type: "number", editable: false },
            idPallet: { type: "number", editable: true, validation: { min: 0 } },
            idDefecto: { type: "number", editable: true },
            nroTarjeta: {
               type: "number", editable: true,
               validation: {
                  min: 0,
                  required: true,
                  emptyStringValidation: input => emptyStringValidation(input)
               }
            },
            idLocalizacion: { type: "number", editable: true },
            idPosicionBodega: { type: "number", editable: true },
            idCondicion: { type: "number", editable: true },
            observaciones: { type: "string", editable: true },
            fechaCreacion: { type: "date", editable: false },
            imagenes: { type: "string", editable: false },
            idLote: { type: "string", editable: false },
            fechaIngreso: { type: "string", editable: false },
         }
      },
      render: false

   });

   useEffect(() => {
      localizaciones();
      condiciones();
      //bodegas();
      defectos();
      posicionesBodegas();
   }, [])

   var wnd, detailsTemplate = kendo.template(carouselTemplate);

   function showDetails(e) {
      e.preventDefault();

      wnd = $("#details")
         .kendoWindow({
            title: "Imágenes",
            modal: true,
            visible: false,
            resizable: false,
            width: 800,
            height: 600
         }).data("kendoWindow");

      var dataItem = this.dataItem($(e.currentTarget).closest("tr"));

      if (dataItem.imagenes) {
         var imgs = dataItem.imagenes.split(',').map(i => {
            return CreateUrlImg(i);
         });
      }

      var data = {
         imagenes: imgs,
         nroTarjeta: dataItem.nroTarjeta,
         idLote: dataItem.idLote,
         fechaIngreso: dataItem.fechaIngreso,
         producto: dataItem.producto
      }

      wnd.content(detailsTemplate(data));
      wnd.center().open();
   }

   var columns = [
      {
         field: "idTarjeta",
         title: "Tarjeta",
         width: "120px",
      },
      {
         field: "idLocalizacion",
         title: "Localización",
         width: "120px",
         values: localizacionesValues
      },
      {
         field: "locked",
         title: "Locked",
         width: "80px",
         template: "#if (locked) {# <i class='fal fa-lock'></i> #} else {# <i class='fal fa-unlock'></i> #}#"
      },
      {
         field: "idPallet",
         title: "Pallet",
         width: "120px",
         format: "{0:0}"
      },
      {
         field: "idCondicion",
         title: "Condición",
         width: "120px",
         editor: (container, opcions) => dropDownEditor(container, opcions, "condiciones", "condicion", "idCondicion"),
         values: condicionValues,
         template: function (dataItem) {
            if (dataItem.colorHex !== null && dataItem.colorHex !== "" && dataItem.colorHex !== undefined) {
               var color = dataItem.colorHex.toLowerCase().replace("0xff", "#");
               return "<div style='background-color: " + color + "; text-align: center;'><span style='color: " + GetColorHex(dataItem.colorHex) + "; '>" + dataItem.descripcionCondicion + "</span></div>";
            } else {
               return null;
            }
         },
      },
      {
         field: "idDefecto",
         title: "Defecto",
         width: "120px",
         values: defectosValues,
         editor: (container, opcions) => dropDownEditor(container, opcions, "defectos", "defecto", "idDefecto", "idCondicion")
      },
      {
         field: "nroTarjeta",
         title: "Nro Tarjeta",
         width: "120px",
         format: "{0:0}"
      },
      {
         field: "idPosicionBodega",
         title: "Posición Bodega",
         width: "120px",
         values: posicionesBodegasValues,
         editor: (container, opcions) => dropDownEditor(container, opcions, "posicionesBodegas", "posicion", "idPosicionBodega")
      },
      {
         field: "observaciones",
         title: "Observaciones",
         width: "120px",
         editor: textAreaEditor
      },
      {
         field: "fechaCreacion",
         title: "Fecha Creación",
         width: "120px",
         template: "#= kendo.toString(kendo.parseDate(fechaCreacion), 'dd-MM-yyyy HH:mm:ss') #"
      },
      {
         field: "imagenes",
         title: "imagenes",
         width: "120px",
         hidden: true,
      },
      {
         command: [{ text: languageConfig[lang].kendo.viewImages, click: showDetails, title: " ", width: "180px", visible: function (dataItem) { return dataItem.imagenes !== null } }]
      },
   ]

   var gridConfig = {
      toolbar: ["excel"],
      user: user,
      autoBind: true,
      lang: lang
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

   return (
      columns[1].values.length > 0 &&
         columns[4].values.length > 0 &&
         columns[7].values.length > 0 ?

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
         : <GvdSpinner />
   );
}

export default CheckListDetailsGrid;
