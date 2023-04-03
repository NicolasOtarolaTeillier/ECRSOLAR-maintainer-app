import { gql } from "@apollo/client";
const GET_ALL_CUSTOMERS = gql`
  query AllCustomers {
  allCustomers {
    id
    name
    fantasy_name
    rut
    #address
    #url
    status
  }
}
`
export default GET_ALL_CUSTOMERS