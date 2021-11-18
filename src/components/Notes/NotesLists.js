import React , {useEffect, useState} from "react";
import ButtonIcon from "../../components/Others/ButtonIcon";
import { Link } from "react-router-dom"; 
import axios from "axios";
import { useLocation } from "react-router"
import Loader from "../../components/Others/Loader";
import { useHistory } from "react-router-dom"
import dateFormat from "dateformat";
import EditIcon from '@mui/icons-material/Edit';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const NotesLists = () => {  

  toast.configure();

  const history = useHistory()

  let token = localStorage.getItem("auth_token");
  const location = useLocation();
  const projectId = location.pathname.split("/")[2];

  
 

//getting project discussions by project id

 const [loading, setLoading] = useState(true)
 const [discussions, setDiscussions] = useState([]);
 

 useEffect(() => {
   let token = localStorage.getItem("auth_token");
   axios
     .get(`https://freshhu.com/cnu/projectmanagement/api/admin/projectManagement/projects/${projectId}/discussions`, {
       headers: {
         Authorization: `Bearer ${token}`,
         "Access-Control-Allow-Origin": "*",
         "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
         "Access-Control-Allow-Headers":
           "Origin, X-Requested-With, Content-Type,Accept, x-client-key, x-client-token, x-client-secret, Authorization",
       },
     })
     .then((response) => {
       console.log(response.data.discussions);
       setDiscussions(response.data.discussions)
       setLoading(false)
     })
     .catch((error) => {
       console.log(error);
     });
 }, [token]);

   //delete discussion
    
   const deleteHandler = (id) => {
    const todelete = window.confirm("Are you sure you want to delete ?");
    if (todelete) {
    axios
    .delete(`https://freshhu.com/cnu/projectmanagement/api/admin/projectManagement/discussions/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
        "Access-Control-Allow-Headers":
          "Origin, X-Requested-With, Content-Type,Accept, x-client-key, x-client-token, x-client-secret, Authorization",
      },
    })
    .then((response) => {
      setLoading(false)
      console.log("Discussion Deleted Succesfully");
      window.location.reload(false);
      toast("Discussion Deleted Succesfully", { type: "success" });
    })
    .catch((error) => {
      console.log(error);
    });
  } 
}

    //edit discussion
    
    const editHandler = (id) => {
      axios
      .get(`https://freshhu.com/cnu/projectmanagement/api/admin/projectManagement/discussions/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
          "Access-Control-Allow-Headers":
            "Origin, X-Requested-With, Content-Type,Accept, x-client-key, x-client-token, x-client-secret, Authorization",
        },
      })
      .then((response) => {
        setLoading(false)
        console.log("Discussion Fetched Succesfully");
        localStorage.setItem("discussion-head", response.data.discussion.heading)
        localStorage.setItem("discussion-desc", response.data.discussion.description)
        history.push(`/EditNotes/${id}/${projectId}`)
      })
      .catch((error) => {
        console.log(error);
      });
    } 


  return (
    <div>
      <div className="projectmaintabs_update">
        <div className="projectmaintabs_update_sect">
          <h4>Discussion List</h4>
          <Link to={`/AddNotes/${projectId}`} className="side_links">
            <ButtonIcon
              text="Add Notes "
              src="../images/Icon ionic-ios-add (2).svg"
              id="btn_radius"
            />
          </Link>
        </div>

        <div>

         {loading ? <Loader /> :
        discussions.map((item) => ( 
          <div key={item.id} className="projectmaintabs_update_sec">
            <div className="projectmaintabs_update_section">
               <h5>
                 {item.heading.toUpperCase()}
              </h5>
              <p style={{fontWeight:'600'}}>{ dateFormat(item.created_at, "mmm d, yyyy")}</p>
            </div>
         
           <p>{item.description}</p>

          
             
             <div style={{display:'flex', justifyContent:'space-between'}}>
                 <div>
                 <h6> 
                    Added By <span>{item.createdUserName}</span>
                </h6>
                 </div>
               <div  style={{display:'flex', justifyContent:'space-between', cursor:'pointer'}}>
                {/* <Link to={`/EditNotes/${item.id}/${id}`} style={{textDecoration:'none', color:'black'}}> */}
                   <EditIcon  onClick={() => editHandler(item.id)}/>
                 {/* </Link> */}

                 <img
                    src="/images/Icon material-delete.svg"
                    className="delete_icon"
                    style={{marginLeft:'2%'}}
                    onClick={() => deleteHandler(item.id)}
                 />
                 </div>
              </div>
          </div>  
       ))}  

       
         
        
        </div>
      </div>

    </div>
  );
};

export default NotesLists;
