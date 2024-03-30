import React from 'react'
import './task-filter.css'

export default class TaskFilter extends React.PureComponent {
  render() {
    return (
      <ul className="filters">
        <li>
          <button type="button" className="selected">
            All
          </button>
        </li>
        <li>
          <button type="button">Active</button>
        </li>
        <li>
          <button type="button">Completed</button>
        </li>
      </ul>
    )
  }
}
