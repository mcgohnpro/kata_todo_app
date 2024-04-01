import React from 'react'

import TaskList from '../task-list'
import NewTaskForm from '../new-task-form'
import Footer from '../footer'

import './app.css'

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
          id: 'id42f9ea0',
          description: 'Задача 1',
          completed: false,
          created: new Date('2024-03-30 22:00'),
        },
        {
          id: 'id59a81f6',
          description: 'Задача 2',
          completed: false,
          created: new Date('2024-03-30 18:02'),
        },
        {
          id: 'id41cdbea',
          description: 'Задача 3',
          completed: false,
          created: new Date('2024-03-30 18:03'),
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
