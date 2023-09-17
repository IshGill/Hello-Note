import React, {useEffect, useState} from 'react'
import axios from 'axios'
import { UserAuth } from '../Contexts/AuthContext';


export default function WorkspaceSidebar(props) {

    const documentId = "dasdasd"
    const { user } = UserAuth(); 
    const [workspace, setWorkspace] = useState();
    const [display, setDisplay] = useState();
    const [render, setRender] = useState(1);

const updateWorkspace = () => {    if(!user) return;
    axios.get("http://localhost:3001/workspace/" + documentId)
    .then(res => {
      setWorkspace(res.data[0])
    })
    .catch(err => console.error(err))
  }
  useEffect(() => {
    if(!user) return;
    axios.get("http://localhost:3001/workspace/" + documentId)
    .then(res => setWorkspace(res.data[0]))
    .catch(err => console.error(err))
    
  }, [documentId, user])

  const createNote = async () => {
    await axios.post("http://localhost:3001/notes/create", {
      owner: user.uid,
      workspace: workspace._id,
    })
    .then(res => {
      axios.patch("http://localhost:3001/workspace/add-doc", {
         doc_id: res.data._id, 
        id: workspace._id})
    }).then(res => {
      updateWorkspace()
    })
  }
  const createCompiler = () => {
    axios.post("http://localhost:3001/codes/create", 
    {owner: user.uid,
    workspace: workspace,
  content: "" })
    .then(res => {
      axios.patch("http://localhost:3001/workspace/add-compiler", {
         compiler_id: res.data._id, 
        id: workspace._id})
    }).then(() => {
      console.log("Updating workspace")
      updateWorkspace()

    })
  }
  const createBoard = async () => {
    
    await axios.post("http://localhost:3001/board/create",
    {
      owner: user.uid,
      workspace: workspace._id,
    })
    .then(res => {
      axios.patch("http://localhost:3001/workspace/add-board", {
         board_id: res.data._id, 
        id: workspace._id}) 
    }).then(res => {
      updateWorkspace();
    })
  }

  return (
    <div>WorkspaceSidebar</div>
  )
}
