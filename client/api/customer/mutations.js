import { gql } from '@apollo/client'
const ADD_CUSTOMER = gql`
  mutation AddCustomer(
    $name: String!
    $fantasyName: String!
    $rut: String!
    $address: String!
    $url: String
  ) {
    addCustomer(
      name: $name
      fantasy_name: $fantasyName
      rut: $rut
      address: $address
      url: $url
    ) {
      id
      name
      fantasy_name
      rut
      address
      url
      status
    }
  }
`
export default ADD_CUSTOMER
