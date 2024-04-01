import { forbidExtraProps } from 'airbnb-prop-types'
import PropTypes from 'prop-types'

import Task from '../task'
import './task-list.css'

export default function TaskList(props) {
  const { filter, todoItems, removeTask, updateTask } = props

  return (
    <ul className="todo-list">
      {todoItems.map(({ id, description, created, completed }) => {
        return (
          <Task
            key={id}
            id={id}
            filter={filter}
            description={description}
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

TaskList.propTypes = forbidExtraProps({
  filter: PropTypes.oneOf(['all', 'active', 'completed']),
  todoItems: PropTypes.arrayOf(PropTypes.objectOf),
  removeTask: PropTypes.func,
  updateTask: PropTypes.func,
})
