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
    service_type {
      average_price_mw
      id
      name
      status
    }
    customer {
      id
      name
      fantasy_name
      rut
      address
      url
      status
    }
    contact {
      id
      customer {
        id
        name
        fantasy_name
        rut
        address
        url
        status
      }
      first_name
      last_name
      email
      phone_number
      address
      functional_area {
        id
        name
        status
      }
      status
    }
    photovoltaic_power_station {
      id
      name
      strings
      modules
      module_size
      hectares
      investor_brand
      module_brand
      mw
      owner
      manager_name
      customer {
        id
        name
        fantasy_name
        rut
        address
        url
        status
      }
      manager_number
      status
    }
    step
    status
  }
}
`
export default GET_ALL_SERVICES



