import React from "react"
import {useDispatch, useSelector} from "react-redux"
import {saveToDo} from "./reducerSlices/mainReducer"
import {v4 as uuidv4} from 'uuid'

export const DataNormalizing = () => {
    const dispatch = useDispatch()
    const todos = useSelector(state => Object.values(state.data.todos))
    console.log(todos)
    return (
        <>
            <p>Lorem ipsum dolor sit amet.</p>
            <button onClick={() => dispatch(saveToDo({
                id: uuidv4(),
                title: "New to do text ..."
            }))}>Add to State
            </button>

            <div>
                {todos.map(item => {
                    return <div key={uuidv4()} style={{
                        margin: "10px",
                        padding: "10px",
                        border: "2px solid blue"
                    }}>{item.title}</div>
                })}
            </div>
        </>
    )
}