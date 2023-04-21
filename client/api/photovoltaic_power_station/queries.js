import { gql } from '@apollo/client'
const GET_ALL_PHOTOVOLTAIC_POWER_STATIONS = gql`
  query AllPhotovoltaicPowerStations {
    allPhotovoltaicPowerStations {
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
        name
      }
      commune {
        name
      }
      manager_number
      status
    }
  }
`
export default GET_ALL_PHOTOVOLTAIC_POWER_STATIONS
