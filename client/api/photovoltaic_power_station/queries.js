import { gql } from '@apollo/client'
const GET_ALL_PHOTOVOLTAIC_POWER_STATIONS = gql`
  query AllPhotovoltaicPowerStations {
    allPhotovoltaicPowerStations {
      id
      name
      customer {
        name
      }
    }
  }
`
export default GET_ALL_PHOTOVOLTAIC_POWER_STATIONS
