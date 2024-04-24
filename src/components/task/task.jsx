import { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { differenceInSeconds, formatDistanceToNow, subSeconds } from 'date-fns'

import getTimeString from '../../utils/getTimeString'

import TaskEditor from './task-editor'

import './task.css'

export default function Task(props) {
  const { id, title, created, completed, filter, removeTask, updateTask, totalSeconds } = props
  const [turnedOn, setTurnedOn] = useState(false)
  const [inProcessTime, setInProcessTime] = useState(0)
  const [editing, setEditing] = useState(false)
  const [startTime, setStartTime] = useState()

  const confirmTitleChanges = (value) => {
    updateTask({ title: value })
    setEditing(false)
  }

  const abortTitleChanges = () => {
    setEditing(false)
  }

  const startTimer = () => {
    if (!turnedOn && !completed) {
      setTurnedOn(true)
      setStartTime(subSeconds(new Date(), inProcessTime))
    }
  }

  const pauseTimer = () => {
    setTurnedOn(false)
  }

  function stopTimer() {
    setTurnedOn(false)
    setInProcessTime(0)
  }

  function updateTimer() {
    console.log(`totalSeconds ${totalSeconds}  inProcessTime ${inProcessTime}`)
    if (totalSeconds <= inProcessTime) {
      stopTimer()
      return
    }
    setInProcessTime(differenceInSeconds(new Date(), startTime))
  }

  const openTaskEditor = () => {
    setEditing(true)
  }

  useEffect(() => {
    console.log('update')
    let timer
    if (turnedOn) {
      timer = setInterval(() => {
        updateTimer()
      }, 1000)
    } else {
      clearInterval(timer)
    }
    return () => clearInterval(timer)
  }, [turnedOn])

  if (filter === 'active' && completed) return null
  if (filter === 'completed' && !completed) return null

  return (
    <li className={`${completed ? 'completed' : ''}${editing ? ' editing' : ''}`}>
      <div className="view">
        <input
          id={id}
          className="toggle"
          checked={completed}
          type="checkbox"
          onChange={() => {
            pauseTimer()
            updateTask({ completed: !completed })
          }}
        />
        <label htmlFor={id}>
          <span className="title">{title}</span>
          <span className="description">
            <button aria-label="start" type="button" className="icon icon-play" onClick={startTimer} />
            <button aria-label="pause" type="button" className="icon icon-pause" onClick={pauseTimer} />
            {getTimeString(totalSeconds, inProcessTime)}
          </span>
          <span className="description">{`created ${formatDistanceToNow(created)} ago`}</span>
        </label>
        <button type="button" className="icon icon-edit" aria-label="edit" onClick={openTaskEditor} />
        <button type="button" className="icon icon-destroy" aria-label="delete" onClick={removeTask} />
      </div>
      <TaskEditor
        title={title}
        editing={editing}
        confirmTitleChanges={confirmTitleChanges}
        abortTitleChanges={abortTitleChanges}
      />
    </li>
  )
}

Task.defaultProps = {
  id: '',
  filter: 'all',
  title: '',
  completed: false,
  created: new Date(),
  totalSeconds: 0,
  removeTask: () => {},
  updateTask: () => {},
}

Task.propTypes = {
  id: PropTypes.string,
  filter: PropTypes.oneOf(['all', 'active', 'completed']),
  title: PropTypes.string,
  completed: PropTypes.bool,
  created: PropTypes.instanceOf(Date),
  totalSeconds: PropTypes.number,
  removeTask: PropTypes.func,
  updateTask: PropTypes.func,
}
