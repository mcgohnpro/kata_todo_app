import React from 'react'
import './task-filter.css'

export default class TaskFilter extends React.PureComponent {
  render() {
    const { filterTasks, filter } = this.props
    return (
      <ul className="filters">
        <li>
          <button
            type="button"
            className={filter === 'all' ? 'selected' : ''}
            onClick={() => {
              filterTasks('all')
            }}
          >
            All
          </button>
        </li>
        <li>
          <button
            type="button"
            className={filter === 'active' ? 'selected' : ''}
            onClick={() => {
              filterTasks('active')
            }}
          >
            Active
          </button>
        </li>
        <li>
          <button
            type="button"
            className={filter === 'completed' ? 'selected' : ''}
            onClick={() => {
              filterTasks('completed')
            }}
          >
            Completed
          </button>
        </li>
      </ul>
    )
  }
}
