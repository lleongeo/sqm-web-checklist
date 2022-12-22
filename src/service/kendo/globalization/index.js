import kendo from "@progress/kendo-ui"
import languageConfig from '../../../config/languageConfig'
import $ from "jquery"

const Globalization = lang => {
    kendo.ui.Pager.prototype.options.messages =
        $.extend(true, kendo.ui.Pager.prototype.options.messages, {
            "allPages": languageConfig[lang].kendo.pager.allPagesallPages,
            "display": languageConfig[lang].kendo.pager.display,
            "empty": languageConfig[lang].kendo.pager.empty,
            "page": languageConfig[lang].kendo.pager.page,
            "of": languageConfig[lang].kendo.pager.of,
            "itemsPerPage": languageConfig[lang].kendo.pager.itemsPerPage,
            "first": languageConfig[lang].kendo.pager.first,
            "previous": languageConfig[lang].kendo.pager.previous,
            "next": languageConfig[lang].kendo.pager.next,
            "last": languageConfig[lang].kendo.pager.last,
            "refresh": languageConfig[lang].kendo.pager.refresh,
            "morePages": languageConfig[lang].kendo.pagermorePages
        })


    kendo.ui.Grid.prototype.options.messages =
        $.extend(true, kendo.ui.Grid.prototype.options.messages, {
            "commands": {
                "cancel": languageConfig[lang].kendo.grid.commands.cancel,
                "canceledit": languageConfig[lang].kendo.grid.commands.canceledit,
                "create": languageConfig[lang].kendo.grid.commands.create,
                "destroy": languageConfig[lang].kendo.grid.commands.destroy,
                "edit": languageConfig[lang].kendo.grid.commands.edit,
                "excel": languageConfig[lang].kendo.grid.commands.excel,
                "pdf": languageConfig[lang].kendo.grid.commands.pdf,
                "save": languageConfig[lang].kendo.grid.commands.save,
                "select": languageConfig[lang].kendo.grid.commands.select,
                "update": languageConfig[lang].kendo.grid.commands.update,
            },
            "editable": {
                "cancelDelete": languageConfig[lang].kendo.grid.editable.cancelDelete,
                "confirmation": languageConfig[lang].kendo.grid.editable.confirmation,
                "confirmDelete": languageConfig[lang].kendo.grid.editable.confirmDelete,
            },
            "noRecords": languageConfig[lang].kendo.grid.noRecords,
        })
}

export default Globalization
