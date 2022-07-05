import {
  Button, FormControl, FormErrorMessage, FormLabel, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure,
} from '@chakra-ui/react';
import {
  Field, Form, Formik, type FormikHelpers,
} from 'formik';

const AddUser = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  interface Values {
    name: string;
    email: string;
    roles: ('admin' | 'security')[]
  }

  const onSubmit = async (values: Values, actions: FormikHelpers<Values>) => {
    console.log(values);
    actions.setSubmitting(false);
  };

  return (
    <>
      <Button onClick={onOpen}>Add User</Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add User</ModalHeader>
          <ModalCloseButton />

          <Formik
            onSubmit={onSubmit}
            initialValues={{ name: '', email: '', roles: [] }}
          >
            {(props) => (
              <Form>
                <ModalBody>
                  <Field name="name" validate={(val) => console.log(val)}>
                    {({ field, form }) => (
                      <FormControl>
                        <FormLabel htmlFor="name">Name</FormLabel>
                        <Input {...field} type="text" />
                        <FormErrorMessage>{form.errors.name}</FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>
                </ModalBody>

                <ModalFooter>
                  <Button variant="ghost" colorScheme="red" mr={3} onClick={onClose} isLoading={props.isSubmitting}>
                    Cancel
                  </Button>
                  <Button variant="ghost" colorScheme="green" isLoading={props.isSubmitting} type="submit">Add</Button>
                </ModalFooter>
              </Form>
            )}
          </Formik>

        </ModalContent>
      </Modal>
    </>
  );
};

export default AddUser;
