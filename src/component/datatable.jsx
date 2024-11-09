import React, { useEffect, useState } from "react";//test
import DataTable from "react-data-table-component";
import { DropdownCell } from "./dropdowncell";
import { CommentCell } from "./commentCell";
import "./datable.css";
import { Box, Button, Fab, TextField } from "@mui/material";
import Swal from "sweetalert2";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Loading } from "./Loader";
import { useNavigate } from "react-router-dom";
import AddIcon from '@mui/icons-material/Add';
import createDataPage from "./createDataPage";
import CreateDataPage from "./createDataPage";


export const Datatable = ({ currentScreen }) => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
    };

    loadData();
  }, []);

  // function to generate dummy records
  function generateUniqueRows(count) {
    const reasons = ["accepted", "rejected", "modify", ""];
    const comments = {
      accepted: ["ok tested", "good to go", "all set", "ok nice good to go"],
      rejected: ["not good", "needs work", "rejected", "reevaluated"],
      modify: [
        "oks tddested",
        "needs changes",
        "update required",
        "modified control",
      ],
      "": [""],
    };

    function uniqueString() {
      return "xxxxxx"
        .replace(/[x]/g, () => Math.floor(Math.random() * 16).toString(16))
        .toUpperCase();
    }

    function randomDate() {
      const start = new Date(2020, 9, 1); // October 1, 2020
      const end = new Date(2020, 11, 31); // December 31, 2020
      const randomTime =
        start.getTime() + Math.random() * (end.getTime() - start.getTime());
      return new Date(randomTime).toLocaleString("en-GB", { timeZone: "UTC" });
    }

    const rows = [];
    const usedNames = new Set(); // To ensure unique names

    for (let i = 0; i < count; i++) {
      let name;
      do {
        name = uniqueString();
      } while (usedNames.has(name));
      usedNames.add(name);

      const reason = reasons[Math.floor(Math.random() * reasons.length)];
      const comment =
        comments[reason][Math.floor(Math.random() * comments[reason].length)];

    const requestnumber = reason === "" ? "" : name + i;
    const datetime = reason === "" ? "" : randomDate();

      const row = {
        id: i + 1,
        name: name,
        reason: reason,
        comment: comment,
        requestnumber: requestnumber,
        datetime: datetime,
      };
      rows.push(row);
    }

    return rows;
  }

  // rows binding here in this state
  const [tableData, setTableData] = useState(generateUniqueRows(200));

  const [editedRows, setEditedRows] = useState({});
  const [searchTerm, setSearchTerm] = useState("");
  const [focusId, setFocusId] = useState(null);

  const [openCreate,setOpenCreate] = useState(false)

  // for search functionality
  const filteredData = tableData.filter((row) =>
    Object.values(row).some((value) =>
      value.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  // Reason Dropdown change functionality
  const handleDropdownChange = (id, newValue) => {
    setTableData((prevData) =>
      prevData.map((row) =>
        row.id === id ? { ...row, reason: newValue } : row
      )
    );
    setEditedRows((prev) => ({ ...prev, [id]: true }));
    setFocusId(id);
  };

  // Commentchange funct.
  const handleCommentChange = (id, newComment) => {
    setTableData((prevData) =>
      prevData.map((row) =>
        row.id === id ? { ...row, comment: newComment } : row
      )
    );
    setEditedRows((prev) => ({ ...prev, [id]: true }));
  };

  // submit button funct.
  const handleSubmit = () => {
    const editedData = tableData.filter((row) => editedRows[row.id]);

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
    localStorage.removeItem('email');
    localStorage.removeItem('token');
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
        minHeight: "5px",
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
      selector: (row) => row.id,
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
          isEditable={editedRows[row.id] || row.reason === ""}
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
          isEditable={editedRows[row.id]}
          focus={focusId === row.id}
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

  return (
    <>
      {isLoading && <Loading />}

      <ToastContainer
        style={{ justifyContent: "center", display: "flex", top: "20px" }}
      />

      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          mb: 2,
        }}
      >
        <TextField
          label="Search"
          variant="outlined"
          size="small"
          onChange={handleSearchChange}
          sx={{ width: 300 , marginTop:'8px' }}
          title = "Search Any Data"
        />

         <Fab title = "Open to Insert More Data"  color="primary" aria-label="add" sx={{ ml: 2 }} onClick={handleCreate}>
          <AddIcon />
        </Fab>

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

      <div className="data-table-wrapper" style={{ border: "2px solid black", borderRadius: "8px", padding: "10px" }}>
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
            />
          )}
        </div>
      </div>

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
