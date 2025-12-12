import React, {useEffect} from 'react'
import { Outlet } from 'react-router-dom';
import { useContext } from 'react';
import { GlobalContext } from './context/GlobalContext';
import WindowLoader from './components/loader/WindowLoader';

const AuthGuard = () => {

  const token = localStorage.getItem('token');
  const { currentUser, selectedWarehouse, globalContextInit } = useContext(GlobalContext);
  
  useEffect(() => {
    globalContextInit();
  }, [])

  if (!token) {
    window.location.href = '/';
  }

  if (!currentUser || !selectedWarehouse) {
    return <WindowLoader />
  }

  return (
    <Outlet />
  )
}

export default AuthGuard