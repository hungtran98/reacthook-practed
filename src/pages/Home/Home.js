import React from 'react'
import Header from '../../components/Header'
import {Image,Container} from 'react-bootstrap'
import { ToastContainer } from 'react-toastify'


const Home = () => {
    const bgURL = 'https://i.pinimg.com/564x/db/c6/69/dbc669ff3396df6ab833ba15d94a6000.jpg'
  return (
    <div>
        <Header />
        <Container>
            <div style={{backgroundImage: `url(${bgURL})`, width: '500px', height: '700px', backgroundSize: 'cover' }}>

            </div>
        </Container>
        <ToastContainer
            position="top-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
            />
    </div>
  )
}

export default Home