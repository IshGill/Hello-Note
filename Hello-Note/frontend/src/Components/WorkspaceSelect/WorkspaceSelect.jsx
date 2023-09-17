import React, {useState, useEffect} from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { UserAuth } from '../../Contexts/AuthContext'
import axios from "axios"
import {useParams} from 'react-router-dom'



export default function BasicMenu(props) {
  const {id}  = useParams();
  const {user} = UserAuth();
  const [anchorEl, setAnchorEl] = useState()
  const open = Boolean(anchorEl);
  const [workspaces, setWorkspaces] =  useState();

  const addToWorkspace = (workspace) => {
    console.log("asasd")
    switch(props.type){
      case "Compiler":
        axios.patch("http://localhost:3001/workspace/add-compiler", {
          workspace: workspace,
          codes: id
        }).then(res =>  res)
        .then(result => console.log(result))
        .catch(err => console.log(err))
        break;
      default:
        console.log("Error: Mismatched Type")
    }
  }

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = (e) => {
    const { myValue }  = e.currentTarget.dataset
    console.log(myValue, id)
    addToWorkspace(myValue)
    setAnchorEl(null);
  };

  

  useEffect(() => {
    axios.get("http://localhost:3001/workspace/by-user/" + user.uid)
    .then(res => {
      return res
    }).then(result => {
      setWorkspaces(result.data)
    }).catch(err => console.error(err)) 
  }, [user.uid])

  return (
    <div>
      <Button
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        Add To Workspace
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        {workspaces && 
          workspaces.map((e) => {
            return <MenuItem key={e._id} data-my-value={e._id} onClick={handleClose}>{e.title}</MenuItem>
          })
        }
        

        
       
      </Menu>
    </div>
  );
}
