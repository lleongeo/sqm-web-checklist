import React from 'react'
import Dropzone from 'react-dropzone'
import './style.css'
import PropTypes from 'prop-types'

const GvdDropzone = (props) => {
    return (
        <Dropzone onDrop={f => props.handleUpload(f)} accept={props.acceptedFiles} style={!props.style ? {} : props.style}>
            {({ getRootProps, getInputProps, isDragActive }) => (
                <section >
                    {
                        isDragActive ?
                            <div {...getRootProps()} className="Dropzone active">
                                <i className="fal fa-cloud-upload"></i>
                                <p>{`Drop the file to Upload`}</p>
                            </div> :
                            <div {...getRootProps()} className="Dropzone">
                                <input {...getInputProps()} />
                                <i className="fal fa-cloud-upload"></i>
                                <p>{`Drag 'n' drop some files here, or click to select files`}</p>
                            </div>

                    }
                </section>
            )}
        </Dropzone>
    );
}

GvdDropzone.propTypes = {
	handleUpload: PropTypes.func,
    acceptedFiles: PropTypes.arrayOf(PropTypes.any),
    style: PropTypes.object,
}

export default React.memo(GvdDropzone);
