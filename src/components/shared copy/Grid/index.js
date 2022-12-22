import React from 'react';
import $ from 'jquery';
import { Grid, GridColumn } from '@progress/kendo-grid-react-wrapper';
import { CreateDataSource } from './Helper'
import Swal from 'sweetalert2';
import languageConfig from '../../../config/languageConfig';
import './style.css';
import kendo from "@progress/kendo-ui";
import { useSelector } from 'react-redux'

const GvdGrid = ({ dataSource, columns, gridConfig}) => {


  const userMenu = useSelector(state => state.ux.menu);
  const menu = userMenu.filter(x => x.nombreCategoria === window.location.href.split("#")[1]);

  const formatDate = (date) => {
    var d = new Date(date),
        second = '' + d.getSeconds(),
        minute = '' + d.getMinutes(),
        hour = '' + d.getHours(),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2)
        month = '0' + month;
    if (day.length < 2)
        day = '0' + day;

    return [year, month, day, hour, minute, second].join('');
}


  var _init = {
    toolbar: menu.readOnly ? ["excel"] : ["excel", "create"],
    command: menu.readOnly ? [] : [{ name: "edit", title: "Editar" }, {
      name: languageConfig[gridConfig.lang].kendo.grid["commands"]["destroy"] //"Delete"
      , iconClass: "k-icon k-i-close"
      , click: function (e) {  //add a click event listener on the delete button

        e.preventDefault();

        //prevent page scroll reset
        var tr = $(e.target).closest("tr"); //get the row for deletion
        var data = this.dataItem(tr); //get the row data so it can be referred later
        Swal.fire({
          title: languageConfig[gridConfig.lang].defaultConfirmTitle,
          text: languageConfig[gridConfig.lang].defaultConfirmText,
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#80BC00',
          cancelButtonColor: '#c1c1c1',
          confirmButtonText: languageConfig[gridConfig.lang].defaultConfirmContinue,
          cancelButtonText: languageConfig[gridConfig.lang].defaultConfirmCancel,
        }).then((result) => {
          if (result.value) {

            var grid = $(".k-grid").data("kendoGrid");
            grid.dataSource.remove(data)
            grid.dataSource.sync();
          }
        })

      }
    }],
    disableButtons: [],
    autoBind: true
  };

  var _gridConfig = { ..._init, ...gridConfig };

  var __gridConfig = dataSource.render === false ? { ..._gridConfig, ..._gridConfig.autoBind = false } : _gridConfig;

  //languageConfig[__gridConfig.lang].kendo.filterMenu. ,

  kendo.ui.FilterMenu.prototype.options.operators =
	$.extend(true, kendo.ui.FilterMenu.prototype.options.operators,{
	  "string": {
	    "eq":languageConfig[__gridConfig.lang].kendo.filterMenu.operators.string.eq,
	    "neq":languageConfig[__gridConfig.lang].kendo.filterMenu.operators.string.neq,
	    "startswith":languageConfig[__gridConfig.lang].kendo.filterMenu.operators.string.startswith,
	    "contains":languageConfig[__gridConfig.lang].kendo.filterMenu.operators.string.contains,
	    "doesnotcontain":languageConfig[__gridConfig.lang].kendo.filterMenu.operators.string.doesnotcontain,
	    "endswith":languageConfig[__gridConfig.lang].kendo.filterMenu.operators.string.endswith,
	    "isnull":languageConfig[__gridConfig.lang].kendo.filterMenu.operators.string.isnull,
	    "isnotnull":languageConfig[__gridConfig.lang].kendo.filterMenu.operators.string.isnotnull,
	    "isempty":languageConfig[__gridConfig.lang].kendo.filterMenu.operators.string.isempty,
	    "isnotempty":languageConfig[__gridConfig.lang].kendo.filterMenu.operators.string.isnotempty,
	  },
	  "number": {
	    "eq":languageConfig[__gridConfig.lang].kendo.filterMenu.operators.number.eq,
	    "neq":languageConfig[__gridConfig.lang].kendo.filterMenu.operators.number.neq,
	    "gte":languageConfig[__gridConfig.lang].kendo.filterMenu.operators.number.gte,
	    "gt":languageConfig[__gridConfig.lang].kendo.filterMenu.operators.number.gt,
	    "lte":languageConfig[__gridConfig.lang].kendo.filterMenu.operators.number.lte,
	    "lt":languageConfig[__gridConfig.lang].kendo.filterMenu.operators.number.lt,
	    "isnull":languageConfig[__gridConfig.lang].kendo.filterMenu.operators.number.isnull,
	    "isnotnull":languageConfig[__gridConfig.lang].kendo.filterMenu.operators.number.isnotnull,
	  },
	  "date": {
	    "eq":languageConfig[__gridConfig.lang].kendo.filterMenu.operators.date.eq,
	    "neq":languageConfig[__gridConfig.lang].kendo.filterMenu.operators.date.neq,
	    "gte":languageConfig[__gridConfig.lang].kendo.filterMenu.operators.date.gte,
	    "gt":languageConfig[__gridConfig.lang].kendo.filterMenu.operators.date.gt,
	    "lte":languageConfig[__gridConfig.lang].kendo.filterMenu.operators.date.lte,
	    "lt":languageConfig[__gridConfig.lang].kendo.filterMenu.operators.date.lt,
	    "isnull":languageConfig[__gridConfig.lang].kendo.filterMenu.operators.date.isnull,
	    "isnotnull":languageConfig[__gridConfig.lang].kendo.filterMenu.operators.date.isnotnull,
	  },
	  "enums": {
	    "eq": languageConfig[__gridConfig.lang].kendo.filterMenu.operators.enums.eq,
	    "neq": languageConfig[__gridConfig.lang].kendo.filterMenu.operators.enums.neq,
	    "isnull": languageConfig[__gridConfig.lang].kendo.filterMenu.operators.enums.isnull,
	    "isnotnull": languageConfig[__gridConfig.lang].kendo.filterMenu.operators.enums.isnotnull,
	  }
	});

  kendo.ui.FilterMenu.prototype.options.messages =
  $.extend(true, kendo.ui.FilterMenu.prototype.options.messages,{
    "info":languageConfig[__gridConfig.lang].kendo.filterMenu.info,
    "title":languageConfig[__gridConfig.lang].kendo.filterMenu.title,
    "isTrue":languageConfig[__gridConfig.lang].kendo.filterMenu.isTrue,
    "isFalse":languageConfig[__gridConfig.lang].kendo.filterMenu.isFalse,
    "filter":languageConfig[__gridConfig.lang].kendo.filterMenu.filter,
    "clear":languageConfig[__gridConfig.lang].kendo.filterMenu.clear,
    "and":languageConfig[__gridConfig.lang].kendo.filterMenu.and,
    "or":languageConfig[__gridConfig.lang].kendo.filterMenu.or,
    "selectValue":languageConfig[__gridConfig.lang].kendo.filterMenu.selectValue,
    "operator":languageConfig[__gridConfig.lang].kendo.filterMenu.operator,
    "value":languageConfig[__gridConfig.lang].kendo.filterMenu.value,
    "cancel":languageConfig[__gridConfig.lang].kendo.filterMenu.cancel,
  });

  kendo.ui.Pager.prototype.options.messages =
  $.extend(true, kendo.ui.Pager.prototype.options.messages, {
    "allPages": languageConfig[__gridConfig.lang].kendo.pager.allPages,
    "display": languageConfig[__gridConfig.lang].kendo.pager.display,
    "empty": languageConfig[__gridConfig.lang].kendo.pager.empty,
    "page": languageConfig[__gridConfig.lang].kendo.pager.page,
    "of": languageConfig[__gridConfig.lang].kendo.pager.of,
    "itemsPerPage": languageConfig[__gridConfig.lang].kendo.pager.itemsPerPage,
    "first": languageConfig[__gridConfig.lang].kendo.pager.first,
    "previous": languageConfig[__gridConfig.lang].kendo.pager.previous,
    "next": languageConfig[__gridConfig.lang].kendo.pager.next,
    "last": languageConfig[__gridConfig.lang].kendo.pager.last,
    "refresh": languageConfig[__gridConfig.lang].kendo.pager.refresh,
    "morePages": languageConfig[__gridConfig.lang].kendo.pagermorePages
  });

  var dt = CreateDataSource(
    { ...dataSource, ...__gridConfig }
  );
  const onDataBound = e => {

    for (var i = 0; i < e.sender.columns.length; i++) {
      e.sender.autoFitColumn(i);
    }
  }

  return (

    <Grid dataSource={dt}
      //pageable={true}
      height={550}
      toolbar={__gridConfig.toolbar}
      resizable={true}
      dataBound={onDataBound}
      editable={"popup"}
      selectable={ !gridConfig.select ? true : gridConfig.select}
      autoBind={__gridConfig.autoBind}
      excel={{
        fileName: `Export_${window.location.href.split("#")[1].split("/")[window.location.href.split("#")[1].split("/").length-1]}_${formatDate(new Date())}.xlsx`,
        allPages: true
      }}
      messages={{
        "commands": {
          "cancel": languageConfig[__gridConfig.lang].kendo.grid.commands.cancel,
          "canceledit": languageConfig[__gridConfig.lang].kendo.grid.commands.canceledit,
          "create": languageConfig[__gridConfig.lang].kendo.grid.commands.create,
          "destroy": languageConfig[__gridConfig.lang].kendo.grid.commands.destroy,
          "edit": languageConfig[__gridConfig.lang].kendo.grid.commands.edit,
          "excel": languageConfig[__gridConfig.lang].kendo.grid.commands.excel,
          "pdf": languageConfig[__gridConfig.lang].kendo.grid.commands.pdf,
          "save": languageConfig[__gridConfig.lang].kendo.grid.commands.save,
          "select": languageConfig[__gridConfig.lang].kendo.grid.commands.select,
          "update": languageConfig[__gridConfig.lang].kendo.grid.commands.update,
        },
        "editable": {
          "cancelDelete": languageConfig[__gridConfig.lang].kendo.grid.editable.cancelDelete,
          "confirmation": languageConfig[__gridConfig.lang].kendo.grid.editable.confirmation,
          "confirmDelete": languageConfig[__gridConfig.lang].kendo.grid.editable.confirmDelete,
        },

        "noRecords": languageConfig[__gridConfig.lang].kendo.grid.noRecords,
      }}
      sortable={true}
      pageable={{
        refresh: true,
        pageSizes: true,
        buttonCount: 5,
        alwaysVisible: true

      }}
      filterable={true}>
      {
        columns.map((c, index) => {
          //debugger;
          return <GridColumn key={index} {...c} />
        })
      }

      < GridColumn command={__gridConfig.command} title="&nbsp;" width={__gridConfig.command.length === 0 ? "0px" : "200px"} />
    </Grid >

  );
}

export default GvdGrid;
