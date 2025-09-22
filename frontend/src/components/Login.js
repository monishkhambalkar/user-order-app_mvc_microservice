import React, {useState} from 'react'
import {useDispatch} from 'react-redux'
import { login } from '../features/auth/authSlice';
import { useNavigate } from 'react-router-dom';

export default function Login(){
    const [email, setEmail] = useState('');
    const [password , setPassword] = useState('');
    const dispatch  = useDispatch();
    const navigate = useNavigate();

    const handleSubmit = async(e)=>{
        e.preventDefault();
        dispatch(login({email, password}))
    }   

    return (
        <>
            <div>
                <h2>Login</h2>
                <form onSubmit={handleSubmit}>
                    <input type='text' placeholder='Email' value={email} onChange={(e)=>setEmail(e.target.value)} required/>
                    <input type='Password' placeholder='Password' value={password} onChange={(e)=>setPassword(e.target.value)} required/>
                    <button type="submit">Login</button>
                </form>
                <p>Don’t have an account?</p>
                <button onClick={() => navigate('/register')}>
                    Go to Register
                </button>
            </div>
        </>
    )
}