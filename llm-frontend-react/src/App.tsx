import { useState } from 'react'
import './App.css'
import Markdown from 'react-markdown'
import ollama from 'ollama'
//import { useEffect } from 'react'

function App() {
  const [input,setInput] = useState<string>("Type prompt")
  const [defVal,setDefVal] = useState<string>("Type prompt")
  const [isDefVal,setIsDefVal] = useState<boolean>(true)
  const [output,setOutput] = useState<string>("")
  const [isLoading,setIsLoading] = useState<boolean>(false)
  const [selectedValue,setSelectedValue] = useState<string>("gemma3")

  const handleSubmit = async () => {
   setIsLoading(true) 
   try {
    const response = await ollama.chat({
      model: `${selectedValue}`,
      messages: [{ role: 'user', content: input }],
    })
    setOutput(response.message.content)
    console.log(isLoading)
   } catch(err) {
      console.log(err)
   } finally {
    setIsLoading(false)
   }
  }

  return (
    <>
      <div className='main'>
        <h1>LLM frontend</h1>
        <div className='llm-selector'>
          <select value={selectedValue} onChange={(e)=>setSelectedValue(e.target.value)}>
            <option value="gemma3">gemma3</option>
            <option value="deepseek-r1:8b">deepseek-r1:8b</option>
          </select>
        </div>
        <div className='llm-output'>
          <Markdown>{isLoading ? "*Processing prompt... please wait...*" : output}</Markdown>
        </div>
        <div className='input-bar-wrapper'>
        <input
            onClick={() => {
              setDefVal(""); 
              if(isDefVal){
                setInput("")
                setIsDefVal(false);
              }
            }}
            onChange={(e)=>setInput(e.target.value)}
            value={isDefVal ? defVal : input} 
          />
          <button onClick={handleSubmit}>Submit</button>
        </div>
      </div>
    </>
  )
}

export default App
