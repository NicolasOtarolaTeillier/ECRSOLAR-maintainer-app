import { gql } from '@apollo/client'
const GET_ALL_STAFF = gql`
query AllStaffs {
  allStaffs  {
    id
    person {
      id
      email
      first_name
      last_name
      phone_number
      rut
      status
    }
    position {
      id
      name
      status
    }
    admission_date
    dismissal_date
    status
  }
}
`
export default GET_ALL_STAFF
