import React from 'react'
import propTypes from 'prop-types'

import { Task } from '../Task'
import './TaskList.scss'

const TaskList = ({ todos, onDeleted, onToggleCompleted, onEditItem, onEdit }) => {
  const elements = todos.map((item) => {
    const { id } = item

    return (
      <Task
        key={id}
        itemProps={item}
        onDeleted={() => onDeleted(id)}
        onToggleCompleted={() => onToggleCompleted(id)}
        onEdit={() => onEdit(id)}
        onEditItem={onEditItem}
      />
    )
  })

  return <ul className="todo-list">{elements}</ul>
}

TaskList.defaultProps = {
  onDeleted: () => {},
  onEdit: () => {},
  onToggleCompleted: () => {},
  todos: [],
}

TaskList.propTypes = {
  onDeleted: propTypes.func,
  onToggleCompleted: propTypes.func,
  todos: propTypes.arrayOf(propTypes.object).isRequired,
}

export default TaskList
