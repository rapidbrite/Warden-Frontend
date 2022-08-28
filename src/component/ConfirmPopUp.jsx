import React from 'react'
import "../scss/confirmpopup.scss";


const ConfirmPopUp = ({title,desc,handleClose,handleConfirm}) => {
  return (
    <div className='confirmpopup'>
        
        <h1>{title}</h1>
        <h2>{desc}</h2>
        <div className='confirmpopup__buttons'>
            <div className='confirmpopup__buttons__no' onClick={handleClose}>Cancel</div>
            <div className='confirmpopup__buttons__yes' onClick={handleConfirm}>Yes</div>
            
        </div>
    </div>
  )
}

export default ConfirmPopUp