import React, {useState} from "react"
import {useDispatch, useSelector} from "react-redux"
import {saveToDo, deleteToDo} from "./reducerSlices/mainReducer"
import {v4 as uuidv4} from 'uuid'
import {fetchTodos} from "./reducerSlices/mainReducer"

export const DataNormalizing = () => {
    const dispatch = useDispatch()
    const todos = useSelector(state => Object.values(state.data.todos))
    const [counter, setCounter] = useState(0)

    console.log(todos)

    const addNewToDo = () => {
        dispatch(saveToDo({
            id: uuidv4(),
            title: `New to do text ...${counter}`
        }))
        setCounter(prev => prev + 1)
    }

    return (
        <>
            <p>Lorem ipsum dolor sit amet.</p>
            <button onClick={addNewToDo}>Add to State</button>
            <button onClick={() => dispatch(fetchTodos())}>FetchToDos</button>

            <div>
                {todos.map(item => {
                    return (
                        <div key={uuidv4()} style={{
                            margin: "10px",
                            padding: "10px",
                            border: "2px solid blue",
                            display: "flex",
                            justifyContent: "space-between"
                        }}>{item.title}
                            <button onClick={() => dispatch(deleteToDo(item.id))}>Cross</button>
                        </div>
                    )
                })}
            </div>
        </>
    )
}