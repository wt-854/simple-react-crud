import { useContext, useState, useEffect } from "react";
import {
  AiOutlineProfile,
  AiOutlineEdit,
  AiOutlineDelete,
} from "react-icons/ai";
import { Modal, Button, OverlayTrigger, Tooltip } from "react-bootstrap";
import { ContactContext } from "../contexts/ContactContext";
import EditForm from "./EditForm";
import ContactDetails from "./ContactDetails";

const Contact = ({ contact }) => {
  const [showView, setShowView] = useState(false);
  const handleShowView = () => setShowView(true);
  const handleCloseView = () => setShowView(false);

  const [showEdit, setShowEdit] = useState(false);
  const handleShowEdit = () => setShowEdit(true);
  const handleCloseEdit = () => setShowEdit(false);

  const { deleteContact } = useContext(ContactContext);

  const [showDelete, setShowDelete] = useState(false);
  const handleShowDelete = () => setShowDelete(true);
  const handleCloseDelete = () => setShowDelete(false);
  const handleDelete = () => {
    deleteContact(contact.id);
    setShowDelete(false);
  };

  useEffect(() => {
    handleCloseView();
    handleCloseEdit();
    handleCloseDelete();
  }, [contact]);

  return (
    <>
      <td>{contact.name}</td>
      <td>{contact.email}</td>
      <td>{contact.gender}</td>
      <td>
        {contact.phoneNumbers.length > 0 && contact.phoneNumbers[0].phoneNumber}
      </td>
      <td>
        <OverlayTrigger
          overlay={
            <Tooltip id={`tooltip-top`}>
              <strong>View</strong>.
            </Tooltip>
          }
        >
          <AiOutlineProfile
            style={{ cursor: "pointer " }}
            onClick={handleShowView}
          />
        </OverlayTrigger>
      </td>
      <td>
        <OverlayTrigger
          overlay={
            <Tooltip id={`tooltip-top`}>
              <strong>Edit</strong>.
            </Tooltip>
          }
        >
          <AiOutlineEdit
            style={{ cursor: "pointer " }}
            onClick={handleShowEdit}
          />
        </OverlayTrigger>
      </td>
      <td>
        <OverlayTrigger
          overlay={
            <Tooltip id={`tooltip-top`}>
              <strong>Delete</strong>.
            </Tooltip>
          }
        >
          <AiOutlineDelete
            style={{ cursor: "pointer " }}
            // onClick={() => deleteContact(contact.id)}
            onClick={handleShowDelete}
          />
        </OverlayTrigger>
      </td>

      <Modal show={showView} onHide={handleCloseView}>
        <Modal.Body>
          <ContactDetails currentContact={contact} />
        </Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={handleCloseView}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showEdit} onHide={handleCloseEdit}>
        <Modal.Header>
          <Modal.Title>Edit Contact</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <EditForm currentContact={contact} />
        </Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={handleCloseEdit}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal show={showDelete} onHide={handleCloseDelete}>
        <Modal.Header>
          <Modal.Title>Delete Contact</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete contact {contact.name}?
        </Modal.Body>
        <Modal.Footer>
          <Button variant='danger' onClick={handleDelete}>
            Confirm
          </Button>
          <Button variant='secondary' onClick={handleCloseDelete}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Contact;
