import { gql } from '@apollo/client'
const GET_ALL_COMMUNES = gql`
  query AllCommunes {
    allCommunes {
      name
      region
    }
  }
`
export default GET_ALL_COMMUNES




