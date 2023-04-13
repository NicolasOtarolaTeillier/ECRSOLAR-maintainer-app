import { gql } from '@apollo/client'
const GET_ALL_EQUIPMENT_CAREGORY = gql`
  query AllEquipmentCategories {
    allEquipmentCategories {
        name
        status
    }
  }
`
export default GET_ALL_EQUIPMENT_CAREGORY
