import {createSlice} from "@reduxjs/toolkit";
import data from "../data";

const mainReducer = createSlice({
    name: 'todo',
    initialState: data,
    reducers: {
        saveToDo(state, action) {
            return {
                ...state,
                todos: {
                    ...state.todos,
                    [action.payload.id]: action.payload
                }
            }
        }
    }
})
export const {saveToDo} = mainReducer.actions
export default mainReducer.reducer