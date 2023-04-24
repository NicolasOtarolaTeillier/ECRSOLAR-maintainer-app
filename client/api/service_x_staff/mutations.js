import { gql } from '@apollo/client'
const ADD_SERVICE_X_STAFF = gql`
  mutation AddServiceXStaff($service: ID!, $staff: Int!, $leader: Boolean!) {
    addServiceXStaff(service: $service, staff: $staff, leader: $leader) {
      service
      staff
      leader
      status
    }
  }
`
export default ADD_SERVICE_X_STAFF


export const DELETE_SERVICE_X_STAFF = gql`
  mutation DeleteServiceXStaff($service: ID!, $staff: Int!) {
  deleteServiceXStaff(service: $service, staff: $staff) {
    status
  }
}
`
