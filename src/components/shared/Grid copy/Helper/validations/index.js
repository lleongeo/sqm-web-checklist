//Debe ser utilizada en un campo de la grilla para prevenir los espacios en blanco, dicho campo debe ser editable
export const emptyStringValidation = input => {
    var exp = /^[^\s].+[^\s]$/
    var result = exp.test(input.val())

    if (input[0].dataset.type === 'number' || input[0].dataset.role === 'combobox' || input[0].dataset.role === undefined) {
        return true
    }

    if (!input[0].required && (input[0].type === 'text' || input[0].type === 'textarea')) {
        if (input.val() === "") {
            return true
        }
        else {
            if (!result) {
                input.attr(`data-emptyStringValidation-msg`, `No puede tener sólo estacios en blanco al inicio o al final.`)
                return false
            } else {
                return true
            }
        }
    } else if (!result && (input[0].type === 'text' || input[0].type === 'textarea')) {
        input.attr(`data-emptyStringValidation-msg`, `No puede tener sólo estacios en blanco al inicio o al final.`)
        return false
    } else {
        return true
    }
}
