import React, { useState, useEffect, useRef } from "react";
import Header from "../../components/Others/Header";
import Sidebar from "../../components/Others/Sidebar";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import { Modal, Button, Table, Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import { useLocation } from "react-router";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormControl";
import "../../Veiwdetail.css";
import BillingDetailTable from "../../components/Billing/BillingdetailTable";
import dateFormat from "dateformat";
import NotesLists from "../../components/Notes/NotesLists";
import Loader from "../../components/Others/Loader";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ReactPaginate from "react-paginate";
import ButtonIcon from "../../components/Others/ButtonIcon";
import EditIcon from "@mui/icons-material/Edit";
import * as moment from "moment";
import qs from "qs";
import Message from "../Others/Message";
import { red } from "@mui/material/colors";

function ProjectDetail({ history }) {
  toast.configure();

  const [selectedFile, setSelectedFile] = useState([]);
  const [isFilePicked, setIsFilePicked] = useState(false);

  const [lgShow, setLgShow] = useState(false);
  const [showUrlBoard, setShowUrlBoard] = useState(false);
  const [showStatusModal, setShowStatusModal] = useState(false);

  let token = localStorage.getItem("auth_token");

  const location = useLocation();
  const projectId = location.pathname.split("/")[2];

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [projectDetails, setProjectDetails] = useState([]);
  const [projectTypes, setProjectTypes] = useState([]);
  const [projectTechnologies, setProjectTechnologies] = useState([]);
  const [searchbar, setsearchbar] = useState("");
  const [docType, setDocType] = useState("");

  const [selectedValue, setSelectedValue] = React.useState("a");

  const handleColorChange = (event) => {
    setSelectedValue(event.target.value);
  };

  const controlProps = (item) => ({
    checked: selectedValue === item,
    onChange: handleColorChange,
    value: item,
    name: "color-radio-button-demo",
    inputProps: { "aria-label": item },
  });

  const danger = red[500]; // #f44336

  const [status, setStatus] = useState("");

  console.log(status);

  useEffect(() => {
    axios
      .get(
        `https://freshhu.com/cnu/projectmanagement/api/admin/projectManagement/projects/${projectId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
            "Access-Control-Allow-Headers":
              "Origin, X-Requested-With, Content-Type,Accept, x-client-key, x-client-token, x-client-secret, Authorization",
          },
        }
      )
      .then((response) => {
        console.log(response.data, "project");
        setProjectDetails(response.data.project);
        setProjectTypes(response.data.projectTypes);
        setProjectTechnologies(response.data.projectTechnologies);
        localStorage.setItem("project-name", response.data.project.projectName);
        localStorage.setItem(
          "business-type",
          response.data.project.businessType
        );
        localStorage.setItem("project-cost", response.data.project.cost);
        localStorage.setItem("clientId", response.data.project.client_id);
        localStorage.setItem(
          "fromDate",
          dateFormat(response.data.project.startDate),
          "d-m-yyyy"
        );
        localStorage.setItem(
          "lastDate",
          dateFormat(response.data.project.endDate),
          "d-m-yyyy"
        );

        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [token]);

  const startDate = moment(new Date(projectDetails.startDate)).format(
    "YYYY-MM-DD"
  );
  const endDate = moment(new Date(projectDetails.endDate)).format("YYYY-MM-DD");
  const selectedstartDate = moment(new Date(projectDetails.startDate)).format(
    "YYYY-MM-DD"
  );
  const selectedendDate = moment(new Date(projectDetails.endDate)).format(
    "YYYY-MM-DD"
  );
  localStorage.setItem("startDateproj", selectedstartDate);

  localStorage.setItem("endDateproj", selectedendDate);

  //getting installment details

  const [installmentDetails, setInstallmentDetails] = useState([]);
  const [installments, setInstallments] = useState([]);

  useEffect(() => {
    axios
      .get(
        `https://freshhu.com/cnu/projectmanagement/api/admin/projectManagement/projects/${projectId}/installments`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
            "Access-Control-Allow-Headers":
              "Origin, X-Requested-With, Content-Type,Accept, x-client-key, x-client-token, x-client-secret, Authorization",
          },
        }
      )
      .then((response) => {
        setInstallmentDetails(response.data.billing_details);
        setInstallments(response.data.installments);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [token]);

  //create document

  const [docErrorMessage, setDocErrorMessage] = useState(false);

  function handleChange(event) {
    setSelectedFile(event.target.files);
    setIsFilePicked(true);
  }

  const handleUpload = (e) => {
    e.preventDefault();
    const formData = new FormData();
    for (let i = 0; i < selectedFile.length; i++) {
      formData.append(`documents[${i}]`, selectedFile[i]);
    }
    console.log(selectedFile, "selected file");
    formData.append("project_id", projectId);
    formData.append("documentType", docType);

    console.log(formData, "form data");

    axios
      .post(
        `https://freshhu.com/cnu/projectmanagement/api/admin/projectManagement/documents`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
            "Access-Control-Allow-Headers":
              "Origin, X-Requested-With, Content-Type,Accept, x-client-key, x-client-token, x-client-secret, Authorization",
          },
        }
      )

      .then((response) => {
        console.log(response, "doc upload");
        toast("Document Added Succesfully", { type: "success" });
        history.push("/admin/project/projects");
      })

      .catch((error) => {
        console.error("There was an error!", error.response.data.message);
        setDocErrorMessage(true);
        setDocErrorMessage(error.response.data.message);
      });
  };

  //display project urls by project id

  const [projectUrls, setProjectUrls] = useState([]);

  useEffect(() => {
    axios
      .get(
        `https://freshhu.com/cnu/projectmanagement/api/admin/projectManagement/projects/${projectId}/urls`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
            "Access-Control-Allow-Headers":
              "Origin, X-Requested-With, Content-Type,Accept, x-client-key, x-client-token, x-client-secret, Authorization",
          },
        }
      )
      .then((response) => {
        setLoading(false);
        console.log("Urls Fetched Succesfully");
        console.log(response.data.urlLinkList, "url list");
        setProjectUrls(response.data.urlLinkList);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  //display project status by project id

  const [projectStatus, setProjectStatus] = useState([]);

  useEffect(() => {
    axios
      .get(
        `https://freshhu.com/cnu/projectmanagement/api/admin/masterMenu/projectStatusList`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
            "Access-Control-Allow-Headers":
              "Origin, X-Requested-With, Content-Type,Accept, x-client-key, x-client-token, x-client-secret, Authorization",
          },
        }
      )
      .then((response) => {
        setLoading(false);
        console.log("Status Fetched Succesfully");
        console.log(response.data.projectStatusLists, "status list");
        setProjectStatus(response.data.projectStatusLists);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  //display documentents by project id

  const [documents, setDocuments] = useState([]);

  useEffect(() => {
    axios
      .get(
        `https://freshhu.com/cnu/projectmanagement/api/admin/projectManagement/projects/${projectId}/documents`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
            "Access-Control-Allow-Headers":
              "Origin, X-Requested-With, Content-Type,Accept, x-client-key, x-client-token, x-client-secret, Authorization",
          },
        }
      )
      .then((response) => {
        setLoading(false);
        console.log("Document Fetched Succesfully");
        console.log(response.data);
        setDocuments(response.data.documents);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [token]);

  //display documentents by document type other

  const [documentByTypeOther, setDocumentByTypeOther] = useState([]);

  useEffect(() => {
    axios
      .get(
        `https://freshhu.com/cnu/projectmanagement/api/admin/projectManagement/projects/${projectId}/documents?documentType=other`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
            "Access-Control-Allow-Headers":
              "Origin, X-Requested-With, Content-Type,Accept, x-client-key, x-client-token, x-client-secret, Authorization",
          },
        }
      )
      .then((response) => {
        setLoading(false);
        console.log("Document By Type Fetched Succesfully");
        console.log(response.data.documents);
        setDocumentByTypeOther(response.data.documents);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  //display documentents by document type agreement

  const [documentByTypeAgreement, setDocumentByTypeAgreement] = useState([]);

  useEffect(() => {
    axios
      .get(
        `https://freshhu.com/cnu/projectmanagement/api/admin/projectManagement/projects/${projectId}/documents?documentType=agreement`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
            "Access-Control-Allow-Headers":
              "Origin, X-Requested-With, Content-Type,Accept, x-client-key, x-client-token, x-client-secret, Authorization",
          },
        }
      )
      .then((response) => {
        setLoading(false);
        console.log("Document By Type Fetched Succesfully");
        console.log(response.data.documents);
        setDocumentByTypeAgreement(response.data.documents);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  //display documentents by document type proposal

  const [documentByTypeProposal, setDocumentByTypeProposal] = useState([]);

  useEffect(() => {
    axios
      .get(
        `https://freshhu.com/cnu/projectmanagement/api/admin/projectManagement/projects/${projectId}/documents?documentType=proposal`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
            "Access-Control-Allow-Headers":
              "Origin, X-Requested-With, Content-Type,Accept, x-client-key, x-client-token, x-client-secret, Authorization",
          },
        }
      )
      .then((response) => {
        setLoading(false);
        console.log("Document By Type Fetched Succesfully");
        console.log(response.data.documents);
        setDocumentByTypeProposal(response.data.documents);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  //display documentents by document type requirement

  const [documentByTypeRequirement, setDocumentByTypeRequirement] = useState(
    []
  );

  useEffect(() => {
    axios
      .get(
        `https://freshhu.com/cnu/projectmanagement/api/admin/projectManagement/projects/${projectId}/documents?documentType=requirement`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
            "Access-Control-Allow-Headers":
              "Origin, X-Requested-With, Content-Type,Accept, x-client-key, x-client-token, x-client-secret, Authorization",
          },
        }
      )
      .then((response) => {
        setLoading(false);
        console.log("Document By Type Fetched Succesfully");
        console.log(response.data.documents);
        setDocumentByTypeRequirement(response.data.documents);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  //displaying documents by id
  const [doc, setDoc] = useState([]);

  const showDoc = (id) => {
    if (doc) {
      axios
        .get(
          `https://freshhu.com/cnu/projectmanagement/api/admin/projectManagement/documents/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Access-Control-Allow-Origin": "*",
              "Access-Control-Allow-Methods":
                "GET,PUT,POST,DELETE,PATCH,OPTIONS",
              "Access-Control-Allow-Headers":
                "Origin, X-Requested-With, Content-Type,Accept, x-client-key, x-client-token, x-client-secret, Authorization",
            },
          }
        )
        .then((response) => {
          setLoading(false);
          console.log("Document Fetched Succesfully");
          console.log(response.data.document);
          setDoc(response.data.document);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      console.log("document is fetched");
    }
  };

  //delete installments

  const deleteHandler = (id) => {
    const todelete = window.confirm("Are you sure you want to delete ?");
    if (todelete) {
      axios
        .delete(
          `https://freshhu.com/cnu/projectmanagement/api/admin/projectManagement/documents/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Access-Control-Allow-Origin": "*",
              "Access-Control-Allow-Methods":
                "GET,PUT,POST,DELETE,PATCH,OPTIONS",
              "Access-Control-Allow-Headers":
                "Origin, X-Requested-With, Content-Type,Accept, x-client-key, x-client-token, x-client-secret, Authorization",
            },
          }
        )
        .then((response) => {
          setLoading(false);
          console.log("Document Deleted Succesfully");
          window.location.reload(false);
          toast("Document Deleted Succesfully", { type: "success" });
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  let clientId = localStorage.getItem("clientId");

  //getting clients by id

  const [clients, setClients] = useState([]);
  const [errorMessage, setErrorMessage] = useState([]);

  useEffect(() => {
    let token = localStorage.getItem("auth_token");
    axios
      .get(
        `https://freshhu.com/cnu/projectmanagement/api/admin/projectManagement/clients/${clientId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
            "Access-Control-Allow-Headers":
              "Origin, X-Requested-With, Content-Type,Accept, x-client-key, x-client-token, x-client-secret, Authorization",
          },
        }
      )
      .then((response) => {
        console.log(response.data);
        setClients(response.data.client, "clients");
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setError(true);
        setErrorMessage(error.response.data.message);
      });
  }, [token]);

  //getting teams by project id
  const [teamsError, setTeamsError] = useState(false);
  const [teamsErrorMessage, setTeamsErrorMessage] = useState(false);
  const [teams, setTeams] = useState([]);

  const [teamMembers, setTeamMembers] = useState([]);

  useEffect(() => {
    axios
      .get(
        `https://freshhu.com/cnu/projectmanagement/api/admin/projectManagement/projects/${projectId}/teams`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
            "Access-Control-Allow-Headers":
              "Origin, X-Requested-With, Content-Type,Accept, x-client-key, x-client-token, x-client-secret, Authorization",
          },
        }
      )
      .then((response) => {
        console.log(response.data, "teams");
        setTeams(response.data.projectTeams);

        setTeamMembers(response.data.projectTeams.users);

        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setTeamsError(true);
        setTeamsErrorMessage(error.response.data.message);
      });
  }, [token]);

  //pagination

  const [currentPage, setCurrentPage] = useState(0);

  const PER_PAGE = 8;

  const offset = currentPage * PER_PAGE;

  const pageCount = Math.ceil(teams.length / PER_PAGE);

  function handlePageClick({ selected: selectedPage }) {
    setCurrentPage(selectedPage);
  }
  const currentPosts = teams.slice(offset, offset + PER_PAGE);

  //delete teams

  const deleteTeamsHandler = (id) => {
    const todelete = window.confirm("Are you sure you want to delete ?");
    if (todelete) {
      axios
        .delete(
          `https://freshhu.com/cnu/projectmanagement/api/admin/projectManagement/teams/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Access-Control-Allow-Origin": "*",
              "Access-Control-Allow-Methods":
                "GET,PUT,POST,DELETE,PATCH,OPTIONS",
              "Access-Control-Allow-Headers":
                "Origin, X-Requested-With, Content-Type,Accept, x-client-key, x-client-token, x-client-secret, Authorization",
            },
          }
        )
        .then((response) => {
          setLoading(false);
          console.log("Teams Deleted Succesfully");
          window.location.reload(false);
          toast("Teams Deleted Succesfully", { type: "success" });
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  //edit teams

  const editTeamsHandler = (id) => {
    axios
      .get(
        `https://freshhu.com/cnu/projectmanagement/api/admin/projectManagement/teams/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
            "Access-Control-Allow-Headers":
              "Origin, X-Requested-With, Content-Type,Accept, x-client-key, x-client-token, x-client-secret, Authorization",
          },
        }
      )
      .then((response) => {
        setLoading(false);
        console.log("Teams Fetched Succesfully");
        localStorage.setItem("teams-name", response.data.projectTeam.teamName);
        history.push(`/EditTeams/${id}/${projectId}`);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  //add url
  //handle create submit

  const [urlName, setUrlName] = useState("");
  const [url, setUrl] = useState("");

  const urlBoard = {
    project_id: projectId,
    name: urlName,
    link: url,
    description: "",
  };

  const handleUrl = (e) => {
    e.preventDefault();
    console.log("clicked");
    console.log(urlBoard, "urlboard");

    axios
      .post(
        "https://freshhu.com/cnu/projectmanagement/api/admin/projectManagement/urls",
        qs.stringify(urlBoard),
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
            "Access-Control-Allow-Headers":
              "Origin, X-Requested-With, Content-Type,Accept, x-client-key, x-client-token, x-client-secret, Authorization",
          },
        }
      )

      .then((response) => {
        console.log(response);
        toast("Url Added Succesfully", { type: "success" });
        window.location.reload(false);
        setUrlName("");
        setUrl("");
      })

      .catch((error) => {
        console.error("There was an error!", error);
        setError(true);
      });
  };

  //delete url

  const deleteUrlHandler = (id) => {
    const todelete = window.confirm("Are you sure you want to delete ?");
    if (todelete) {
      axios
        .delete(
          `https://freshhu.com/cnu/projectmanagement/api/admin/projectManagement/urls/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Access-Control-Allow-Origin": "*",
              "Access-Control-Allow-Methods":
                "GET,PUT,POST,DELETE,PATCH,OPTIONS",
              "Access-Control-Allow-Headers":
                "Origin, X-Requested-With, Content-Type,Accept, x-client-key, x-client-token, x-client-secret, Authorization",
            },
          }
        )
        .then((response) => {
          setLoading(false);
          console.log("Url Deleted Succesfully");
          window.location.reload(false);
          toast("Url Deleted Succesfully", { type: "success" });
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  //edit url

  const [update, setUpdate] = useState(false);

  const editUrlHandler = (id) => {
    axios
      .get(
        `https://freshhu.com/cnu/projectmanagement/api/admin/projectManagement/urls/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
            "Access-Control-Allow-Headers":
              "Origin, X-Requested-With, Content-Type,Accept, x-client-key, x-client-token, x-client-secret, Authorization",
          },
        }
      )
      .then((response) => {
        setLoading(false);
        console.log("Url Fetched Succesfully");
        setUrlName(response.data.urlData.name);
        setUrl(response.data.urlData.link);
        localStorage.setItem("urlId", response.data.urlData.id);
        setUpdate(true);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  let urlId = localStorage.getItem("urlId");

  //edit url
  //handle create submit

  const urlBoardUpdate = {
    project_id: projectId,
    name: urlName,
    link: url,
    description: "",
  };

  const handleUrlUpdate = (e) => {
    e.preventDefault();
    console.log("clicked");
    console.log(urlBoardUpdate, "urlboard");

    axios
      .put(
        `https://freshhu.com/cnu/projectmanagement/api/admin/projectManagement/urls/${urlId}`,
        qs.stringify(urlBoardUpdate),
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
            "Access-Control-Allow-Headers":
              "Origin, X-Requested-With, Content-Type,Accept, x-client-key, x-client-token, x-client-secret, Authorization",
          },
        }
      )

      .then((response) => {
        console.log(response);
        toast("Url Edit Succesfully", { type: "success" });
        window.location.reload(false);
        setUrlName("");
        setUrl("");
      })

      .catch((error) => {
        console.error("There was an error!", error);
        setError(true);
      });
  };

  //add status
  //handle status submit

  const [statusName, setStatusName] = useState("");

  const statusDetails = {
    name: statusName,
  };

  const handleStatus = (e) => {
    e.preventDefault();
    console.log("clicked");
    console.log(statusDetails, "statusDetails");

    axios
      .post(
        "https://freshhu.com/cnu/projectmanagement/api/admin/masterMenu/projectStatusList",
        qs.stringify(statusDetails),
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
            "Access-Control-Allow-Headers":
              "Origin, X-Requested-With, Content-Type,Accept, x-client-key, x-client-token, x-client-secret, Authorization",
          },
        }
      )

      .then((response) => {
        console.log(response);
        toast("Status Added Succesfully", { type: "success" });
        window.location.reload(false);
        setStatusName("");
      })

      .catch((error) => {
        console.error("There was an error!", error);
        setError(true);
      });
  };

  //edit status

  const editStatusHandler = (id) => {
    axios
      .get(
        `https://freshhu.com/cnu/projectmanagement/api/admin/masterMenu/projectStatusList/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
            "Access-Control-Allow-Headers":
              "Origin, X-Requested-With, Content-Type,Accept, x-client-key, x-client-token, x-client-secret, Authorization",
          },
        }
      )
      .then((response) => {
        setLoading(false);
        console.log("Status Fetched Succesfully");
        setStatusName(response.data.status.name);

        localStorage.setItem("statusId", response.data.status.id);
        setUpdate(true);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  //delete status

  const deleteStatusHandler = (id) => {
    const todelete = window.confirm("Are you sure you want to delete ?");
    if (todelete) {
      axios
        .delete(
          `https://freshhu.com/cnu/projectmanagement/api/admin/masterMenu/projectStatusList/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Access-Control-Allow-Origin": "*",
              "Access-Control-Allow-Methods":
                "GET,PUT,POST,DELETE,PATCH,OPTIONS",
              "Access-Control-Allow-Headers":
                "Origin, X-Requested-With, Content-Type,Accept, x-client-key, x-client-token, x-client-secret, Authorization",
            },
          }
        )
        .then((response) => {
          setLoading(false);
          console.log("Status Data Deleted Succesfully");
          window.location.reload(false);
          toast("Status Data Deleted Succesfully", { type: "success" });
        })
        .catch((error) => {
          setError(true);
          setError(error.response.data.message);
          console.log(error);
        });
    }
  };

  //edit url
  //handle create submit

  let statusId = localStorage.getItem("statusId");

  const statusDetailsUpdate = {
    name: statusName,
  };

  const handleStatusUpdate = (e) => {
    e.preventDefault();
    console.log("clicked");
    console.log(statusDetailsUpdate, "statusUpdate");

    axios
      .put(
        `https://freshhu.com/cnu/projectmanagement/api/admin/masterMenu/projectStatusLists/${statusId}`,
        qs.stringify(statusDetailsUpdate),
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
            "Access-Control-Allow-Headers":
              "Origin, X-Requested-With, Content-Type,Accept, x-client-key, x-client-token, x-client-secret, Authorization",
          },
        }
      )

      .then((response) => {
        console.log(response);
        toast("Status Data Updated Succesfully", { type: "success" });
        window.location.reload(false);
        setStatusName("");
      })

      .catch((error) => {
        console.error("There was an error!", error);
        setError(true);
      });
  };

  //update status

  const project = {
    status_id: status,
  };

  const updateStatus = (e) => {
    e.preventDefault();
    console.log("clicked");
    console.log(project);

    axios
      .put(
        `https://freshhu.com/cnu/projectmanagement/api/admin/projectManagement/projects/${projectId}`,
        qs.stringify(project),
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
            "Access-Control-Allow-Headers":
              "Origin, X-Requested-With, Content-Type,Accept, x-client-key, x-client-token, x-client-secret, Authorization",
          },
        }
      )

      .then((response) => {
        console.log(response.status);

        history.push("/admin/project/projects");
        toast("Status Updated Succesfully", { type: "success" });
      })

      .catch((error) => {
        console.error("There was an error!", error);
        setError(true);
      });
  };

  //move to existing projects

  const [projectState, setProjectState] = useState("");

  const projectData = {
    potentialProject: projectState,
  };

  const moveProject = (e) => {
    e.preventDefault();
    console.log("clicked");
    console.log(projectData);

    axios
      .put(
        `https://freshhu.com/cnu/projectmanagement/api/admin/projectManagement/projects/${projectId}`,
        qs.stringify(projectData),
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
            "Access-Control-Allow-Headers":
              "Origin, X-Requested-With, Content-Type,Accept, x-client-key, x-client-token, x-client-secret, Authorization",
          },
        }
      )

      .then((response) => {
        console.log(response.status);

        history.push("/admin/project/projects");
        toast("Project Moved Succesfully", { type: "success" });
      })

      .catch((error) => {
        console.error("There was an error!", error);
        setError(true);
      });
  };

  return (
    <div>
      <div className="Proj_main">
        <div className="Proj_main_l">
          <Sidebar cname1="" cname2="" cname3="activeclass" cname4="" />
        </div>

        <div className="Proj_main_r">
          <Header />
          <h3 className="projectheadline">
            {" "}
            <img
              src="/images/backarrows.svg"
              width="25px"
              style={{ cursor: "pointer" }}
              onClick={() => history.goBack()}
            />{" "}
            Project Details
          </h3>
          <Tabs
            defaultActiveKey="home"
            transition={false}
            id="noanim-tab-example"
            className="mb-3"
          >
            <Tab eventKey="home" title={<span> Project Details</span>}>
              <div className="  projectmaintabs">
                <div className="viewdetail">
                  {loading ? (
                    <Loader />
                  ) : (
                    <div className="viewdetail_l">
                      <div className="d-flex viewdetail">
                        <div className="viewdetail_l">
                          <h5>Project Name</h5>
                        </div>
                        <div className="viewdetail_r">
                          <p>{projectDetails.projectName}</p>
                        </div>
                      </div>

                      <div className="d-flex viewdetail">
                        <div className="viewdetail_l">
                          <h5>Business Type</h5>
                        </div>
                        <div className="viewdetail_r">
                          <p>{projectDetails.businessType}</p>
                        </div>
                      </div>

                      <div className="d-flex viewdetail">
                        <div className="viewdetail_l">
                          <h5>Project Type</h5>
                        </div>
                        <div className="viewdetail_r">
                          <p>
                            {projectTypes[0]?.name}, {projectTypes[1]?.name}
                          </p>
                        </div>
                      </div>

                      <div className="d-flex viewdetail">
                        <div className="viewdetail_l">
                          <h5>Technologies</h5>
                        </div>
                        <div className="viewdetail_r">
                          <p>
                            {projectTechnologies[0]?.name},{" "}
                            {projectTechnologies[1]?.name}
                          </p>
                        </div>
                      </div>

                      <div className="d-flex viewdetail">
                        <div className="viewdetail_l">
                          <h5>Project Cost</h5>
                        </div>
                        <div className="viewdetail_r">
                          <p>₹{projectDetails.cost}</p>
                        </div>
                      </div>

                      <div className="d-flex viewdetail">
                        <div className="viewdetail_l">
                          <h5>Start Date</h5>
                        </div>
                        <div className="viewdetail_r">
                          <p>{startDate}</p>
                        </div>
                      </div>

                      <div className="d-flex viewdetail">
                        <div className="viewdetail_l">
                          <h5>Estimated Closure Time</h5>
                        </div>
                        <div className="viewdetail_r">
                          <p>{endDate}</p>
                        </div>
                      </div>

                      <Link
                        to={`/EditProject/${projectId}`}
                        className="side_links"
                      >
                        <Button
                          variant="danger"
                          size="md"
                          style={{ marginTop: "2%" }}
                        >
                          Edit
                        </Button>
                      </Link>
                    </div>
                  )}

                  <div className="viewdetail_r">
                    <div className="viewdetail_r_blocks">
                      {projectDetails.potentialProject === 1 ? (
                        <>
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                            }}
                          >
                            <h2 style={{ color: "red" }}>Project status</h2>
                            <Button
                              variant="danger"
                              size="sm"
                              onClick={moveProject}
                            >
                              Move
                            </Button>
                          </div>
                          <FormControl component="fieldset">
                            <FormLabel
                              style={{ fontSize: "17px", fontWeight: "600" }}
                              component="legend"
                            >
                              Move to Paid Projects
                            </FormLabel>
                            <RadioGroup
                              aria-label="gender"
                              defaultValue="female"
                              name="radio-buttons-group"
                              onChange={(e) => setProjectState(e.target.value)}
                              sx={{
                                "& .MuiSvgIcon-root": {
                                  fontSize: 18,
                                },
                              }}
                            >
                              <div
                                style={{
                                  display: "flex",
                                  width: "100%",
                                  flexWrap: "wrap",
                                }}
                              >
                                <FormControlLabel
                                  value="0"
                                  control={<Radio color="default" />}
                                  label="Yes"
                                />
                                <FormControlLabel
                                  value="1"
                                  control={<Radio color="default" />}
                                  label="No"
                                />
                              </div>
                            </RadioGroup>
                          </FormControl>
                        </>
                      ) : (
                        <>
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                            }}
                          >
                            <h2 style={{ color: "red" }}>Project status</h2>
                            <Button
                              variant="danger"
                              onClick={updateStatus}
                              size="sm"
                            >
                              Update
                            </Button>
                          </div>

                          <div className="viewdetail_r_block">
                            <div className="viewdetail_r_sec">
                              <h6 className="currentStatus">
                                {projectDetails?.status}
                              </h6>

                              <FormControl component="fieldset">
                                <RadioGroup
                                  aria-label="status"
                                  defaultValue=""
                                  name="radio-buttons-group"
                                  onChange={(e) => setStatus(e.target.value)}
                                  sx={{
                                    "& .MuiSvgIcon-root": {
                                      fontSize: 18,
                                    },
                                  }}
                                >
                                  <div
                                    style={{
                                      display: "flex",
                                      width: "100%",
                                      flexWrap: "wrap",
                                    }}
                                  >
                                    {}
                                    {projectStatus.map((item) => (
                                      <FormControlLabel
                                        value={item.id}
                                        control={<Radio color="default" />}
                                        label={item.name}
                                      />
                                    ))}
                                  </div>
                                </RadioGroup>
                              </FormControl>
                            </div>
                          </div>
                        </>
                      )}
                    </div>

                    <div
                      style={{
                        display: "flex",
                        width: "50%",
                        justifyContent: "space-between",
                      }}
                    >
                      {/* //url board */}
                      <div className="url-section">
                        <h6 style={{ fontSize: "15px", fontWeight: "600" }}>
                          Upload Links
                        </h6>
                        <h4 onClick={(e) => setShowUrlBoard(true)}>URL</h4>
                        <p>URL Board</p>
                      </div>

                      {/* //status board */}
                      {/* <div className="url-section">
                      <h6 style={{ fontSize: "15px", fontWeight: "600" }}>
                        Add Project Status
                      </h6>
                      <h5 onClick={(e) => setShowStatusModal(true)}>STATUS</h5>
                      
                    </div> */}
                    </div>
                  </div>
                </div>
              </div>

              <Modal
                show={showUrlBoard}
                onHide={() => setShowUrlBoard(false)}
                aria-labelledby="example-modal-sizes-title-sm"
                size="lg"
              >
                <Modal.Header className="url-modal-header" closeButton>
                  <h4
                    style={{
                      fontSize: "22px",
                      fontWeight: "800",
                      textAlign: "left",
                    }}
                  >
                    {" "}
                    Project URL Board
                  </h4>
                </Modal.Header>

                <Modal.Body>
                  <div className="url-box-container">
                    {projectUrls.map((item) => (
                      <div
                        className="url-box"
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          marginBottom: "2%",
                        }}
                      >
                        <div style={{ marginLeft: "2%" }}>
                          <h5 style={{ fontSize: "18px", fontWeight: "600" }}>
                            {item.name}
                          </h5>
                          <a
                            style={{
                              fontSize: "14px",
                              fontWeight: "550",
                              color: "#1592E6",
                              marginBottom: "5%",
                            }}
                            href={item.link}
                          >
                            {item.link}
                          </a>
                        </div>
                        <div>
                          <EditIcon
                            style={{ color: "gray", cursor: "pointer" }}
                            onClick={() => editUrlHandler(item.id)}
                          />
                          <DeleteIcon
                            style={{ color: "red", cursor: "pointer" }}
                            onClick={() => deleteUrlHandler(item.id)}
                          />
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="add-url-fields">
                    <input
                      className="url-input"
                      type="text"
                      placeholder="Add Url Name"
                      onChange={(e) => setUrlName(e.target.value)}
                      value={urlName}
                    />{" "}
                    <br />
                    <input
                      className="url-input"
                      type="text"
                      placeholder="Add Url"
                      onChange={(e) => setUrl(e.target.value)}
                      value={url}
                    />{" "}
                    <br />
                    {update === true ? (
                      <Button
                        className="url-btn"
                        variant="danger"
                        size="md"
                        onClick={handleUrlUpdate}
                      >
                        {" "}
                        Update{" "}
                      </Button>
                    ) : (
                      <Button
                        className="url-btn"
                        variant="danger"
                        size="md"
                        onClick={handleUrl}
                      >
                        {" "}
                        Add{" "}
                      </Button>
                    )}
                  </div>
                </Modal.Body>
              </Modal>

              {/* <Modal
                show={showStatusModal}
                onHide={() => setShowStatusModal(false)}
                aria-labelledby="example-modal-sizes-title-sm"
                size="lg"
              >
                <Modal.Header className="url-modal-header" closeButton>
                  <h4
                    style={{
                      fontSize: "22px",
                      fontWeight: "800",
                      textAlign: "left",
                    }}
                  >
                    {" "}
                    Project Status
                  </h4>
                </Modal.Header>

                <Modal.Body>
                  <div className="url-box-container">
                  {error && <Message variant='danger'>{error}</Message>}
                     {projectStatus.map((item) => ( 
                       <div
                        className="url-box"
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          marginBottom: "2%",
                        }}
                      >
                        <div style={{ marginLeft: "2%" }}>
                          <h5 style={{ fontSize: "15px", fontWeight: "600" }}>
                            {item.name}
                          </h5>
                          
                        </div>
                        <div>
                          <EditIcon
                            style={{ color: "gray", cursor: "pointer" }}
                            onClick={() => editStatusHandler(item.id)}
                          />
                          <DeleteIcon
                            style={{ color: "red", cursor: "pointer" }}
                            onClick={() => deleteStatusHandler(item.id)}
                          />
                        </div>
                      </div> 
                     ))} 
                  </div>

                  <div className="add-url-fields">
                    <input
                      className="url-input"
                      type="text"
                      placeholder="Add Status Name"
                      onChange={(e) => setStatusName(e.target.value)}
                      value={statusName}
                    />{" "}
                    <br />
                 
                    <br />
                    {update === true ? (
                      <Button
                        className="url-btn"
                        variant="danger"
                        size="md"
                        onClick={handleStatusUpdate}
                      >
                        {" "}
                        Update{" "}
                      </Button>
                    ) : (
                      <Button
                        className="url-btn"
                        variant="danger"
                        size="md"
                        onClick={handleStatus}
                      >
                        {" "}
                        Add{" "}
                      </Button>
                    )}
                  </div>
                </Modal.Body>
              </Modal> */}
            </Tab>

            <Tab eventKey="profile" title={<span> Client Details </span>}>
              <div className="  projectmaintabs">
                <div className="viewdetail">
                  {loading ? (
                    <Loader />
                  ) : error ? (
                    <Message variant="danger"> {errorMessage}</Message>
                  ) : (
                    <>
                      <div className="viewdetail_l">
                        <div className="d-flex viewdetail">
                          <div className="viewdetail_l">
                            <h5>Client Full Name</h5>
                          </div>
                          <div className="viewdetail_r">
                            <p>{clients.firstName + " " + clients.lastName}</p>
                          </div>
                        </div>

                        <div className="d-flex viewdetail">
                          <div className="viewdetail_l">
                            <h5>Email Address</h5>
                          </div>
                          <div className="viewdetail_r">
                            <p>{clients.email}</p>
                          </div>
                        </div>

                        <div className="d-flex viewdetail">
                          <div className="viewdetail_l">
                            <h5>Phone</h5>
                          </div>
                          <div className="viewdetail_r">
                            <p>{clients.phone}</p>
                          </div>
                        </div>

                        <div className="d-flex viewdetail">
                          <div className="viewdetail_l">
                            <h5>Address</h5>
                          </div>
                          <div className="viewdetail_r">
                            <p> {clients.address}</p>
                          </div>
                        </div>

                        <div className="d-flex viewdetail">
                          <div className="viewdetail_l">
                            <h5>Source of Lead </h5>
                          </div>
                          <div className="viewdetail_r">
                            <p>{clients.sourceOfLead}</p>
                          </div>
                        </div>

                        <div className="d-flex viewdetail">
                          <div className="viewdetail_l">
                            <h5>State </h5>
                          </div>
                          <div className="viewdetail_r">
                            <p>{clients.state}</p>
                          </div>
                        </div>
                        <div className="d-flex viewdetail">
                          <div className="viewdetail_l">
                            <h5>Country</h5>
                          </div>
                          <div className="viewdetail_r">
                            <p>{clients.country}</p>
                          </div>
                        </div>
                        <Link
                          to={`/editClient/${clients.id}`}
                          className="side_links"
                        >
                          <Button
                            variant="danger"
                            size="md"
                            style={{ marginTop: "2%" }}
                          >
                            Edit
                          </Button>
                        </Link>
                      </div>
                    </>
                  )}
                  <div className="viewdetail_r"></div>
                </div>
              </div>
            </Tab>
            <Tab eventKey="profiles" title={<span> Team </span>}>
              <div className="projectmaintabs ">
                <div className="d-flex justify-content-end projectmaintabs">
                  <div className="my-3">
                    <Link to={`/AddTeams/${projectId}`} className="side_links">
                      <Button variant="danger" size="md">
                        + Create Team
                      </Button>
                    </Link>
                  </div>
                </div>
                <hr />
                <div className="searchbar">
                  <input
                    type="text"
                    placeholder="Search"
                    value={searchbar}
                    style={{
                      border: "1px solid darkgray",
                      padding: "3px 5px",
                      borderRadius: "5px",
                    }}
                    onChange={(e) => {
                      setsearchbar(e.target.value);
                    }}
                  />
                </div>
                <div style={{ overflow: "hidden" }}>
                  {teamsError && (
                    <Message variant="danger"> {teamsErrorMessage}</Message>
                  )}
                  <Table striped hover>
                    <thead>
                      <tr>
                        <th>SI.NO</th>
                        <th>Team Type</th>
                        <th>Team</th>
                        <th>Deadline</th>
                        <th> Action </th>
                      </tr>
                    </thead>
                    <tbody>
                      {loading ? (
                        <Loader />
                      ) : (
                        currentPosts
                          .filter((item) => {
                            if (searchbar == "") {
                              return item;
                            } else if (
                              item.projectTeamType
                                .toLowerCase()
                                .includes(searchbar.toLowerCase())
                            ) {
                              return item;
                            }
                          })
                          .map((item, index) => (
                            <tr key={item.team_id}>
                              <td>{index + 1}</td>
                              <td>{item.projectTeamType}</td>
                              <td>
                                {item.users.map((users) => (
                                  <span key={users.id}>
                                    {users.memberName} <br />
                                  </span>
                                ))}
                              </td>
                              <td>
                                {dateFormat(item.deadlineDate, "mmm d, yyyy")}{" "}
                              </td>
                              <td>
                                <div className="editDelete">
                                  <EditIcon
                                    style={{ cursor: "pointer" }}
                                    onClick={() =>
                                      editTeamsHandler(item.team_id)
                                    }
                                  />
                                  <DeleteIcon
                                    style={{ color: "red", cursor: "pointer" }}
                                    onClick={() =>
                                      deleteTeamsHandler(item.team_id)
                                    }
                                  />
                                </div>
                              </td>
                            </tr>
                          ))
                      )}
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
              </div>
            </Tab>

            <Tab eventKey="profiless" title={<span>Billing Details</span>}>
              <div className="  projectmaintabs ">
                <div className="row my-3">
                  <div className="col-md-4">
                    <p>Total Amount Charged</p>
                  </div>
                  <div className="col-md-4">
                    <p>₹{installmentDetails.totalAmount}</p>
                  </div>
                </div>

                <div className="row my-3">
                  <div className="col-md-4">
                    <p>Amount Paid</p>
                  </div>
                  <div className="col-md-4">
                    <p>₹{installmentDetails.totalPaidAmount}</p>
                  </div>
                </div>

                <div className="row my-3">
                  <div className="col-md-4">
                    <p>Balance Amount</p>
                  </div>
                  <div className="col-md-4">
                    <p>₹ {installmentDetails.totalUnPaidAmount}</p>
                  </div>
                </div>

                <div className="row my-3">
                  <div className="col-md-4">
                    <p>Total Installments</p>
                  </div>
                  <div className="col-md-4">
                    <p>{installmentDetails.totalInstallments} Installments</p>
                  </div>
                </div>

                <div className="col-md-3">
                  <Link
                    to={`/AddProjectBilling/${projectId}`}
                    className="side_links"
                  >
                    <ButtonIcon
                      text="Add Installment"
                      src="../images/Icon ionic-ios-add (2).svg"
                      id="btn_radius"
                    />
                  </Link>
                </div>

                <BillingDetailTable />
              </div>
            </Tab>
            <Tab eventKey="profilsse" title={<span> Discussions </span>}>
              <NotesLists />
            </Tab>

            <Tab eventKey="documents" title={<span>Documents</span>}>
              <Row>
                <Col md={6}>
                  <h6 style={{ fontSize: "15px", fontWeight: "600" }}>
                    Upload Documents
                  </h6>
                  <div className="btnclass_block">
                    <div
                      className="mx-2 uploader"
                      style={{
                        display: "flex",
                        padding: "5px 20px",
                        justifyContent: "space-between",
                        width: "100%",
                        backgroundColor: "#FFE9E4",
                      }}
                    >
                      <form className="sec-left">
                        <label htmlFor="files" className="btnclass">
                          <img
                            src="/images/Icon ionic-ios-add.svg"
                            className=""
                            alt=""
                          />
                          <p>Upload</p>
                        </label>

                        <input
                          id="files"
                          name="file"
                          onChange={handleChange}
                          style={{ visibility: "hidden" }}
                          type="file"
                          multiple
                        />
                        {isFilePicked ? (
                          <div>
                            <p
                              style={{
                                fontSize: "12px",
                                fontWeight: "600",
                                marginTop: "-30px",
                                marginBottom: "2%",
                              }}
                              className="img-name"
                            >
                              {" "}
                              {selectedFile.name}
                            </p>
                          </div>
                        ) : (
                          <p
                            style={{
                              fontSize: "12px",
                              fontWeight: "600",
                              width: "60%",
                            }}
                          ></p>
                        )}
                      </form>

                      <div className="doc-upload-type">
                        <select
                          style={{
                            padding: "5px 10px",
                            border: "1px solid darkgray",
                            borderRadius: "10px",
                            marginBottom: "10%",
                          }}
                          onChange={(e) => {
                            setDocType(e.target.value);
                          }}
                        >
                          <option>Select Document Type</option>
                          <option id="agreeement">agreeement</option>
                          <option id="requirement">requirement</option>
                          <option id="proposal">proposal</option>
                          <option id="other">other</option>
                        </select>
                        <br />

                        <Button
                          size="sm"
                          onClick={handleUpload}
                          style={{ marginBottom: "10%" }}
                          variant="danger"
                        >
                          Upload
                        </Button>
                      </div>
                    </div>
                  </div>
                </Col>

                <Col md={6}>
                  <h6 style={{ fontSize: "15px", fontWeight: "600" }}>
                    Uploaded Documents
                  </h6>

                  <Tabs
                    defaultActiveKey={1}
                    transition={false}
                    id="noanim-tab-example"
                    className="mb-3"
                  >
                    <Tab eventKey={1} title={<span>Proposal</span>}>
                      <div className="document-show">
                        {loading ? (
                          <Loader />
                        ) : documentByTypeProposal == "" ? (
                          <Message variant="danger" style={{ margin: "auto" }}>
                            {" "}
                            No files to display{" "}
                          </Message>
                        ) : (
                          documentByTypeProposal.map((item) => (
                            <div
                              className="doc-cont"
                              onClick={() => showDoc(item.id)}
                            >
                              <div
                                className="display-img"
                                onClick={() => setLgShow(true)}
                              >
                                {item.document.split(".").pop() == "pdf" ? (
                                  <img
                                    className="doc-img"
                                    src="../images/pdf.png"
                                  />
                                ) : (
                                  <img
                                    className="doc-img"
                                    src={item.document}
                                  />
                                )}
                              </div>

                              {item.document.split(".").pop() == "pdf" ? (
                                <p className="doc-name">
                                  <a href={item.document}>
                                    {item.name.toUpperCase()}
                                  </a>
                                </p>
                              ) : (
                                <p className="doc-name">
                                  {item.name.toUpperCase()}
                                </p>
                              )}
                            </div>
                          ))
                        )}
                      </div>

                      <Modal
                        show={lgShow}
                        onHide={() => setLgShow(false)}
                        aria-labelledby="contained-modal-title-vcenter"
                        centered
                      >
                        <Modal.Header closeButton></Modal.Header>
                        {loading ? (
                          <Loader />
                        ) : (
                          <Modal.Body>
                            {doc.document?.split(".").pop() !== "pdf" ? (
                              <h5
                                style={{
                                  fontSize: "15px",
                                  fontWeight: "600",
                                  textAlign: "center",
                                }}
                              >
                                {doc.name}
                              </h5>
                            ) : (
                              <a
                                style={{
                                  fontSize: "15px",
                                  fontWeight: "600",
                                  textAlign: "center",
                                  textDecoration: "underline",
                                }}
                                href={doc.document}
                              >
                                {doc.name}
                              </a>
                            )}
                            <div className="text-center  my-2">
                              {
                                doc.document?.split(".").pop() !== "pdf" ? (
                                  <img
                                    id="displayimgs"
                                    src={doc.document}
                                    width="400px"
                                    height="400px"
                                    alt=""
                                  />
                                ) : (
                                  <img
                                    id="displayimgs"
                                    src="../images/pdf.png"
                                    width="300px"
                                    alt=""
                                  />
                                )

                                // <iframe src={url} style={{width: "100%",height: "100%",border: "none"}}></iframe>
                              }
                            </div>
                            <div
                              onClick={() => deleteHandler(doc.id)}
                              style={{
                                textAlign: "center",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                backgroundColor: "lightgray",
                                padding: "5px",
                                borderRadius: "10px",
                                cursor: "pointer",
                              }}
                            >
                              <h6
                                style={{
                                  fontSize: "13px",
                                  fontWeight: "600",
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "center",
                                  margin: "0px",
                                }}
                              >
                                Delete Document
                              </h6>
                              <img
                                src="/images/Icon material-delete.svg"
                                style={{
                                  cursor: "pointer",
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "center",
                                }}
                                className="mx-1"
                              />
                            </div>
                          </Modal.Body>
                        )}
                      </Modal>
                    </Tab>

                    <Tab eventKey={2} title={<span>Requirement</span>}>
                      <div className="document-show">
                        {loading ? (
                          <Loader />
                        ) : documentByTypeRequirement == "" ? (
                          <Message variant="danger" style={{ margin: "auto" }}>
                            {" "}
                            No files to display{" "}
                          </Message>
                        ) : (
                          documentByTypeRequirement.map((item) => (
                            <div
                              className="doc-cont"
                              onClick={() => showDoc(item.id)}
                            >
                              <div
                                className="display-img"
                                onClick={() => setLgShow(true)}
                              >
                                {item.document.split(".").pop() == "pdf" ? (
                                  <img
                                    className="doc-img"
                                    src="../images/pdf.png"
                                  />
                                ) : (
                                  <img
                                    className="doc-img"
                                    src={item.document}
                                  />
                                )}
                              </div>

                              {item.document.split(".").pop() == "pdf" ? (
                                <p className="doc-name">
                                  <a href={item.document}>
                                    {item.name.toUpperCase()}
                                  </a>
                                </p>
                              ) : (
                                <p className="doc-name">
                                  {item.name.toUpperCase()}
                                </p>
                              )}
                            </div>
                          ))
                        )}
                      </div>
                    </Tab>

                    <Tab eventKey={3} title={<span>Agreement</span>}>
                      <div className="document-show">
                        {loading ? (
                          <Loader />
                        ) : documentByTypeAgreement == "" ? (
                          <Message variant="danger" style={{ margin: "auto" }}>
                            {" "}
                            No files to display{" "}
                          </Message>
                        ) : (
                          documentByTypeAgreement.map((item) => (
                            <div
                              className="doc-cont"
                              onClick={() => showDoc(item.id)}
                            >
                              <div
                                className="display-img"
                                onClick={() => setLgShow(true)}
                              >
                                {item.document.split(".").pop() == "pdf" ? (
                                  <img
                                    className="doc-img"
                                    src="../images/pdf.png"
                                  />
                                ) : (
                                  <img
                                    className="doc-img"
                                    src={item.document}
                                  />
                                )}
                              </div>

                              {item.document.split(".").pop() == "pdf" ? (
                                <p className="doc-name">
                                  <a href={item.document}>
                                    {item.name.toUpperCase()}
                                  </a>
                                </p>
                              ) : (
                                <p className="doc-name">
                                  {item.name.toUpperCase()}
                                </p>
                              )}
                            </div>
                          ))
                        )}
                      </div>
                    </Tab>

                    <Tab eventKey={4} title={<span>Others</span>}>
                      <div className="document-show">
                        {loading ? (
                          <Loader />
                        ) : documentByTypeOther == "" ? (
                          <Message variant="danger" style={{ margin: "auto" }}>
                            {" "}
                            No files to display{" "}
                          </Message>
                        ) : (
                          documentByTypeOther.map((item) => (
                            <div
                              className="doc-cont"
                              onClick={() => showDoc(item.id)}
                            >
                              <div
                                className="display-img"
                                onClick={() => setLgShow(true)}
                              >
                                {item.document.split(".").pop() == "pdf" ? (
                                  <img
                                    className="doc-img"
                                    src="../images/pdf.png"
                                  />
                                ) : (
                                  <img
                                    className="doc-img"
                                    src={item.document}
                                  />
                                )}
                              </div>

                              {item.document.split(".").pop() == "pdf" ? (
                                <p className="doc-name">
                                  <a href={item.document}>
                                    {item.name.toUpperCase()}
                                  </a>
                                </p>
                              ) : (
                                <p className="doc-name">
                                  {item.name.toUpperCase()}
                                </p>
                              )}
                            </div>
                          ))
                        )}
                      </div>
                    </Tab>
                  </Tabs>
                </Col>
              </Row>
              {docErrorMessage && (
                <Message variant="danger"> {docErrorMessage}</Message>
              )}
            </Tab>
          </Tabs>
        </div>
      </div>
    </div>
  );
}

export default ProjectDetail;
