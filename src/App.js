import { Outlet } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import summaryApi from './common';
import { useEffect, useState } from 'react';
import Context from './context';
import { useDispatch } from 'react-redux'
import { setUserDeatil } from './store/userSlice';



function App() {
  const dispatch = useDispatch()
  const [datacount, setDatacount] = useState(0)
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
      if (DataApi.error) {
        console.log("please login");

      }

    } catch (error) {
      console.error('Failed to fetch user details:', error);
    }
  };
  const fechAddtoCart = async () => {
    try {
      const fetchData = await fetch(summaryApi.cartCound.url, {
        method: summaryApi.cartCound.method,
        credentials: 'include',
        headers: {
          "content-type": "application/json",
        }
      })
      const respons = await fetchData.json()
      console.log("kjnsfgjdfgjkdfj" + respons.data);
      setDatacount(respons)



    } catch (error) {
      console.log("error");

    }
  }


  useEffect(() => {
    fetchUserDetail();
    fechAddtoCart()
  }, []);

  return (
    <>
      <Context.Provider value={{
        fetchUserDetail,
        datacount,
        fechAddtoCart
      }}>

        <Header />
        <main className='min-h-[calc(100vh-120px)] pt-16'>
          <Outlet />
        </main>
        <Footer />
        <ToastContainer />
      </Context.Provider >
    </>
  );
}

export default App;
