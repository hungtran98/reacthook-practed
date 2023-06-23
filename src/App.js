
import './App.scss';
import User from '../src/pages/User/User'
import Home from '../src/pages/Home/Home'
import { Routes, Route} from 'react-router-dom'

function App() {
  return (
   <Routes>
    <Route path='/' element={<Home />}/>
    <Route path='/users' element={<User />}/>
   </Routes>
  );
}

export default App;
