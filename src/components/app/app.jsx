import { useState } from 'react'

import './app.css'
import TaskList from '../task-list'
import NewTaskForm from '../new-task-form'
import Footer from '../footer'
import getId from '../../utils'

const initialItems = [
  {
    id: getId(),
    title: 'Task 1',
    completed: false,
    created: new Date('2024-03-30 22:00'),
    totalSeconds: 7,
  },
]

export default function App() {
  const [todoItems, setTodoItems] = useState(initialItems)
  const [filter, setFilter] = useState('all')

  const filterTasks = (filterValue) => {
    setFilter(filterValue)
  }

  const updateTask = (id, value) => {
    setTodoItems((prev) => {
      return prev.map((element) => (element.id === id ? { ...element, ...value } : element))
    })
  }
  const createTask = (newTask) => {
    setTodoItems((prev) => {
      return [...prev, newTask]
    })
  }
  const removeTask = (id) => {
    setTodoItems((prev) => {
      return prev.filter((element) => element.id !== id)
    })
  }
  const removeCompleted = () => {
    setTodoItems((prev) => {
      return prev.filter((element) => !element.completed)
    })
  }

  const count = todoItems.filter((el) => !el.completed).length
  return (
    <section className="todoapp">
      <header>
        <h1>todoapp</h1>
        <NewTaskForm createTask={createTask} />
      </header>
      <section className="main">
        <TaskList filter={filter} todoItems={todoItems} removeTask={removeTask} updateTask={updateTask} />
        <Footer count={count} filterTasks={filterTasks} filter={filter} removeCompleted={removeCompleted} />
      </section>
    </section>
  )
}
