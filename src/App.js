
import './App.scss';
import User from '../src/pages/User/User'
import Home from '../src/pages/Home/Home'
import Login from '../src/pages/Login/Login'
import { Routes, Route} from 'react-router-dom'
import { UserContext } from './context/UserProvider'
import { useContext, useEffect } from 'react';


function App() {

  const { login } = useContext(UserContext)

  useEffect( () => {
    if(localStorage.getItem('tokenUser')) {
      login(localStorage.getItem('email'), localStorage.getItem('tokenUser'))
    } 
  }, [])

  return (
   <Routes>
    <Route path='/' element={<Home />}/>
    <Route path='/users' element={<User />}/>
    <Route path='/login' element={<Login />}/>
   </Routes>
  );
}

export default App;
