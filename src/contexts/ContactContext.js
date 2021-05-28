import { useState, createContext } from "react";
import { v4 as uuidv4 } from "uuid";

export const ContactContext = createContext();

const ContactContextProvider = (props) => {
  const [contacts, setContacts] = useState([
    {
      id: uuidv4(),
      name: "Random Name",
      email: "random_name@gmail.com",
      gender: "Male",
      phoneNumbers: [
        {
          id: uuidv4(),
          phoneNumber: "91234567",
        },
        {
          id: uuidv4(),
          phoneNumber: "92223333",
        },
        {
          id: uuidv4(),
          phoneNumber: "89898989",
        },
      ],
    },
    {
      id: uuidv4(),
      name: "John Doe",
      email: "johndoe@gmail.com",
      gender: "Male",
      phoneNumbers: [
        {
          id: uuidv4(),
          phoneNumber: "93334455",
        },
        {
          id: uuidv4(),
          phoneNumber: "99887766",
        },
      ],
    },
    {
      id: uuidv4(),
      name: "Jane Doe",
      email: "janedoe@gmail.com",
      gender: "Female",
      phoneNumbers: [
        {
          id: uuidv4(),
          phoneNumber: "81223456",
        },
        {
          id: uuidv4(),
          phoneNumber: "88776655",
        },
      ],
    },
    {
      id: uuidv4(),
      name: "Janet Doe",
      email: "janetdoe@gmail.com",
      gender: "Female",
      phoneNumbers: [
        {
          id: uuidv4(),
          phoneNumber: "88775544",
        },
        {
          id: uuidv4(),
          phoneNumber: "91995547",
        },
      ],
    },
    {
      id: uuidv4(),
      name: "Mona Lisa",
      email: "monalisa@gmail.com",
      gender: "Female",
      phoneNumbers: [
        {
          id: uuidv4(),
          phoneNumber: "86864455",
        },
        {
          id: uuidv4(),
          phoneNumber: "99774422",
        },
      ],
    },
  ]);

  const addContact = (name, email, gender, phoneNumbers) => {
    setContacts([
      ...contacts,
      { id: uuidv4(), name, email, gender, phoneNumbers },
    ]);
  };

  const deleteContact = (id) => {
    setContacts(contacts.filter((contact) => contact.id !== id));
  };

  const editContact = (id, updatedContact) => {
    setContacts(
      contacts.map((contact) => (contact.id === id ? updatedContact : contact))
    );
  };

  return (
    <ContactContext.Provider
      value={{
        contacts,
        addContact,
        deleteContact,
        editContact,
      }}
    >
      {props.children}
    </ContactContext.Provider>
  );
};

export default ContactContextProvider;
