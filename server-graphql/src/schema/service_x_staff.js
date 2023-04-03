import { Staff } from '../models/Staff.js'
import { ServiceXStaff } from '../models/ServiceXStaff.js'
import { Service } from '../models/Service.js'

// definitions graphql
export const typeDefs = `#graphql

type NewServiceXStaff {
    service: ID!
    staff: Int!
    leader: Boolean!
    status: Boolean
}

type ServiceXStaff {
    service: Service!
    staff: Staff!
    leader: Boolean!
    status: Boolean
}

extend type Query {
    allServiceXStaffs: [ServiceXStaff!]
}

extend type Mutation {
    addServiceXStaff(
        service: ID!
        Staff: Int!
        leader: Boolean!
    ): NewServiceXStaff!
}
`

export const resolvers = {
  Query: {
    allServiceXStaffs: async () => {
      return await ServiceXStaff.findAll()
    }
  },
  Mutation: {
    addServiceXStaff: async (root, { service, staff, leader }) => {
      return await ServiceXStaff.create({
        service,
        staff,
        leader
      })
    }
  },
  ServiceXStaff :{
    staff: async ({ staff }) => {
        return await Staff.findOne({
          where: { id: staff }
        })
      },

    service: async ({ service }) => {
        return await Service.findOne({
          where: { id: service }
        })
    }

  }
}
