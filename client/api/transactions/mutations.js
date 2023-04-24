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

export const CHANGE_SERVICES_X_XSTAFF = gql`
  mutation ChangeServiceXStaff(
    $serviceOld: ID!
    $serviceNew: ID!
    $staff: Int!

  ) {
    changeServiceXStaff(
      service_old: $serviceOld
      service_new: $serviceNew
      staff: $staff
    )
  }
`

export const CHANGE_LEADER_OF_SERVICE = gql`
  mutation ChangeLeaderOfService(
    $staff_leader: Int!
    $staff: Int!
    $service: ID!
  ) {
    changeLeaderOfService(
      staff_leader: $staffLeader
      staff: $staff
      service: $service
    )
  }
`
