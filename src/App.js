
import './App.scss';
import { UserContext } from './context/UserProvider'
import { useContext, useEffect } from 'react';
import AppRoute from './routes/AppRoute';


function App() {

  const { login } = useContext(UserContext)

  useEffect( () => {
    if(localStorage.getItem('tokenUser')) {
      login(localStorage.getItem('email'), localStorage.getItem('tokenUser'))
    } 
  }, [])

  return (
   <>
    <AppRoute />
   </>
  );
}

export default App;
