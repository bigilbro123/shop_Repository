import { Outlet } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import summaryApi from './common';
import { useEffect } from 'react';
import Context from './context';
import { useDispatch } from 'react-redux'
import { setUserDeatil } from './store/userSlice';



function App() {
  const dispatch = useDispatch()
  const fetchUserDetail = async () => {
    try {
      // alert('fetch')
      const dataResponse = await fetch(summaryApi.current_user.url, {
        method: summaryApi.current_user.method,
        credentials: 'include'
      });
      const DataApi = await dataResponse.json();
      if (DataApi.success) {
        dispatch(setUserDeatil(DataApi.data))
      }

    } catch (error) {
      console.error('Failed to fetch user details:', error);
    }
  };


  useEffect(() => {
    fetchUserDetail();
  }, []);

  return (
    <>
      <Context.Provider value={{
        fetchUserDetail
      }}>
        <ToastContainer />
        <Header />
        <main className='min-h-[calc(100vh-120px)]'>
          <Outlet />
        </main>
        <Footer />
      </Context.Provider >
    </>
  );
}

export default App;
