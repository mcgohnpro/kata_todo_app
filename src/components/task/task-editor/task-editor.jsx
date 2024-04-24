import PropTypes from 'prop-types'
import { useState } from 'react'

export default function TaskEditor(props) {
  const { editing, confirmTitleChanges, title, abortTitleChanges } = props
  const [value, setValue] = useState(title)

  const handleEditTitle = (e) => {
    setValue(e.target.value)
  }

  if (!editing) return null

  return (
    <form
      action=""
      onSubmit={(e) => {
        e.preventDefault()
        confirmTitleChanges(value)
      }}
    >
      <input
        // eslint-disable-next-line jsx-a11y/no-autofocus
        autoFocus
        className="edit"
        type="text"
        onChange={handleEditTitle}
        value={value}
        onBlur={() => {
          setValue(title)
          abortTitleChanges()
        }}
        onKeyDown={(e) => {
          if (e.code === 'Escape') {
            setValue(title)
            abortTitleChanges()
          }
        }}
      />
    </form>
  )
}

TaskEditor.defaultProps = {
  title: '',
  editing: false,
  confirmTitleChanges: () => {},
  abortTitleChanges: () => {},
}

TaskEditor.propTypes = {
  title: PropTypes.string,
  editing: PropTypes.bool,
  confirmTitleChanges: PropTypes.func,
  abortTitleChanges: PropTypes.func,
}
