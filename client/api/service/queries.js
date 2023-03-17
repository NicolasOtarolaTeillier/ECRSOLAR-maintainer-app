import { gql } from "@apollo/client";
const GET_ALL_SERVICES = gql`
  query AllServices {
  allServices {
    id
    purchase_order
    contract
    price
    proposed_execution_date
    finish_execution_date
    service_type
    customer
    contact
    photovoltaic_power_station
    step
    status
  }
}
`
export default GET_ALL_SERVICES