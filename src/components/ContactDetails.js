import { Table } from "react-bootstrap";

const ContactDetails = ({ currentContact }) => {
  let count = 1;

  return (
    <div>
      <br></br>
      <h1 style={{ textAlign: "center" }}>Contact Details</h1>
      <br></br>
      <Table hover>
        <tbody>
          <tr>
            <td>
              <strong>Name: </strong>
            </td>
            <td>{currentContact.name}</td>
          </tr>
          <tr>
            <td>
              <strong>Email: </strong>
            </td>
            <td>{currentContact.email}</td>
          </tr>
          <tr>
            <td>
              <strong>Gender: </strong>
            </td>
            <td>{currentContact.gender}</td>
          </tr>
          {currentContact.phoneNumbers.length > 0 &&
            currentContact.phoneNumbers[0].phoneNumber !== "" &&
            currentContact.phoneNumbers.map((phone) => (
              <tr key={count}>
                <td>
                  <strong>Phone Number {count++}: </strong>
                </td>
                <td>{phone.phoneNumber}</td>
              </tr>
            ))}
        </tbody>
      </Table>
    </div>
  );
};

export default ContactDetails;
