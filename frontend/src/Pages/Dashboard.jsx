import React, { useEffect, useState } from "react";
import Navbar from "../Components/Navbar/Navbar";
import { UserAuth } from '../Contexts/AuthContext';
import DashWrapper from "../Components/DashWrapper/DashWrapper";
import './Dashboard.css';
import { useNavigate, redirect } from "react-router-dom";
import axios from "axios"
import DashboardBar from "../Components/DashboardBar/DashboardBar"

export default function Dashboard(props) {
  const navigate = useNavigate();
  const { user } = UserAuth();
  const [notes, setNotes ] = useState([]);
  const [workspaces, setWorkspaces] = useState([]);
  const [compilers, setCompilers]  = useState([]);
  const [boards, setBoards]= useState([]);


  useEffect(() => {
    if (user == null) {
      window.location.reload()
      navigateLogin()

    }
  })

  const navigateLogin = () => {
    navigate("/login")
  }

  useEffect(()  => {
    axios.get("http://localhost:3001/notes/by-user/"+user.uid)
    .then(res => res)
    .then(result => {
      setNotes(result)
    })
    .catch(err => console.error(err))

    axios.get("http://localhost:3001/codes/by-user/"+user.uid)
    .then(res => res)
    .then(result => {
      setCompilers(result)
    }).catch(err => console.error(err))

    axios.get("http://localhost:3001/board/by-user/"+user.uid)
    .then(res => res)
    .then(result  => {
      setBoards(result)
    }).catch(err => console.error(err))

    axios.get("http://localhost:3001/workspace/by-user/"+user.uid)
    .then(res => res)
    .then(result  => {
      setWorkspaces(result)
    }).catch(err => console.error(err))
}, [user]) 

  return (
    <>
    {user ? ( 
      <div className="dashPageContainer">
        <Navbar />
        <h1 id='welcomeTitle'>Welcome, {user.displayName}</h1>
        <div id='flexRow'>
          
          {notes && boards && workspaces && compilers ? 
          <><DashWrapper notes={notes.data} boards={boards.data} workspaces={workspaces.data} compilers={compilers.data}/>
          <DashboardBar notes={notes.data} boards={boards.data} workspaces={workspaces.data} compilers={compilers.data}/> </>: <></>}
        </div>
      </div>) : (<>
      <redirect to={{pathname: "/login"}} />
    </>)}</>
  );
}