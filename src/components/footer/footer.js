import React from 'react'
import { forbidExtraProps, nonNegativeInteger } from 'airbnb-prop-types'
import PropTypes from 'prop-types'

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
  removeCompleted: () => {},
}

Footer.propTypes = forbidExtraProps({
  count: nonNegativeInteger,
  filterTasks: PropTypes.func,
  filter: PropTypes.oneOf(['all', 'active', 'completed']),
  removeCompleted: PropTypes.func,
})
