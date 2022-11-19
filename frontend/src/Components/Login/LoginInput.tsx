import React, {FormEvent} from 'react';
import {Button, FormControl, Grid, TextField} from "@mui/material";
import axios from '../../Util/Axios'
import {AxiosError} from "axios";
import {Navigate, useNavigate} from "react-router-dom";


const LoginInput = () => {

    const [focused, setFocused] = React.useState(false)
    const [value, setValue] = React.useState('');

    const onFocus = () => setFocused(true)
    const onBlur = () => setFocused(false)

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValue(event.target.value);
    };

    const navigate = useNavigate()

    const handleSubmit = async (event: FormEvent) => {
        event?.preventDefault()
        const data = {password: value}

        try {
            await axios.post('/authentication/login', data).then((parseRes) => {
                if (parseRes.data.jwtToken) {
                    localStorage.setItem("token", parseRes.data.jwtToken);
                }
                if (localStorage.getItem("token")) {
                    console.log("True")
                    navigate("/");
                }
            })
        } catch (err: any | AxiosError) {
            console.log(err.message)
        }


    }


    return (
                <FormControl  sx={{display: 'flex', flexDirection: 'row'}}>
                    <form  onSubmit={handleSubmit} >
                    <Button type={'submit'} disableFocusRipple disableRipple sx={{background: 'transparent !important'}}>
                            <TextField  variant={'standard'} type={"password"} onFocus={onFocus} onBlur={onBlur}  fullWidth
                                InputProps={ focused ? {sx: {width: '300px', fontSize: '50px'}, disableUnderline: true} :
                                    {sx: {width: '300px', fontSize: '50px'}}}
                                value={value}
                                onChange={handleChange}/>
                        </Button>
                    </form>
                </FormControl>
    );
}

export default LoginInput;
