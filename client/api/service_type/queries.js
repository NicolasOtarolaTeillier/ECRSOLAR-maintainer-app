import { gql } from "@apollo/client";
const GET_ALL_SERVICES_TYPE = gql`
  query AllServiceTypes {
  allServiceTypes {
    id
    name
    average_price_mw    
    status
  }
}
`
export default GET_ALL_SERVICES_TYPE