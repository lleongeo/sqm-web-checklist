import moment from 'moment'
import Swal from 'sweetalert2'

const ConvertToKendoGridValues = (items, text, value) => {
    return items.map(i => {
        var res = {}
        res.text = i[text]
        res.value = i[value]
        return res
    })
}

const DateRangeValidator = (from, to, max = 30) => {
    var _from = moment(from)
    var _to = moment(to)
    if (_to.isBefore(_from))
        return { error: true, message: 'error desde hasta' }
    else if (_to.diff(_from, 'days') > max)
        return { error: true, message: 'error 30 días' }
    else
        return { error: false }
}

const GvdSwal = (props, lang, callback) => {
    Swal.fire({
        ...props,
        confirmButtonColor: '#80BC00',
        cancelButtonColor: '#c1c1c1',
    }).then((op) => {
        if (typeof callback === 'function' && op.value) {
            callback()
        }
    })
}

export {
    DateRangeValidator,
    ConvertToKendoGridValues,
    GvdSwal,
}
