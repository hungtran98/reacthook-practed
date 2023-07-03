
import './App.scss';
import { UserContext } from './context/UserProvider'
import { useContext, useEffect } from 'react';
import AppRoute from './routes/AppRoute';
import { useSelector } from 'react-redux';


function App() {

  const { login } = useContext(UserContext)

  const dataRedux = useSelector(state => state.user.account)

  console.log('redux', dataRedux)

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
