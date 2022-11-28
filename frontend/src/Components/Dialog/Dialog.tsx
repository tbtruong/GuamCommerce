import * as React from 'react';
import {FormEvent} from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import DeleteIcon from '@mui/icons-material/Delete';
import {Box, Checkbox, FormControlLabel, IconButton, InputAdornment, List, ListItem, ListItemText} from "@mui/material";
import axios from "../../Util/Axios";
import {AxiosError} from "axios";

const dialogLeft = {
    display: 'flex',
    flexDirection: 'column',
    width: '25%',
    rowGap: 'px'
}

const dialogRight = {
    display: 'flex',
    flexDirection: 'column',
    width: '50%'
}

const buttonStyling = {
    backgroundColor: '#2f446f ',
    color: 'white'
}

interface groceryProduct {
    groceryName: string;
    groceryPrice: string;
    groceryDate: string;
    groceryStore: string;
    sale: boolean

}

const FormDialog = () => {
    const [open, setOpen] = React.useState(false);

    const [groceryName, setGroceryName] = React.useState('')
    const [groceryPrice, setGroceryPrice] = React.useState('')
    const [groceryDate, setGroceryDate] = React.useState('')
    const [groceryStore, setGroceryStore] = React.useState('')
    const [sale, setSale] = React.useState(false)

    const [groceries, setGroceries] = React.useState<groceryProduct[]>([])


    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        clearFields();
        setGroceries([])
        setOpen(false);
    };

    const handleSubmit = async (event: FormEvent) => {
        handleClose()
        //Axios Call

        const data = {groceryList: groceries}

        try {
            await axios.post("/groceries/postGroceryList", data).then((parseRes) => {
                // if (parseRes.data.jwtToken) {
                //     localStorage.setItem("token", parseRes.data.jwtToken);
                // }
            })
        } catch (err: any | AxiosError) {
            console.log(err.message)
        }

    };

    const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSale(event.target.checked);
    };

    const handleDelete = (item: groceryProduct) => {
        const index = groceries.indexOf(item);
        // console.log(index)
        if (index > -1) {
            const tempArray = setGroceries((prevState) => {
                const tempArray = [...prevState]
                tempArray.splice(index, 1)
                return tempArray
            })
        }
    }

    const clearFields = () => {
        setGroceryName('')
        setGroceryStore('')
        setGroceryPrice('')
        setGroceryDate('')
        setSale(false)
    }

    const handleAddItem = () => {
        const currentGroceryItem = {
            groceryName: groceryName,
            groceryPrice: groceryPrice,
            groceryDate: groceryDate,
            groceryStore: groceryStore,
            sale: sale
        }
        setGroceries(prevState => [...prevState, currentGroceryItem])
        clearFields()
    }


    return (
        <Box>
            <Button variant="outlined" onClick={handleClickOpen}>
                Open form dialog
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle sx={{backgroundColor: '#202E4B', color: 'white'}}>Record Your Grocery
                    Expenditures</DialogTitle>
                <Box sx={{display: 'flex', flexDirection: 'row'}}>
                    <DialogContent sx={dialogLeft}>
                        <Box>
                            <TextField
                                margin="dense"
                                id="groceryName"
                                label="Grocery Item's Name"
                                variant="standard"
                                value={groceryName}
                                InputLabelProps={{shrink: true}}
                                onChange={(event) => {
                                    setGroceryName(event.target.value)
                                }}
                            />
                            <TextField
                                autoFocus
                                label="Grocery Item's Price"
                                variant="standard"
                                InputProps={{startAdornment: (<InputAdornment position="start">$</InputAdornment>)}}
                                value={groceryPrice}
                                onChange={(event) => {
                                    setGroceryPrice(event.target.value)
                                }}
                            />
                            <TextField
                                autoFocus
                                margin="dense"
                                label="Date Purchased"
                                fullWidth
                                InputLabelProps={{shrink: true}}
                                InputProps={{sx: {width: '100%'}}}
                                variant="standard"
                                type={'date'}
                                value={groceryDate}
                                onChange={(event) => {
                                    setGroceryDate(event.target.value)
                                }}
                            />
                            <TextField
                                autoFocus
                                margin="dense"
                                label="Store Purchased From"
                                fullWidth
                                InputLabelProps={{shrink: true}}
                                variant="standard"
                                value={groceryStore}
                                onChange={(event) => {
                                    setGroceryStore(event.target.value)
                                }}
                            />
                        </Box>
                        <FormControlLabel control={<Checkbox checked={sale}
                                                             onChange={handleCheckboxChange}
                        />} label={'Sale'} labelPlacement="start"
                                          sx={{justifyContent: 'left', margin: 0, userSelect: 'none'}}/>
                        <Button variant='contained' sx={buttonStyling} onClick={handleAddItem}
                                disabled={groceryName == '' || groceryPrice == '' || groceryDate == '' || groceryStore == '' && true}>Add
                            Item</Button>
                    </DialogContent>
                    <DialogContent sx={dialogRight}>
                        <List sx={{userSelect: 'none'}}>
                            {groceries.map((item) =>
                                <ListItem
                                    secondaryAction={
                                        <IconButton edge="end" aria-label="delete" onClick={() => handleDelete(item)}>
                                            <DeleteIcon/>
                                        </IconButton>
                                    }
                                >
                                    <ListItemText
                                        primaryTypographyProps={{fontWeight: 'bold', fontSize: 14}}
                                        primary={`${item.groceryName}`}
                                        secondary={`\$${item.groceryPrice} - ${item.groceryStore} | ${item.groceryDate}`}
                                    />
                                </ListItem>
                            )}
                        </List>
                    </DialogContent>
                </Box>
                <DialogActions>
                    <Button variant={'contained'} sx={buttonStyling} onClick={handleClose}>Cancel</Button>
                    <Button variant={'contained'} disabled={groceries.length <= 0} sx={buttonStyling}
                            onClick={handleSubmit}>Submit</Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
}

export default FormDialog