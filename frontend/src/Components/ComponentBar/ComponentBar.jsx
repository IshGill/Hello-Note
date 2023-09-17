import React, {useEffect, useState} from 'react'
import "./ComponentBar.css"
import axios from 'axios'
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import IosShareIcon from '@mui/icons-material/IosShare';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import LaunchIcon from '@mui/icons-material/Launch';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import WorkspaceSelect from "../WorkspaceSelect/WorkspaceSelect"
import {useNavigate} from "react-router-dom"


export default function ComponentBar(props) { 
    const navigate = useNavigate()
    const [component, setComponent] = useState()
    const [anchorEl, setAnchorEl] = useState(null)
    const [input, setInput] = useState("")
    const open = Boolean(anchorEl)

    const  handleSubmit = () =>{
        changeName()
    }

    const handleClick = (e) => {
        setAnchorEl(e.currentTarget)
    }

    const handleClose = (e, value) => {
        setAnchorEl(null)
        console.log(input)
    }

    const handleInput = (e, value) => {
        setInput(value)
        
    }

    const chnageName = () => {
        switch(props.type){
            default:
                console.log("Default")
                break;
            case "Note":
                console.log("Note")
                axios.patch("http://localhost:3001/notes/change-name/" + props.id, {title: input})
                .then(res => {console.log(res) }).catch(err => {console.log(err)});
                break;
            case "Board":
                console.log("Board")
                axios.patch("http://localhost:3001/board/change-name/" + props.id,{title: input})
                .then(res => {console.log(res) }).catch(err => {console.log(err)});
                break;
            
            case "Compiler":
                axios.patch("http://localhost:3001/codes/change-name/" + props.id,{title: input})
                .then(res => {console.log(res)}).catch(err => {console.log(err)});
                break;
        }

    }

    const deleteComponent = () => {
        switch(props.type){
            default:
                console.log("Default")
                break;
            case "Note":
                console.log("Note")
                axios.get("http://localhost:3001/notes/delete-note/" + props.id)
                .then(res => {navigate("/")})
                break;
            case "Board":
                console.log("Board")
                axios.get("http://localhost:3001/board/delete-board/" + props.id)
                .then(res => {navigate("/")})
                break;
            
            case "Compiler":
                axios.get("http://localhost:3001/codes/delete-code/" + props.id)
                .then(res => {navigate("/") } )
                break;
        }

    }

    useEffect(() => {


        switch(props.type){
            default:
                console.log("Default")
                break;
            case "Note":
                console.log("Note")
                axios.get("http://localhost:3001/notes/" + props.id)
                .then(res => {
                    setComponent(res.data)}).catch(err => console.log(err))
                break;
            case "Board":
                console.log("Board")
                axios.get("http://localhost:3001/board/" + props.id)
                .then(res => {
            
                    setComponent(res.data)}).catch(err => console.log(err))
                break;
            
            case "Compiler":
                axios.get("http://localhost:3001/codes/get-code/" + props.id)
                .then(res => {
                    setComponent(res.data)
                    console.log(res.data)
                }).catch(err => console.log(err))
                break;
        }
    }, [props.id, props.type])



    const changeName = (e, value) => {
        console.log(e.target)
    }


  return (
    <div className="bar">
        { component ? (
        <div id="items-container">
            <div id='name-container'>
                <span id='componentBarSpan'>{component.title}</span>
                <IconButton aria-label="delete" onClick={changeName}>
                    <EditIcon aria-label="edit" 
                        fontSize='small' sx={{ color: '#6c8ceb'}}
                         aria-controls={open ? 'basic-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                        onClick={handleClick} />
                </IconButton>
            </div>

            <div id="button-container">
                { component.workspace ? (
                <>
                <IconButton aria-label="share-button">
                    <LaunchIcon/>
                </IconButton >
                </>) : 
                (<>
                
                </>)}
                

                <IconButton aria-label="delete" onClick={deleteComponent}>
                    <DeleteIcon fontSize='small' sx={{ color: '#e04d34'}}/>
                </IconButton  >
            </div>
            <Menu
                    id="basic-menu"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    MenuListProps={{
                    'aria-labelledby': 'basic-button',
                    }}
                >
                <MenuItem><form onSubmit={handleSubmit}>
                        <label>New name: </label>
                            <input type="text" onChange={handleInput}/>
                            <Button varaint="contained" onClose={handleClose}>Submit</Button>
                        </form>
                        
                </MenuItem>
            </Menu>
        </div>):(<></>)}
    </div>
  )
}
