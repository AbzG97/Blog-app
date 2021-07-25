import React from 'react'
import axios from 'axios'


export const UserContext = React.createContext();

export const UserProvider = ({children}) => {
    const [user, setUser] = React.useState();

    const Signup = async (email, name, password) => {
        const new_user = await axios.post('/users/create', { email, name, password});
        console.log(new_user);
        setUser(new_user.data);

    }

    const Login = async (email, password) => {
        const new_user = await axios.post('/users/login', { email, password});
        console.log(new_user);
        setUser(new_user.data);

    }

    const fetchCurrentUser = async () => {
        const current_user = await axios.get('/users/me', {withCredentials: true});
        setUser(current_user.data);
        console.log("called");
    }
    

    return (
        <UserContext.Provider value={{user, Signup, Login, fetchCurrentUser}}>
            {children}
        </UserContext.Provider>
    )
}

export const useUserContext = () => React.useContext(UserContext);

