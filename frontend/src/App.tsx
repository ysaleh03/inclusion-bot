import { useState } from 'react'
import { AxiosError } from 'axios';

import { ClassificationResult, ClassificationResultType, getClassifications } from './service/classify'
import './App.css'

import {Flex, Textarea, Button, Box} from '@chakra-ui/react'

export type Classification = {input: string, isHateful: string, confidence: number};

function App() {

  const [text, setText] = useState('');
  const [classifications, setClassifications] = useState<Classification[]>([]);

  return (
    <Flex w="100%" h="100vh" flexDirection="column">
      <Textarea placeholder='Put your text' value={text} onChange={(e)=>{
        setText(e.target.value);
      }}/>
      <Button onClick={()=>{
        getClassifications(text.split(/[.\n]/)).then((res: ClassificationResult)=>{
          if (res.type === ClassificationResultType.Success) {
            const data = res.data as Classification[];
            setClassifications(data);
          } else if (res.type === ClassificationResultType.Error) {
            const data = res.data as AxiosError;
            console.log(data);
          }
        }).catch((err)=>{
          console.log(err);
        });
      }}>Submit</Button>
      {classifications.map((classification: Classification, index)=>{
        return (<Box key={index}>
          {classification.input}: {classification.isHateful? 'Hateful': 'Not hateful'} {classification.confidence}
        </Box>)
      })}
    </Flex>
  )
}

export default App
