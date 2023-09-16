import React, {useEffect, useState} from "react";
import {Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";

function AdminUsersView() {
  const [posters, updatePosters] = useState([]);

  function createData(name, calories, fat, carbs) {
    return { name, calories, fat, carbs };
  }

  const rows = [
    createData('129857662', 'UIC1 OOD', 'uic1ood@gmail.com', 'Manufacture'),
    createData('158739814', 'UIC2', 'uic2@gmail.com', 'Merchant'),
  ];

  useEffect(() => {}, []);



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
              {rows.map((row) => (
                  <TableRow
                      key={row.name}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {row.name}
                    </TableCell>
                    <TableCell align="right">{row.calories}</TableCell>
                    <TableCell align="right">{row.fat}</TableCell>
                    <TableCell align="right">{row.carbs}</TableCell>
                  </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </>
  );
}

export default AdminUsersView;
