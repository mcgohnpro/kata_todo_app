import './task-filter.css'
import PropTypes from 'prop-types'

export default function TaskFilter(props) {
  const { filterTasks, filter } = props
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

TaskFilter.defaultProps = {
  filterTasks: () => {},
  filter: 'all',
}

TaskFilter.propTypes = {
  filterTasks: PropTypes.func,
  filter: PropTypes.oneOf(['all', 'active', 'completed']),
}
