import React from 'react'

import Task from '../task'
import './task-list.css'

export default class TaskList extends React.PureComponent {
  render() {
    // eslint-disable-next-line no-unused-vars
    const { filter, todoItems, taskHandler } = this.props
    const tasks = todoItems.map((task) => {
      return (
        <Task
          key={task.id}
          changeTask={(obj) => {
            taskHandler({ ...obj, id: task.id })
          }}
          description={task.description}
          created={task.created}
          completed={task.completed}
          filter={filter}
        />
      )
    })
    return <ul className="todo-list">{tasks}</ul>
  }
}
