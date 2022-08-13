import React from "react";
import { connect } from "react-redux";

// material ui
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";

// component
import Invitation from "./Invitation";
import Notification from "./Notification";

// scss
import "../../scss/header/notificationMenu.scss";

const NotificatioMenu = ({ notifications }) => {
  const [value, setValue] = React.useState("Invitations");
  const handleChange = (e, newValue) => {
    setValue(newValue);
  };
  const invitations = notifications?.filter((notification) => {
    return notification.title === "Invitation";
  });
  return (
    <div className="notificationmenu">
      <TabContext value={value}>
        <TabList
          onChange={handleChange}
          variant="scrollable"
          scrollButtons
          allowScrollButtonsMobile
          className="notificationmenu__tablist"
        >
          <Tab
            label="Invitations"
            value="Invitations"
            className="notificationmenu__tablist__tab"
          />
          <Tab
            label="Notifications"
            value="Notifications"
            className="notificationmenu__tablist__tab"
          />
        </TabList>

        <TabPanel value="Invitations" className="notificationmenu__tabpanel">
          <Invitation invitations={invitations} />
        </TabPanel>
        <TabPanel value="Notifications" className="notificationmenu__tabpanel">
          <Notification notifications={notifications} />
        </TabPanel>
      </TabContext>
    </div>
  );
};

const mapStoreStateToProps = ({ notification }) => {
  return {
    ...notification,
  };
};

export default connect(mapStoreStateToProps)(NotificatioMenu);
