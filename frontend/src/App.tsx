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
import { useEffect, useState } from "react";
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

interface  Habit{
  createdAt: Date,
  id: number,
  name: string,
  numDaysToComplete: number,
  scheduleDays: ScheduleDay[]
}

interface ScheduleDay {
  day: number
}

export const App = () => {

  const [habits, setHabits] = useState<Habit[]>([])

  useEffect(() => {
    async function fetchMyAPI() {
      const {data} = await instance.get<Habit[]>('/habits'); 
      setHabits(data)
    }

    fetchMyAPI();
  }, []);

  useEffect(() => {
    console.log("habits ", habits);
  }, [habits]);


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

              {habits.map(h => {
                return (<Tr>
                  <Td>{h.name}</Td>
                    {[0, 1, 2, 3, 4, 5, 6].map((post) =>
                      <Td key={post}>
                        {h.scheduleDays.find(sd => sd.day === post) && <Checkbox value={post}></Checkbox>}
                      </Td>
                    )}
                </Tr>)
              })}
            </Tbody>
          </Table>

          <CreateHabitForm></CreateHabitForm>
        </VStack>
      </Grid>
    </Box>
  </ChakraProvider>
  )
}

