import React from 'react'

import Task from '../task'
import './task-list.css'

export default class TaskList extends React.PureComponent {
  render() {
    // eslint-disable-next-line no-unused-vars
    const { todoItems, changeTask } = this.props
    const tasks = todoItems.map((task) => {
      return (
        <Task
          key={task.id}
          changeTask={(method, value) => {
            changeTask(method, task.id, value)
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
