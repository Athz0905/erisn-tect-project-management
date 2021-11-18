import React from 'react'

function Card(props) {
    return (
        <div className="card_block" > 
    
            <div>
                <img
                    className='card__item_img'
                    alt='Image'
                    src={props.src}
                />
            </div>
            <div>
                <h5>{props.val}</h5>
                <p>{props.text}</p>
            </div>

        </div>
    )
}

export default Card;
