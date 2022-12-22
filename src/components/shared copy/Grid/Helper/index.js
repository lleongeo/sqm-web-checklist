import Swal from 'sweetalert2';
import languageConfig from '../../../../config/languageConfig';
import kendo from '@progress/kendo-ui';
import { API_URL_BASE, API_KEY } from '../../../../service/constants';
import $ from "jquery";

export const CreateDataSource = config => {

   var _config = {
      pageSize: 50,
      params: {}
   };
   
   _config = { ..._config, ...config };
   
   const dataSource = new kendo.data.DataSource({
      transport: {
         read: {
            url: CreateUrlApi(_config.url.read, _config.filter),
            dataType: "json",
            type: "get",
            //data: {desde: "2020-02-17 00:00:00.000", hasta: "2020-02-18 00:00:00.000"},
            beforeSend: function (req) {
               const lista = ["CheckListDetailsCrud", "checklistdetailslog", "CheckListLock", "Embarques", "Yodo", "Litio"];
               
               if (lista.includes(_config.url.read)) {

                  req.setRequestHeader('userkey', _config.user.uid);

               } else {

                  req.setRequestHeader('apikey', API_KEY);
               }

               req.setRequestHeader('language', _config.lang);
            }
         },
         update: {
            url: CreateUrlApi(_config.url.update),
            dataType: "json",
            type: "put",
            beforeSend: function (req) {
               const lista = ["CheckListDetailsCrud", "checklistdetailslog", "CheckListLock", "Embarques", "Yodo", "Litio"];

               if (lista.includes(_config.url.read)) {

                  req.setRequestHeader('userkey', _config.user.uid);

               } else {

                  req.setRequestHeader('apikey', API_KEY);
               }

               req.setRequestHeader('language', _config.lang);
            }
         },
         destroy: {
            url: CreateUrlApi(_config.url.destroy),
            dataType: "json",
            type: "delete",
            beforeSend: function (req) {
               const lista = ["CheckListDetailsCrud", "checklistdetailslog", "CheckListLock", "Embarques", "Yodo", "Litio"];

               if (lista.includes(_config.url.read)) {

                  req.setRequestHeader('userkey', _config.user.uid);

               } else {

                  req.setRequestHeader('apikey', API_KEY);
               }

               req.setRequestHeader('language', _config.lang);
            }

         },
         create: {
            url: CreateUrlApi(_config.url.create),
            dataType: "json",
            type: "post",
            beforeSend: function (req) {
               const lista = ["CheckListDetailsCrud", "checklistdetailslog", "CheckListLock", "Embarques", "Yodo", "Litio"];
               if (lista.includes(_config.url.read)) {
                  req.setRequestHeader('userkey', _config.user.uid);
               } else {
                  req.setRequestHeader('apikey', API_KEY);
               }
               req.setRequestHeader('language', _config.lang);
            }
         },
         parameterMap: function (options, operation) {

            if (operation !== "read" && options.models) {
               return { models: kendo.stringify(options.models) };
            }
         }
      },
      requestStart: e => {
         if (config.requestStart !== undefined) {
            config.requestStart(e)
         }
      },
      requestEnd: e => {

         e.preventDefault();
         if (e && e.type !== "read") {
            if (e.response.success) {
               Swal.fire(e.type === "create" ? languageConfig[_config.lang].defaultConfirmAddSuccessTitle :
                  e.type === "update" ? languageConfig[_config.lang].defaultConfirmEditSuccessTitle :
                     e.type === "destroy" ? languageConfig[_config.lang].defaultConfirmDeleteSuccessTitle : ""
                  , e.response.message
                  , 'success'
               );

            } else {
               //console.error(e.response.message);
               Swal.fire(e.type === "create" ? languageConfig[_config.lang].defaultConfirmAddErrorTitle :
                  e.type === "update" ? languageConfig[_config.lang].defaultConfirmEditErrorTitle :
                     e.type === "destroy" ? languageConfig[_config.lang].defaultConfirmDeleteErrorTitle : ""
                  , e.response.message
                  , 'error'
               );
            }

            dataSource.read();
         }

      },
      batch: true,
      pageSize: _config.pageSize,
      schema: {
         model: _config.model
      }
   });

   return dataSource;
}

export const CreateCombobox = config => {

   return fetch(`${API_URL_BASE}${config.url}`)
      .then(function (response) {
         return response.json();
      })
      .then(function (data) {

         data.map((d, index) => {
            return { text: d[config.text], value: d[config.value] };
         }
         )

         //return data;
      }).then(data => {
         return data;
      });
}

export const textAreaEditor = function (container, options) {
   $('<textarea class = "k-textbox" data-bind="value: ' + options.field + '" rows="4" cols="25"></textarea>').appendTo(container);
};

export const dropDownEditor = (container, options, url, name, value, cascading = "") => {

   var dropDownEditorResult = $('<input id=' + options.field + ' name="' + options.field + '"/>')
      .appendTo(container)
      .kendoComboBox({
         cascadeFrom: cascading,
         autoBind: true,
         valuePrimitive: true,
         dataTextField: name,
         dataValueField: value,
         filter: "contains",
         dataSource: {
            type: "json",
            transport: {
               read: {
                  url: CreateUrlApi(url),
                  dataType: "json",
                  type: "get",
                  beforeSend: function (req) {
                     req.setRequestHeader('apikey', API_KEY);
                     req.setRequestHeader('language', 'EN');
                  }
               },
            },
         }
      });

   return dropDownEditorResult;

}

export const colorPickerEditor = (container, options) => {

   if (options.model.colorHex === null || options.model.colorHex === "" || options.model.colorHex === undefined) {
      options.model.colorHex = "#d24949";
   }

   $('<input name="' + options.field + '"/>')
      .appendTo(container)
      .kendoColorPicker({
         buttons: true,
         value: options.model.colorHex
      });

   // if (options.model.colorHex !== null && options.model.colorHex !== "" && options.model.colorHex !== undefined) {

   //    options.model.colorHex = options.model.colorHex.toLocaleLowerCase().replace("0xff", "");
   // }

}

export const CreateUrlApi = (url, params = {}, baseUrl = API_URL_BASE) => {
   var _url = new URL(`${baseUrl}${url}`);

   if(Object.entries(params).length !== 0){
      
      _url.search = new URLSearchParams(params).toString(); 
      return _url.href;
   }
   
   return _url.href;
}