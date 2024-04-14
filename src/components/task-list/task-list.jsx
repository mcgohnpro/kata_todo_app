import PropTypes from 'prop-types'

import Task from '../task'
import './task-list.css'

export default function TaskList(props) {
  const { filter, todoItems, removeTask, updateTask } = props

  return (
    <ul className="todo-list">
      {todoItems.map(({ id, title, created, completed, totalSeconds }) => {
        return (
          <Task
            key={id}
            id={id}
            totalSeconds={totalSeconds}
            filter={filter}
            title={title}
            created={created}
            completed={completed}
            removeTask={() => {
              removeTask(id)
            }}
            updateTask={(value) => {
              updateTask(id, value)
            }}
          />
        )
      })}
    </ul>
  )
}

TaskList.defaultProps = {
  filter: 'all',
  todoItems: [],
  removeTask: () => {},
  updateTask: () => {},
}

TaskList.propTypes = {
  filter: PropTypes.oneOf(['all', 'active', 'completed']),
  todoItems: PropTypes.arrayOf(PropTypes.objectOf),
  removeTask: PropTypes.func,
  updateTask: PropTypes.func,
}
