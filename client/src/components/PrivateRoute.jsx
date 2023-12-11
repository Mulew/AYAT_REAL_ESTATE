import React from 'react'
import { useSelector } from 'react-redux';
import { Outlet,Navigate } from 'react-router-dom';
const PrivateRoute = () => {
    const {currentuser} = useSelector((state) => state.user)
  return (
    <div>
    {currentuser ? <Outlet /> : <Navigate to='/signin' />}
    </div>
  )
}

export default PrivateRoute;
