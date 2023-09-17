import React from 'react'
import { useNavigate } from 'react-router-dom';

export default function TabPanel(props) {
    const {children, value, index, items, type}=props
    const navigate = useNavigate();

    const linkToItem = (id, type) => {
        switch (type){
          case "board":
            navigate("/whiteboard/" + id);
          break;
          case "compiler":
            navigate("/codes/" + id);
          break;
          case "note":
            navigate("/doc/" + id);
          break;
          case "workspace":
            navigate("/workspace/" + id);
          break;
          default:
            console.error("Unknown type: " + type);
            break;
        }
          
      }
    
  return (
    <div id="">{ items && value === index && 
        items.map((i) => {
            return <div id="item" onClick={() => linkToItem(i._id, type)} key={i._id} >{i.title}</div>
        })}
    </div>)
  
}
