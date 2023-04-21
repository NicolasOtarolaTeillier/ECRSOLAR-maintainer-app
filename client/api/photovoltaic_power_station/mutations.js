import { gql } from '@apollo/client'
const ADD_PHOTOVOLTAIC_POWER_STATION = gql`
  mutation AddPhotovoltaicPowerStation(
    $name: String!
    $strings: Int!
    $modules: Int!
    $moduleSize: String!
    $hectares: Int!
    $investorBrand: String!
    $moduleBrand: String!
    $mwAc: Float!
    $mwDc: Float!
    $owner: String!
    $managerName: String!
    $customer: String!
    $commune: String!
    $managerNumber: String!
  ) {
    addPhotovoltaicPowerStation(
      name: $name
      strings: $strings
      modules: $modules
      module_size: $moduleSize
      hectares: $hectares
      investor_brand: $investorBrand
      module_brand: $moduleBrand
      mw_ac: $mwAc
      mw_dc: $mwDc
      owner: $owner
      manager_name: $managerName
      customer: $customer
      commune: $commune
      manager_number: $managerNumber
    ) {
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
      customer
      commune
      manager_number
      status
    }
  }
`
export default ADD_PHOTOVOLTAIC_POWER_STATION
