import React from 'react'
import propTypes from 'prop-types'

import { TaskFilter } from '../TaskFilter'
import './Footer.scss'

const Footer = ({ completedCount, onClearAllCompleted, onFilterItems, filter }) => {
  return (
    <footer className="footer">
      <span className="todo-count">{completedCount} items left</span>
      <TaskFilter onFilterItems={onFilterItems} filter={filter} />
      <button className="clear-completed" onClick={onClearAllCompleted}>
        Clear completed
      </button>
    </footer>
  )
}

Footer.defaultProps = {
  onClearAllCompleted: () => {},
  completedCount: 0,
}

Footer.propTypes = {
  onClearAllCompleted: propTypes.func,
  completedCount: propTypes.number,
}

export default Footer
