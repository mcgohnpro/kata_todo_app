/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react'
import './task.css'

class Task extends React.PureComponent {
  render() {
    return (
      <li>
        <div className="view">
          <input className="toggle" />
          <label>
            <span className="description">New task</span>
            <span className="created">created 17 seconds ago</span>
          </label>
          <button type="button" className="icon icon-edit" />
          <button type="button" className="icon icon-destroy" />
        </div>
      </li>
    )
  }
}

export default Task
