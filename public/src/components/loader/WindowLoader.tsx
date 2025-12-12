import React from 'react'
import loader from '../../assets/loader.json';
import Lottie from 'lottie-react';

const WindowLoader = () => {
  return (
    <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        width: '100vw',
    }}>
        <Lottie style={{width: '10vw'}} animationData={loader} loop={true} />
    </div>
  )
}

export default WindowLoader