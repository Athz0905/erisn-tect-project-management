import React from 'react'
import {Redirect, Link} from "react-router-dom"

const Card_manage = (props) => {
    return (


    //  <Redirect to={`/ProjectVeiwDetail/${props.projectId}`} > 
    <Link style={{color:'black',textDecoration:'none'}} to={`/ProjectVeiwDetail/${props.projectId}`}>
        <div className="card_manage_block" >
       
            <h2><span>#{props.val}</span>{props.heading}</h2>
            <div className="dp-list">
            <div className="dp-list_l">
                <div className="dp-list_l_sec">
                    <p>{props.status}</p>
                    <h5>Status</h5>
                </div>
                <div className="dp-list_l_sec">
                    <p>{props.Deadline}</p>
                    <h5>Deadline</h5>
                </div>

            </div>

            <div className="dp-list_r_sec">
            
            <div className="dp-list_r">
                <div className="itemlistdata">{props.alp}</div>
               
                </div>
                <h4>Team</h4>
            </div> 
           
            </div>
         
        </div>
        </Link>
    //   </Redirect> 
    )
}


export default Card_manage;
