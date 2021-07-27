import React from "react";
import styled from "styled-components";
import MenuIcon from "@material-ui/icons/Menu";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import { Link, useHistory } from "react-router-dom";
import { useUserContext } from "../UserContext";

function Navbar() {
  const { user, Logout } = useUserContext();
  const history = useHistory();

  const LogoutUser = () => {
      Logout();
      history.push("/");

  }

  return (
    <StyledNavbar>
      <div className="header">
        <IconButton edge="start" color="inherit" aria-label="menu">
          <MenuIcon fontSize="large" />
        </IconButton>
        <p> BlogIO</p>
      </div>
      <div className="buttons">
        {user ? (
          <>
            <p>Logged in as {user.user.name}</p>
            <Button
              className="button"
              variant="outlined"
              size="large"
              color="primary"
            >
              <Link to="/postform">Create article</Link>
              </Button>
            
            <Button
              className="button"
              variant="outlined"
              size="large"
              color="primary"
              onClick={LogoutUser}
            >
              Logout
            </Button>{" "}
          </>
        ) : (
          <>
            {" "}
            <Button
              className="button"
              variant="outlined"
              size="large"
              color="primary"
            >
              <Link to="/login">Login</Link>
            </Button>
            <Button
              className="button"
              variant="outlined"
              size="large"
              color="primary"
            >
              <Link to="/signup">Signup</Link>
            </Button>
          </>
        )}
      </div>
    </StyledNavbar>
  );
}

const StyledNavbar = styled.div`
  /* background-color: #333; */
  /* height: 45vh; */
  /* background-image: url('https://images.unsplash.com/photo-1500989145603-8e7ef71d639e?ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8YmxvZ3xlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&w=1000&q=80');
  background-repeat: no-repeat;
  background-size: cover; */
  overflow: hidden;
  /* position: fixed; */
  width: 100%;
  top: 0;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  .header {
    width: inherit;
    display: flex;
    justify-content: flex-start;
    /* padding: 1rem; */
  }
  .buttons {
    width: inherit;
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    .button {
      padding: 0.5rem;
      margin: 0.5rem 1rem 0.5rem 1rem;
    }
  }
`;

export default Navbar;
