import React, { useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import './DashWrapper.css'
import CreationButton from '../CreationButton/CreationButton'
import {FaChalkboard} from 'react-icons/fa';
import {AiOutlineGroup, AiOutlineFileText, AiOutlineCode} from 'react-icons/ai';
import { useState } from 'react';


 const DashWrapper = (props) => {
  const navigate = useNavigate();
  var notes = props.notes;
  var compilers = props.compilers;
  var workspaces = props.workspaces;
  var boards = props.boards;
  const [allItems, setAllItems] = useState([])

  function OpenItem(type, id){
    switch(type){
      case "whiteboard":
        navigate("/whiteboard/" + id)
        break;
      case "workspace":
        navigate("/workspace/" + id)
        break;
      case "code":
        navigate("/codes/" + id)
        break;
      case "note":
        navigate("/doc/" + id)
        break;
    }

  }

  function getRecentlyAccessed(){
    if(notes != undefined && compilers != undefined && workspaces != undefined && boards != undefined ){
      var items = (notes.concat(compilers).concat(workspaces).concat(boards));
      items.sort(function(a, b){
        return b.lastModified.localeCompare(a.lastModified);
      })
      items = items.slice(0,3)
    }
    setAllItems(items);
  }

  useEffect(() => {
    getRecentlyAccessed()
  }, [notes, compilers, workspaces, boards])

  return (
    <div  id='dashWrapperBg'>
        <div id='creationWrapper'>
          <CreationButton  text='Create Workspace' img={<AiOutlineGroup className='creationButtonIcon'/>} type="WORKSPACE"/>
          <CreationButton  text='Open Whiteboard' img={<FaChalkboard className='creationButtonIcon'/>} type="WHITEBOARD"/>
          <CreationButton  text='Open Text Editor' img={<AiOutlineFileText className='creationButtonIcon'/>} type="DOC"/>
          <CreationButton  text='Open Code Compiler' img={<AiOutlineCode className='creationButtonIcon'/>} type="CODE"/>
        </div>
        <span id='dashWrapperBreak'></span>
        <div id='dashTitles'>
          <div id='dashTitleLeft'>
            <h2 className='dashTitleAccessed'>Recently Accessed</h2>
          </div>
        </div>
        {
        allItems != undefined &&
          allItems.map(function(i){
            return <div key={i._id} onClick={() => OpenItem(i.type, i._id)} className='greyBar'><p>{i.title}</p></div>
          })

        }
    </div>
  )
}
export default DashWrapper