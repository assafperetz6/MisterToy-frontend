import { useState } from "react"
import { CHANGE_BY } from "../store/reducers/user.reducer.js"
import { useDispatch, useSelector } from "react-redux"

import logo from '../assets/react.svg'

export function HomePage() {
    const dispatch = useDispatch()

    return (
        <section>
            <h1>Hello! mister toys</h1>
            <img src={logo} />
        </section >
    )
}