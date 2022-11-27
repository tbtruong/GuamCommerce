import { TextField } from '@mui/material';
import * as React from 'react';
import axios from 'axios';
import { EventAvailableOutlined } from '@mui/icons-material';
import {searchItemResults} from "../../Routes/Groceries";


interface SearchComponentProps {
    searchItemCallback: (list: searchItemResults[]) => void
}

const searchStyle = {
    width: "50%"
}

const SearchComponent = ({ searchItemCallback }: SearchComponentProps) => {

    const [searchValue, setSearchValue] = React.useState('')

    React.useEffect(() => {
        const delayDebounceFn = setTimeout(() => {

            if (searchValue != '') {

                // Send Axios request here
                axios.get("/groceries/getItem", { params: { answer: searchValue }, headers: {
                        jwt_token: localStorage.token
                    }}).then(resp => {
                    searchItemCallback(resp.data)
                });


            }
        }, 3000)
        return () => clearTimeout(delayDebounceFn)
    }, [searchValue])

    return (<TextField id="searchBox" label="Search field" type="search" value={searchValue} onChange={(event) => { setSearchValue(event.target.value) }} sx={searchStyle} />)
}



export default SearchComponent