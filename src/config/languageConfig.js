const messages = {
  EN: {
    filterText: "Filter",
    appTitle: "Pallets Logistics",
    welcomeTitle: "Welcome to the online Check list Control System: ULOG External Warehouse's Quality Check list",
    welcomeSubtitle: "A web application for SQM.",
    unselectedRow: "Please select a row in the list.",
    userMenuAccount: "Account",
    userMenuLanguage: "Language",
    userMenuLogout: "Logout",
    productsEnvases: "Containers",
    defaultConfirmTitle: "Are you sure?",
    defaultConfirmText: "You won't be able to revert this change.",
    defaultConfirmContinue: "Continue",
    defaultConfirmCancel: "Cancel",
    defaultConfirmAddSuccessTitle: "Added successfully",
    defaultConfirmEditSuccessTitle: "Edited successfully",
    defaultConfirmDeleteSuccessTitle: "Deleted successfully",
    defaultConfirmAddErrorTitle: "Error adding",
    defaultConfirmEditErrorTitle: "Error editing",
    defaultConfirmDeleteErrorTitle: "Error deleting",
    menuSupport: "Support",
    menuHome: "Home",
    menuLockUnlock: "Lock/Unlock",
    menuChecklists: "Checklists",
    menuChecklist: "Checklist",
    menuChecklistLog: "Checklist Log",
    menuReferences: "References",
    menuLocations: "Locations",
    menuCellars: "Cellars",
    menuProducts: "Products",
    menuDefects: "Defects",
    menuConditions: "Conditions",
    menuContainer: "Containers",
    menuCellarPositions: "Cellar Positions",
    menuReports: "Reports",
    menuDeviationsControl: "Deviations Control",
    menuCellarReceptionCheckList: "Cellar Reception CheckList",
    menuPermissions: "Permissions",
    menuUsers: "Users",
    menuMenu: "Menu",
    menuProfiles: "Profiles",
    menuShips: "Ships",
    menuShippings: "Shippings",
    menuImportShippings: "Imports",
    menuLithium: "Lithium",
    menuImportLithium: "Import lithium",
    menuIodine: "Iodine",
    menuImportIodine: "Import iodine",
    menuOceanInsight: "Ocean Insight",
    kendo: {
      viewImages: "View images",
      grid: {
        "commands": {
          "cancel": "Cancel changes",
          "canceledit": "Cancel",
          "create": "Add new record",
          "destroy": "Delete",
          "nullify": "Nullify",
          "edit": "Edit",
          "excel": "Export to Excel",
          "pdf": "Export to PDF",
          "save": "Save changes",
          "select": "Select",
          "update": "Update"
        },
        "editable": {
          "cancelDelete": "Cancel",
          "confirmation": "Are you sure you want to delete this record?",
          "confirmDelete": "Delete"
        },
        "noRecords": "No records available.",
        "search": "Search...",
        "expandCollapseColumnHeader": "",
        "groupHeader": "Press ctrl + space to group",
        "ungroupHeader": "Press ctrl + space to ungroup"
      },
      pager: {
        "allPages": "All",
        "display": "{0} - {1} of {2} items",
        "empty": "No items to display",
        "page": "Page",
        "of": "of {0}",
        "itemsPerPage": "items per page",
        "first": "Go to the first page",
        "previous": "Go to the previous page",
        "next": "Go to the next page",
        "last": "Go to the last page",
        "refresh": "Refresh",
        "morePages": "More pages"
      },
      datepicker: {
        "datepicker": {
          "toggleCalendar": "Alternar calendario"
        },
        "calendar": {
          "today": "Today"
        },
        "dateinput": {
          "increment": "Incrementar valor",
          "decrement": "Disminuir valor"
        },
        "datetimepicker": {
          "date": "Fecha",
          "time": "Hora",
          "cancel": "Cancelar",
          "set": "Conjunto"
        },
        "timepicker": {
          "set": "Conjunto",
          "cancel": "Cancelar",
          "now": "Ahora",
          "selectNow": "Seleccionar ahora",
          "toggleTimeSelector": "Selector de tiempo de alternancia",
          "toggleClock": "Reloj de palanca"
        },
        "daterangepicker": {
          "swapStartEnd": "Swap start and end values",
          "start": "Comienzo",
          "end": "Fin"
        }
      },
      filterMenu: {
        "info": "Show items with value that:",
        "title": "Show items with value that",
        "isTrue": "is true",
        "isFalse": "is false",
        "filter": "Filter",
        "clear": "Clear",
        "and": "And",
        "or": "Or",
        "selectValue": "-Select value-",
        "operator": "Operator",
        "value": "Value",
        "cancel": "Cancel",
        "done": "Done",
        "into": "in",
        operators: {
          "string": {
            "eq": "Is equal to",
            "neq": "Is not equal to",
            "startswith": "Starts with",
            "contains": "Contains",
            "doesnotcontain": "Does not contain",
            "endswith": "Ends with",
            "isnull": "Is null",
            "isnotnull": "Is not null",
            "isempty": "Is empty",
            "isnotempty": "Is not empty",
            "isnullorempty": "Has no value",
            "isnotnullorempty": "Has value"
          },
          "number": {
            "eq": "Is equal to",
            "neq": "Is not equal to",
            "gte": "Is greater than or equal to",
            "gt": "Is greater than",
            "lte": "Is less than or equal to",
            "lt": "Is less than",
            "isnull": "Is null",
            "isnotnull": "Is not null"
          },
          "date": {
            "eq": "Is equal to",
            "neq": "Is not equal to",
            "gte": "Is after or equal to",
            "gt": "Is after",
            "lte": "Is before or equal to",
            "lt": "Is before",
            "isnull": "Is null",
            "isnotnull": "Is not null"
          },
          "enums": {
            "eq": "Is equal to",
            "neq": "Is not equal to",
            "isnull": "Is null",
            "isnotnull": "Is not null"
          }
        }
      }
    },
    filter: {
      buttonText: "Filter",
      message: 'The "End date" date cannot be greater than "Start date" and the date range cannot exceed 30 days',
      from: "Start date",
      to: "End date",
      alert: "The date range between the start date and end date is 30 days.",
      nroLote: "Nro Lote"
    },
    faqTitle: "Frequently asked questions",
    faqDescription: "We have created this list of questions to resolve your doubts.",
    faq: [
      {
        id: 1,
        title: "How do I use the Mobile App?",
        body: "",
        videos: [
          {
            id: 1,
            url: "https://checklistpalletsdesa.blob.core.windows.net/webassets/ComoUsarLaAppMovil.mp4",
            width: "500px"
          }
        ],
        images: []
      },
      {
        id: 2,
        title: "How to use the Grid?",
        body: "",
        videos: [
          {
            id: 1,
            url: "https://checklistpalletsdesa.blob.core.windows.net/webassets/ComoUsarLaGrilla21.mp4",
            width: "100%"
          }
        ],
        images: []
      },
      {
        id: 3,
        title: "Lock/Unlock CheckList in Pallets Web App?",
        body: "",
        videos: [
          {
            id: 1,
            url: "https://checklistpalletsdesa.blob.core.windows.net/webassets/LockUnlockCheckList.mp4",
            width: "100%"
          }
        ],
        images: []
      },
      {
        id: 4,
        title: "What is the username and password of PowerBI for the application?",
        body: "Username: Transp.Dist.Prod.Termin@sqm.com, Password: Inicio.2020",
        videos: [],
        images: []
      }
    ],
    reload: {
      title: "Language change",
      description: "This action will reload the actual page, ¿Continue?"
    },
    naves: {
      import: {
        noItems: "There is no import process to show.",
        dropzone: {
          button: "Choose File",
          label: "No file choosen"
        },
        buttons: {
          refresh: "Refresh",
          template: "Template",
          route: "Route"
        },
        error: "Error ocurred, see details below.",
        errordetail: "Observations detail",
        detail: {
          row: "Row",
          error: "Error",
        },
        history: "Import history",
        status:
        {
          uploading: "Uploading file.",
          columns: "Validating columns.",
          types: "Validating data types.",
          storing: "Storing data.",
          done: "Imported successfully.",
        },
        uploading: "The file is uploading in the background.",
        delayAlert: "The process might take around 2 minutes depending of the size of the file. Click refresh button to update the status of the import process in case it doesn't do it automatically.",
      }
    },
    deleteSelected: "Delete selected",
    validateSelected: "Validate selected",
    unvalidateSelected: "Unvalidate selected"

  },
  ES: {
    filterText: "Filtrar",
    appTitle: "Logística Pallets",
    welcomeTitle: "Bienvenido al Sistema de Control de Check list online: Check list de calidad Bodega Externa ULOG",
    welcomeSubtitle: "Una aplicación web de SQM.",
    unselectedRow: "Por favor seleccione una fila de la lista.",
    userMenuAccount: "Cuenta",
    userMenuLanguage: "Idioma",
    userMenuLogout: "Salir",
    productsEnvases: "Envases",
    defaultConfirmTitle: "¿Está seguro?",
    defaultConfirmText: "No podrá revertir el cambio.",
    defaultConfirmContinue: "Continuar",
    defaultConfirmCancel: "Cancelar",
    defaultConfirmAddSuccessTitle: "Guardado exitoso",
    defaultConfirmEditSuccessTitle: "Editado exitoso",
    defaultConfirmDeleteSuccessTitle: "Eliminado exitoso",
    defaultConfirmAddErrorTitle: "Error al agregar",
    defaultConfirmEditErrorTitle: "Error al editar",
    defaultConfirmDeleteErrorTitle: "Error al borrar",
    menuSupport: "Soporte",
    menuChecklists: "Checklists",
    menuChecklist: "Checklist",
    menuLockUnlock: "Lock/Unlock",
    menuReferences: "Referencias",
    menuPermissions: "Permisos",
    menuProducts: "Productos",
    menuDefects: "Defectos",
    menuConditions: "Condiciones",
    menuContainer: "Envases",
    menuCellarPositions: "Posiciones Bodega",
    menuUsers: "Usuarios",
    menuMenu: "Menú",
    menuProfiles: "Perfiles",
    menuChecklistLog: "Checklist Log",
    menuLocations: "Localizaciones",
    menuReports: "Reportes",
    menuDeviationsControl: "Control Desviaciones",
    menuCellarReceptionCheckList: "CheckList Recepción Bodega",
    menuCellars: "Bodegas",
    menuHome: "Inicio",
    menuShips: "Naves",
    menuShippings: "Embarques",
    menuImportShippings: "Importaciones",
    menuLithium: "Litio",
    menuImportLithium: "Importar Litio",
    menuIodine: "Yodo",
    menuImportIodine: "Importar yodo",
    menuOceanInsight: "Ocean Insight",
    kendo: {
      viewImages: "Ver imágenes",
      grid: {
        "commands": {
          "cancel": "Cancelar Cambios",
          "canceledit": "Cancelar",
          "create": "Agregar",
          "destroy": "Eliminar",
          "edit": "Editar",
          "nullify": "Anular",
          "excel": "Exportar a Excel",
          "pdf": "Exportar a PDF",
          "save": "Guardar Cambios",
          "select": "Seleccionar",
          "update": "Actualizar"
        },
        "editable": {
          "cancelDelete": "Cancelar",
          "confirmation": "¿Confirma la eliminación de este registro?",
          "confirmDelete": "Eliminar"
        },
        "noRecords": "No hay datos disponibles."
      },
      pager: {
        "allPages": "Todas",
        "display": "Elementos mostrados {0} - {1} de {2}",
        "empty": "No hay registros.",
        "page": "Página",
        "of": "de {0}",
        "itemsPerPage": "ítems por página",
        "first": "Ir a la primera página",
        "previous": "Ir a la página anterior",
        "next": "Ir a la página siguiente",
        "last": "Ir a la última página",
        "refresh": "Actualizar",
        "morePages": "Más paginas"
      },
      datepicker: {
        "datepicker": {
          "toggleCalendar": "Alternar calendario"
        },
        "calendar": {
          "today": "Hoy"
        },
        "dateinput": {
          "increment": "Incrementar valor",
          "decrement": "Disminuir valor"
        },
        "datetimepicker": {
          "date": "Fecha",
          "time": "Hora",
          "cancel": "Cancelar",
          "set": "Conjunto"
        },
        "timepicker": {
          "set": "Conjunto",
          "cancel": "Cancelar",
          "now": "Ahora",
          "selectNow": "Seleccionar ahora",
          "toggleTimeSelector": "Selector de tiempo de alternancia",
          "toggleClock": "Reloj de palanca"
        },
        "daterangepicker": {
          "swapStartEnd": "Swap start and end values",
          "start": "Comienzo",
          "end": "Fin"
        }
      },
      filterMenu: {
        "info": "Mostrar filas con valor que:",
        "title": "Mostrar filas con valor que",
        "isTrue": "Sí",
        "isFalse": "No",
        "filter": "Filtrar",
        "clear": "Limpiar filtros",
        "and": "Y",
        "or": "O",
        "selectValue": "-Seleccionar valor -",
        "operator": "Operador",
        "value": "Valor",
        "cancel": "Cancelar",
        operators: {
          "string": {
            "eq": "Es igual a",
            "neq": "No es igual a",
            "startswith": "Comienza con",
            "contains": "Contiene",
            "doesnotcontain": "No contiene",
            "endswith": "Termina en",
            "isnull": "Es nulo",
            "isnotnull": "No es nulo",
            "isempty": "Está vacío",
            "isnotempty": "No está vacío"
          },
          "number": {
            "eq": "Es igual a",
            "neq": "No es igual a",
            "gte": "Es mayor o igual que",
            "gt": "Es mayor que",
            "lte": "Es menor o igual que",
            "lt": "Es menor que",
            "isnull": "Es nulo",
            "isnotnull": "No es nulo"
          },
          "date": {
            "eq": "Es igual a",
            "neq": "Es diferente a",
            "gte": "Es posterior o igual a",
            "gt": "Es posterior",
            "lte": "Es anterior o igual a",
            "lt": "Es anterior",
            "isnull": "Es nulo",
            "isnotnull": "No es nulo"
          },
          "enums": {
            "eq": "Es igual a",
            "neq": "No es igual a",
            "isnull": "Es nulo",
            "isnotnull": "No es nulo"
          }
        }
      }

    },

    filter: {
      buttonText: "Filtrar",
      message: 'La fecha "Fecha Fin" no puede ser mayor que "Fecha Inicio" y el rango de fechas no puede exceder de 30 días',
      from: "Fecha Inicio",
      to: "Fecha Fin",
      alert: "El rango de fecha entre la fecha inicio y la fecha fin es de 30 días.",
      nroLote: "Nro Lote"
    },
    faqTitle: "Preguntas frecuentes",
    faqDescription: "Hemos realizado esta lista de preguntas frecuentes para resolver sus dudas.",
    faq: [
      {
        id: 1,
        title: "¿Cómo uso la Aplicación Móvil?",
        body: "",
        videos: [
          {
            id: 1,
            url: "https://checklistpalletsdesa.blob.core.windows.net/webassets/ComoUsarLaAppMovil.mp4",
            width: "500px"
          }
        ],
        images: []
      },
      {
        id: 2,
        title: "¿Cómo uso la grilla?",
        body: "",
        videos: [
          {
            id: 1,
            url: "https://checklistpalletsdesa.blob.core.windows.net/webassets/ComoUsarLaGrilla21.mp4",
            width: "100%"
          }
        ],
        images: []
      },
      {
        id: 3,
        title: "Bloqueo/Desbloqueo de CheckList en Aplicación Web de Pallets",
        body: "",
        videos: [
          {
            id: 1,
            url: "https://checklistpalletsdesa.blob.core.windows.net/webassets/LockUnlockCheckList.mp4",
            width: "100%"
          }
        ],
        images: []
      },
      {
        id: 4,
        title: "¿Cual es el usuario y password de Power BI para la aplicación?",
        body: "Usuario: Transp.Dist.Prod.Termin@sqm.com, Password: Inicio.2020",
        videos: [],
        images: []
      }
    ],
    reload: {
      title: "Cambio de Idioma",
      description: "El cambio de idioma refrescará la página actual, ¿Desea continuar?"
    },
    naves: {
      import: {
        noItems: "No hay procesos de importación para mostrar.",
        dropzone: {
          button: "Subir archivo",
          label: "No ha seleccionado archivo"
        },
        buttons: {
          refresh: "Actualizar",
          template: "Formato",
          route: "Ruta"
        },
        error: "Ocurrió un error, ver detalle a continuación.",
        errordetail: "Detalle de observaciones",
        detail: {
          row: "Fila",
          error: "Error",
        },
        history: "Historial de importaciones",
        status:
        {
          uploading: "Subiendo archivo.",
          columns: "Validando columnas.",
          types: "Validando tipos de dato.",
          storing: "Almacenando información.",
          done: "Importado exitosamente.",
        },
        uploading: 'El archivo se está cargando en segundo plano.',
        delayAlert: "El proceso puede tardar alrededor de 2 minutos dependiendo del tamaño del archivo. Puede dar click al botón refrescar para actualizar el estado de la importación en caso de que no se haga automáticamente.",
      }
    },
    deleteSelected: "Eliminar seleccionados",
    validateSelected: "Validar seleccionados",
    unvalidateSelected: "Invalidar seleccionados"
  }
}

export default messages
