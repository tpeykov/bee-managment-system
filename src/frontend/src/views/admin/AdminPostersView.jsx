import React, {useEffect} from "react";
import {Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";

function AdminPostersView() {
    function createData(title, companyName, description, price, amount, status) {
        return {title, companyName, description, price, amount, status};
    }

    const rows = [
        createData('129857662', 'UIC1 OOD', 'uic1ood@gmail.com', 'Manufacture'),
        createData('158739814', 'UIC2', 'uic2@gmail.com', 'Merchant'),
    ];

    useEffect(() => {}, []);

    return (
        <>
            <TableContainer component={Paper}>
                <Table sx={{minWidth: 650}} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell> Title </TableCell>
                            <TableCell align="right"> Company name </TableCell>
                            <TableCell align="right"> Description </TableCell>
                            <TableCell align="right"> Price </TableCell>
                            <TableCell align="right"> Amount </TableCell>
                            <TableCell align="right"> Status </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row) => (
                            <TableRow
                                key={row.name}
                                sx={{'&:last-child td, &:last-child th': {border: 0}}}
                            >
                                <TableCell component="th" scope="row">
                                    {row.title}
                                </TableCell>
                                <TableCell align="right">{row.companyName}</TableCell>
                                <TableCell align="right">{row.description}</TableCell>
                                <TableCell align="right">{row.price}</TableCell>
                                <TableCell align="right">{row.amount}</TableCell>
                                <TableCell align="right">{row.status}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
}

export default AdminPostersView;
