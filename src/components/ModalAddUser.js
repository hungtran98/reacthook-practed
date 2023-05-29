import React, { useState } from 'react'
import {Modal, Button} from 'react-bootstrap';

const ModalAddUser = ({show, onHide}) => {
    
    const [name, setName] = useState("")
    const [job, setJob] = useState("")


    const handleSave = () => {
      console.log('...save ',name,'job: ',job)
    }

    
  return (
    <div
      className="modal show"
      style={{ display: 'block', position: 'initial' }}
    >
      <Modal show={show} onHide={onHide}>
        <Modal.Header closeButton>
          <Modal.Title>Add New User</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <div className='body-add-new'>
          <form>
                <div className="mb-3">
                    <label className="form-label">Name</label>
                    <input type="text" className="form-control" value={name} onChange={(e)=>setName(e.target.value)}/>

                </div>
                <div className="mb-3">
                    <label className="form-label">Job</label>
                    <input type="text" className="form-control" value={job} onChange={(e)=>setJob(e.target.value)}/>
                </div>
                </form>
          </div>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={onHide}>Close</Button>
          <Button variant="primary" onClick={handleSave}>Save changes</Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default ModalAddUser