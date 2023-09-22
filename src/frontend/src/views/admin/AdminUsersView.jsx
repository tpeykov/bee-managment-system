import React, {useEffect, useState} from "react";
import {Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import {adminGetUsers} from "../../shared/services/offer.service";

function AdminUsersView() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    adminGetUsers()
        .then((response) => {
          console.log(response.data);
          setUsers(response.data);
        })
        .catch(error => {
          console.log(error);
        })
  }, []);

  return (
      <>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell> UIC </TableCell>
                <TableCell align="right"> Company name </TableCell>
                <TableCell align="right"> Email </TableCell>
                <TableCell align="right"> Role </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((user) => (
                  <TableRow
                      key={user.uic}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell align="right"> {user.uic}</TableCell>
                    <TableCell align="right"> {user.username}</TableCell>
                    <TableCell align="right">{user.email}</TableCell>
                    <TableCell align="right">{user.carbs}</TableCell>
                  </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </>
  );
}

export default AdminUsersView;
