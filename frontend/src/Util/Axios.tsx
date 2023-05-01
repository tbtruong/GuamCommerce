import axios from 'axios';

// const baseURL = process.env.NODE_ENV === 'production' ? 'https://cs602.herokuapp.com/' : 'http://localhost:5000'
const baseURL = 'http://localhost:5000'

export default axios.create({
    baseURL: baseURL
})
