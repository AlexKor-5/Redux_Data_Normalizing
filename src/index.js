import React from "react"
import ReactDOM from "react-dom"
// import "./index.css"
import {DataNormalizing} from "./AppDataNormalizing/DataNormalizing"
import {Provider} from "react-redux"
import store from "./AppDataNormalizing/store"

const destination = document.querySelector("#container")

ReactDOM.render(
    <>
        <Provider store={store}>
            <DataNormalizing/>
        </Provider>
    </>,
    destination
);