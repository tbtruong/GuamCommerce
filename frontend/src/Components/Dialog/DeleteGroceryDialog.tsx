import React, {FormEvent} from 'react';
import axios from "../../Util/Axios";
import {searchItemResults} from "../../Routes/Groceries";
import {AxiosError} from "axios";
import Button from "@mui/material/Button";
import DialogTitle from "@mui/material/DialogTitle";
import {Autocomplete, Avatar, Box, Checkbox, Dialog, FormControlLabel, IconButton} from "@mui/material";
import TextField from "@mui/material/TextField";
import DialogActions from "@mui/material/DialogActions";
import {styled} from "@mui/material/styles";
import DialogContent from "@mui/material/DialogContent";
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import RemoveIcon from '@mui/icons-material/Remove';
import {LocalGroceryStore, LocalGroceryStoreOutlined} from "@mui/icons-material";

const StyledTextField = styled(TextField)`
  input[type='number']::-webkit-inner-spin-button,
  input[type='number']::-webkit-outer-spin-button {
    display: none;
  }
  input[type="search"]::-webkit-search-cancel-button {
  -webkit-appearance: none;
}
`;

const buttonStyling = {
    backgroundColor: '#2f446f ',
    color: 'white'
}

interface FormDialogProps {
    groceryCallback: (list: searchItemResults[]) => void
}


const DeleteGroceryComponent = ({groceryCallback}: FormDialogProps) => {
    const [open, setOpen] = React.useState(false);

    const [groceryNameValue, setGroceryNameValue] = React.useState<string | null>(null);
    const [groceryNameInputValue, setGroceryNameInputValue] = React.useState('');
    const [groceryNameOptions, setGroceryNameOptions] = React.useState<string[]>([])

    const [groceryDate, setGroceryDate] = React.useState('')
    const [confirm, setConfirm] = React.useState(false)

    const [groceryDeletion, setGroceryDeletion] = React.useState({})


    React.useEffect( () => {
        const tempNameArray: string[] = []
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
        }, 1000)
    }, [])

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        clearFields();
        setOpen(false);
    };

    const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setConfirm(event.target.checked);
    };

    const handleSubmit = async (event: FormEvent) => {
        handleClose()
        //Axios Call

        const data = {name: groceryNameInputValue, date_purchased: groceryDate}

        try {
            await axios.post("/groceries/deleteGrocery", data, {
                headers: {
                    jwt_token: localStorage.token
                }}).then((parseRes) => {
                  groceryCallback(parseRes.data)
            })
        } catch (err: any | AxiosError) {
            console.log(err.message)
        }

    };

    const clearFields = () => {
        setGroceryNameInputValue('')
        setGroceryNameValue('')
        setGroceryDate('')
        setConfirm(false)
    }

    return (
        <Box>
            <IconButton color="primary" aria-label="upload picture" component="label" onClick={handleClickOpen}>
                <RemoveIcon sx={{transform: 'scale(5)', color: '#283553'}}/>
                <LocalGroceryStoreOutlined sx={{color: '#283553', marginLeft: '5rem', transform: 'scale(5)'}}/>
            </IconButton>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle sx={{backgroundColor: '#202E4B', color: 'white'}}>Delete A Grocery
                    Expenditure</DialogTitle>
                <Box sx={{display: 'flex', flexDirection: 'row', width: '600px !important'}}>
                    <DialogContent>
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
                        </Box>
                        <FormControlLabel control={<Checkbox checked={confirm}
                                                             onChange={handleCheckboxChange}
                        />} label={'Confirm Deletion'} labelPlacement="start"
                                          sx={{justifyContent: 'left', margin: 0, userSelect: 'none'}}/>
                    </DialogContent>
                </Box>
                <DialogActions>
                    <Button variant={'contained'} sx={buttonStyling} onClick={handleClose}>Cancel</Button>
                    <Button variant={'contained'} disabled={!confirm} sx={buttonStyling}
                            onClick={handleSubmit}>Submit</Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
}

export default DeleteGroceryComponent;
