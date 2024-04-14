import { Component } from 'react'
import PropTypes from 'prop-types'

export default class TaskEditor extends Component {
  constructor(props) {
    super(props)
    const { title } = props
    this.state = {
      value: title,
    }
    this.handleEditTitle = this.handleEditTitle.bind(this)
  }

  handleEditTitle(e) {
    this.setState({
      value: e.target.value,
    })
  }

  render() {
    const { value } = this.state
    const { editing, confirmTitleChanges, title, abortTitleChanges } = this.props
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
          onChange={this.handleEditTitle}
          value={value}
          onBlur={() => {
            this.setState({
              value: title,
            })
            abortTitleChanges()
          }}
          onKeyDown={(e) => {
            if (e.code === 'Escape') {
              this.setState({
                value: title,
              })
              abortTitleChanges()
            }
          }}
        />
      </form>
    )
  }
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
