import Articles from "./components/Articles";
import Navbar from "./components/Navbar";
import Tabsbar from "./components/Tabsbar";
import React from "react";

function App() {
  const [currentTab, setCurrentTab] = React.useState(0);
  return (
    <div className="App">
      <Navbar/>
      <Tabsbar currentTab={currentTab} setCurrentTab={setCurrentTab}/>
      <Articles currentTab={currentTab}/>
    </div>
  );
}

export default App;
