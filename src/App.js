import TaskList from './components/task-list'
import NewTaskForm from './components/new-task-form'
import Footer from './components/footer'

import './App.css'

function App() {
  return (
    <section className="todoapp">
      <header>
        <h1>todoapp</h1>
        <NewTaskForm />
      </header>
      <section className="main">
        <TaskList />
        <Footer />
      </section>
    </section>
  )
}

export default App
