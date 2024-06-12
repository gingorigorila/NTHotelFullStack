/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react'


const CustomButton = ({className, children, id, onClick, style}) =>{
    return(
        <div className="col-12 d-flex justify-content-center">
            <button className={className} 
            id={id}
            onClick={onClick}
            style={{width: '40%', ...style}}
            >{children}
            </button>
            
        </div>
        
    )
}

export default CustomButton