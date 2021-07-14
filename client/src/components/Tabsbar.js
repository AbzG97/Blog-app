import React from "react";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import { Paper } from "@material-ui/core";

function Tabsbar({currentTab, setCurrentTab}) {
  

  const ChangeTabHandler = (event, newValue) => {
    setCurrentTab(newValue);
  }

  return (
    <div>
      <Paper>
        <Tabs value={currentTab} 
        onChange={ChangeTabHandler} 
        indicatorColor="primary"
        textColor="primary"
        centered >
          <Tab label="Latest" />
          <Tab label="Gaming" />
          <Tab label="Programming"/>
          <Tab label="Food"/>
          <Tab label="News"/>
        </Tabs>        
      </Paper>
      
    </div>
  );
}

export default Tabsbar;
