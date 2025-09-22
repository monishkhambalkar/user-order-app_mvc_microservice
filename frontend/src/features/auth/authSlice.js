import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../app/api";

export const login = createAsyncThunk('auth/login', async(creds)=>{
    const res = await api.post('/login', creds)
    console.log(res);
    localStorage.setItem('access_token', res.data.access_token);
    return res.data
})

export const register = createAsyncThunk('auth/register', async(creds)=>{
    const res = await api.post('/register', creds)
    localStorage.setItem('access_token', res.data.access_token)
    return res.data
})

const authSlice = createSlice({
    name : 'auth',
    initialState : {user : null, status : 'idle', error : null},
    reducers : {
        logout : (state) =>{
            state.user = null
            localStorage.removeItem('access_token')
        }
    },

    extraReducers : (builder)=>{
        builder
        .addCase(login.fulfilled, (state, action)=>{
            state.user = {email : action.meta.arg.email}
            console.log(state); 
            state.status = 'succeeded'
        })

        .addCase(register.fulfilled, (state, action)=>{
            state.user = {email : action.meta.arg.email}
            state.status = 'succeeded'
        })
        
        .addCase(login.rejected, (state, action)=>{
            state.error = "Login failed"
            state.status = 'failed'
        })

        .addCase(register.rejected, (state, action) => {
            state.error = 'Registration failed'
            state.status = 'failed'
        })

        .addCase(login.pending, (state) => {
            state.status = 'loading'
            state.error = null
        })

        .addCase(register.pending, (state) => {
            state.status = 'loading'
            state.error = null
        })
    }

})

export const {logout} = authSlice.actions
export default authSlice.reducer