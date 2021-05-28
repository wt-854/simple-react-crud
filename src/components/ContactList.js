import { useContext, useState, useEffect } from "react";
import { Table } from "react-bootstrap";
import Contact from "./Contact";
import { ContactContext } from "../contexts/ContactContext";
import {
  Modal,
  Button,
  Alert,
  Navbar,
  Form,
  FormControl
} from "react-bootstrap";
import AddForm from "./AddForm";

const ContactList = () => {
  const { contacts } = useContext(ContactContext);

  // for handling successful transaction
  const [showAlert, setShowAlert] = useState(false);
  const handleShowAlert = () => {
    setShowAlert(true);

    setTimeout(() => {
      setShowAlert(false);
    }, 2000);
  };

  // for handling Add Modal
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  // ============ Start of Search Logic ============

  const [searchTerm, setSearchTerm] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [searchAlert, setSearchAlert] = useState(false);
  const handleSearchAlert = () => {
    setSearchAlert(true);

    setTimeout(() => {
      setSearchAlert(false);
    }, 2000);
  };

  const submitSearchHandler = (e) => {
    e.preventDefault();

    if (searchTerm !== "") {
      const result = contacts.filter((contact) =>
        contact.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setSearchResult(result);
      if (result.length === 0) {
        handleSearchAlert();
      }
    }
  };

  // ============ End of Search Logic ============

  useEffect(() => {
    handleClose();

    return () => {
      handleShowAlert();
    };
  }, [contacts]);

  return (
    <>
      <br></br>
      <Navbar bg="light" variant="light">
        <Form inline onSubmit={submitSearchHandler}>
          <FormControl
            type="text"
            name="search"
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search Name"
            className="line-pad"
          />
          <Button variant="outline-primary" type="submit">
            Search
          </Button>
        </Form>
      </Navbar>
      <br></br>

      <Button onClick={handleShow} variant="success">
        Add New Contact
      </Button>
      <br></br>
      <br></br>
      <Alert show={searchAlert} variant="danger">
        No results found!
      </Alert>

      <Alert show={showAlert} variant="success">
        Contact list updated successfully!
      </Alert>

      {contacts.length < 1 ? (
        <Alert variant="info">You have no contacts added yet</Alert>
      ) : (
        <Table hover>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Gender</th>
              <th>Phone</th>
              <th></th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {searchResult.length < 1
              ? contacts.map((contact) => (
                  <tr key={contact.id}>
                    <Contact contact={contact} />
                  </tr>
                ))
              : contacts
                  .filter((contact) =>
                    contact.name
                      .toLowerCase()
                      .includes(searchTerm.toLowerCase())
                  )
                  .map((search) => (
                    <tr key={search.id}>
                      <Contact contact={search} />
                    </tr>
                  ))}
          </tbody>
        </Table>
      )}
      <br></br>
      <br></br>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header>
          <Modal.Title>Add Contact</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <AddForm />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ContactList;
