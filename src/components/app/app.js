import React from 'react'

import TaskList from '../task-list'
import NewTaskForm from '../new-task-form'
import Footer from '../footer'

import './app.css'

// `id${Math.floor(Math.random() * 1e8).toString(16)}`

export default class App extends React.PureComponent {
  constructor() {
    super()
    this.changeTask = (method, id, value) => {
      this.setState(({ todoItems }) => {
        if (method === 'update') {
          return {
            todoItems: todoItems.map((element) => (element.id === id ? { ...element, ...value } : element)),
          }
        }
        if (method === 'delete') {
          return {
            todoItems: todoItems.filter((element) => element.id !== id),
          }
        }
        return {
          todoItems,
        }
      })
    }
    this.state = {
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
    const { todoItems } = this.state
    return (
      <section className="todoapp">
        <header>
          <h1>todoapp</h1>
          <NewTaskForm />
        </header>
        <section className="main">
          <TaskList todoItems={todoItems} changeTask={this.changeTask} />
          <Footer />
        </section>
      </section>
    )
  }
}
