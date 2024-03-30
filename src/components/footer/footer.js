import React from 'react'

import TaskFilter from './task-filter'

import './foooter.css'

export default class Footer extends React.PureComponent {
  render() {
    return (
      <footer className="footer">
        <span className="todo-count">1 items left</span>
        <TaskFilter />
        <button type="button" className="clear-completed">
          Clear completed
        </button>
      </footer>
    )
  }
}
