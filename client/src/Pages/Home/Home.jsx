import React from 'react'
import { Navigate } from "react-router-dom";
import Navigation from '../../Components/Navigation/Navigation'
import CenterTile from '../../Components/CenterTile/CenterTile'

function Home() {
  const token = localStorage.getItem('token')


  return (
    <>
      {token ?
        <Navigate to="/candidateDashboard" />
        :
        <>
          <Navigation />
          <CenterTile />
        </>

      }
    </>
  )
}

export default Home