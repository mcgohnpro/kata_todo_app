import React from 'react'

import './app.css'
import TaskList from '../task-list'
import NewTaskForm from '../new-task-form'
import Footer from '../footer'
import getId from '../../utils'

export default class App extends React.Component {
  constructor(props) {
    super(props)
    this.filterTasks = (filterValue) => {
      this.setState({ filter: filterValue })
    }
    this.updateTask = (id, value) => {
      this.setState(({ todoItems }) => {
        return {
          todoItems: todoItems.map((element) => (element.id === id ? { ...element, ...value } : element)),
        }
      })
    }
    this.createTask = (newTask) => {
      this.setState(({ todoItems }) => {
        return {
          todoItems: [...todoItems, newTask],
        }
      })
    }
    this.removeTask = (id) => {
      this.setState(({ todoItems }) => {
        return {
          todoItems: todoItems.filter((element) => element.id !== id),
        }
      })
    }
    this.removeCompleted = () => {
      this.setState(({ todoItems }) => {
        return {
          todoItems: todoItems.filter((element) => !element.completed),
        }
      })
    }
    this.state = {
      filter: 'all',
      todoItems: [
        {
          id: getId(),
          title: 'Task 1',
          completed: false,
          created: new Date('2024-03-30 22:00'),
          totalSeconds: 20,
        },
      ],
    }
  }

  render() {
    const { todoItems, filter } = this.state
    const count = todoItems.filter((el) => !el.completed).length
    return (
      <section className="todoapp">
        <header>
          <h1>todoapp</h1>
          <NewTaskForm createTask={this.createTask} />
        </header>
        <section className="main">
          <TaskList filter={filter} todoItems={todoItems} removeTask={this.removeTask} updateTask={this.updateTask} />
          <Footer count={count} filterTasks={this.filterTasks} filter={filter} removeCompleted={this.removeCompleted} />
        </section>
      </section>
    )
  }
}
