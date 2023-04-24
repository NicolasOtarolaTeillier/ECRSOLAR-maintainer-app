import { gql } from '@apollo/client'
const ADD_CUSTOMER = gql`
  mutation AddCustomer(
    $name: String!
    $fantasyName: String!
    $rut: String!
  ) {
    addCustomer(
      name: $name
      fantasy_name: $fantasyName
      rut: $rut
    ) {
      id
      name
      fantasy_name
      rut
      status
    }
  }
`
export default ADD_CUSTOMER
