import React from 'react'
import PropTypes from 'prop-types'
import { differenceInSeconds, formatDistanceToNow, subSeconds } from 'date-fns'

import getTimeString from '../../utils/getTimeString'

import TaskEditor from './task-editor'

import './task.css'

export default class Task extends React.Component {
  constructor(props) {
    super(props)
    const { updateTask } = props
    this.state = {
      turnedOn: false,
      inProcessTime: 0,
      editing: false,
    }
    this.startTimer = this.startTimer.bind(this)
    this.updateTimer = this.updateTimer.bind(this)
    this.pauseTimer = this.pauseTimer.bind(this)
    this.openTaskEditor = this.openTaskEditor.bind(this)

    this.confirmTitleChanges = (value) => {
      updateTask({ title: value })
      this.setState({
        editing: false,
      })
    }

    this.abortTitleChanges = () => {
      this.setState(() => {
        return {
          editing: false,
        }
      })
    }
  }

  componentDidUpdate(...rest) {
    const { turnedOn } = this.state
    const [, prevState] = rest
    if (!prevState.turnedOn && turnedOn) {
      this.timer = setInterval(() => {
        this.updateTimer()
      }, 1000)
    }
    if (prevState.turnedOn && !turnedOn) {
      clearInterval(this.timer)
    }
  }

  startTimer() {
    const { turnedOn, inProcessTime } = this.state
    const { completed } = this.props
    if (!turnedOn && !completed) {
      this.setState({
        turnedOn: true,
        startTime: subSeconds(new Date(), inProcessTime),
      })
    }
  }

  updateTimer() {
    const { startTime, inProcessTime } = this.state
    const { totalSeconds } = this.props
    if (totalSeconds <= inProcessTime) {
      this.stopTimer()
      return
    }
    this.setState(() => {
      return {
        inProcessTime: differenceInSeconds(new Date(), startTime),
      }
    })
  }

  pauseTimer() {
    this.setState({
      turnedOn: false,
    })
  }

  stopTimer() {
    this.setState({
      turnedOn: false,
      inProcessTime: 0,
    })
    clearInterval(this.timer)
  }

  openTaskEditor() {
    this.setState({
      editing: true,
    })
  }

  render() {
    const { id, title, created, completed, filter, removeTask, updateTask, totalSeconds } = this.props
    const { inProcessTime, editing } = this.state
    const leftTime = getTimeString(totalSeconds, inProcessTime)
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
              this.pauseTimer()
              updateTask({ completed: !completed })
            }}
          />
          <label htmlFor={id}>
            <span className="title">{title}</span>
            <span className="description">
              <button aria-label="start" type="button" className="icon icon-play" onClick={this.startTimer} />
              <button aria-label="pause" type="button" className="icon icon-pause" onClick={this.pauseTimer} />
              {leftTime}
            </span>
            <span className="description">{`created ${formatDistanceToNow(created)} ago`}</span>
          </label>
          <button type="button" className="icon icon-edit" aria-label="edit" onClick={this.openTaskEditor} />
          <button type="button" className="icon icon-destroy" aria-label="delete" onClick={removeTask} />
        </div>
        <TaskEditor
          title={title}
          editing={editing}
          confirmTitleChanges={this.confirmTitleChanges}
          abortTitleChanges={this.abortTitleChanges}
        />
      </li>
    )
  }
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
