import React from 'react'

import Tooltip from '@mui/material/Tooltip';

import { AiOutlinePlus } from "react-icons/ai";

import "../../scss/leftbar/leftbar.scss";


const Avatar = ({ char,create,tooltip,projectIcon, projectId,customCss = "",tooltipColor = "#1f62ff"}) => {
    const projectPath = `/main/project/${projectId}`;
    const currentPath = window.location.pathname;
    const same = currentPath === projectPath;
    return (
        <Tooltip
            title={tooltip}
            placement="right"
            arrow
            componentsProps={{
                tooltip: {
                    sx: {
                        height: '2.5rem',
                        width: 'auto',
                        fontSize : '1.2rem',
                        color: tooltipColor,
                        border : `1px solid ${tooltipColor}`,
                        bgcolor: 'common.white',
                        '& .MuiTooltip-arrow': {
                            color: tooltipColor,
                        },
                  },
                },
              }}
        >
            <div className={`leftbar__avatar ${create && "leftbar__avatar__create"} ${same && "leftbar__avatar--active"} ${customCss}`}>
                {create ? <AiOutlinePlus id="add__icon" /> : (projectIcon ? <img src={projectIcon} alt="" /> :<div>{char}</div>)}
            </div>
        </Tooltip>
  )
}
export default Avatar