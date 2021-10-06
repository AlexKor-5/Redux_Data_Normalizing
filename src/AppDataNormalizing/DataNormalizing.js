import React, {useState} from "react"
import {useDispatch, useSelector} from "react-redux"
import {saveToDo, deleteToDo} from "./reducerSlices/mainReducer"
import {v4 as uuidv4} from 'uuid'
import {fetchTodos} from "./reducerSlices/mainReducer"
import blog from "./data-blog"
import {normalize, schema} from 'normalizr'
import * as _ from 'lodash'

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
        if (!Array.isArray(data)) return
        const dataClone = _.cloneDeep(data)

        dataClone.forEach(el => {
            if (!el.hasOwnProperty("comments")) return
            el.comments.forEach(comm => {
                if (!comm.hasOwnProperty("content")) return
                if (newText === undefined || newText === null) return
                comm.content = comm.id === id ? newText : comm.content
            })
        })

        return dataClone
    }

    console.log("rawData = ", blog.posts)
    const newObj = changeTextComment(blog.posts, 210, "added text !!!!")
    console.log("changedData =", newObj)

    const changeTextCommentShort = (data, id, newText) => {
        if (data === null || data === undefined) return
        if (data instanceof Object && Array.isArray(data)) return
        if (newText === undefined || newText === null) return

        const dataClone = _.cloneDeep(data)
        if (!dataClone.hasOwnProperty("comments")) return
        if (dataClone.comments[id] === undefined) return
        dataClone.comments[id].content = newText

        return dataClone
    }

    const norma = _normalized.entities
    console.log("normalized = ", norma)
    const newObjShort = changeTextCommentShort(norma, 210, "added text SHORT!!!!")
    console.log(newObjShort)

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