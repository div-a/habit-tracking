import {
    Formik,
    Form,
    Field,
} from 'formik';
import { Button, Checkbox, CheckboxGroup, FormControl, FormErrorMessage, FormLabel, HStack, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, NumberDecrementStepper, NumberIncrementStepper, NumberInput, NumberInputField, NumberInputStepper, useDisclosure } from '@chakra-ui/react';

export const CreateHabitForm = () => {
    const { isOpen, onOpen, onClose } = useDisclosure()
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
                            <Input placeholder="name" />
                        </FormControl>

                        <CheckboxGroup colorScheme="green" defaultValue={["naruto", "kakashi"]}>
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



                        <FormControl id="numDays" isRequired>
                            <FormLabel>Minimum Number of Days to Tick Off</FormLabel>
                            {/* TODO get max num from number of days checked */}
                            <NumberInput defaultValue={3} min={0} max={7}>
                                <NumberInputField />
                                <NumberInputStepper>
                                    <NumberIncrementStepper />
                                    <NumberDecrementStepper />
                                </NumberInputStepper>
                            </NumberInput>
                        </FormControl>
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme="blue" mr={3} onClick={onClose}>
                            Submit
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </div>
    );
}