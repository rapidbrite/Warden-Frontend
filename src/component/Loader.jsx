import React from 'react'
import { Triangle } from 'react-loader-spinner'
import "../scss/loader.scss";
const Loader = () => {
  return (
    <div className='loader'>
            <h1>War<span>d</span>en</h1>
            <Triangle
                height = "300"
                width = "300"
                radius = "9"
                color = '#1f62ff'
            />
    </div>
  )
}

export default Loader