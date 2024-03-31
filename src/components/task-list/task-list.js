import React from 'react'
import { forbidExtraProps } from 'airbnb-prop-types'
import PropTypes from 'prop-types'

import Task from '../task'
import './task-list.css'

export default class TaskList extends React.PureComponent {
  render() {
    const { filter, todoItems, taskHandler } = this.props
    const tasks = todoItems.map((task) => {
      return (
        <Task
          key={task.id}
          filter={filter}
          changeTask={(obj) => {
            taskHandler({ ...obj, id: task.id })
          }}
          description={task.description}
          created={task.created}
          completed={task.completed}
        />
      )
    })
    return <ul className="todo-list">{tasks}</ul>
  }
}

TaskList.defaultProps = {
  filter: 'all',
  todoItems: [],
  taskHandler: () => {},
}

TaskList.propTypes = forbidExtraProps({
  filter: PropTypes.oneOf(['all', 'active', 'completed']),
  todoItems: PropTypes.arrayOf(PropTypes.objectOf),
  taskHandler: PropTypes.func,
})
