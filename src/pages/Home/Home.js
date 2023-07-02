import React from 'react'
import Header from '../../components/Header'
import { Container } from 'react-bootstrap'
import { ToastContainer } from 'react-toastify'


const Home = () => {
    const bgURL = 'https://images.pexels.com/photos/1447495/pexels-photo-1447495.png?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
  return (
    <div>
        <Header />
        <Container>
            <div style={{backgroundImage: `url(${bgURL})`, width: '100%', height: '700px', backgroundSize: 'cover' ,opacity: 0.9}}>

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