/* eslint-disable react/no-unused-state */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react'
import formatDistanceToNow from 'date-fns/formatDistanceToNow'

import './task.css'

export default class Task extends React.PureComponent {
  render() {
    const { description, created, completed, changeTask } = this.props
    return (
      <li className={completed ? 'completed' : ''}>
        <div className="view">
          <input
            className="toggle"
            checked={!!completed}
            type="checkbox"
            onChange={() => {
              changeTask('update', { completed: !completed })
            }}
          />
          <label>
            <span className="description">{description}</span>
            <span className="created">{`created ${formatDistanceToNow(created)}`}</span>
          </label>
          <button type="button" className="icon icon-edit" aria-label="edit" />
          <button
            type="button"
            className="icon icon-destroy"
            aria-label="delete"
            onClick={() => {
              changeTask('delete')
            }}
          />
        </div>
      </li>
    )
  }
}
