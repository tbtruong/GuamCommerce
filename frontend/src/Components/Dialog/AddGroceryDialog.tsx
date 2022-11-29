import * as React from 'react';
import {FormEvent} from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import DeleteIcon from '@mui/icons-material/Delete';
import {
    Autocomplete,
    Avatar,
    Box,
    Checkbox,
    FormControlLabel,
    IconButton,
    InputAdornment,
    List,
    ListItem,
    ListItemText
} from "@mui/material";
import axios from "../../Util/Axios";
import {AxiosError} from "axios";
import {searchItemResults} from "../../Routes/Groceries";
import {styled} from "@mui/material/styles";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";

const dialogLeft = {
    display: 'flex',
    flexDirection: 'column',
    width: '30%'
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

const StyledTextField = styled(TextField)`
  input[type='number']::-webkit-inner-spin-button,
  input[type='number']::-webkit-outer-spin-button {
    display: none;
  }
  input[type="search"]::-webkit-search-cancel-button {
  -webkit-appearance: none;
}
`;

interface FormDialogProps {
    groceryCallback: (list: searchItemResults[]) => void
}


const FormDialog = ({groceryCallback}: FormDialogProps) => {
    const [open, setOpen] = React.useState(false);

    const [groceryNameValue, setGroceryNameValue] = React.useState<string | null>(null);
    const [groceryNameInputValue, setGroceryNameInputValue] = React.useState('');
    const [groceryNameOptions, setGroceryNameOptions] = React.useState<string[]>([])

    const [groceryStoreValue, setGroceryStoreValue] = React.useState<string | null>(null);
    const [groceryStoreInputValue, setGroceryStoreInputValue] = React.useState('');
    const [groceryStoreOptions, setGroceryStoreOptions] = React.useState<string[]>([])

    const [groceryPrice, setGroceryPrice] = React.useState('')
    const [groceryDate, setGroceryDate] = React.useState('')
    const [sale, setSale] = React.useState(false)

    const [groceries, setGroceries] = React.useState<groceryProduct[]>([])
    const [forceRefresh, setForceRefresh] = React.useState(false)

    React.useEffect( () => {
        const tempNameArray: string[] = []
        const tempStoreArray: string[] = []
        setTimeout(() => {
            axios.get('/groceries/uniqueName', {
                headers: {
                    jwt_token: localStorage.token
                }}).then((resp) => {
                resp.data.map((item: searchItemResults) => {
                    tempNameArray.push(item.name)
                })
                setGroceryNameOptions(tempNameArray)
            })

            axios.get('/groceries/uniqueStore', {
                headers: {
                    jwt_token: localStorage.token
                }}).then((resp) => {
                resp.data.map((item: searchItemResults) => {
                    tempStoreArray.push(item.store)
                })
                setGroceryStoreOptions(tempStoreArray)
            })
        }, 1000)
    }, [])

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
            console.log(groceries)
            await axios.post("/groceries/postGroceryList", data, {
                 headers: {
                    jwt_token: localStorage.token
                }}).then((parseRes) => {
                    groceryCallback(parseRes.data)
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
        setGroceryNameInputValue('')
        setGroceryNameValue('')
        setGroceryStoreInputValue('')
        setGroceryStoreValue('')
        setGroceryPrice('')
        setGroceryDate('')
        setSale(false)
    }

    const handleAddItem = () => {
        const currentGroceryItem = {
            groceryName: groceryNameInputValue,
            groceryPrice: groceryPrice,
            groceryDate: groceryDate,
            groceryStore: groceryStoreInputValue,
            sale: sale
        }
        setGroceries(prevState => [...prevState, currentGroceryItem])
        clearFields()
    }

    // @ts-ignore
    return (
        <Box >
            <IconButton color="primary" aria-label="upload picture" component="label" onClick={handleClickOpen}>
                <AddShoppingCartIcon sx={{transform: 'scale(5)', color: '#283553'}}/>
            </IconButton>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle sx={{backgroundColor: '#202E4B', color: 'white'}}>Record Your Grocery
                    Expenditures</DialogTitle>
                <Box sx={{display: 'flex', flexDirection: 'row', width: '600px !important'}}>
                    <DialogContent sx={dialogLeft}>
                        <Box>
                            <Autocomplete value={groceryNameValue}
                                          freeSolo
                                          onChange={(event: any, newValue: string | null) => {return setGroceryNameValue(newValue)}}
                                          onInputChange={(event, newInputValue) => {
                                              setGroceryNameInputValue(newInputValue);
                                          }}
                                          options={groceryNameOptions}
                                          inputValue={groceryNameInputValue}
                                          renderInput={(params) => <StyledTextField type={'search'} variant={'standard'} label={'Grocery Name'} {...params} InputLabelProps={{...params.InputLabelProps, shrink: true}} />}/>
                            <TextField
                                autoFocus
                                label="Grocery Price"
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
                            <Autocomplete value={groceryStoreValue}
                                          freeSolo
                                          onChange={(event: any, newValue: string | null) => {return setGroceryStoreValue(newValue)}}
                                          onInputChange={(event, newInputValue) => {
                                              setGroceryStoreInputValue(newInputValue);
                                          }}
                                          options={groceryStoreOptions}
                                          inputValue={groceryStoreInputValue}
                                          renderInput={(params) => <StyledTextField type={'search'} variant={'standard'} label="Store" {...params}  InputLabelProps={{...params.InputLabelProps, shrink: true}}/>}/>
                        </Box>
                        <FormControlLabel control={<Checkbox checked={sale}
                                                             onChange={handleCheckboxChange}
                        />} label={'Sale'} labelPlacement="start"
                                          sx={{justifyContent: 'left', margin: 0, userSelect: 'none'}}/>
                        <Button variant='contained' sx={buttonStyling} onClick={handleAddItem}
                                disabled={groceryNameInputValue == '' || groceryPrice == '' || groceryDate == '' || groceryStoreInputValue == '' && true}>Add
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