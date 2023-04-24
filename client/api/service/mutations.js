import { gql, } from "@apollo/client";
const ADD_SERVICE = gql`
  mutation AddService(
    $purchaseOrder: Int!
    $contract: Boolean!
    $price: Int!
    $proposedExecutionDate: String!
    $finishExecutionDate: String!
    $serviceType: String!
    $photovoltaicPowerStation: String!
    $customer: String!
    $contact: Int!
  ) {
    addService(
      purchase_order: $purchaseOrder
      contract: $contract
      price: $price
      proposed_execution_date: $proposedExecutionDate
      finish_execution_date: $finishExecutionDate
      service_type: $serviceType
      photovoltaic_power_station: $photovoltaicPowerStation
      customer: $customer
      contact: $contact

    ) {
      id
      purchase_order
      contract
      price
      proposed_execution_date
      finish_execution_date
      service_type
      customer
      photovoltaic_power_station
      contact
      step
      status
    }
  }
`
export default ADD_SERVICE