import React, {useState} from "react"
import {useDispatch, useSelector} from "react-redux"
import {saveToDo, deleteToDo} from "./reducerSlices/mainReducer"
import {v4 as uuidv4} from 'uuid'
import {fetchTodos} from "./reducerSlices/mainReducer"
import blog from "./data-blog"
import {normalize, schema} from 'normalizr'

export const DataNormalizing = () => {
    const dispatch = useDispatch()
    const todos = useSelector(state => Object.values(state.data.todos))
    const [counter, setCounter] = useState(0)
    const addNewToDo = () => {
        dispatch(saveToDo({
            id: uuidv4(),
            title: `New to do text ...${counter}`
        }))
        setCounter(prev => prev + 1)
    }

    const _authorPost = new schema.Entity('authorPosts')
    const _commenter = new schema.Entity('commenters')

    const _comment = new schema.Entity('comments', {
        commenter: _commenter
    })

    const _post = new schema.Entity('posts', {
        author: _authorPost,
        comments: [_comment]
    })

    const _normalized = normalize(blog.posts, [_post])
    console.log("result = ", _normalized)
    console.clear()

    const changeTextComment = (data, id, newText) => {
        if (data === null || data === undefined) return
        const dataClone = Object.assign([], data)
        dataClone.forEach(el => {
            el.comments.forEach(comm => {
                comm.content = comm.id === id ? newText : null
            })
        })
        return dataClone
    }

    console.log("rawData = ", blog.posts)
    const newObj = changeTextComment(blog.posts, 210, "My new text added!")
    console.log("changedData =", newObj)

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