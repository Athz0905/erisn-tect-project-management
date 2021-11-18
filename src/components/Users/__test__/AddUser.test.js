import React from 'react'
import ReactDom from "react-dom"
import AddUser from '../AddUser'

it("renders without crashing", ()=> {
     const div = document.createElement("div")
     ReactDom.render(<AddUser></AddUser>, div)
})