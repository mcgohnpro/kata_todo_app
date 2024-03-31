import React from 'react'
import { forbidExtraProps } from 'airbnb-prop-types'
import PropTypes from 'prop-types'

import getId from '../../utils'

import './new-task-form.css'

export default class NewTaskForm extends React.PureComponent {
  render() {
    const { taskHandler } = this.props
    return (
      <input
        className="new-todo"
        placeholder="What needs to be done?"
        onKeyUp={(e) => {
          if (e.key === 'Enter' && e.target.value) {
            taskHandler({
              method: 'create',
              value: {
                id: getId(),
                description: e.target.value,
                completed: false,
                created: new Date(),
              },
            })
            e.target.value = ''
          }
        }}
      />
    )
  }
}

NewTaskForm.defaultProps = {
  taskHandler: () => {},
}

NewTaskForm.propTypes = forbidExtraProps({
  taskHandler: PropTypes.func,
})
