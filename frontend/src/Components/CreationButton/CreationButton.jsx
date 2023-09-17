import React, {useState} from 'react'
import './CreationButton.css'
import { UserAuth } from '../../Contexts/AuthContext';
import axios from "axios";
import {useNavigate} from "react-router-dom"


const CreationButton = (props) => {
  const navigate = useNavigate();
  const { user}  = UserAuth()


  const create =  () => {

    switch(props.type){
      
      case 'WORKSPACE':
        console.log("Creating workspace...")
        axios.post("http://localhost:3001/workspace/create", {
          owner: user.uid
        })
        .then(res => {
          const id = res.data._id
          navigate('/workspace/'+id)
        })
        break;
      case 'WHITEBOARD':
        console.log('Creating whiteboard...')
        axios.post("http://localhost:3001/board/create", {
          owner: user.uid
        })
        .then(res => {
          const id = res.data._id
          navigate('/whiteboard/'+id)
        })
      
        break;
      case 'DOC':
        console.log('Creating text files...');        
          axios.post("http://localhost:3001/notes/create", {owner: user.uid})
          .then(res => {
            const id = res.data._id
            console.log(res.data)
            navigate('/doc/'+id )
          })
          .catch(err => console.error(err))

        break;
      case 'CODE':
          console.log('Creating new code files...')
          axios.post("http://localhost:3001/codes/create", {owner: user.uid})
          .then(res => {
            const id = res.data._id
            console.log(res.data)
            navigate('/codes/'+id)
          })
          
          
        break;
      default:
        

    }
  }
  return (
    <div className='creationButton' onClick={create}>
        {props.img}
        <p className='creationText'>{props.text}</p>
    </div>
  )
}

export default CreationButton