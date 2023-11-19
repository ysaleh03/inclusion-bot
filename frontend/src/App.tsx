import { useState } from 'react'
import { AxiosError } from 'axios';

import { ClassificationResult, ClassificationResultType, getClassifications } from './service/classify'
import './App.css'

import {
  Flex, Textarea, Button, TableContainer,
  Table, Th, Thead, Tr, Tbody, Td, Progress
} from '@chakra-ui/react'

export type Classification = { input: string, isHateful: string, confidence: number };

function App() {

  const [text, setText] = useState('');
  const [classifications, setClassifications] = useState<Classification[]>([]);

  return (
    <div style={{width:"100%", minHeight:"100vh"}} >
      <Flex  flexDirection="column">
      <Textarea h="50vh" placeholder='Put your text' value={text} onChange={(e) => {
        setText(e.target.value);
      }} />
      <Button onClick={() => {
        const textArray = text.split(/[.\n]/).filter((t) => t.length > 0);
        console.log(textArray);
        getClassifications(textArray).then((res: ClassificationResult) => {
          if (res.type === ClassificationResultType.Success) {
            const data = res.data as Classification[];
            setClassifications(data);
          } else if (res.type === ClassificationResultType.Error) {
            const data = res.data as AxiosError;
            console.log(data);
          }
        }).catch((err) => {
          console.log(err);
        });
      }}>Submit</Button>

      <TableContainer overflow="auto">
        <Table variant='simple'>
          <Thead>
            <Tr bg="teal.200">
              <Th>Text</Th>
              <Th>Status</Th>
              <Th>Confidence</Th>
            </Tr>
          </Thead>
          <Tbody>
            {classifications.map((classification: Classification, index) => {
              return (<Tr key={index}>
                <Td>{classification.input}</Td>
                <Td>{classification.isHateful? "Hateful": "Good"}</Td>
                <Td><Progress value={classification.confidence * 100} /></Td>
              </Tr>);
            })}

          </Tbody>
        </Table>
      </TableContainer>
    </Flex>
    </div>
  )
}

export default App
