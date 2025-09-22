import axios from 'axios'

const api = axios.create({
    baseURL : 'http://localhost/a_practice/PHP/user-order-app-php/api/', // replace with your backend URL
    headers: {
        'Content-Type': 'application/json'
    }
})

api.interceptors.request.use(config=>{
    const token = localStorage.getItem('access_token')
    if(token) config.headers.Authorization = `Bearer ${token}`
    console.log('Making request to:', config.url);
    console.log('With token:', token);
    return config
})

export default api
