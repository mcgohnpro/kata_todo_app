import { useState } from 'react'
import './new-task-form.css'
import PropTypes from 'prop-types'

import getId from '../../utils'

const isNumber = (value) => (Number.isFinite(+value) ? value : '')

export default function NewTaskForm(props) {
  const [value, setValue] = useState('')
  const [min, setMin] = useState('')
  const [sec, setSec] = useState('')

  const { createTask } = props
  return (
    <form
      className="new-todo-form"
      action=""
      onSubmit={(e) => {
        e.preventDefault()
        createTask({
          id: getId(),
          title: value,
          completed: false,
          created: new Date(),
          totalSeconds: parseInt(min, 10) * 60 + parseInt(sec, 10),
        })
        setValue('')
        setMin('')
        setSec('')
      }}
    >
      <input
        name="task"
        required
        autoComplete="off"
        className="new-todo"
        placeholder="Task"
        value={value}
        onChange={(e) => {
          setValue(e.target.value.trimStart())
        }}
      />
      <input
        required
        pattern="^(0?[0-9]|[1-5][0-9]|59)$"
        title="Enter value from 0 to 59"
        autoComplete="off"
        maxLength={2}
        name="min"
        className="new-todo-form__timer"
        placeholder="Min"
        value={min}
        onChange={(e) => {
          setMin(isNumber(e.target.value.trimStart().trimEnd()))
        }}
      />
      <input
        required
        pattern="^(0?[0-9]|[1-5][0-9]|59)$"
        title="Enter value from 0 to 59"
        autoComplete="off"
        name="sec"
        type="text"
        maxLength={2}
        className="new-todo-form__timer"
        placeholder="Sec"
        value={sec}
        onChange={(e) => {
          setSec(isNumber(e.target.value.trimStart().trimEnd()))
        }}
      />
      <input className="new-todo-form__submit" type="submit" />
    </form>
  )
}

NewTaskForm.defaultProps = {
  createTask: () => {},
}

NewTaskForm.propTypes = {
  createTask: PropTypes.func,
}
