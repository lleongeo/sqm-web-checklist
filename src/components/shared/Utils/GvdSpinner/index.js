import React from 'react'
import { css } from "@emotion/react"
import BounceLoader from "react-spinners/BounceLoader"
import PropTypes from 'prop-types'

const GvdSpinner = (props) => {
    var { customCss, color, size } = props
    var _color, _size
    var _css = css`
        display: block
        margin: 0 auto
        border-color: red
        position: absolute
        top: 50%
        left: 50%
    `

    _css = customCss != null ? customCss : _css
    _color = color != null ? color : "#80BC00"
    _size = size != null ? size : "70px"

    return (
        <BounceLoader
            css={_css}
            size={_size}
            color={_color}
        />
    )
}

GvdSpinner.propTypes = {
    customCss: PropTypes.string,
    color: PropTypes.string,
    size: PropTypes.string,
}

export default GvdSpinner
