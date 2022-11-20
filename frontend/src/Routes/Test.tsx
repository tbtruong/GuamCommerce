import React from 'react';
import AppBar from "../Components/AppBar/AppBar";
import LoginInput from "../Components/Login/LoginInput";
import SearchBar from "../Components/SearchBar/SearchBar";

const Test = () =>  {
    return (
        <SearchBar searchItemCallback={()=> console.log('hello')}/>
    );
}

export default Test
