import {configureStore} from "@reduxjs/toolkit"
import mainReducer from "./reducerSlices/mainReducer"

const store = configureStore({
    reducer: {
        data: mainReducer
    }
})
export default store