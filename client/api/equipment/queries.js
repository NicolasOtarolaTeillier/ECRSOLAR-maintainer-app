import { gql } from '@apollo/client'
const GET_ALL_EQUIPMENT = gql`
  query AllEquipments {
    allEquipments {
      number
      status
      equipment_category {
        name
        status
      }
      id
    }
  }
`
export default GET_ALL_EQUIPMENT
