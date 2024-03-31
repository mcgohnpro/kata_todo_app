import React from 'react'

import TaskFilter from './task-filter'

import './foooter.css'

export default class Footer extends React.PureComponent {
  render() {
    const { count, filterTasks, filter, removeCompleted } = this.props

    return (
      <footer className="footer">
        <span className="todo-count">{count} items left</span>
        <TaskFilter filterTasks={filterTasks} filter={filter} />
        <button type="button" className="clear-completed" onClick={removeCompleted}>
          Clear completed
        </button>
      </footer>
    )
  }
}

Footer.defaultProps = {
  count: 0,
  filterTasks: () => {},
  filter: 'all',
}
