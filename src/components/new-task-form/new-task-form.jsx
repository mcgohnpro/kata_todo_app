import React from 'react'
import PropTypes from 'prop-types'

import getId from '../../utils'

import './new-task-form.css'

export default class NewTaskForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      value: '',
    }
  }

  render() {
    const { createTask } = this.props
    const { value } = this.state
    return (
      <form
        action=""
        onSubmit={(e) => {
          e.preventDefault()
          createTask({
            id: getId(),
            description: value,
            completed: false,
            created: new Date(),
          })
          this.setState({ value: '' })
        }}
      >
        <input
          required
          className="new-todo"
          placeholder="What needs to be done?"
          value={value}
          onChange={(e) => {
            this.setState({ value: e.target.value.trimStart() })
          }}
        />
      </form>
    )
  }
}

NewTaskForm.defaultProps = {
  createTask: () => {},
}

NewTaskForm.propTypes = {
  createTask: PropTypes.func,
}
