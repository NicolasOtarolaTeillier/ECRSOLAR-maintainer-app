import { gql, } from "@apollo/client";
const ADD_CONTACT = gql`
  mutation AddContact(
    $customer: String!
    $firstName: String!
    $lastName: String!
    $email: String!
    $phoneNumber: String!
    $address: String!
    $functionalArea: String!

  ) {
    addContact(
        customer: $customer
        first_name: $firstName
        last_name: $lastName
        email: $email 
        phone_number: $phoneNumber 
        address: $address
        functional_area: $functionalArea

    ) {
        id
        customer
        first_name
        last_name
        email
        phone_number
        address
        functional_area
        status
    }
  }
`
export default ADD_CONTACT