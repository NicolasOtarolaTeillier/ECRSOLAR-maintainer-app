import { gql } from '@apollo/client'
const GETT_ALL_EQUIPMENT_CAREGORY = gql`
  query AllEquipmentCategories {
    allEquipmentCategories {
        name
        status
    }
  }
`
export default GETT_ALL_EQUIPMENT_CAREGORY
