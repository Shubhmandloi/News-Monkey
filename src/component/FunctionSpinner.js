import React from 'react'
import loading from '../loading.gif';

function FunctionSpinner() {
  return (
    <div className='text-center my-3'>
        <img src={loading} alt={loading} />
    </div>
  )
}

export default FunctionSpinner
