import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import data from "../data";

export const fetchTodos = createAsyncThunk(
    'todos/fetchTodos',
    async () => {
        const response = await fetch('https://jsonplaceholder.typicode.com/todos')
        return response.json()
    }
)

// export const fetchAnything = createAsyncThunk(
//     'todos/fetchAnything',
//     async () => {
//         const response = await fetch('https://jsonplaceholder.typicode.com/todos')
//         return response.json()
//     }
// )

const mainReducer = createSlice({
    name: 'todo',
    initialState: data,
    reducers: {
        saveToDo(state, action) {
            const plyId = action.payload.id
            state.todos[plyId] = action.payload
            state.ids.push(plyId.toString())
        },
        deleteToDo(state, action) {
            state.ids = state.ids.filter(item => item !== action.payload.toString())
            delete state.todos[action.payload]
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchTodos.fulfilled, (state, action) => {
            const transformed = action.payload.reduce((accum, current) => {
                accum[current.id] = current
                return accum
            }, {})
            state.fetchedToDos.todos = transformed
            state.fetchedToDos.fetchedIds = Object.keys(transformed)
        })
        builder.addCase(fetchTodos.rejected, (state, action) => {
            state.fetchedToDos.todos = {}
        })
    }
})
export const {saveToDo, deleteToDo} = mainReducer.actions
export default mainReducer.reducer