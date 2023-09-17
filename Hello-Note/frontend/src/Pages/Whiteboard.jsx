import React from 'react'
import Draw from "../Components/Draw/Draw"
import Navbar from "../Components/Navbar/Navbar"
import {useParams} from "react-router-dom";

export default function Whiteboard() {
  const {id}  =   useParams()
  return (
    <div>
        <Navbar/>
        <Draw id={id}/>
    </div>
  )
}
