import { forbidExtraProps } from 'airbnb-prop-types'
import PropTypes from 'prop-types'
import formatDistanceToNow from 'date-fns/formatDistanceToNow'

import './task.css'

export default function Task(props) {
  const { id, description, created, completed, filter, removeTask, updateTask } = props
  if (filter === 'active' && completed) return null
  if (filter === 'completed' && !completed) return null
  return (
    <li className={completed ? 'completed' : ''}>
      <div className="view">
        <input
          id={id}
          className="toggle"
          checked={completed}
          type="checkbox"
          onChange={() => {
            updateTask({ completed: !completed })
          }}
        />
        <label htmlFor={id}>
          <span className="description">{description}</span>
          <span className="created">{`created ${formatDistanceToNow(created)} ago`}</span>
        </label>
        <button type="button" className="icon icon-edit" aria-label="edit" />
        <button type="button" className="icon icon-destroy" aria-label="delete" onClick={removeTask} />
      </div>
    </li>
  )
}

Task.defaultProps = {
  id: '',
  filter: 'all',
  description: '',
  completed: false,
  created: new Date(),
  removeTask: () => {},
  updateTask: () => {},
}

Task.propTypes = forbidExtraProps({
  id: PropTypes.string,
  filter: PropTypes.oneOf(['all', 'active', 'completed']),
  description: PropTypes.string,
  completed: PropTypes.bool,
  created: PropTypes.instanceOf(Date),
  removeTask: PropTypes.func,
  updateTask: PropTypes.func,
})
