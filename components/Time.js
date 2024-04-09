import React from 'react'
import classes from '../styles/Time.module.css'
function Time({ timer, timeEnd }) {
  const [days, setDays] = React.useState('')
  const [hours, setHours] = React.useState('')
  const [minutes, setMinutes] = React.useState('')
  const [seconds, setSeconds] = React.useState('')
  const [timeUp, setTimeUp] = React.useState(false)

  timeEnd(timeUp)

  React.useEffect(() => {
    const interval = setInterval(() => {
      commingSoonTime()
    }, 1000)
    return () => clearInterval(interval)
  }, [])
  const commingSoonTime = () => {
    let endTime = new Date(timer)
    let endTimeParse = Date.parse(endTime) / 1000
    let now = new Date()
    let nowParse = Date.parse(now) / 1000
    let timeLeft = endTimeParse - nowParse
    // let timeLeft = 3600;
    let days = Math.floor(timeLeft / 86400)
    let hours = Math.floor((timeLeft - days * 86400) / 3600)
    let minutes = Math.floor((timeLeft - days * 86400 - hours * 3600) / 60)
    let seconds = Math.floor(
      timeLeft - days * 86400 - hours * 3600 - minutes * 60
    )
    if (hours < '10') {
      hours = '0' + hours
    }
    if (minutes < '10') {
      minutes = '0' + minutes
    }
    if (seconds < '10') {
      seconds = '0' + seconds
    }
    setDays(days)
    setHours(hours)
    setMinutes(minutes)
    setSeconds(seconds)

    if (hours === '00' && minutes === '00' && seconds === '00') {
      setTimeUp(true)
    }
  }
  return (
    <div className={classes.timer}>
      <div>
        {/* <div
          className=""
          id="days"
          className="align-items-center flex-column d-flex justify-content-center"
        >
          {days} <span>Days</span>
        </div> */}
        <div id='hours' className=''>
          <h5>
            {/* Time Left: */}
            {!timeUp ? (
              <span>
                {' '}
                {hours}:{minutes}:{seconds}{' '}
              </span>
            ) : (
              <span> Time is up</span>
            )}
          </h5>
        </div>
        {/* <div
          id="minutes"
          className="align-items-center flex-column d-flex justify-content-center"
        >
          {minutes} <span></span>
        </div>
        <div
          id="seconds"
          className="align-items-center flex-column d-flex justify-content-center"
        >
          {seconds} <span></span>
        </div> */}
      </div>
    </div>
  )
}

export default Time
