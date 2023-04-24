import { gql } from '@apollo/client'
const ADD_OR_UPDATE_MILESTONE = gql`
  mutation AddMilestone($staff: Int!, $name: String!, $date: String!) {
    addMilestone(staff: $staff, name: $name, date: $date) {
      name
      date
      staff {
        person {
          first_name
        }
      }
    }
  }
`
export default ADD_OR_UPDATE_MILESTONE
