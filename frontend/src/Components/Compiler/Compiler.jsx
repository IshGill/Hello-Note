import React, {useState, useEffect} from 'react'
import CodeMirror from "@uiw/react-codemirror";
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { langs } from '@uiw/codemirror-extensions-langs';
import axios from "axios"
import ComponentBar from "../ComponentBar/ComponentBar";
import "./Compiler.css"


const FileSaver = require('file-saver');
const COMPILER = process.env.JUDGE0_URL || 'http://localhost:2358';


const instance = axios.create({
  baseURL : COMPILER
})


export default function Compiler(props) {

  const [name, setName] = useState("")
  const [value, setValue] = useState("");
  const [lang, setLang] = useState("71")
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("")
  const [id] = useState(props.id);
  const [extension, setExtension] = useState()

  const save = () => {
    axios.patch("http://localhost:3001/Codes/save/" + id, {
      content: value,
      input: input,
    })
  }
  
  useEffect(() => {
    if(lang === "71") setExtension(langs.python())
    if(lang === "50") setExtension(langs.c()); 
    if(lang === "11") setExtension(langs.cpp());
    if(lang === "25")  setExtension(langs.java());
    setExtension(langs.python())
  }, [lang])

  const submit = async (e) => {
    e.preventDefault();
    console.log("Running submission")
    save()
    await instance.post("/submissions", {
      language_id: parseInt(lang),
      source_code: value,
      input: input
    }, {
      headers: {
        'content-type': 'application/json',
        'Content-Type': 'application/json',
      }
    })
    .then(res => {
      var interval = setInterval(() => {
        instance.get("/submissions/" + res.data.token).then(
          res => {
            if(res.data.status === undefined) 
            {
              console.log("Error")
              clearInterval(interval);
              return res
            }
            if(res.data.status.discription !== "Accepted"){
              console.log("Clearing")
              clearInterval(interval);
              return res
            }
          }
        ).then(stdout => {
          const output = document.getElementsByClassName("output")
          setOutput(stdout.data)
          console.log(stdout.data)
        }).catch(er => console.log(er))
      }, 2000)
    })
  }

    useEffect( () =>{
     axios.patch("http://localhost:3001/codes/change-lang/"+id, 
      {lang: lang}).then(res => {
        return res
      })
      .then(() => {
        console.log("language changed")
      }).catch((err) => console.log(err))
    }, [lang])

    const exportCode = () => {
      let extension = ""
      switch(lang){
        case "71":
          extension = ".py"
          break
        case "50":
          extension = ".c"
          break;
        case "54":
          extension = ".c"
          break;
        case "62":
          extension = ".java"
          break
        default:
          alert("Please select a Language")
      }

      var blob = new Blob([value], {type: "text/plain;charset=utf-8"});
      FileSaver.saveAs(blob, name+extension)
    }


  useEffect(() => {
    console.log("Getting Code..")
      axios.get("http://localhost:3001/codes/get-code/"+ id).then(res => {
      setValue(res.data.content)
      setInput(res.data.input)
      setLang(res.data.lang)
      setName(res.data.title)
      console.log(res)
    })

  }, [id])

  const handleChange = (e, value) => {
    setLang(e.target.value)
  }

  return (
    <>
    <ComponentBar id={props.id} type={"Compiler"}/>
    <div className='compiler'>
      
      <div className='compilerLeft'>
        {/* <h4>Code</h4> */}
        <CodeMirror
          width="100%"
          height="100%"
          
          value={value}
          extensions={[extension]}
          onChange={(value, viewUpdate) => {
            console.log(value, viewUpdate)
            setValue(value)
          }}
        />
      </div>

      <div id='languageButtons'>
        <button id='inactiveButtons' onClick={submit}>Run</button>
        <button id='inactiveButtons' onClick={save}>Save</button>
        <button id='inactiveButtons' onClick={exportCode}>Export</button>
      <div id='languageSelector'>
          <FormControl sx={{ m: 1, minWidth: 120 }} className="languageSelect">
            <Select
              value={lang}
              onChange={handleChange}
              displayEmpty
              inputProps={{ 'aria-label': 'Without label' }}
            >
              <MenuItem value="">
              </MenuItem>
              <MenuItem value={"71"}>Python (3.8.1)</MenuItem>
              <MenuItem value={"50"}>CC (GCC 9.2.0)</MenuItem>
              <MenuItem value={"54"}>C++ (GCC 9.2.0)</MenuItem>
              <MenuItem value={"62"}>Java (JDK 13.0.1)</MenuItem>
            </Select>
            
          </FormControl>
        </div>
      </div>

      
      <div className='output'>
        {output && <>
        <p>
          stdout: {output.stdout} <br/>
          time: {output.time} <br/>
          Memory: {output.memory}<br/>
          stderr: {output.stderr}
        </p>
        </>}
      </div>
      {/* <div className='compilerRight'> */}
        {/* <h4>Input</h4> */}
        {/* <CodeMirror
        width="100%"
        height="20vmax"
        value={input}
        onChange={((value, viewUpdate) => {
          setInput(value)
        })}/> */}
      {/* </div> */}
      

      
        
    </div>
    </>
  );
}
