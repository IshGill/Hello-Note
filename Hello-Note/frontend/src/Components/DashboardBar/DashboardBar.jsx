import React, {useState} from 'react'
import {Tabs, Tab} from '@material-ui/core/'
import TabPanel from './TabPanel'
import "./DashboardBar.css"

export default function DashboardBar(props) {
    const [value, setValue] = useState(0)
    const handleChange = (e, value) => {
        setValue(value)
        console.log(value)
    }
    console.log(props.workspaces)
  return (
    
    <div id="item-container">
      <div id="tab-header">
        <Tabs  
          
          value={value} onChange={handleChange}
          sx={{indicatorColor: "#6c8ceb"}} 
          indicatorColor="primary">
                <Tab label="Compilers"/>
                <Tab label="Notes"/>
                <Tab label="Boards"/>
                <Tab label="Workspaces"/>
        </Tabs>
      </div>

        {
        props.compilers != undefined && props.notes != undefined && props.boards != undefined && props.workspaces != undefined && 
        <>
          <TabPanel value={value} index={0}  items={props.compilers} type="compiler"/> 
          <TabPanel value={value} index={1}  items={props.notes} type="note"/>
          <TabPanel value={value} index={2}  items={props.boards} type="board"/>
          <TabPanel value={value} index={3}  items={props.workspaces} type="workspace"/>
        </>
        }

    </div>
  )
}

