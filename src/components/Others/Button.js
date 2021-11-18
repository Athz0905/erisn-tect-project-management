import React from 'react'

const Button = (props) => {
    return (
        <div className="">
            <button type="button" 
            className="btn_val"
            id={props.id}
            >
                {/* <img src={props.src} alt="my image" width="15px"/> */}
                {props.text}
            </button> 
          
            
        </div>
    )
}

export default Button;
