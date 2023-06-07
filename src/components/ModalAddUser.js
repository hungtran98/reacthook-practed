import React, { useState } from 'react'
import {Modal, Button} from 'react-bootstrap'
import { postCreateUser } from '../service/userService'
import { toast } from 'react-toastify'

const ModalAddUser = ({show, onHide, onUpdate}) => {
    
    const [name, setName] = useState("")
    const [job, setJob] = useState("")
    const notify = () => toast.success("A User is created success!")
    
    const handleSave = async () => {
      let res = await postCreateUser(name, job)
      console.log('...', res)
      if(res && res.id){
        setName("")
        setJob("")
        onHide()
        onUpdate({id: res.id, first_name: res.name})
        notify()
      }
      else {
        toast.error("An error...")
      }
    }

    
  return (
    <div
      className="modal show"
      style={{ display: 'block', position: 'initial' }}
    >
      <Modal show={show} onHide={onHide} backdrop="static" keyboard={false}>
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