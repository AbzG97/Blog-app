import React from 'react'
import {Link} from 'react-router-dom'
import styled from 'styled-components'
import { TextField, Button } from '@material-ui/core'
import { useUserContext } from '../UserContext'

function Signup() {
    const [email, setEmail] = React.useState();
    const [name, setName] = React.useState();
    const [password, setPassword] = React.useState();
    const {Signup} = useUserContext();


    const CreateUser = (e) => {
        e.preventDefault();
        Signup(email, name, password);
        // console.log(user);
    }
    return (
        <StyledSignupPage>
            <h1>Signup page</h1>
            <form onSubmit={CreateUser}>
                <TextField className="text-field" label="E-mail" onChange={(e) => setEmail(e.target.value)}/>
                <TextField className="text-field" label="Name" onChange={(e) => setName(e.target.value)}/>
                <TextField className="text-field" label="Password" onChange={(e) => setPassword(e.target.value)}/>
                <Button variant="contained" color="primary" type="submit">Signup</Button>
            </form>
            <Link to="/">Home</Link> 
        </StyledSignupPage>
    )
}

const StyledSignupPage = styled.div `
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



export default Signup
