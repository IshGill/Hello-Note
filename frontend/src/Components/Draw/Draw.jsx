import React,  { useEffect, useState, useRef, Suspense } from "react";
import { Excalidraw } from "@excalidraw/excalidraw";
import "./styles.scss";
import ComponentBar from "../ComponentBar/ComponentBar";
import axios from "axios";const InitialData = React.lazy(() => import ( "./initialData"));




export const Draw = (props) =>{

  const excalidrawRef = useRef();

  const updateScene = (sceneData) => {
    excalidrawRef.current.updateScene(sceneData);
  }
  
  const save = (elements, state) => {    console.log("Saving")
    axios.patch("http://localhost:3001/board/save/" + props.id, {
      elements: excalidrawRef.current.getSceneElements(),
      state: excalidrawRef.current.getAppState()
    }).then(res => {
      console.log(res);
    }).catch(err => console.log(err));
  }


  useEffect(() => {
    console.log("Initialising Data")

    axios.get("http://localhost:3001/board/" + props.id)
    .then(res => {
      console.log({
        elements: res.data.elements,
        state: res.data.state}
      )
      updateScene({
        elements: res.data.elements,
        state: res.data.state
      })
    })

  }, [])



  return (
    <>
    <ComponentBar id={props.id} type={"Board"}/>
    <div id="allDrawComps">
    {
     <>
    <div className="App">
      <Suspense fallback={<div>Loading...</div>}>
      <div className="excalidraw-wrapper">
        <Excalidraw
          ref={excalidrawRef}
          initialData={InitialData}
          onChange={(elements, state) =>{
            save(elements, state)}
          }
        /> 
      </div>
      </Suspense>
    </div>
    </>
}
</div>
</>
  );
}
export default Draw;