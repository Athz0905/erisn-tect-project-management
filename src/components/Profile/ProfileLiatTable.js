import React from 'react';
import Button from "../../components/Others/Button";
import { Modal, Table } from 'react-bootstrap';
import "../../Veiwdetail.css";
import { Link } from "react-router-dom";

const style = {
    textAlign: 'center',
  };

const ProfileLiatTable = (props) => {
    return (
        <div className="" style={{overflow:"scroll"}}>
     <Table striped bordered hover >
  <thead>
    <tr>
      <th>SI.No</th>
      <th> Name </th>
      <th>Role </th>
      <th> Email  </th> 
      <th> Profile Details  </th>
      <th>Actions</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>1</td>
      <td>Chris Morgan</td>
      <td>Admin</td>
      <td> chrismorgan@gmail.com</td>
     
      <td>
      <Link to='/ProfileusersDetail' className='side_links' style={style}>
          <Button
  text='Veiw Details'/> 
  </Link>
  </td> 
  <td>
      <img src="/images/Icon material-edit.svg" className="mx-1"/> 
      <img src="/images/Icon material-delete.svg" className="mx-1" />
  </td>
    </tr> 
    <tr>
      <td>1</td>
      <td>Chris Morgan</td>
      <td>Admin</td>
      <td> chrismorgan@gmail.com</td>
     
      <td>
      <Link to='/ProfileusersDetail' className='side_links' style={style}>
          <Button
  text='Veiw Details'/> 
  </Link>
  </td> 
  <td>
      <img src="/images/Icon material-edit.svg" className="mx-1"/> 
      <img src="/images/Icon material-delete.svg" className="mx-1" />
  </td>
    </tr>  
    <tr>
      <td>1</td>
      <td>Chris Morgan</td>
      <td>Admin</td>
      <td> chrismorgan@gmail.com</td>
     
      <td>  <Link to='/ProfileusersDetail' className='side_links' style={style}>
          <Button
  text='Veiw Details'/> 
  </Link>
  </td> 
  <td>
      <img src="/images/Icon material-edit.svg" className="mx-1"/> 
      <img src="/images/Icon material-delete.svg" className="mx-1" />
  </td>
    </tr> 
    <tr>
      <td>1</td>
      <td>Chris Morgan</td>
      <td>Admin</td>
      <td> chrismorgan@gmail.com</td>
     
      <td>  <Link to='/ProfileusersDetail' className='side_links' style={style}>
          <Button
  text='Veiw Details'/> 
  </Link>
  </td> 
  <td>
      <img src="/images/Icon material-edit.svg" className="mx-1"/> 
      <img src="/images/Icon material-delete.svg" className="mx-1" />
  </td>
    </tr> 
 
  </tbody>
</Table>
        </div>
    )
}

export default ProfileLiatTable;
