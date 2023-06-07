import React, {useEffect, useState} from 'react'
import {Modal, Button} from 'react-bootstrap'
import { putUpdateUser } from '../service/userService'
import { toast } from 'react-toastify'

const ModalUpdateUser = ({ show, onShow, onHide, onUpdate, dataUserEdit}) => {
  const [name, setName] = useState('')
  const [job, setJob] = useState('')
  //const notify = toast.success('A user is updated!')
  useEffect(() => {
    if(show) {
      setName(dataUserEdit.first_name)
    }
  }, [dataUserEdit])

  const handleUpdate = async () => {
    let res = await putUpdateUser(dataUserEdit.id, name, job)
    if(res && res.updatedAt) {
      onHide()
      onUpdate({
        first_name: res.name,
        id: dataUserEdit.id
      })
      toast.success('Update user success!')
    }
    else {
      toast.error('A error...')
    }
    
  }
  return (
    <div
      className="modal show"
      style={{ display: 'block', position: 'initial' }}
    >
      <Modal show={show} onHide={onHide} backdrop="static" keyboard={false}>
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
          <Button variant="primary" onClick={handleUpdate}>Update</Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default ModalUpdateUser