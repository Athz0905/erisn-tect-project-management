import React, {useState} from 'react';
import {  Table } from 'react-bootstrap';
import Button from '../../components/Others/Button';
import { Link } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import ReactPaginate from "react-paginate";

const BillingList = ({BillingReportsTable}) => {


 
  const [currentPage, setCurrentPage] = useState(0);

  const PER_PAGE = 5;

  const offset = currentPage * PER_PAGE;

  const pageCount = Math.ceil(BillingReportsTable.length / PER_PAGE);

  function handlePageClick({ selected: selectedPage }) {
    setCurrentPage(selectedPage);
  }
  const currentPosts = BillingReportsTable.slice(offset, offset + PER_PAGE);

  let getusersdata = currentPosts.map((item, index) => {
    return (
      <>
        <tr key={item.project_id}> 
        <td>{index+1}</td> 
          <td>{item.projectName}</td>
          <td>{item.clientName}</td>
          <td>{item.totalAmount}</td>
          <td>{item.totalInstallments}</td>
          <td>{item.totalPaidAmount}</td>
          <td>{item.totalUnPaidAmount}</td> 
          <td>
          <Link  to={`/ProjectVeiwDetail/${item.project_id}`} >
              <EditIcon
              style={{ color: "#000",  cursor: "pointer" }} />
            </Link>  
            {/* <Link to={`/ProjectVeiwDetail/${item.project_id}`}> */}
            {/* <DeleteIcon
              style={{ color: "#F23801", cursor: "pointer" }}/> */}
              {/* </Link>  */}
              </td>
        </tr>
      </>
    );
  });
    return (
        <div style={{overflow:"hidden"}}>
            <Table striped hover >
  <thead>
    <tr>
    <th>SI NO</th> 
      <th>Project Name</th>
      <th> Client Name</th>
   
      <th>Amount Charged</th>
      <th>Total Installments</th>
      <th>Paid Amount </th>
      <th> UnPaid Amount  </th> 
      <th> Action  </th>
    </tr>
  </thead>
  <tbody>
   {getusersdata}
 
  </tbody>
</Table> 
<ReactPaginate
                    previousLabel={"← Previous"}
                    nextLabel={"Next →"}
                    pageCount={pageCount}
                    onPageChange={handlePageClick}
                    containerClassName={"pagination"}
                    previousLinkClassName={"pagination__link"}
                    nextLinkClassName={"pagination__link"}
                    disabledClassName={"pagination__link--disabled"}
                    activeClassName={"pagination__link--active"}
                  />
        </div>
    )
}

export default BillingList;