import React from 'react'
import Header from '../../components/Header'
import {Image,Container} from 'react-bootstrap'


const Home = () => {
    const bgURL = 'https://i.pinimg.com/564x/db/c6/69/dbc669ff3396df6ab833ba15d94a6000.jpg'
  return (
    <div>
        <Header />
        <Container>
            <div style={{backgroundImage: `url(${bgURL})`, width: '500px', height: '700px', backgroundSize: 'cover' }}>

            </div>
        </Container>
    </div>
  )
}

export default Home