
import './App.scss';
import User from '../src/pages/User/User'
import Home from '../src/pages/Home/Home'
import Login from '../src/pages/Login/Login'
import { Routes, Route} from 'react-router-dom'

function App() {
  return (
   <Routes>
    <Route path='/' element={<Home />}/>
    <Route path='/users' element={<User />}/>
    <Route path='/login' element={<Login />}/>
   </Routes>
  );
}

export default App;
