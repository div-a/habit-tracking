import {
  ChakraProvider,
  Box,
  VStack,
  Grid,
  theme,
  Table,
  Tr,
  Th,
  Td,
  Tbody,
  Thead,
  Checkbox
} from "@chakra-ui/react"
import { ColorModeSwitcher } from "./ColorModeSwitcher"
import { useEffect } from "react";
import axios from "axios";
import { CreateHabitForm } from "./CreateHabitForm";

enum Day {
  SUN,
  MON,
  TUES,
  WED,
  THURS,
  FRI,
  SAT
}

export const instance = axios.create({
  baseURL: 'http://localhost:3000'
});

export const App = () => {

  useEffect(() => {
    async function fetchMyAPI() {
      const response = await instance.get('/habits');
      console.log(response)
    }

    fetchMyAPI();
  });


  return (<ChakraProvider theme={theme}>
    <Box textAlign="center" fontSize="xl">
      <Grid minH="100vh" p={3}>
        <ColorModeSwitcher justifySelf="flex-end" />
        <VStack spacing={8}>
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>Habit</Th>
                {[0, 1, 2, 3, 4, 5, 6].map((post) =>
                  <Th key={post}>
                    {Day[post]}
                  </Th>
                )}
              </Tr>
            </Thead>
            <Tbody>

              <Tr>
                <Td>Habit1</Td>
                {[0, 1, 2, 3, 4, 5, 6].map((post) =>
                  <Td key={post}>
                    <Checkbox value={post}></Checkbox>
                  </Td>
                )}
              </Tr>
              <Tr>
                <Td>Habit2</Td>
                {[0, 1, 2, 3, 4, 5, 6].map((post) =>
                  <Td key={post}>
                    <Checkbox value={post}></Checkbox>
                  </Td>
                )}
              </Tr>
              <Tr>
                <Td>Habit3</Td>
                {[0, 1, 2, 3, 4, 5, 6].map((post) =>
                  <Td key={post}>
                    <Checkbox value={post}></Checkbox>
                  </Td>
                )}
              </Tr>
            </Tbody>
          </Table>

          <CreateHabitForm></CreateHabitForm>
        </VStack>
      </Grid>
    </Box>
  </ChakraProvider>
  )
}
