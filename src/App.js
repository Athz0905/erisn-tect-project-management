import React from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "font-awesome/css/font-awesome.min.css";
import Home from "./pages/Home";
import Projects from "./components/Projects/Projects";
import BillingReports from "./components/Billing/BillingReports";
import AddProjectDetail from "./components/Projects/AddProjectDetail";
import AddProjectBilling from "./components/Billing/AddProjectBilling";
import AddClientDetail from "./components/Clients/AddClientDetail";
import AddClient from "./components/Clients/AddClient";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import ForgotPassword from "./pages/ForgotPassword";
import ProjectVeiwDetail from "./components/Projects/ProjectVeiwDetail";
import ProfileCreation from "./components/Profile/ProfileCreation";
import BillingReportDetail from "./components/Billing/BillingReportDetail";
import ClientProjectDetail from "./components/Projects/ClientProjectDetail";
import ProfileInviteUsers from "./components/Profile/ProfileInviteUsers";
import ProfileusersDetail from "./components/Profile/ProfileusersDetail";
import "./Responsive.css";
import AddNotes from "./components/Notes/AddNotes";
import TeamveiwDeatils from "./components/Teams/TeamveiwDeatils";
import ResetPassword from "./pages/ResetPassword";
import OptVal from "./components/Others/OtpVal";
import GetUsers from "./components/Users/GetUsers";
import GetRoles from "./components/Roles/GetRoles";
import CreateRoles from "./components/Roles/CreateRoles";
import EditProjectDetail from "./components/Projects/EditProjectDetails";
import RoleViewDetail from "./components/Roles/RoleViewDetails";
import AddRoleDetails from "./components/Roles/AddRoleDetails";
import EditRoleDetails from "./components/Roles/EditRoleDetails";
import AddInstallment from "./components/Installment/AddInstallment";
import ProjectType from "./components/Projects/ProjectType";
import ProjectTeamtype from "./components/Projects/ProjectTeamtype";
import ProjectTechnologies from "./components/Projects/ProjectTechnologies";
import EditInstallment from "./components/Installment/EditInstallment";
import EditNotes from "./components/Notes/EditNotes";
import AddClients from "./components/Clients/AddClients";
import Clients from "./components/Clients/Clients";
import ClientViewDetails from "./components/Clients/ClientViewDetails";
import EditClient from "./components/Clients/EditClient";
import Users from "./components/Users/Users";
import UserViewDetails from "./components/Users/UserViewDetails";
import AddUser from "./components/Users/AddUser";
import EditUser from "./components/Users/EditUser";
import AddTeams from "./components/Teams/AddTeams";
import EditTeams from "./components/Teams/EditTeams";
import BillingFilteration from "./components/Billing/BillingFilteration";
import Billingfilterpaid from "./components/Billing/Billingfilterpaid";
import BillingAllData from "./components/Billing/BillingAllData";
import BillingBasedDate from "./components/Billing/BillingBasedDate";
import NotFoundPage from "./components/Others/PageNotFound";
import { ProtectedRoute } from "./protectedRoutes";
import ProjectStatusList from "./components/Status/ProjectStatusList";
import AddStatus from "./components/Status/AddStatus";
import EditStatus from "./components/Status/EditStatus";
import ManagementUsersList from "./components/InternalManagementUsers/ManagementUsersList";
import ManagementUsers from "./components/InternalManagementUsers/ManagementUsers";
import AddManagementUser from "./components/InternalManagementUsers/AddManagementUser";
import ManagementUserViewDetails from "./components/InternalManagementUsers/ManagementUserViewDetails";
import DataBaseBackup from "./components/Databasebackup/DataBaseBackup";
import UserLogActivity from "./components/UserLogActivity/UserLogActivity";
import UserLogBasedondate from "./components/UserLogActivity/UserLogBasedondate";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/" exact component={Login} />
          <ProtectedRoute path="/admin/dashBoard" component={Home} />
          <ProtectedRoute
            path="/ClientProjectDetail"
            component={ClientProjectDetail}
          />
          <ProtectedRoute path="/AddNotes" component={AddNotes} />
          <ProtectedRoute path="/EditNotes" component={EditNotes} />
          <ProtectedRoute
            path="/ProfileusersDetail"
            component={ProfileusersDetail}
          />
          <ProtectedRoute
            path="/ProjectVeiwDetail"
            component={ProjectVeiwDetail}
          />
          <ProtectedRoute path="/TeamveiwDeatils" component={TeamveiwDeatils} />
          <ProtectedRoute
            path="/BillingBasedDate"
            component={BillingBasedDate}
          />
          <ProtectedRoute
            path="/BillingFilteration"
            component={BillingFilteration}
          />
          <ProtectedRoute path="/BillingAllData" component={BillingAllData} />
          <ProtectedRoute
            path="/Billingfilterpaid"
            component={Billingfilterpaid}
          />
          <ProtectedRoute
            path="/ProfileInviteUsers"
            component={ProfileInviteUsers}
          />
          <ProtectedRoute path="/ProfileCreation" component={ProfileCreation} />
          <ProtectedRoute
            path="/ProfileusersDetail"
            component={ProfileusersDetail}
          />
          <ProtectedRoute path="/SignUp" component={SignUp} />
          <ProtectedRoute path="/admin/project/projects" component={Projects} />
          <ProtectedRoute
            path="/admin/billing-reports"
            exact
            component={BillingReports}
          />
          <ProtectedRoute path="/EditProject" component={EditProjectDetail} />
          <ProtectedRoute
            path="/AddProjectDetail"
            component={AddProjectDetail}
          />
          <ProtectedRoute path="/AddRoleDetail" component={AddRoleDetails} />
          <ProtectedRoute path="/EditRoleDetails" component={EditRoleDetails} />
          <ProtectedRoute
            path="/AddProjectBilling"
            component={AddProjectBilling}
          />
          <ProtectedRoute path="/AddClientDetail" component={AddClientDetail} />
          <ProtectedRoute
            path="/admin/masterMenu/projectTypes"
            component={ProjectType}
          />
          <ProtectedRoute
            path="/admin/masterMenu/projectTeamTypes"
            component={ProjectTeamtype}
          />
          <ProtectedRoute
            path="/admin/masterMenu/projectTechnologies"
            component={ProjectTechnologies}
          />
          <ProtectedRoute path="/AddInstallment" component={AddInstallment} />
          <ProtectedRoute path="/EditInstallment" component={EditInstallment} />
          <ProtectedRoute path="/admin/project/clients" component={Clients} />
          <ProtectedRoute path="/AddClient" component={AddClient} />
          <ProtectedRoute path="/ForgotPassword" component={ForgotPassword} />
          <ProtectedRoute
            path="/BillingReportDetail"
            component={BillingReportDetail}
          />
          <ProtectedRoute path="/ResetPassword" component={ResetPassword} />
          <ProtectedRoute path="/OptVal" component={OptVal} />
          <ProtectedRoute path="/GetUsers" component={GetUsers} />
          <ProtectedRoute path="/RoleVeiwDetail" component={RoleViewDetail} />
          <ProtectedRoute path="/admin/roles" component={GetRoles} />
          <ProtectedRoute path="/CreateRoles" component={CreateRoles} />
          <ProtectedRoute path="/addClients" component={AddClients} />
          <ProtectedRoute path="/clientDetails" component={ClientViewDetails} />
          <ProtectedRoute path="/editClient" component={EditClient} />
          <ProtectedRoute path="/admin/users" exact component={Users} />
          <ProtectedRoute path="/addUser" component={AddUser} />
          <ProtectedRoute path="/usertDetails" component={UserViewDetails} />
          <ProtectedRoute path="/editUser" component={EditUser} />
          <ProtectedRoute path="/AddTeams" component={AddTeams} />
          <ProtectedRoute path="/EditTeams" component={EditTeams} />
          <ProtectedRoute
            path="/admin/masterMenu/projectStatusList"
            component={ProjectStatusList}
          />
          <ProtectedRoute path="/AddStatus" component={AddStatus} />
          <ProtectedRoute path="/EditStatus" component={EditStatus} />
          <ProtectedRoute
            path="ManagementUsersList"
            component={ManagementUsersList}
          />
          <ProtectedRoute
            path="/admin/masterMenu/InternalManagementUserList"
            component={ManagementUsers}
          />
          <ProtectedRoute
            path="/AddManagementUser"
            component={AddManagementUser}
          />
          <ProtectedRoute
            path="/ManagementUserViewDetails"
            component={ManagementUserViewDetails}
          />
          <ProtectedRoute
            path="/admin/master/database-backup"
            component={DataBaseBackup}
          />

          <ProtectedRoute
            path="/admin/user-log-activity"
            component={UserLogActivity}
          />
          <ProtectedRoute
            path="/UserLogBasedondate"
            component={UserLogBasedondate}
          />
          <Route component={NotFoundPage} />

          <Redirect to="/Login" />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
