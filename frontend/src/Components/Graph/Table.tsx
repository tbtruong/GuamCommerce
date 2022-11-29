import * as React from 'react';
import {styled, SxProps, Theme} from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, {tableCellClasses} from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow, {TableRowClasses} from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {searchItemResults} from "../../Routes/Groceries";
// @ts-ignore
import {useTable} from 'react-table';
import {CommonProps} from '@mui/material/OverridableComponent';
import {theme} from "../../theme";
import {Typography} from "@mui/material";

const StyledTableCell = styled(TableCell)(({theme}) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: '#202E4B',
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({theme}) => ({
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

    const formatString = (date: Date) => {
        const month = new Date(date).getMonth() + 1
        const day = new Date(date).getDate()
        return `${month}/${day}`

    }

    const columns = React.useMemo(
        () => [
            {
                Header: 'Trial',
                hideHeader: false,
                columns: [
                    {
                        Header: 'Name',
                        accessor: 'name',

                    },
                    {
                        Header: 'Price',
                        accessor: 'price',
                    },
                    {
                        Header: 'Purchased',
                        accessor: 'date_purchased',
                    },
                    {
                        Header: 'Store',
                        accessor: 'store',
                    },
                    {
                        Header: 'Sale',
                        accessor: 'sale',
                    },
                ],
            },
        ],
        []
    )

    const data = groceryPriceList.map((item) => {
        return {
            name: item.name,
            price: `$${item.price}`,
            date_purchased: formatString(item.date_purchased),
            store: item.store,
            sale: item.sale.toString()
        }
    }).reverse()

    const {getTableProps, headerGroups, rows, prepareRow} = useTable({
        columns,
        data,
    })

    return (
        <TableContainer sx={{pointerEvents: 'none', userSelect: 'none'}} component={Paper}>
            <Table aria-label="customized table" {...getTableProps()}>
                <TableHead>
                    {headerGroups.map((headerGroup: { getHeaderGroupProps: () => JSX.IntrinsicAttributes & { component: React.ElementType<any>; } & { children?: React.ReactNode; classes?: Partial<TableRowClasses> | undefined; hover?: boolean | undefined; selected?: boolean | undefined; sx?: SxProps<Theme> | undefined; } & CommonProps & Omit<any, "children" | keyof CommonProps | "hover" | "selected" | "sx">; headers: any[]; }) => (
                        <StyledTableRow {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map(column => {
                                return column.hideHeader === false ? null : (
                                    <StyledTableCell {...column.getHeaderProps()} sx={{backgroundColor: '#202E4B', color: theme.palette.common.white}}>
                                        <Typography>
                                        {column.render('Header')}
                                        </Typography>
                                    </StyledTableCell>
                                )
                            })}
                        </StyledTableRow>
                    ))}
                </TableHead>
                <TableBody>
                    {rows.map((row: { getRowProps: () => JSX.IntrinsicAttributes & { component: React.ElementType<any>; } & { children?: React.ReactNode; classes?: Partial<TableRowClasses> | undefined; hover?: boolean | undefined; selected?: boolean | undefined; sx?: SxProps<Theme> | undefined; } & CommonProps & Omit<any, "children" | keyof CommonProps | "hover" | "selected" | "sx">; cells: any[]; }, i: any) => {
                        prepareRow(row)
                        return (
                            <StyledTableRow {...row.getRowProps()}>
                                {row.cells.map(cell => {
                                    return (
                                        <StyledTableCell {...cell.getCellProps()}>
                                            <Typography sx={{justifyContent: 'center'}}>
                                                {cell.render('Cell')}
                                            </Typography>
                                        </StyledTableCell>
                                    )
                                })}
                            </StyledTableRow>
                        )
                    })}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default CustomTable