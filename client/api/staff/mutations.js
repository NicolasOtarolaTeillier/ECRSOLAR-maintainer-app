import { gql } from '@apollo/client'
const ADD_STAFF = gql`
  mutation AddStaff(
    $person: Int!
    $position: String!
    $admissionDate: String!
    ) {
    addStaff(
      person: $person
      position: $position
      admission_date:$admissionDate
    )
    {
      person
      position
      admission_date
    }
  }
`
export default ADD_STAFF
