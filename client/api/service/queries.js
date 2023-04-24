import { gql } from '@apollo/client'
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
        status
      }
      contact {
        id
        customer {
          id
          name
          fantasy_name
          rut
          status
        }
        first_name
        last_name
        email
        phone_number
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
        mw_ac
        mw_dc
        owner
        manager_name
        customer {
          id
          name
          fantasy_name
          rut
          status
        }
        commune {
          name
          region
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

export const FIND_SERVICES = gql`
  query FindServices($ids: [ID!]!) {
    findServices(ids: $ids) {
      id
      finish_execution_date
      proposed_execution_date
      photovoltaic_power_station {
        name
      }
    }
  }
`;
