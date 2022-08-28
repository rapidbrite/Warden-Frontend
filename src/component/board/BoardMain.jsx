import React from 'react'
import CreateChannel from './CreateChannel'
import {
  Routes,
  Route,
} from "react-router-dom";

import ChannelBoard from './ChannelBoard'
import ChannelSettings from './ChannelSettings';

const BoardMain = ( {setChannelId }) => {
     
  
  return (
    <div style={{
      width : "100%"
    }}>
      <Routes>
        {/* <Route path="/profile/*" element={<Profile/>} /> */}
        <Route path="/create" element={<CreateChannel setChannelId={setChannelId}/>}/>
      </Routes>
      <Routes>
        <Route path={`/channel/:id`} element={<ChannelBoard />} />
      </Routes>
      <Routes>
        <Route path={`/channel/:id/settings`} element={<ChannelSettings />} />
      </Routes>
    </div>
    
  )
}

export default BoardMain