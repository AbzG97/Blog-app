import Articles from "./components/Articles";
import Navbar from "./components/Navbar";
import Tabsbar from "./components/Tabsbar";
import { Route, Switch } from "react-router-dom";
import React from "react";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import { useUserContext } from "./UserContext";
import CreateArticleForm from "./pages/CreateArticleForm";

function App() {
  const [currentTab, setCurrentTab] = React.useState(0);
  const { fetchCurrentUser} = useUserContext();
  React.useEffect(() => fetchCurrentUser(), []);
  return (
        <div className="App">
          <Navbar />
          <Switch>
            <Route path="/" exact>
              <Tabsbar currentTab={currentTab} setCurrentTab={setCurrentTab} />{" "}
              <Articles currentTab={currentTab} />{" "}
            </Route>

            <Route path="/signup">
              <Signup />
            </Route>

            <Route path="/login">
              <Login />
            </Route>

            <Route path="/postform">
              <CreateArticleForm/>
            </Route>
          </Switch>
        </div>

  );
}

export default App;
