
import { Equipment } from '../models/Equipment.js'
import { ServiceXEquipment } from '../models/ServiceXEquipment.js'
import { Service } from '../models/Service.js'

// definitions graphql
export const typeDefs = `#graphql

type NewServiceXEquipment {
    service: ID!
    equipment: Int!
    status: Boolean
}

type ServiceXEquipment {
    service: Service!
    equipment: Equipment!
    status: Boolean
}

extend type Query {
    allServiceXEquipment: [ServiceXEquipment!]
}

extend type Mutation {
    addServiceXEquipment(
        service: ID!
        equipment: Int!
        status: Boolean
    ): NewServiceXEquipment!
}
`

// resolvers graphql

export const resolvers = {
  Query: {
    allServiceXEquipment: async () => {
      return await ServiceXEquipment.findAll()
    }
  },
  Mutation: {
    addServiceXEquipment: async (root, { service, equipment }) => {
      return await ServiceXEquipment.create({
        service,
        equipment,
      })
    }
  },
  ServiceXEquipment: {
    equipment: async ({ equipment }) => {
      return await Equipment.findOne({
        where: { id: equipment }
      })
    },
    service: async ({ service }) => {
        return await Service.findOne({
          where: { id: service }
        })
    }
  }
}
