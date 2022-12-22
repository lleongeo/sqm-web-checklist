import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { CCollapse, CButton, CRow, CCol } from '@coreui/react'

const GvdCollapse = ({ title, body, videos, images }) => {
    const [toggleCustom, setToggleCustom] = useState(false)
    return (
        <div>
            <CButton className="m-0 p-0 w-100" color="link" onClick={() => setToggleCustom(!toggleCustom)} aria-expanded={toggleCustom} aria-controls="exampleAccordion">
                <CRow>
                    <CCol xs="11">
                        <p>{title}</p>
                    </CCol>
                    <CCol xs="1">
                        {toggleCustom ? <i className="fal fa-minus-square"></i> : <i className="fal fa-plus-square"></i>}
                    </CCol>
                </CRow>
            </CButton>
            <CCollapse  visible={toggleCustom} data-parent="#exampleAccordion" id="exampleAccordion">
                {body}
                {body !== "" ? <hr /> : null}
                {videos.length > 0 ? videos.map(v =>
                    <video key={`video_${v.id}`} src={v.url} width={v.width} controls={true} />
                ) : null}
                {images.length > 0 ? images.map(i =>
                    <img key={`image_${i.id}`} src={i} alt="loading" />
                ) : null}

            </CCollapse>
        </div>
    )
}

GvdCollapse.propTypes = {
    title: PropTypes.string,
    body: PropTypes.string,
    images: PropTypes.arrayOf(PropTypes.any),
    videos: PropTypes.arrayOf(PropTypes.any),
}

export default GvdCollapse
