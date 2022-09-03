import React from "react";
import { MdOutlineRemoveCircle } from "react-icons/md";
import { ImCircleDown } from "react-icons/im";
import { ImCircleUp } from "react-icons/im";
import Tooltip from "@mui/material/Tooltip";
import { Dialog } from "@mui/material";

import ConfirmPopUp from "../ConfirmPopUp";

const UserBox = ({
  user,
  areAdmins,
  handleMakeAdmin,
  handleRemoveAdmin,
  handleRemoveFromProject,
}) => {
  
  const [removeopen, setRemoveopen] = React.useState(false);
  const [upopen, setUpopen] = React.useState(false);
  const [downopen, setDownopen] = React.useState(false);


  const handleRemoveOpen = () => {
    setRemoveopen(true);
  };
  const handleUpOpen = () => {
    setUpopen(true);
  };
  const handleDownOpen = () => {
    setDownopen(true);
  };
  const handleRemoveClose = () => {
    setRemoveopen(false);
  };
  const handleUpClose = () => {
    setUpopen(false);
  };
  const handleDownClose = () => {
    setDownopen(false);
  };



  return (
    <div className="userbox__box">
      <Dialog open={removeopen} onClose={handleRemoveClose}>
        <ConfirmPopUp
          title="Are you sure?"
          desc="You want to remove this user from project"
          handleClose={handleRemoveClose}
          handleConfirm={() => {handleRemoveFromProject(user.userName,areAdmins)
          handleRemoveClose()}
          }
        />
      </Dialog>
      <Dialog open={upopen} onClose={handleUpClose}>
        <ConfirmPopUp
          title="Are you sure?"
          desc="You want to make this user admin of this project"
          handleClose={handleUpClose}
          handleConfirm={() => {handleMakeAdmin(user.userName);
            handleUpClose();}}
          
        />
      </Dialog>
      <Dialog open={downopen} onClose={handleDownClose}>
        <ConfirmPopUp
          title="Are you sure?"
          desc="You want to remove admin rights from this user"
          handleClose={handleDownClose}
          handleConfirm={() => {handleRemoveAdmin(user.userName)
          handleDownClose();}
          }
        />
      </Dialog>

      <div className="userbox__box__main">
        <div className="userbox__box__main__logo">
          <img src={user.avatar} alt="U" id="diamond-narrow" />
        </div>

        <div className="userbox__box__main__name">{user.userName}</div>
      </div>

      <div className="userbox__box__actions">
        <div>
          {areAdmins ? (
            <div className="userbox__box__actions__icons">
              <Tooltip
                title="Remove from the Admins"
                placement="left"
                arrow
                componentsProps={{
                  tooltip: {
                    sx: {
                      height: "2.5rem",
                      width: "auto",
                      fontSize: "1.2rem",
                      color: "#1f62ff",
                      border: "1px solid #1f62ff",
                      bgcolor: "common.white",
                      "& .MuiTooltip-arrow": {
                        color: "#1f62ff",
                      },
                    },
                  },
                }}
              >
                <div>
                  <ImCircleDown className="userbox__box__actions__icons__1" onClick={handleDownOpen}/>
                </div>
              </Tooltip>
              <Tooltip
                title="Remove from the project"
                placement="right"
                arrow
                componentsProps={{
                  tooltip: {
                    sx: {
                      height: "2.5rem",
                      width: "auto",
                      fontSize: "1.2rem",
                      color: "#1f62ff",
                      border: "1px solid #1f62ff",
                      bgcolor: "common.white",
                      "& .MuiTooltip-arrow": {
                        color: "#1f62ff",
                      },
                    },
                  },
                }}
              >
                <div>
                  <MdOutlineRemoveCircle className="userbox__box__actions__icons__2" onClick={handleRemoveOpen}/>
                </div>
              </Tooltip>
            </div>
          ) : (
            <div className="userbox__box__actions__icons">
              <Tooltip
                title="Add to the Admins"
                placement="left"
                arrow
                componentsProps={{
                  tooltip: {
                    sx: {
                      height: "2.5rem",
                      width: "auto",
                      fontSize: "1.2rem",
                      color: "#1f62ff",
                      border: "1px solid #1f62ff",
                      bgcolor: "common.white",
                      "& .MuiTooltip-arrow": {
                        color: "#1f62ff",
                      },
                    },
                  },
                }}
              >
                <div>
                  <ImCircleUp className="userbox__box__actions__icons__1" onClick={handleUpOpen}/>
                </div>
              </Tooltip>
              <Tooltip
                title="Remove from the project"
                placement="right"
                arrow
                componentsProps={{
                  tooltip: {
                    sx: {
                      height: "2.5rem",
                      width: "auto",
                      fontSize: "1.2rem",
                      color: "#1f62ff",
                      border: "1px solid #1f62ff",
                      bgcolor: "common.white",
                      "& .MuiTooltip-arrow": {
                        color: "#1f62ff",
                      },
                    },
                  },
                }}
              >
                <div>
                  <MdOutlineRemoveCircle className="userbox__box__actions__icons__2"  onClick={handleRemoveOpen}/>
                </div>
              </Tooltip>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserBox;
