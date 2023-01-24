import { CButton, CFormCheck, CFormInput, CFormLabel } from '@coreui/react'
import React from 'react'
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'
import languageConfig from 'src/config/languageConfig'
import showMessage from 'src/service/ShowMessage'
import { API_KEY, API_URL_BASE } from 'src/service/constants'
import Select from 'react-select'
import { IntlProvider, LocalizationProvider } from '@progress/kendo-react-intl'
import { DatePicker } from '@progress/kendo-react-dateinputs'
import moment from 'moment'

const GridForm = (props) => {
    const { columns, isNew, gridConfig, dataItem = null } = props
    const lang = useSelector(state => state.ux.language)
    const getFieldsWithType = (formData) => {
        columns
            .filter(x => x.hasOwnProperty('type'))
            .map(x => {
                let preCheck = document.getElementById(`input_${x.field}`)
                switch (x.type) {
                    case `date`:
                        formData.append(x.field, !preCheck || !moment(preCheck.value).isValid() ? new Date().toLocaleDateString() : new Date(preCheck.value).toLocaleDateString())
                        break
                    case `boolean`:
                        formData.append(x.field, !preCheck ? false : preCheck.checked)
                        break
                    case `list`:
                        let preId = x.values.filter(v => v.text === preCheck.textContent)
                        formData.append(x.field, !preCheck || !preId || preId.length <= 0 ? null : preId[0].value)
                        break
                    default:
                        formData.append(x.field, !preCheck ? null : preCheck.value)
                        break
                }
                return x
            })
        return formData
    }

    const handleSave = () => {
        let formData = new FormData()

        columns
            .filter(col => !col.hasOwnProperty('type'))
            .map((col) => {
                if (col.field === gridConfig.id)
                    formData.append(gridConfig.id, isNew ? 0 : dataItem[gridConfig.id])
                else {
                    let preCheck = document.getElementById(`input_${col.field}`)
                    formData.append(col.field, !preCheck ? '' : preCheck.value)
                }
                return col
            })
        let models = getFieldsWithType(formData)
        if (gridConfig.module === 'tocopilla')
            formData.set('idCentro', 4)

        fetch(`${API_URL_BASE}${gridConfig.module}`, {
            method: isNew ? "POST" : "PUT",
            body: models,
            headers: new Headers({
                "apikey": API_KEY,
                "language": lang
            })
        })
            .then(response => response.json())
            .then(response => {
                if (!response.success)
                    showMessage({
                        icon: 'error',
                        title: response.message
                    })
                else {
                    showMessage({
                        icon: 'success',
                        title: isNew ? languageConfig[lang].defaultConfirmAddSuccessTitle : languageConfig[lang].defaultConfirmEditSuccessTitle
                    })
                    props.handleOnClick()
                }
            })
            .catch(function (err) {
                showMessage({
                    icon: 'error',
                    title: "Fetch Error :-S", err
                })
            })
    }

    const getInput = ({ col }) => {
        let formInput = (
            <CFormInput
                key={`input_${col.field}`}
                id={`input_${col.field}`}
                defaultValue={isNew ? `` : dataItem[col.field]}
                label={col.title}
                style={{ marginBottom: '10px' }}
                disabled={col.hasOwnProperty(`editable`)}
            />
        )
        if (col.hasOwnProperty(`type`)) {
            switch (col.type) {
                case `number`:
                    return (
                        <CFormInput
                            key={`input_${col.field}`}
                            id={`input_${col.field}`}
                            type="number"
                            defaultValue={isNew ? `` : dataItem[col.field]}
                            label={col.title}
                            style={{ marginBottom: '10px' }}
                            disabled={col.hasOwnProperty(`editable`)}
                        />
                    )
                case `date`:
                    return (
                        <div
                            key={`input_${col.field}`}
                            style={{ marginBottom: '10px' }}
                        >
                            <CFormLabel>{col.title}</CFormLabel>
                            <LocalizationProvider language={lang.toLowerCase()}>
                                <IntlProvider locale={lang.toLowerCase()}>
                                    <DatePicker
                                        id={`input_${col.field}`}
                                        name="datetimeFrom"
                                        format="dd-MM-yyyy"
                                        disabled={col.hasOwnProperty(`editable`)}
                                        defaultValue={isNew || !moment(dataItem[col.field]).isValid() ? new Date() : new Date(dataItem[col.field])}
                                    />
                                </IntlProvider>
                            </LocalizationProvider>
                        </div>
                    )
                case `boolean`:
                    return (
                        <CFormCheck
                            label={col.title}
                            defaultChecked={isNew ? false : dataItem[col.field]}
                            key={`input_${col.field}`}
                            id={`input_${col.field}`}
                            style={{ marginBottom: '10px' }}
                            disabled={col.hasOwnProperty(`editable`)}
                        />
                    )

                case `list`:
                    let listValue = isNew ? [] : col.values.filter(v => v.text === dataItem[col.field])
                    return (
                        <div
                            key={`input_${col.field}`}
                            style={{ marginBottom: '10px' }}
                        >
                            <CFormLabel>{col.title}</CFormLabel>
                            <Select
                                id={`input_${col.field}`}
                                defaultValue={isNew || listValue.length <= 0 ? null : { label: listValue[0].text, value: listValue[0].value }}
                                options={col.values.map(x => {
                                    return {
                                        label: x.text,
                                        value: x.value,
                                    }
                                })}
                                isDisabled={col.hasOwnProperty(`editable`)}
                            />
                        </ div>
                    )

                default:
                    return formInput
            }
        } else {
            return formInput
        }
    }

    return (
        <>
            {
                columns
                    .filter(col => !col.hidden)
                    .map((col) => getInput({ col }))
            }
            <hr />
            <CButton
                color={`primary`}
                onClick={handleSave}
            >
                {languageConfig[lang].kendo.grid.commands.save}
            </CButton>
        </>
    )
}

GridForm.propTypes = {
    isNew: PropTypes.bool,
    dataItem: PropTypes.object,
    gridConfig: PropTypes.object,
    columns: PropTypes.arrayOf(PropTypes.any),
    handleOnClick: PropTypes.func,
}

export default GridForm
