import React, { useState, useEffect } from 'react'
import propTypes from 'prop-types'

import './Task.scss'

const Task = ({ onDeleted, onToggleCompleted, itemProps, onEditItem, onEdit }) => {
  const { completed, label, date, time, id, editing } = itemProps

  const labelChange = React.useRef(null)

  useEffect(() => {
    labelChange.current.focus()
  }, [editing])

  const makeTime = (time) => {
    let min = Math.floor(time / 60)
    let sec = time % 60
    return {
      min,
      sec,
    }
  }

  let min = makeTime(time).min
  let sec = makeTime(time).sec

  const [timeLeft, setTimeLeft] = useState({ s: sec, m: min })
  const [interv, setInterv] = useState()
  const [newLabel, setNewLabel] = useState(label)

  let updateS = timeLeft.s
  let updateM = timeLeft.m

  const StartTimer = () => {
    const int = setInterval(() => {
      run()
      if (updateS == 0 && updateM == 0) {
        clearInterval(int)
      }
    }, 1000)

    setInterv(int)
  }

  const run = () => {
    if (updateS === 0 && updateM !== 0) {
      updateM--
      updateS = 60
    }
    updateS--
    return setTimeLeft({
      s: updateS,
      m: updateM,
    })
  }

  const StopTimer = () => {
    clearInterval(interv)
  }

  let classNames = ' '
  if (completed) {
    classNames += 'completed'
  }
  if (editing) {
    classNames += 'editing'
  }

  const onSubmit = (e) => {
    e.preventDefault()
    onEditItem(id, newLabel)
  }

  const onLabelChange = (e) => {
    setNewLabel(e.target.value)
  }

  return (
    <li className={classNames}>
      <div className="view">
        <input className="toggle" type="checkbox" onClick={onToggleCompleted} id={id} />
        <label htmlFor={id}>
          <span className="title">{label}</span>
          <span className="description">
            <button className="icon icon-play" onClick={StartTimer}></button>
            <button className="icon icon-pause" onClick={StopTimer}></button>
            {`${timeLeft.m}:${timeLeft.s}`}
          </span>
          <span className="description">{date}</span>
        </label>
        <button className="icon icon-edit" onClick={onEdit} />
        <button className="icon icon-destroy" onClick={onDeleted} />
      </div>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          className="edit"
          value={newLabel}
          onChange={onLabelChange}
          autoFocus
          // ref={labelChange}
        />
      </form>
    </li>
  )
}

Task.defaultProps = {
  onDeleted: () => {},
  onToggleCompleted: () => {},
  label: '',
  completed: false,
  date: '',
}

Task.propTypes = {
  onDeleted: propTypes.func,
  onToggleCompleted: propTypes.func,
  label: propTypes.string,
  completed: propTypes.bool,
  date: propTypes.string,
}

export default Task
