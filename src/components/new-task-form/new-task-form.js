import React from 'react'

import './new-task-form.css'

function getId() {
  return `id${Math.floor(Math.random() * 1e8).toString(16)}`
}

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
