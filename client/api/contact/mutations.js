import { gql, } from "@apollo/client";
const ADD_CONTACT = gql`
  mutation AddContact(
    $customer: String!
    $person: Int!
    $email: String!
    $phoneNumber: String!
    $address: String!
    $functionalArea: String!

  ) {
    addContact(
        customer: $customer
        person: $person
        email: $email 
        phone_number: $phoneNumber 
        address: $address
        functional_area: $functionalArea

    ) {
        id
        customer
        person
        email
        phone_number
        address
        functional_area
        status
    }
  }
`
export default ADD_CONTACT