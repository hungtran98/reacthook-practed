
import './App.scss';
import { UserContext } from './context/UserProvider'
import { useContext, useEffect } from 'react';
import AppRoute from './routes/AppRoute';
import { useDispatch, useSelector } from 'react-redux';
import { handleLoginRedux, handleRefresh } from './redux/actions/userActions'


function App() {
  const dispatch = useDispatch()
  useEffect( () => {
    if(localStorage.getItem('token')){
      dispatch(handleRefresh())
    }
  }, [])

  return (
   <>
    <AppRoute />
   </>
  );
}

export default App;
