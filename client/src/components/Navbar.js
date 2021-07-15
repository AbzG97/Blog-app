import React from 'react'
import styled from 'styled-components'
import MenuIcon from '@material-ui/icons/Menu'
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';

function Navbar() {
    return (
        <StyledNavbar>
            <div className="header">
            <IconButton edge="start" color="inherit" aria-label="menu">
                <MenuIcon fontSize="large" />
            </IconButton>
            <p> BlogIO</p>
            </div>
            <div className="buttons">
                <Button className="button" variant="outlined" size="large" color="primary">Login</Button>
                <Button className="button"  variant="outlined" size="large" color="primary">Signup</Button>
            </div>
        </StyledNavbar>
    )
}

const StyledNavbar = styled.div `
    /* background-color: #333; */
    overflow: hidden;
    /* position: fixed; */
    width: 100%;
    top: 0;
    display: flex;
    flex-direction: row;
    align-items: center;
    .header {
        width: inherit;
        display: flex;
        justify-content: flex-start;
        padding: 1rem;
    }
    .buttons {
        width: inherit;
        display: flex;
        flex-direction: row;
        justify-content: flex-end;
        .button {
            padding: .5rem;
            margin: .5rem 1rem .5rem 1rem;
        }
    }
`

export default Navbar
