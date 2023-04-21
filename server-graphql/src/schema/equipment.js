import { EquipmentCategory } from '../models/EquipmentCategory.js'
import { Equipment} from '../models/Equipment.js'

// definitions graphql
export const typeDefs = `#graphql

type NewEquipment {
    equipment_category: String!
    number: Int!
}

type Equipment {
    id: Int!
    equipment_category: EquipmentCategory!
    number: Int!
    status: Boolean
}

extend type Query {
    allEquipments: [Equipment!]
}

extend type Mutation {
    addEquipment(
        equipment_category: String!
        number: Int!
    ): NewEquipment!
}
`

// resolvers graphql

export const resolvers = {
  Query: {
    allEquipments: async () => {
      return await Equipment.findAll({ order: [['equipment_category', 'ASC']] })
    }
  },
  Mutation: {
    addEquipment: async (root, { equipment_category, number }) => {
      return await Equipment.create({
        equipment_category,
        number
      })
    }
  },
  Equipment: {
    equipment_category: async ({equipment_category}) =>{
        return await EquipmentCategory.findOne({
            where: { name: equipment_category }
        })

    }
  }
}