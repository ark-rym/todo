import React, { useState } from 'react'
import './NewTaskForm.scss'
import propTypes from 'prop-types'

const NewTaskForm = ({ onItemAdded }) => {
  const [state, setState] = useState({
    label: '',
    min: '',
    sec: '',
  })

  function checkInput(text) {
    let isValid = text.replace(/^\s+|\s+$/g, '')
    return isValid
  }

  const onLabelChange = (e) => {
    if (checkInput(e.target.value)) {
      setState((state) => ({
        ...state,
        label: e.target.value,
      }))
    }
  }

  const onMinChange = (e) => {
    setState((state) => ({
      ...state,
      min: e.target.value,
    }))
  }

  const onSecChange = (e) => {
    setState((state) => ({
      ...state,
      sec: e.target.value,
    }))
  }

  const onSubmit = (e) => {
    e.preventDefault()
    const { label, min, sec } = state
    onItemAdded(label, min, sec)
    setState(() => ({
      label: '',
      min: '',
      sec: '',
    }))
  }

  const { label, min, sec } = state
  return (
    <form className="new-todo-form" onSubmit={onSubmit}>
      <input
        className="new-todo"
        placeholder="Task"
        onChange={onLabelChange}
        value={label}
        autoFocus
        required
      />
      <input
        className="new-todo-form__timer"
        type="number"
        min="0"
        max="59"
        placeholder="Min"
        onChange={onMinChange}
        value={min}
        required
      />
      <input
        className="new-todo-form__timer"
        type="number"
        min="0"
        max="59"
        placeholder="Sec"
        onChange={onSecChange}
        value={sec}
        required
      />
      <input type="submit" className="hidden" />
    </form>
  )
}

NewTaskForm.defaultProps = {
  onItemAdded: () => {},
}

NewTaskForm.propTypes = {
  onItemAdded: propTypes.func,
}

export default NewTaskForm
