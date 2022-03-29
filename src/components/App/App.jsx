import React, { useState } from 'react'
import './App.scss'
import { formatDistanceToNow } from 'date-fns'

import { NewTaskForm } from '../NewTaskForm'
import { TaskList } from '../TaskList'
import { Footer } from '../Footer'

let maxId = 100

const App = () => {
  const [state, setState] = useState({
    todoData: [],
    filter: 'all',
  })

  const createTodoItem = (label, min, sec) => {
    const date = formatDistanceToNow(new Date(), { addSuffix: true, includeSeconds: true })
    return {
      label: label,
      completed: false,
      id: maxId++,
      date: date,
      time: Number(min) * 60 + Number(sec),
      editing: false,
    }
  }

  const deleteItem = (id) => {
    const idx = state.todoData.findIndex((el) => el.id === id)
    const arrBefore = state.todoData.slice(0, idx)
    const arrAfter = state.todoData.slice(idx + 1)
    const newArr = [...arrBefore, ...arrAfter]
    setState((state) => {
      return {
        ...state,
        todoData: newArr,
      }
    })
  }

  const addItem = (text, min, sec) => {
    const newItem = createTodoItem(text, min, sec)
    const newArr = [...state.todoData, newItem]
    setState((state) => ({
      ...state,
      todoData: newArr,
    }))
  }

  const onToggleCompleted = (id) => {
    const idx = state.todoData.findIndex((el) => el.id === id)
    const oldItem = state.todoData[idx]
    const newItem = { ...oldItem, completed: !oldItem.completed }
    const newArr = [...state.todoData.slice(0, idx), newItem, ...state.todoData.slice(idx + 1)]
    setState((state) => {
      return {
        ...state,
        todoData: newArr,
      }
    })
  }

  const clearAllCompleted = () => {
    const newArr = state.todoData.filter((el) => !el.completed)
    setState((state) => ({
      ...state,
      todoData: newArr,
    }))
  }

  const onFilterItems = (filter) => {
    setState((state) => ({
      ...state,
      filter,
    }))
  }

  function filterItems(todoData, filter) {
    if (filter === 'all') {
      return todoData
    } else if (filter === 'active') {
      return todoData.filter((el) => !el.completed)
    } else if (filter === 'completed') {
      return todoData.filter((el) => el.completed)
    }
  }

  const onEditItem = (id, value) => {
    const newArr = todoData.map((item) => {
      if (item.id === id) {
        return {
          ...item,
          label: value,
          editing: false,
        }
      }
      return item
    })
    setState((state) => ({
      ...state,
      todoData: newArr,
    }))
  }

  const onEdit = (id) => {
    const newArr = todoData.map((item) => {
      if (item.id === id) {
        return {
          ...item,
          editing: !item.editing,
        }
      }
      return item
    })
    setState((state) => ({
      ...state,
      todoData: newArr,
    }))
  }

  const { todoData, filter } = state
  const completedCount = todoData.filter((el) => !el.completed).length
  const visibleItems = filterItems(todoData, filter)

  return (
    <section className="todoapp">
      <header className="header">
        <h1>todos</h1>
        <NewTaskForm onItemAdded={addItem} />
      </header>
      <section className="main">
        <TaskList
          onDeleted={deleteItem}
          onToggleCompleted={onToggleCompleted}
          onEditItem={onEditItem}
          onEdit={onEdit}
          todos={visibleItems}
        />
        <Footer
          completedCount={completedCount}
          onClearAllCompleted={clearAllCompleted}
          onFilterItems={onFilterItems}
          filter={filter}
        />
      </section>
    </section>
  )
}

export default App
