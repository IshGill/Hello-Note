import { useCallback, useEffect, useState } from "react";
import Quill from "quill";
import "quill/dist/quill.snow.css";
import { io } from "socket.io-client";

import axios from "axios";
import "./TextEditor.css";
import { saveAs } from 'file-saver';
import { pdfExporter } from 'quill-to-pdf';
import {BsFilePdf} from "react-icons/bs";
import ComponentBar from "../ComponentBar/ComponentBar";

export default function TextEditor(props) {
  const documentId = props.id;
  const [socket, setSocket] = useState()
  const [quill, setQuill] = useState()

  async function exportToPDF() {
    const delta = quill.getContents(); // gets the Quill delta
    const pdfAsBlob = await pdfExporter.generatePdf(delta); // converts to PDF
    saveAs(pdfAsBlob, document+'.pdf');
  }
  const save  = (text) => { // Save Content
    console.log("Saving contents", quill.getContents())
    axios.patch("http://localhost:3001/notes/save/" + documentId, {
      content: text
    })
    .then(res => res)
    .catch(err => {
      console.log(err)
    })
  }
  useEffect(() => {
    if(socket == null || quill == null) return
    axios.get("http://localhost:3001/notes/" + documentId)
    .then(res => {
      quill.setContents(res.data.content, 'api')})
    console.log("Joining room " + documentId + "...")
    socket.emit("join-room", documentId)
    
  }, [socket, quill, documentId])

  useEffect(() => { // Send changed content 
    if(!quill || !socket) return
    quill.on("text-change", (delta, oldDelta, source) => {
        if(source === 'user'){
          save(quill.getContents())
          socket.emit("send-content", delta)
        }
    })
  })
  useEffect(() => { // Recieve changed content 
    const handler = delta => {
      console.log(delta)
      quill.updateContents(delta)
    }
    if(!quill || !socket) return
    socket.on('recieve-content', handler)
  })

  useEffect(() => { //Initiate sockets
    const s = io("http://localhost:3001")
    setSocket(s)
    return () => {
      s.disconnect()
    }

  }, [])



  const wrapperRef = useCallback(wrapper => {
    if (wrapper == null) return

    wrapper.innerHTML = ""
    const editor = document.createElement("div")
    wrapper.append(editor)
    const q = new Quill(editor, {
      theme: "snow",
      modules: { toolbar: '#toolbar'},
      placeholders: "Loading...."
    })
    axios.get("http://localhost:3001/notes/" + documentId)
    .then(res => {
      q.setText(res.data.content)
    })
    
    setQuill(q)
    
  }, [documentId])
  

  return <>
    <ComponentBar id={props.id} type={"Note"}/>
    <div class='textEditor'>
      <div id="toolbar">
        <select class="ql-size">
          <option value="small"></option>
          <option selected></option>
          <option value="large"></option>
          <option value="huge"></option>
        </select>
        <select class="ql-font">
          <option value="sans-serif">Sans-Serif</option>
          <option value="serif">Serif</option>
          <option value="monospace">Monospace</option>
        </select>
        <button class="ql-list" value="ordered"></button>
        <button class="ql-list" value="bullet"></button>
        <button class="ql-bold"></button>
        <button class="ql-italic"></button>
        <button class="ql-underline"></button>
        <button class="ql-strike"></button>
        <select class="ql-color">

        </select>
        <select class="ql-background">

        </select>

        <button class="ql-script" value="sub"></button>
        <button class="ql-script" value="super"></button>
        <select class="ql-align">
          <option class="ql-align" value=""></option>
          <option class="ql-align" value="center"></option>
          <option class="ql-align" value="right"></option>
          <option class="ql-align" value="justify"></option>
        </select>
        <button class="ql-image"></button>
        <button class="ql-blockquote"></button>
        <button class="ql-code-block"></button>
        <button class="ql-video"></button>
        <button><BsFilePdf  onClick={exportToPDF}/></button>
      </div>
      
      <div className="container" ref={wrapperRef}>

      </div>
    </div>
  </>
}
