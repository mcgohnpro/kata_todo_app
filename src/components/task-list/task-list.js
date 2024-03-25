import React from 'react'

import Task from './task'
import './task-list.css'

class TaskList extends React.PureComponent {
  render() {
    return (
      <ul className="todo-list">
        <Task />
      </ul>
    )
  }
}
export default TaskList
