import React from 'react'

import BoardLeftBar from './BoardLeftBar'
import BoardMain from './BoardMain'

// style
import "../../scss/Board/Board.scss"

// redux
import { connect } from 'react-redux'
import { getChannelActions } from '../../store/actions/channelActions'

const Board = ({ userDetails, getChannelsSemiData,projectId }) => {
  // username, projectid, token
  const token = localStorage.getItem('token')
  //const [channelId, setChannelId] = React.useState('')
  React.useEffect(() => {
    getChannelsSemiData(userDetails?.userName, projectId, token)
    //console.log(userDetails?.userName)
  },[getChannelsSemiData,userDetails?.userName,projectId,token]);

  return (   
    <div className='project__board'>
      <BoardLeftBar projectId={projectId} />
      <BoardMain />
    </div>
  )
}

const mapStateToProps = ({auth}) => {
  return {
    ...auth,
  }
}
const mapActionToProps = (dispatch) => {
  return {
    ...getChannelActions(dispatch)
  }
}

export default connect(mapStateToProps,mapActionToProps)(Board)