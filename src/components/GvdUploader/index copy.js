import React from 'react';
import { Modal, ModalHeader, ModalBody } from 'reactstrap';
import ListProcess from './ListProcess';

const GvdListProcess = (props) => {
    const { listprocess, modal, comparison } = props;
    const step = listprocess.items.filter(x => x.status === "error").length > 0 ? listprocess.items.filter(x => x.status === "error")[0].step : 0;
    return <Modal backdrop={false} visible={modal} onClose={() => props.toggle()} className={'modal-lg'}>
        <ModalHeader onClose={() => props.toggle()}>{listprocess.title}</ModalHeader>
        <ModalBody>
            <ListProcess listprocess={listprocess} />
            {comparison === null ? null :
                <table>
                    {
                        step === 0 ? null :
                            step === 3 ? <thead><th>Id</th><th>Error</th></thead> :
                                step === 2 ? <thead><th>Esperado</th><th>Comparación</th><th>Recibido</th></thead> : null
                    }
                    {
                        comparison.map(r =>
                            step === 0 ? null :
                                step === 3 ? <tr><td>{r.idRow}</td><td>{r.errors}</td></tr> :
                                    step === 2 ? <thead><th>{r.last_column_name}</th><th>{r.comparison}</th><th>{r.new_column_name}</th></thead> : null)
                    }
                </table>
            }
        </ModalBody>
    </Modal>;
}

export default GvdListProcess;