import React, { useEffect, useState } from "react";//test
import DataTable from "react-data-table-component";
import { DropdownCell } from "./dropdowncell";
import { CommentCell } from "./commentCell";
import "./datable.css";
import { Box, Button, Fab, TextField, Typography } from "@mui/material";
import Swal from "sweetalert2";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Loading } from "./Loader";
import { useNavigate } from "react-router-dom";
import AddIcon from '@mui/icons-material/Add';
import AutoDeleteIcon from '@mui/icons-material/AutoDelete';
import CreateDataPage from "./createDataPage";
import axios from "axios";


export const Datatable = ({ currentScreen }) => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [tableData, setTableData] = useState([]);
  const token = localStorage.getItem('token'); // Your Bearer token
  const [openCreate,setOpenCreate] = useState(false)

  useEffect(() => {
    const url = 'http://localhost:5000/api/datatable'; 
    const loadData = async () => {
      try {
        const response = await axios.get(url, {
          headers: {
            'Authorization': `Bearer ${token}`, 
            'Content-Type': 'application/json' 
          }
        });
        if(response.status === 200){
          setTableData(response.data.data); // Handle the data
        }
        setIsLoading(false)
      } catch (error) {
        if(error.status === 401){
          Swal.fire({
            title: "Authentication Error",
            text: "Jwt Token not Found Login Again ! To Access Data ! ",
            icon: "error",
          });
          navigate("/");
        }else if(error.status === 404){
          Swal.fire({
            title: "Data Not Available in DataTable !",
            text: "Please Create Data !",
            icon: "error",
          });
          setTableData([])
        }
        setIsLoading(false)
      }finally{
        setIsLoading(false)
      }
    };

    loadData();
  }, [openCreate]);

  const [editedRows, setEditedRows] = useState({});
  const [searchTerm, setSearchTerm] = useState("");
  const [focusId, setFocusId] = useState(null);
  const [selectedRows, setSelectedRows] = useState([]);


  // for search functionality
  let filteredData = tableData
  if (tableData && tableData.length > 0) {
    filteredData = tableData.filter((row) =>
      Object.values(row).some((value) =>
        value.toString().toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }

  // Reason Dropdown change functionality
  const handleDropdownChange = (id, newValue) => {
    setTableData((prevData) =>
      prevData.map((row) =>
        row._id === id ? { ...row, reason: newValue } : row
      )
    );
    setEditedRows((prev) => ({ ...prev, [id]: true }));
    setFocusId(id);
  };

  // Commentchange funct.
  const handleCommentChange = (id, newComment) => {
    setTableData((prevData) =>
      prevData.map((row) =>
        row._id === id ? { ...row, comment: newComment } : row
      )
    );
    setEditedRows((prev) => ({ ...prev, [id]: true }));
  };

  // submit button funct.
  const handleSubmit = () => {
    const editedData = tableData.filter((row) => editedRows[row._id]);

    // ok missing comments in "rejected" or "modify" rows checking here
    const missingComments = editedData.filter(
      (row) =>
        (row.reason === "rejected" || row.reason === "modify") && !row.comment
    );

    if (missingComments.length > 0) {
      toast.error(
        "Please Add Comments before Submitting for Reject or Modified Action!!"
      );
      return;
    }

    console.log("Submitted data:", editedData);
    let text = "";
    let name = editedData.map((record) => record.name);
    if (editedData.length === 0) {
      text = "You have not made any changes in Grid data!";
    } else {
      text = "Great! Changes saved For User : " + name;
    }
    Swal.fire({
      title: "Data Saved Successfully!",
      text: text,
      icon: "success",
    });
    setEditedRows({});
  };

  const handleLogout = () => {
    // localStorage.removeItem('email');
    localStorage.removeItem('token');
    localStorage.removeItem('UserName');
    localStorage.removeItem('phoneNumber');
    localStorage.removeItem('Createdon');
    navigate("/");
  }

  const handleCreate = () => {
      setOpenCreate(true)
  }

  const handleCreateClose = () =>{
    setOpenCreate(false)
  }

  // search change event
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  // CSV EXPORT
  function convertArrayOfObjectsToCSV(array) {
    if (!array.length) return null;

    const columnDelimiter = ",";
    const lineDelimiter = "\n";
    const keys = Object.keys(array[0]);

    const result = [];
    result.push(keys.join(columnDelimiter));

    array.forEach((item) => {
      const values = keys.map((key) => item[key] || "");
      result.push(values.join(columnDelimiter));
    });

    return result.join(lineDelimiter);
  }

  function downloadCSV(array) {
    const csv = convertArrayOfObjectsToCSV(array);
    if (!csv) return;

    const link = document.createElement("a");
    const filename = "export.csv";
    const uri = `data:text/csv;charset=utf-8,${encodeURIComponent(csv)}`;

    link.setAttribute("href", uri);
    link.setAttribute("download", filename);
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  // custom styles for DataTable
  const customStyles = {
    headCells: {
      style: {
        backgroundColor: "#f9e79f",
        fontWeight: "bold",
        fontSize: "14px",
        justifyContent: "center",
      },
    },
    rows: {
      style: {
        minHeight: "2px",
        justifyContent: "center",
      },
    },
    cells: {
      style: {
        fontSize: "14px",
        justifyContent: "center",
      },
    },
    pagination: {
      style: {
        display: "flex",
        justifyContent: "center",
        backgroundColor: "#f4f4f4",
      },
    },
  };

  // columns binding are here
  const columns = [
    {
      name: "Id",
      selector: (row) => row._id,
      sortable: true,
    },
    {
      name: "Name",
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: "Reason",
      cell: (row) => (
        <DropdownCell
          row={row}
          onChange={handleDropdownChange}
          isEditable={editedRows[row._id] || row.reason === ""}
        />
      ),
      sortable: true,
      sortFunction: (a, b) => {
        return a.reason.localeCompare(b.reason);
      },
    },
    {
      name: "Comment",
      cell: (row) => (
        <CommentCell
          row={row}
          onChange={handleCommentChange}
          isEditable={editedRows[row._id]}
          focus={focusId === row._id}
        />
      ),
      sortable: true,
      sortFunction: (a, b) => {
        return a.comment.localeCompare(b.comment);
      },
    },
    {
      name: "RequestNumber",
      selector: (row) => row.requestnumber,
      sortable: true,
      sortFunction: (a, b) => {
        return a.requestnumber.localeCompare(b.requestnumber);
      },
    },
    {
      name: "DateTime",
      selector: (row) => row.datetime,
      sortable: true,
      sortFunction: (a, b) => {
        return new Date(a.datetime) - new Date(b.datetime);
      },
    },
  ];

  const handleRowSelected = (state) => {
    const selectedIds = state.selectedRows.map(row => row._id);
    setSelectedRows(selectedIds);
    console.log("Selected Row IDs: ", selectedIds);  
  };

  return (
    <>
      <ToastContainer
        style={{ justifyContent: "center", display: "flex", top: "20px" }}
      />

      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          mb: 2,
          position:'relative',
          border: "2px solid #d35400",
          padding: "8px"
        }}
      >
        <Typography sx={{ width: 1000 , ml: 3 , marginTop:'15px' ,fontWeight:'bold', textAlign:'center' , color:'red' }}>
          Note : Please Add Comment on Every Reject or Modified Status in DataTable.
        </Typography>

        <Button variant="contained" title = "Open to Insert More Data"  sx={{ ml: 1 }} onClick={handleCreate}>
         <AddIcon/>
        </Button>

        <Button disabled = {selectedRows?.length != 0 ? false : true } variant="contained" title = "Want To delete Selected Rows ?"  sx={{ ml: 1 }}>
         <AutoDeleteIcon />
        </Button>

        <CreateDataPage open={openCreate}  onClose={handleCreateClose}/>

        <Button
          variant="contained"
          color="secondary"
          sx={{ ml: 2 }}
          onClick={() => downloadCSV(filteredData)}
          title = "Export to Excel Data"
        >
          Export CSV
        </Button>
      </Box>

      <Box 
      sx={{
          display: "flex",
          justifyContent: "center",
          mb: 2,
          position:'relative'
        }}>
      <TextField
          label="Search For The Data"
          variant="outlined"
          size="small"
          onChange={handleSearchChange}
          sx={{ width: 400 , marginTop:'8px' }}
          title = "Search Any Data"
        />
      </Box>

      {isLoading ? <Loading /> : <div className="data-table-wrapper" style={{ border: "2px solid black", borderRadius: "8px", padding: "5px" }}>
        <div className="data-table-container">
          {!isLoading && (
            <DataTable
              columns={columns}
              data={filteredData}
              fixedHeader
              pagination
              paginationRowsPerPageOptions={[50, 100, 150, 200]}
              paginationPerPage={50}
              customStyles={customStyles}
              selectableRows
              onSelectedRowsChange={handleRowSelected}
            />
          )}
        </div>
      </div>
      }


      <Box
        sx={{
          minHeight: "5vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          alignItems: "center",
          p: 2,
        }}
      >
        <Button
          variant="contained"
          color="primary"
          sx={{
            minWidth: 120,
            height: 40,
          }}
          onClick={handleSubmit}
        >
          Submit
        </Button>
      </Box>

      <Box sx={{ display: 'flex', justifyContent: 'center', p: 2 }}>
        <Button
          variant="contained"
          color="primary"
          sx={{
            minWidth: 120,
            height: 40,
          }}
          onClick={handleLogout}
        >
          LogOut
        </Button>
      </Box>
    </>
  );
};
