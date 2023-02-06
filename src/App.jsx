import * as React from "react";
import axios from "axios";
import { url } from "./API_URL";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { useState } from "react";
import { useEffect } from "react";

const columns = [
  {
    id: "userId",
    label: "User ID",
    minWidth: 100,
    align: "center",
  },
  {
    id: "fullName",
    label: "Fullname",
    minWidth: 100,
    align: "center",
  },
  {
    id: "userName",
    label: "Username",
    minWidth: 100,
    align: "center",
  },
  {
    id: "status",
    label: "Status",
    minWidth: 100,
    align: "center",
    format: (value) => {
      if (value === "married") {
        return "Married";
      } else if(value === "single") {
        return "Single";
      }
    },
  },
];

export default function CustomerGroup() {
  const [getUsers, setGetUsers] = useState([]);
  const [userId, setUserId] = useState(0)
  const [fullName, setFullName] = useState("")
  const [userName, setUserName] = useState("")
  const [password, setPassword] = useState("")
  const [status, setStatus] = useState("")
  const [changeUser, setChangeUser] = useState([])

  useEffect(() => {
    getAllUsers();
  }, []);

  const getAllUsers = async () => {
    try {
      const apiUser = await axios.get(`${url}/api/user/`);
      const data = apiUser.data;
      setGetUsers(data);
      // console.log(data);
    } catch (err) {
      console.log(err);
    }
  };

  const addUser = async (e) => {
    console.log("add")
    if (e && e.preventDefault) {
      e.preventDefault();
    }
    try {
      const apiAddUser = await axios.post(`${url}/api/user/`, {
        userId,
        fullName,
        userName,
        password,
        status  
      });
      console.log(apiAddUser);
      handleCloseAdd();
      getAllUsers();
    } catch (err) {
      console.log(err);
    }
  };

  const editUser = async () => {
    console.log("edit")
    try {
      let apiEditUser = await axios.patch(`${url}/api/user/${changeUser.id}`, {
        userId: changeUser.userId,
        fullName: changeUser.fullName,
        userName: changeUser.userName,
        password: changeUser.password,
        status: changeUser.status,
      });
      console.log(apiEditUser)
      console.log(changeUser)
      handleCloseEdit();
      getAllUsers();
    } catch (err) {
      console.log(err);
    }
  };

  function handleChangeUserId(e) {
    setChangeUser({
      ...changeUser,
      userId: e.target.value,
    });
  }

  function handleChangeFullname(e) {
    setChangeUser({
      ...changeUser,
      fullName: e.target.value,
    });
  }

  function handleChangeUserName(e) {
    setChangeUser({
      ...changeUser,
      userName: e.target.value,
    });
  }

  function handleChangeStatus(e) {
    setChangeUser({
      ...changeUser,
      status: e.target.value,
    });
  }

  const deleteUser = async (id) => {
    try {
      await axios.delete(`${url}/api/user/${id}`);
      getAllUsers();
    } catch (err) {
      console.log(err);
    }
  };

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (e, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const [openEdit, setOpenEdit] = React.useState(false);
  const [openAdd, setOpenAdd] = React.useState(false);

  const handleOpenEdit = (group) => {
    setChangeUser(group);
    setOpenEdit(true);
  };

  const handleOpenAdd = () => {
    setOpenAdd(true);
  };

  const handleCloseEdit = () => {
    setOpenEdit(false);
  };

  const handleCloseAdd = () => {
    setOpenAdd(false);
  };

  return (
    <>
      <div style={{ marginLeft: "10vw", marginTop: "3%" }}>
        <span>
          You have {getUsers.length}{" "}
          {getUsers.length > 1 ? "users" : "user"}
        </span>
        <Button
          style={{ marginLeft: "20px", backgroundColor: "#865439" }}
          variant="contained"
          onClick={handleOpenAdd}
        >
          Add a New User
        </Button>
        <Dialog open={openAdd}>
          <DialogTitle>Add a New User</DialogTitle>
          <DialogContent>
          <TextField
              autoFocus
              margin="none"
              id="name"
              label="User ID"
              variant="standard"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
            />
            <br/>
            <TextField
              autoFocus
              margin="none"
              id="name"
              label="Fullname"
              variant="standard"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />
            <br/>
            <TextField
              autoFocus
              margin="none"
              id="name"
              label="Username"
              variant="standard"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
            />
            <br/>
            <TextField
              autoFocus
              margin="none"
              id="name"
              type="password"
              label="Password"
              variant="standard"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <br/>
            <Box
              noValidate
              sx={{
                display: "flex",
                flexDirection: "column",
                mt: 2,
                width: 1,
              }}
            >
              <InputLabel>Status</InputLabel>
              <Select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                <MenuItem value="single">Single</MenuItem>
                <MenuItem value="married">Married</MenuItem>
              </Select>
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseAdd}>Cancel</Button>
            <Button onClick={addUser}>Submit</Button>
          </DialogActions>
        </Dialog>
        <Dialog open={openEdit}>
          <DialogTitle>Edit Group</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="none"
              id="name"
              variant="standard"
              value={changeUser.userId}
              onChange={handleChangeUserId}
            />
            <br/>
            <TextField
              autoFocus
              margin="none"
              id="name"
              variant="standard"
              value={changeUser.fullName}
              onChange={handleChangeFullname}
            />
            <br/>
            <TextField
              autoFocus
              margin="none"
              id="name"
              variant="standard"
              value={changeUser.userName}
              onChange={handleChangeUserName}
            />
            <br/>
            <Box
              noValidate
              sx={{
                display: "flex",
                flexDirection: "column",
                mt: 2,
                width: 1,
              }}
            >
              <InputLabel>Status</InputLabel>
              <Select
                value={changeUser.status}
                onChange={handleChangeStatus}
              >
                <MenuItem value="single">Single</MenuItem>
                <MenuItem value="married">Married</MenuItem>
              </Select>
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseEdit}>Cancel</Button>
            <Button onClick={editUser}>Edit</Button>
          </DialogActions>
        </Dialog>
        <br />
      </div>
      <div>
        <Paper
          sx={{
            width: "78%",
            overflow: "hidden",
            marginLeft: "10vw",
            marginRight: "0",
            marginTop: "30px",
            marginBottom: "0",
          }}
        >
          <TableContainer sx={{ maxHeight: 500 }}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead sx={{ maxHeight: 200 }}>
                <TableRow>
                  {columns.map((column) => (
                    <TableCell
                      key={column.id}
                      align={column.align}
                      style={{ minWidth: column.minWidth }}
                    >
                      {column.label}
                    </TableCell>
                  ))}
                  <TableCell
                    id="actions"
                    label="Actions"
                    minwidth="100"
                    align="center"
                  >
                    Actions
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {getUsers
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => {
                    return (
                      <TableRow
                        hover
                        role="checkbox"
                        tabIndex={-1}
                        key={row.id}
                      >
                        {columns.map((column) => {
                          const value = row[column.id];
                          return (
                            <TableCell key={column.id} align={column.align}>
                              {column.format && typeof value === "string"
                                ? column.format(value)
                                : value}
                            </TableCell>
                          );
                        })}
                        <TableCell
                          id="actions"
                          label="Actions"
                          minwidth="100"
                          align="center"
                        >
                          <>
                            <Button
                              onClick={() => handleOpenEdit(row)}
                              variant="contained"
                              size="small"
                              style={{backgroundColor: "#865439"}}
                            >
                              Edit
                            </Button>
                            <Button
                              style={{ marginLeft: "20px", backgroundColor: "#865439" }}
                              onClick={() => deleteUser(row.id)}
                              variant="contained"
                              size="small"
                            >
                              Delete
                            </Button>
                          </>
                        </TableCell>
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[10, 25, 100]}
            component="div"
            count={getAllUsers.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      </div>
    </>
  );
}







  