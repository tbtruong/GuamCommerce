import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {searchItemResults} from "../../Routes/Groceries";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: '#202E4B',
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

interface lineChartProps {
    groceryPriceList: searchItemResults[]
}

const CustomTable = ({groceryPriceList}: lineChartProps) => {
    const rows = groceryPriceList

    const formatString = (date: Date) => {
        const month = new Date(date).getMonth()
        const day = new Date(date).getDay()
        return `${month}/${day}`

    }

    return (
        <TableContainer sx={{pointerEvents: 'none', userSelect: 'none'}} component={Paper}>
            <Table aria-label="customized table">
                <TableHead>
                    <TableRow>
                        <StyledTableCell>Name </StyledTableCell>
                        <StyledTableCell align="center">Price</StyledTableCell>
                        <StyledTableCell align="center">Date Purchased</StyledTableCell>
                        <StyledTableCell align="center">Store</StyledTableCell>
                        <StyledTableCell align="center">Sale</StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row) => (
                        <StyledTableRow key={row.name}>
                            <StyledTableCell component="th" scope="row">
                                {row.name}
                            </StyledTableCell>
                            <StyledTableCell align="center">${row.price}</StyledTableCell>
                            <StyledTableCell align="center">{formatString(row.date_purchased)}</StyledTableCell>
                            <StyledTableCell align="center">{row.store}</StyledTableCell>
                            <StyledTableCell align="center">{row.sale.toString()}</StyledTableCell>
                        </StyledTableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default CustomTable