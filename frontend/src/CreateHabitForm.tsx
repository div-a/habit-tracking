import { Button, Checkbox, CheckboxGroup, FormControl, FormErrorMessage, FormLabel, HStack, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, NumberDecrementStepper, NumberIncrementStepper, NumberInput, NumberInputField, NumberInputStepper, useDisclosure } from '@chakra-ui/react';
import { useEffect, useState } from "react";
import { instance } from './App';

interface Schedule {

}


export const CreateHabitForm = () => {
    const [name, setName] = useState("")
    const [days, setDays] = useState(3)
    const [schedule, setSchedule] = useState<any[]>([])
    const { isOpen, onOpen, onClose } = useDisclosure()


    // const [value, setValue] = React.useState("")

    useEffect(() => {
        console.log(name);
        console.log(days);
        // console.log(schedule.map(day => { day }));
    }, [name, days, schedule]);

    const onSubmit = async () => {
        var sched: { day: any; }[] = [];
        schedule.forEach((s) => {
            sched.push({ day: parseInt(s) })
        });
        await instance.post('/habit', {
            name,
            numDaysToComplete: days,
            authorEmail: "test",
            schedule: sched,
        });
        onClose();
    }

    return (
        <div>
            <Button onClick={onOpen}>Add New Habit</Button>

            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>New Habit</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <FormControl id="name" isRequired>
                            <FormLabel>Name</FormLabel>
                            <Input placeholder="name" value={name} onChange={(event) => setName(event.target.value)} />
                        </FormControl>

                        <FormControl id="schedule" isRequired>
                            <FormLabel>Schedule</FormLabel>
                            <CheckboxGroup defaultValue={["1", "4"]} value={schedule} onChange={(event) => setSchedule(event)}>
                                <HStack>
                                    <Checkbox value="0">Sun</Checkbox>
                                    <Checkbox value="1">Mon</Checkbox>
                                    <Checkbox value="2">Tues</Checkbox>
                                    <Checkbox value="3">Wed</Checkbox>
                                    <Checkbox value="4">Thurs</Checkbox>
                                    <Checkbox value="5">Fri</Checkbox>
                                    <Checkbox value="6">Sat</Checkbox>
                                </HStack>
                            </CheckboxGroup>
                        </FormControl>

                        <FormControl id="numDays" isRequired>
                            <FormLabel>Minimum Number of Days to Tick Off</FormLabel>
                            {/* TODO get max num from number of days checked */}
                            <NumberInput defaultValue={3} min={0} max={7} value={days} onChange={(event) => setDays(parseInt(event))}>
                                <NumberInputField />
                                <NumberInputStepper>
                                    <NumberIncrementStepper />
                                    <NumberDecrementStepper />
                                </NumberInputStepper>
                            </NumberInput>
                        </FormControl>
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme="blue" mr={3} onClick={onSubmit}>
                            Submit
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </div>
    );
}