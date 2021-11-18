import React from 'react';
import {  Table } from 'react-bootstrap';
import Button from '../../components/Others/Button';
import { Link } from "react-router-dom";

const ProjectList = ({ item }) => {
    return (
        <div style={{overflow:"scroll"}}>
            <Table striped bordered hover >
  <thead>
    <tr>
      <th>#</th>
      <th>Project Name</th>
      <th> Client Name</th>
      <th>Project Type</th>
      <th> Status </th> 
      <th> Action  </th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>{item.id}</td>
      <td>{item.projectName}</td>
      <td> {item.clientName}</td>
      <td>{item.businessType} </td>
      <td>{item.status}</td>
      <td>
        <Link to='/ProjectVeiwDetail' className='signuplinks'>
             <Button text='Veiw Details'/>
        </Link>
      </td> 
      </tr> 
      </tbody>
    </Table>
        </div>
    )
}

export default ProjectList;
