import { useState } from 'react'
import { AxiosError } from 'axios';

import { ClassificationResult, ClassificationResultType, getClassifications } from './service/classify'
import './App.css'

import {
  Flex, Textarea, Button, TableContainer,
  Table, Th, Thead, Tr, Tbody, Td, Progress, useToast, UseToastOptions
} from '@chakra-ui/react'

export type Classification = { input: string, isHateful: string, confidence: number, type?: string, typeConfiedence?: number };

function createErrorToast(des: string): UseToastOptions  {
  return {
    title: 'Error Encountered!',
    description: des,
    status: 'error',
    duration: 9000,
    isClosable: true,
  }
}
function App() {

  const [text, setText] = useState('');
  const [classifications, setClassifications] = useState<Classification[]>([]);

  const toast = useToast()

  return (
    <Flex style={{ width: "80vw", minHeight: "100vh" }} flexDirection="column" alignItems="stretch">
      <Textarea h="50vh" placeholder='Put your text' value={text} onChange={(e) => {
        setText(e.target.value);
      }} />
      <Button onClick={() => {
        const textArray = text.split(/[.\n]/).filter((t) => t.length > 0);
        console.log(textArray);
        getClassifications(textArray).then((res: ClassificationResult) => {
          if (res.type === ClassificationResultType.Success) {
            const data = res.data as Classification[];
            console.log("data", data)
            if (Array.isArray(data) && data.every((d)=> Boolean(d))) {
              setClassifications(data);
              if (data.every(d=> !d.isHateful)) {
                toast({
                  title: 'No Hate Speech Detected!',
                  description: 'Your text is safe to use.',
                  status: 'success',
                  duration: 9000,
                  isClosable: true,
                })
              }
            } else {
              toast(createErrorToast("Too much texts to handle 😭"));
            }
          } else if (res.type === ClassificationResultType.Error) {
            const data = res.data as AxiosError;
            toast(createErrorToast(data.message));

            console.log(data);
          }
        }).catch((err) => {
          toast(createErrorToast(err));
        });
      }}>Submit</Button>

      <TableContainer overflow="auto">
        <Table variant='simple'>
          <Thead>
            <Tr bg="teal.200">
              <Th>Text</Th>
              <Th>Reason Why</Th>
              <Th>Confidence</Th>
            </Tr>
          </Thead>
          <Tbody>
            {classifications.filter((c) => c.isHateful).map((classification: Classification, index) => {
              return (<Tr key={index}>
                <Td>{classification.input}</Td>
                <Td>{classification.type == "notgiven" ? "Uncertain" : classification.type}</Td>
                <Td><Progress value={classification.confidence * 100} /></Td>
              </Tr>);
            })}

          </Tbody>
        </Table>
      </TableContainer>
    </Flex>
  )
}

export default App
