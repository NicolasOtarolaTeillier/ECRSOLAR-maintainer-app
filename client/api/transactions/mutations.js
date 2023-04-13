import { gql } from '@apollo/client'
const SERVICE_PLANNING = gql`
  mutation ServicePlanning(
    $service: ID!
    $leader: Int!
    $staffs: [Int!]
    $equipments: [Int!]
    $cars: [String!]
    $step: Int!
  ) {
    servicePlanning(
      service: $service
      leader: $leader
      staffs: $staffs
      equipments: $equipments
      cars: $cars
      step: $step
    )
  }
`
export default SERVICE_PLANNING
