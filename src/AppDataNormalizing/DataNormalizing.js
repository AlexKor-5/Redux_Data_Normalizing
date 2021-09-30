import React, {useState} from "react"
import {useDispatch, useSelector} from "react-redux"
import {saveToDo, deleteToDo} from "./reducerSlices/mainReducer"
import {v4 as uuidv4} from 'uuid'
import {fetchTodos} from "./reducerSlices/mainReducer"
import my_todos from "./data-todos"
import {denormalize, normalize, schema} from 'normalizr'
import post from "./data-post"
import blog from "./data-blog"

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
    // const todosSchema = new schema.Entity('todos')
    // // console.log(todosSchema)
    // const normalizedData = normalize(my_todos, todosSchema)
    const user = new schema.Entity('users');

    const comment = new schema.Entity('comments', {
        commenter: user
    });

    const article = new schema.Entity('articles', {
        author: user,
        comments: [comment]
    });

    const normalizedData = normalize(post, article);

///////////////////////////
    const user2 = new schema.Entity('users');

    const comment2 = new schema.Entity('comments', {
        commenter2: user2
    });

    const article2 = new schema.Entity('articles', {
        author: user2,
        comments: [comment2]
    });

    const normalizedData2 = normalize(post, article2);

    console.log(post)
    console.log(normalizedData)
    console.log(normalizedData2)
////////////////////////

    const todo = new schema.Entity('todos');

    const normalized = normalize(my_todos.todos, [todo]);


    console.log(my_todos)
    console.log(normalized)
    console.clear()
///////////////////////
    console.log("initial value = ", blog)

    blog.posts.forEach((item, i) => {
        console.log("Blog Text = ", item.text)
        console.log("Blog Author = ", item.author.name, item.author.surname)
        console.log("*******Comments*******")
        blog.posts[i].comments.forEach((elem, y) => {
            console.log("*** Comment text = ", elem.content)
            console.log("*** Comment author = ", elem.commenter.name, elem.commenter.surname)
        })
        console.log("//****Comments****//")
        console.log("---------------------------------------------------------------")
    })

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
    // console.log(_normalized.entities.posts)

    _normalized.result.forEach((item) => {
        let post = _normalized.entities.posts[item]
        console.log("Blog Text = ", post.text)
    })
    console.clear()
///////////////////////////////
    const outData = [{id: '123', name: 'Jim'}, {id: '456', name: 'Jane'}]
    console.log(outData)

    const outUser = new schema.Entity('users')
    const normalizedOutData = normalize(outData, [outUser])
    console.log(normalizedOutData)

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