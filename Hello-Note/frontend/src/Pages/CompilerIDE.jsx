import React from 'react'
import Navbar from '../Components/Navbar/Navbar'
import Compiler from '../Components/Compiler/Compiler'
import {useParams} from "react-router-dom";

export default function CompilerIDE() {
  const { id }  =  useParams() 
  console.log(id)
  return (
    <div>
        <Navbar/>
        <Compiler id={id}/>
    </div>
  )
}
