import React, { useEffect } from 'react';
import GvdGrid from '../shared/Grid';
import { useDispatch, useSelector } from 'react-redux';
import { ReferencesAction } from '../../redux/actions/references/referencesActions';
import { textAreaEditor } from '../shared/Grid/Helper';
import TestTemplate from "./KendoTemplates";
import ReactDOMServer from "react-dom/server";

import kendo from '@progress/kendo-ui';
import $ from "jquery";

var _carousel = `<script id="javascriptTemplate" type="text/x-kendo-template">
<div id="details-container">
<div id="carouselExampleIndicators" className="carousel slide" data-ride="carousel">
    <ol className="carousel-indicators">
        <li data-target="#carouselExampleIndicators" data-slide-to="0" className="active"></li>
        <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
        <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
    </ol>
    <div className="carousel-inner">
        <div className="carousel-item active">
            <img className="d-block w-100" src="..." alt="First slide" />
        </div>
        <div className="carousel-item">
            <img className="d-block w-100" src="..." alt="Second slide" />
        </div>
        <div className="carousel-item">
            <img className="d-block w-100" src="..." alt="Third slide" />
        </div>
    </div>
    <a className="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="sr-only">Previous</span>
    </a>
    <a className="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="sr-only">Next</span>
    </a>
</div>
</div>
</script>`; //ReactDOMServer.renderToStaticMarkup(<TestTemplate />);
const CheckListDetailsGrid = () => {

   var dispatch = useDispatch();

   var references = () => dispatch(ReferencesAction());

   useEffect(() => {
      references();

   }, [])

   const localizacionesValues = useSelector(state => state.references.localizaciones);
   const condicionValues = useSelector(state => state.references.condiciones);
   const bodegasValues = useSelector(state => state.references.bodegas);
   const defectosValues = useSelector(state => state.references.defectos);

   var dt =
   {
      url: {
         read: "CheckListDetailsCrud",
         create: "CheckListDetailsCrud",
         update: "CheckListDetailsCrud",
         destroy: "CheckListDetailsCrud"
      },
      model: {
         id: "idCheckListDetails",//"IdCheckListDetails",
         fields: {
            idCheckListDetails: { type: "number", editable: false, nullable: true },

            idTarjeta: { type: "string", editable: false },
            idLocalizacion: { type: "number", editable: false },
            locked: { type: "boolean", editable: false },

            idCheckListMaster: { type: "number", editable: false },
            idPallet: { type: "number", editable: true, validation: { min: 0 } },
            idDefecto: { type: "number", editable: true },
            nroTarjeta: { type: "number", editable: true, validation: { min: 0 } },
            idPosicionBodega: { type: "number", editable: true },
            idCondicion: { type: "number", editable: false },
            observaciones: { type: "string", editable: true },
            fechaCreacion: { type: "date", editable: false },
         }
      }
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
         format: "{0:n0}"
      },
      {
         field: "idCondicion",
         title: "Condición",
         width: "120px",
         values: condicionValues
      },
      {
         field: "idDefecto",
         title: "Defecto",
         width: "120px",
         values: defectosValues
      },
      {
         field: "nroTarjeta",
         title: "Nro Tarjeta",
         width: "120px",
         format: "{0:n0}"
      },
      {
         field: "idPosicionBodega",
         title: "Posición Bodega",
         width: "120px",
         values: bodegasValues
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
      //  {
      //     field:"imagenes",
      //     title:"Imágenes",
      //     width:"150px",
      //     template: kendo.template($(_carousel).html())

      //  },
   ]


   var gridConfig = {
      toolbar: ["excel"]
   }


   return (
      columns[1].values[0] != null && columns[4].values[0] != null && columns[5].values[0] != null && columns[7].values[0] != null ? <GvdGrid dataSource={dt} columns={columns} gridConfig={gridConfig} /> : null
      //<TestTemplate />
   );
}


export default CheckListDetailsGrid;