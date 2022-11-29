import {Autocomplete, TextField} from '@mui/material';
import * as React from 'react';
import axios from 'axios';
import {searchItemResults} from "../../Routes/Groceries";
import {styled} from "@mui/material/styles";


interface SearchComponentProps {
    searchItemCallback: (list: searchItemResults[]) => void
}

const searchStyle = {
    width: "50%"
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

const SearchComponent = ({searchItemCallback}: SearchComponentProps) => {

    const [value, setValue] = React.useState<string | null>(null);
    const [inputValue, setInputValue] = React.useState('');
    const [options, setOptions] = React.useState<string[]>([])

    React.useEffect( () => {
        const tempArray: string[] = []
        setTimeout(() => {
            axios.get('/groceries/uniqueName').then((resp) => {
                resp.data.map((item: searchItemResults) => {
                    tempArray.push(item.name)
                })
                setOptions(tempArray)
            })
        }, 1000)
    }, [])

    React.useEffect(() => {
        const delayDebounceFn = setTimeout(() => {

            if (inputValue != '') {

                // Send Axios request here
                axios.get("/groceries/getItem", {
                    params: {item: inputValue}, headers: {
                        jwt_token: localStorage.token
                    }
                }).then(resp => {
                    searchItemCallback(resp.data)
                });


            }
        }, 1000)
        return () => clearTimeout(delayDebounceFn)
    }, [inputValue])

    // @ts-ignore
    return (<Autocomplete id="searchBox" label="Search field" type="search" value={value}
                          onChange={(event: any, newValue: string | null) => {return setValue(newValue)}}
                          onInputChange={(event, newInputValue) => {
                              setInputValue(newInputValue);
                          }}
                          options={options}
                          inputValue={inputValue}
          renderInput={(params) => <StyledTextField type={'search'} variant={'standard'} label={'Grocery Name'} {...params} sx={searchStyle} InputLabelProps={{...params.InputLabelProps, shrink: true}}/>}/>)
}


export default SearchComponent