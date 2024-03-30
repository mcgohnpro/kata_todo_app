import React from 'react'

import './new-task-form.css'

export default class NewTaskForm extends React.PureComponent {
  render() {
    return <input className="new-todo" placeholder="What needs to be done?" />
  }
}
