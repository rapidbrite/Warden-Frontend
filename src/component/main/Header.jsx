import React from "react";
import { Link } from "react-router-dom";
import "../../scss/header.scss";

// material ui
//import Tooltip from "@mui/material/Tooltip";
import Badge from "@mui/material/Badge";
import Menu from "@mui/material/Menu";
//import MenuItem from "@mui/material/MenuItem";
//import ListItemIcon from "@mui/material/ListItemIcon";
// import Logout from '@mui/icons-material/Logout';

// component
import NotificationMenu from "../header/NotificatioMenu";

// react-icons
import { GiMagicHat } from "react-icons/gi";
import { FiLogOut } from "react-icons/fi";
import { AiOutlineBell } from "react-icons/ai";
import { CgProfile } from "react-icons/cg";

import { logout } from "../../utils/logout";

// redux
import { connect } from "react-redux";

function Header({ userDetails, notifications }) {
  // const [notificationCount, setNotificationCount] = React.useState(0);
  let notificationCount = 0;
  notifications?.forEach((notification) => {
    if (notification.status === "unread") {
      notificationCount++;
    }
  });

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const [anchorEl1, setAnchorEl1] = React.useState(null);
  const open1 = Boolean(anchorEl1);
  const handleClick1 = (event) => {
    setAnchorEl1(event.currentTarget);
  };
  const handleClose1 = () => {
    setAnchorEl1(null);
  };
  return (
    <div className="header">
      <div className="header__left">
        <GiMagicHat />
        <h1>
          War<span>d</span>en
        </h1>
      </div>
      <div className="header__right">
        <div className="header__right__profile" onClick={handleClick1}>
          {/* ::TODO start from here */}
          <h1>@{userDetails?.userName}</h1>
          <img src={`${userDetails?.avatar}`} alt="profile" />
        </div>
        <div className="header__right__notification" onClick={handleClick}>
          <Badge
            badgeContent={notificationCount}
            sx={{
              "& .MuiBadge-badge": {
                color: "white",
                backgroundColor: "#1f62ff",
              },
            }}
          >
            <AiOutlineBell />
          </Badge>
        </div>
        <Menu
          anchorEl={anchorEl1}
          id="header__account-menu"
          open={open1}
          onClose={handleClose1}
          onClick={handleClose1}
          transformOrigin={{ horizontal: "right", vertical: "top" }}
          anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        >
          <div className="header__account__menu__div">
            <div>
              <Link to="/main/profile" id="header__profile__menu">
                <CgProfile id="header__profile__menu__icons"/>
                <h1>Profile</h1>
              </Link>
            </div>
            <div onClick={logout}>
              <FiLogOut id="header__profile__menu__icons"/>
              <h1>Logout</h1>
            </div>
          </div>
        </Menu>
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            "aria-labelledby": "basic-button",
          }}
        >
          <NotificationMenu />
        </Menu>
        {/* <Tooltip
          title="logout"
          placement="bottom"
            arrow
            componentsProps={{
                tooltip: {
                    sx: {
                        height: '2.5rem',
                        width: 'auto',
                        fontSize : '1.2rem',
                        color: '#fd555d',
                        border : '1px solid #fd555d',
                        bgcolor: 'common.white',
                        '& .MuiTooltip-arrow': {
                            color: '#fd555d'
                        },
                  },
                },
              }}
        >
          <div className='header__right__logout' onClick={logout}>
            <FiLogOut/>
          </div>
        </Tooltip> */}
      </div>
    </div>
  );
}

const mapStoreStateToProps = ({ auth, project, notification }) => {
  return {
    ...auth,
    ...project,
    ...notification,
  };
};

export default connect(mapStoreStateToProps)(Header);
