import React from 'react'

import BoardLeftBar from './BoardLeftBar'
import BoardMain from './BoardMain'

// style
import "../../scss/Board/Board.scss"

// redux
import { connect } from 'react-redux'
import { getChannelActions } from '../../store/actions/channelActions'

const Board = ({ userDetails, getChannelsSemiData,projectId ,setChannelDetails}) => {
  // username, projectid, token
  const token = localStorage.getItem('token')
  const [channelId, setChannelId] = React.useState('')
  React.useEffect(() => {
   
    getChannelsSemiData(userDetails?.userName, projectId, token)
  }, [getChannelsSemiData, userDetails?.userName, projectId, token])

  
  
  
  React.useEffect(() => {
    //console.log('2')
    if(channelId){
      setChannelDetails(channelId,userDetails?.userName,token)
      }
  },[channelId,userDetails?.userName,token,setChannelDetails]);
  return (   
    <div className='project__board'>
      <BoardLeftBar projectId={projectId} setChannelId={setChannelId} />
      <BoardMain setChannelId={setChannelId}/>
    </div>
  )
}

const mapStateToProps = ({auth,channel}) => {
  return {
    ...auth,
    ...channel
  }
}
const mapActionToProps = (dispatch) => {
  return {
    ...getChannelActions(dispatch)
  }
}

export default connect(mapStateToProps,mapActionToProps)(Board)