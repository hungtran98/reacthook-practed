import React, {useEffect, useState} from 'react'
import {Modal, Button} from 'react-bootstrap'


const ModalUpdateUser = ({ show, onShow, onHide, dataUserEdit}) => {
  const [name, setName] = useState('')
  const [job, setJob] = useState('')
  useEffect(() => {
    if(show) {
      setName(dataUserEdit.first_name)
    }
  }, [dataUserEdit])
  return (
    <div
      className="modal show"
      style={{ display: 'block', position: 'initial' }}
    >
      <Modal show={show} onHide={onHide}>
        <Modal.Header closeButton>
          <Modal.Title>Update User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className='body-add-new'>
          <form>
                <div className="mb-3">
                    <label className="form-label">Name</label>
                    <input type="text" className="form-control" value={name} onChange={(e) => setName(e.target.value)}/>

                </div>
                <div className="mb-3">
                    <label className="form-label">Job</label>
                    <input type="text" className="form-control" />
                </div>
                </form>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onHide}>Close</Button>
          <Button variant="primary">Update</Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default ModalUpdateUser