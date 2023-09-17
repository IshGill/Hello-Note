import React from 'react'
import Navbar from "../Components/Navbar/Navbar"
import {useParams} from "react-router-dom";
import TextEditor from '../Components/Quill/TextEditor'

export function Document() {

  const {id} =   useParams()
  return (
    <div>
        <Navbar/>
        <TextEditor id={id}/>
    </div>
  )
}
