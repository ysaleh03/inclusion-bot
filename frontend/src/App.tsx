import { useState } from 'react'
import { getClassifications } from './service/classify'
import './App.css'

import {Flex, Textarea, Button, Box} from '@chakra-ui/react'

type Classification = {message: string, classification: string};

function App() {

  const [text, setText] = useState('');
  const [classifications, setClassifications] = useState<Classification[]>([]);

  return (
    <Flex w="100%" h="100vh" flexDirection="column">
      <Textarea placeholder='Put your text' value={text} onChange={(e)=>{
        setText(e.target.value);
      }}/>
      <Button onClick={()=>{
        getClassifications(text.split('\n')).then((res: any)=>{
          setClassifications(res.data);
        }).catch((err: any)=>{
          console.log(err);
        });
      }}>Submit</Button>
      {classifications.map((classification: Classification)=>{
        return (<Box>
          {classification.message}: {classification.classification}
        </Box>)
      })}
    </Flex>
  )
}

export default App
