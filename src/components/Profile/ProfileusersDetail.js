import React, {useState , useEffect} from "react";
import Header from "../../components/Others/Header";
import Sidebar from "../../components/Others/Sidebar";
import Button from "../../components/Others/Button";
import { Link } from "react-router-dom";
import HomeIcon from "@material-ui/icons/HomeTwoTone";

const ProfileusersDetail = () => { 
  const LOCAL_STORAGE_KEY = "res";
  const [contacts, setContacts] = useState("");
  
  useEffect(() => {
    const retriveContacts = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));

    if (retriveContacts) setContacts(retriveContacts);
  }); 

//   renderComments(){
//     return this.state.comments.map((comment,index) => 
//         <Comment 
//             key={index{
//             username={comment.username}
//             email={comment.email}
//             comment={comment.comment}
//         />
//     )
// }

 

// let renderContactList;
//   if (contacts) { 
//     renderContactList  = contacts.map((event) => {  
//       const { firstname , lastname , email , dropdown } = event;  
//           return (
//             <div> 
//                   <div className="row my-3">
//               <div className="col-md-4">
//                <h3>Name</h3>
               
//               </div>
//               <div className="col-md-4">
//               <p>{firstname} {lastname}</p>
//               </div>
//             </div>  
//             <div className="row my-3">
//               <div className="col-md-4">
//                <h3>Email Address</h3>
//               </div>
//               <div className="col-md-4">
//              <p>{email}</p>
//               </div>
//             </div>
//             <div className="row my-3">
//               <div className="col-md-4">
//                <h3>Role</h3>
//               </div>
//               <div className="col-md-4">
//              <p>{dropdown}</p>
//               </div>
//             </div>
             
           
//             </div>
//           );
       
//         }); 
  
//       }


  return (
    <div className="">
      <div className="Proj_main">
        <div className="Proj_main_l">
          <Sidebar 
           cname1=""
           cname2=""
           cname3=""
           cname4="activeclass" />
        </div>

        <div className="Proj_main_r">
          <Header />
          <div className="invite_users">
            <h1>Invite Users</h1>
            <h6>User Profile</h6>
        
            <div> 
                  <div className="row my-3">
              <div className="col-md-4">
               <h3>Name</h3>
               
              </div>
              <div className="col-md-4">
              <p></p>
              </div>
            </div>  
            <div className="row my-3">
              <div className="col-md-4">
               <h3>Email Address</h3>
              </div>
              <div className="col-md-4">
             <p></p>
              </div>
            </div>
            <div className="row my-3">
              <div className="col-md-4">
               <h3>Role</h3>
              </div>
              <div className="col-md-4">
             <p> </p>
              </div>
            </div>
             
           
            </div>
            <Link to='/ProfileEdit' className='side_links' >
            <Button  type="button"
            text="Edit" />
            </Link>

            {/* {JSON.stringify(contacts)} */}
         
       
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileusersDetail;
