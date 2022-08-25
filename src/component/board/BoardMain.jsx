import React from 'react'
import CreateChannel from './CreateChannel'
import {
  Routes,
  Route,
} from "react-router-dom";

import ChannelBoard from './ChannelBoard'

const BoardMain = () => {
      
  
  return (
    <div style={{
      width : "100%"
    }}>
      <Routes>
        {/* <Route path="/profile/*" element={<Profile/>} /> */}
        <Route path="/create" element={<CreateChannel />}/>
      </Routes>
      <Routes>
        <Route path={`/channel/:id`} element={<ChannelBoard />} />
      </Routes>
    </div>
    
  )
}

export default BoardMain