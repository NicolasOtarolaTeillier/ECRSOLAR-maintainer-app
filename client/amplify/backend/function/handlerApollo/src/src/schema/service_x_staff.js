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
        staff: Int!
        leader: Boolean!
    ): NewServiceXStaff!
    deleteServiceXStaff(
      service: ID!,
      staff: Int!
    ): ServiceXStaff!
}
`

export const resolvers = {
  Query: {
    allServiceXStaffs: async () => {
      return await ServiceXStaff.findAll({where: {status: true}})
    },
  },
  Mutation: {
    addServiceXStaff: async (root, { service, staff, leader }) => {
      const duplicate = await ServiceXStaff.findOne({ where: { service: service, staff: staff } })
      if (duplicate) {
        const { dataValues: record } = duplicate
        await ServiceXStaff.update(
          { status: true },
          { where: { id: record.id } }
        );
        // Retorna el registro actualizado
        return {
          service: record.service,
          staff: record.staff,
          leader: record.leader,
          status: true,
        };
      }
      else {
        return await ServiceXStaff.create({
          service,
          staff,
          leader
        })
      }
    },
    deleteServiceXStaff: async (root, { service, staff }) => {
      const service_id = await ServiceXStaff.findOne({ where: { service: service, staff: staff } })
      const result = await ServiceXStaff.update(
        { status: false },
        { where: { id: service_id.dataValues.id } }
      );
      return await ServiceXStaff.findOne({ where: { service: service, staff: staff }})
    }
  },
  ServiceXStaff: {
    staff: async ({ staff }) => {
      return await Staff.findOne({
        where: { id: staff }
      })
    },

    service: async ({ service }) => {
      return await Service.findOne({
        where: { id: service }
      })
    },
  }
}
