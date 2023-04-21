import { gql } from '@apollo/client'
const GET_ALL_CONTACTS = gql`
  query AllContacts {
    allContacts {
      id
      customer {
        name
      }
      first_name
      last_name
      email
      phone_number
      functional_area {
        id
        name
      }
      status
    }
  }
`
export default GET_ALL_CONTACTS
