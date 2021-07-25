import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { TextField, Button } from '@material-ui/core'
import { useUserContext } from '../UserContext'

function Login() {
    const [email, setEmail] = React.useState();
    const [password, setPassword] = React.useState();
    const {Login} = useUserContext();


    const LoginUser = (e) => {
        e.preventDefault();
        Login(email, password);
    }
    return (
        <StyledLoginPage>
            <h1>Login page</h1>
            <form onSubmit={LoginUser}>
                <TextField className="text-field" label="E-mail" onChange={(e) => setEmail(e.target.value)}/>
                <TextField className="text-field" label="Password" onChange={(e) => setPassword(e.target.value)}/>
                <Button variant="contained" color="primary" type="submit">Login</Button>
            </form>
            <Link to="/">Home</Link> 
        </StyledLoginPage>
        
    )
}

const StyledLoginPage = styled.div `
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    margin-top: 2rem;
    /* background-color: blue; */
    form {
        height: 50vh;
        width: 50%;
        /* background-color: red; */
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        align-items: center;
        .text-field {
            width: inherit;
        }
    }
`


export default Login
