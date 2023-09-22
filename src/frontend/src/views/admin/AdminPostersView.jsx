import React, {useEffect, useState} from "react";
import {Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import {adminGetPosters} from "../../shared/services/offer.service";
import Button from "@mui/material/Button";
import {NavLink} from "react-router-dom";

function AdminPostersView() {
    const [posters, setPosters] = useState([]);

    useEffect(() => {
        adminGetPosters()
            .then((response) => {
                setPosters(response.data);
            })
            .catch(error => {
                console.log(error);
            })
    }, []);

    return (
        <>
            <TableContainer component={Paper}>
                <Table sx={{minWidth: 650}} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell> Visit </TableCell>
                            <TableCell> Title </TableCell>
                            <TableCell align="right"> Author </TableCell>
                            <TableCell align="right"> Description </TableCell>
                            <TableCell align="right"> Price </TableCell>
                            <TableCell align="right"> Status </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {posters.map((poster) => (
                            <TableRow
                                key={poster.name}
                                sx={{'&:last-child td, &:last-child th': {border: 0}}}
                            >
                                <TableCell component="th" scope="row">
                                    <Button component={NavLink}
                                            to={`/poster/${poster.uuid}`} variant="contained"> Visit </Button>
                                </TableCell>
                                <TableCell component="th" scope="row">
                                    {poster.title}
                                </TableCell>
                                <TableCell align="right">{poster.author.username}</TableCell>
                                <TableCell align="right">{poster.description}</TableCell>
                                <TableCell align="right">{poster.price}</TableCell>
                                <TableCell align="right">{poster.status}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
}

export default AdminPostersView;
