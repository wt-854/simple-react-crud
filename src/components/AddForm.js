import { Form, Button, Alert, InputGroup } from "react-bootstrap";
import { ContactContext } from "../contexts/ContactContext";
import { useContext, useState, useEffect, useRef } from "react";
import { v4 as uuidv4 } from "uuid";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { schema, phoneRegex } from "../schemas/Schema";

const AddForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  // contacts contains the list of all contacts currently
  const { contacts, addContact } = useContext(ContactContext);

  // start of dynamic phone list logic
  const [phoneNumbers, setPhoneNumbers] = useState([
    { id: uuidv4(), phoneNumber: "" },
  ]);

  const handleChangedPhoneInput = (id, e) => {
    const newPhoneFields = phoneNumbers.map((phoneField) => {
      if (id === phoneField.id) {
        phoneField[e.target.name] = e.target.value;
      }
      return phoneField;
    });

    setPhoneNumbers(newPhoneFields);
  };

  const handleAddPhoneFields = () => {
    setPhoneNumbers([...phoneNumbers, { id: uuidv4(), phoneNumber: "" }]);
  };

  const handleRemovePhoneFields = (id) => {
    const values = [...phoneNumbers];
    values.splice(
      values.findIndex((value) => value.id === id),
      1
    );
    setPhoneNumbers(values);
  };
  // end of dynamic phone list logic

  const [phoneError, setPhoneError] = useState(false);

  const [uniqueEmailAlert, setUniqueEmailAlert] = useState(false);
  const handleUniqueEmailAlert = () => {
    setUniqueEmailAlert(true);
    setTimeout(() => {
      setUniqueEmailAlert(false);
    }, 5000);
  };

  // For handling dynamic phone list validation
  const firstUpdate = useRef(true);
  useEffect(() => {
    if (firstUpdate.current) {
      firstUpdate.current = false;
      return;
    }

    var invalid = false;
    phoneNumbers.forEach((p) => {
      if (!phoneRegex.test(p.phoneNumber)) {
        invalid = true;
      }
    });

    if (invalid) {
      setPhoneError(true);
    } else {
      setPhoneError(false);
    }
  }, [phoneNumbers]);

  const myHandleSubmit = (data) => {
    let uniqueEmail = true;

    contacts.forEach((contact) => {
      if (contact.email === data.email) {
        uniqueEmail = false;
      }
    });

    if (!uniqueEmail) {
      handleUniqueEmailAlert();
    }

    if (uniqueEmail && !phoneError) {
      addContact(data.name, data.email, data.gender, phoneNumbers);
    }
  };

  return (
    <Form onSubmit={handleSubmit(myHandleSubmit)}>
      <Form.Group>
        <Form.Control
          type='text'
          placeholder='Name'
          required
          name='name'
          {...register("name")}
        ></Form.Control>
        <p className='error'>{errors.name?.message}</p>
      </Form.Group>
      <Form.Group>
        <Form.Control
          type='email'
          placeholder='Email'
          required
          name='email'
          {...register("email")}
        ></Form.Control>
        <p className='error'>{errors.email?.message}</p>
      </Form.Group>
      <Form.Group>
        <Form.Control
          as='select'
          required
          name='gender'
          {...register("gender")}
        >
          <option value=''>Select Gender</option>
          <option>Male</option>
          <option>Female</option>
        </Form.Control>
        <p className='error'>{errors.gender?.message}</p>
      </Form.Group>

      {phoneNumbers.map((phoneField) => (
        <Form.Group key={phoneField.id}>
          <InputGroup>
            <Form.Control
              className='line'
              name='phoneNumber'
              type='text'
              placeholder='Phone Number'
              required
              value={phoneField.phoneNumber}
              onChange={(e) => handleChangedPhoneInput(phoneField.id, e)}
            />
            {phoneNumbers.length === 1 ? (
              ""
            ) : (
              <Button
                variant='outline-danger'
                size='sm'
                onClick={() => handleRemovePhoneFields(phoneField.id)}
              >
                Delete
              </Button>
            )}

            <Button
              size='sm'
              variant='outline-success'
              onClick={handleAddPhoneFields}
            >
              Add
            </Button>
          </InputGroup>
        </Form.Group>
      ))}
      {phoneError && <p className='error'>Invalid phone format</p>}
      <Alert show={uniqueEmailAlert} variant='danger'>
        A record with this email already exists!
      </Alert>
      <Button variant='success' type='submit' block>
        Add New Contact
      </Button>
    </Form>
  );
};

export default AddForm;
