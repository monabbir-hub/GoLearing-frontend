import React from 'react'
import ReactPlayer from 'react-player'
import classes from '../styles/VideoPlayer.module.css'
function VideoPlayer({ url }) {
  return (
    <div className={classes.player_wrapper}>
      <ReactPlayer
        className={classes.react_player}
        url={url}
        width='90%'
        height='70%'
        controls={true}
      />
    </div>
  )
}

export default VideoPlayer
