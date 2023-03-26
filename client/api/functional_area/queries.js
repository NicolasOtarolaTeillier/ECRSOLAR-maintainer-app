import { gql } from "@apollo/client";
const GET_ALL_FUNCTIONAL_AREA = gql`
  query AllFunctionalAreas {
    allFunctionalAreas {
        id
        name
        status
  }
}
`
export default GET_ALL_FUNCTIONAL_AREA