import React from 'react'
import loader from '../../assets/loader-1.json';
import Lottie from 'lottie-react';

const ComponentLoader = () => {
  return (
    <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        // height: '100vh',
        // width: '100vw',
    }}>
        <Lottie style={{width: '10vw'}} animationData={loader} loop={true} />
    </div>
  )
}

export default ComponentLoader