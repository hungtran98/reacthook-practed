import React from 'react'
import { Modal, Button } from 'react-bootstrap'
import { deleteUser } from '../service/userService'
import { toast } from 'react-toastify'


const ModalDeleteUser = ({ show, onHide, dataUserDelete, onDelete }) => {

    const handleDelete = async () => {
        let res = await deleteUser(dataUserDelete.id)
        if(res && +res.statusCode === 204) {
            onHide()
            onDelete(dataUserDelete.id)
            toast.success('Delete user success!')
        }
        else {
            toast.error('a error occur...')
        }
    }
  return (
    <>
        <Modal
        show={show}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton onClick={onHide}>
          <Modal.Title>Delete user: {dataUserDelete.first_name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Email: {dataUserDelete.email}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onHide}>
            Close
          </Button>
          <Button variant="primary" onClick={handleDelete}>Comfirm</Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default ModalDeleteUser