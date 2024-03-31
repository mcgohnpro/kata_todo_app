import React from 'react'
import formatDistanceToNow from 'date-fns/formatDistanceToNow'

import './task.css'

export default class Task extends React.PureComponent {
  render() {
    const { description, created, completed, changeTask, filter } = this.props
    let hidden = false
    if (filter === 'active') {
      hidden = completed
    } else if (filter === 'completed') {
      hidden = !completed
    }
    return (
      <li className={completed ? 'completed' : ''} hidden={hidden}>
        <div className="view">
          <input
            name="task"
            className="toggle"
            checked={!!completed}
            type="checkbox"
            onChange={() => {
              changeTask({
                method: 'update',
                value: { completed: !completed },
              })
            }}
          />
          <label htmlFor="task">
            <span className="description">{description}</span>
            <span className="created">{`created ${formatDistanceToNow(created)} ago`}</span>
          </label>
          <button type="button" className="icon icon-edit" aria-label="edit" />
          <button
            type="button"
            className="icon icon-destroy"
            aria-label="delete"
            onClick={() => {
              changeTask({
                method: 'delete',
              })
            }}
          />
        </div>
      </li>
    )
  }
}

Task.defaultProps = {
  filter: 'all',
  description: '',
  completed: false,
  changeTask: () => {},
  created: new Date(),
}
