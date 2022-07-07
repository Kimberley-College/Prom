import {
  Button, Checkbox, CheckboxGroup, FormControl, FormErrorMessage, FormLabel, HStack, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure, useToast,
} from '@chakra-ui/react';
import {
  Field, FieldProps, Form, Formik, FormikProps, type FormikHelpers,
} from 'formik';

const AddUser = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  interface Values {
    name: string;
    email: string;
    roles: ('admin' | 'security')[]
  }

  const onSubmit = async (values: Values, actions: FormikHelpers<Values>) => {
    const res = await fetch('/api/user/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(values),
    });
    if (!res.ok) {
      toast({
        title: `Error ${res.status}`,
        description: await res.text(),
        status: 'error',
      });
    } else {
      toast({
        title: 'Success',
        description: 'User created',
        status: 'success',
      });
      onClose();
    }
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
            {(props: FormikProps<Values>) => (
              <Form>
                <ModalBody>
                  <Field name="name" validate={(val) => (val.length > 0 ? '' : 'Please enter a name')}>
                    {({ field, form }: FieldProps<string>) => (
                      <FormControl isInvalid={form.errors.name && form.touched.name as boolean}>
                        <FormLabel htmlFor="name">Name</FormLabel>
                        <Input {...field} type="text" />
                        <FormErrorMessage>{form.errors.name}</FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>

                  <Field name="email" validate={(val) => (/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(val) ? '' : 'Please enter a valid email address')}>
                    {({ field, form }: FieldProps<string>) => (
                      <FormControl isInvalid={form.errors.email && form.touched.email as boolean}>
                        <FormLabel htmlFor="email">Email</FormLabel>
                        <Input {...field} type="text" />
                        <FormErrorMessage>{form.errors.email}</FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>

                  <FormControl>
                    <FormLabel htmlFor="name">Roles</FormLabel>
                    <CheckboxGroup>
                      <HStack spacing={3}>
                        <Field name="roles" as={Checkbox} value="admin">Admin</Field>
                        <Field name="roles" as={Checkbox} value="security">Security</Field>
                      </HStack>
                    </CheckboxGroup>
                    <FormErrorMessage>{props.errors.roles}</FormErrorMessage>
                  </FormControl>
                </ModalBody>

                <ModalFooter>
                  <Button variant="ghost" colorScheme="red" mr={3} onClick={onClose} isDisabled={props.isSubmitting}>
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
