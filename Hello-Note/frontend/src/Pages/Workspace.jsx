import React, {useEffect, useState} from 'react'
import Navbar from "../Components/Navbar/Navbar"
import Compiler from "../Components/Compiler/Compiler"
import TextEditor from '../Components/Quill/TextEditor'
import Draw from '../Components/Draw/Draw'
import './Workspace.css'
import axios from "axios"
import { UserAuth } from '../Contexts/AuthContext';
import { useParams } from "react-router-dom";


export default function Workspace() {

  const  {id: documentId} = useParams()
  const { user } = UserAuth();
  const [workspace, setWorkspace] = useState();
  const [display, setDisplay] = useState();
  const [render, setRender] = useState(1);
 

  const updateWorkspace = () => {
    if(!user) return;
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
    workspace: workspace._id,
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
    <>
    <Navbar/>
    { workspace ? (
      <div className="workspace">
      <div className="main">
      {!display ? <> Nothing to be Displayed</> : 
      <>
      {display.type === "Doc" ? <><TextEditor id={display.id } workspace={documentId}/></> : <>{display.type === "Compiler" ? <><Compiler id={display.id} workspace={documentId}/></> : <><Draw id={display.id} workspace={documentId}/></>}</>}
      </>}

      </div>
      <div className="sidebar">
        <h4 className='workspaceTitle'>{workspace.title}</h4>
        
        <h4 className='sidebarTitles'>Compilers</h4>
        <div id='compilers'>
          {
            workspace.codes.map(function(i){
              return <p key={i} className={display && display.id === i ? 'activeSidebarLink' : 'sidebarLink'} onClick={() => {
                setDisplay(null)
                setTimeout(() => setDisplay({
                  id: i,
                  type: "Compiler",
                }), 500)
              }}>{i}</p>}) 
          }
        </div>
        <h4  className='sidebarTitles'>Editors</h4>
        <div id='editors'>
          {
            workspace.documents.map(function(i){
              return <p key={i} className={display && display.id === i ? 'activeSidebarLink' : 'sidebarLink'} onClick={() => {
                setDisplay(null)
                setTimeout(() => setDisplay({
                  id: i,
                  type: "Doc",
                }), 1)
              }}>{i}</p>}) 
          }
        </div>
        <h4  className='sidebarTitles'>Whiteboards</h4>
        <div id='board'>
          {
            workspace.whiteboards.map(function(i){
              return <p key={i} className={display && display.id === i ? 'activeSidebarLink' : 'sidebarLink'} onClick={() => {
                setDisplay(null)
                setTimeout(() => setDisplay({
                  id: i,
                  type: "Board",
                }), 1)
                }}>{i}</p>}) 
          }
        </div>
        <div id='buttons'>
          <button onClick={() => createCompiler()}>Create Compiler</button>
          <button onClick={() => createNote()}>Create Note</button>
          <button onClick={() => createBoard()}>Create Board</button>
        </div>


      </div>

    </div>

    ) : (<>
    Loading....
    </>)
    }
    </>
  )
}
