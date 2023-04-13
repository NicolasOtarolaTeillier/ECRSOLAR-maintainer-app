import { gql } from '@apollo/client'
const GET_ALL_CAR = gql`
  query AllCars {
    allCars {
      color
      make
      model
      status
      license_plate
    }
  }
`
export default GET_ALL_CAR
