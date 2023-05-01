import { Staff } from '../models/Staff.js'
import { Position } from '../models/Position.js'
import { Person } from '../models/Person.js'
import { Service } from '../models/Service.js'
import { ServiceXStaff } from '../models/ServiceXStaff.js'
import { Milestone } from '../models/Milestone.js'

import { Op, or } from 'sequelize'

// definitions graphql
export const typeDefs = `#graphql

  type NewStaff {
    id: Int!
    person: Int!
    position: String!
    admission_date: String!
    dismissal_date: String
    status: Boolean!
  }

  type Staff {
    id: Int!
    person: Person!
    position: Position!
    admission_date: String!
    dismissal_date: String
    status: Boolean!
    services: [Service!]
    milestones: [Milestone!]
  }


  extend type Query {
    allStaffs: [Staff]
    allStaffsAvailable (service: ID!): [Staff!]
  }

  extend type Mutation {
   addStaff(
        person: Int!
        position: String!
        admission_date: String!
        dismissal_date: String
        status: Boolean
   ): NewStaff
 }
`
// resolvers graphql
export const resolvers = {
  Query: {
    allStaffs: async (root, args) => {
      return await Staff.findAll({
        order: [['id', 'ASC']],
        where: {status: true}
      })
    },
    allStaffsAvailable: async (root, { service }) => {
      const { dataValues } = await Service.findOne({ where: { id: service, status: true } })
      const { proposed_execution_date, finish_execution_date } = dataValues
      const start = new Date(proposed_execution_date)
      const end = new Date(finish_execution_date)
      start.setUTCHours(23, 59, 59, 999)
      end.setUTCHours(23, 59, 59, 999)
      const services = await Service.findAll({
        where: {
          status: true,
          [Op.or]: [
            {
              finish_execution_date: {
                [Op.between]: [start, end]
              }
            },
            {
              proposed_execution_date: {
                [Op.between]: [start, end]
              }
            },
            {
              [Op.and]: [
                {
                  finish_execution_date: {
                    [Op.gte]: end
                  }
                },
                {
                  proposed_execution_date: {
                    [Op.lte]: start
                  }
                }
              ]
            }
          ]
        }
      })
      const servicesIds = services.map(({dataValues})=>dataValues)
      const staff = await ServiceXStaff.findAll({where :{ service: servicesIds.map(({id})=>id)}})
      const staffIds = staff.map(({dataValues})=>dataValues)
      // traer staff disponible
      return await Staff.findAll({
        where: {
          status: true,
          id: {
            [Op.notIn]: staffIds.map(({staff}) => staff)
          }
        }
      })
    }
  },
  Mutation: {
    addStaff: async (
      root,
      { person, position, admission_date, dismissal_date, status }
    ) => {
      return await Staff.create({
        person,
        position,
        admission_date,
        dismissal_date,
        status
      })
    }
  },
  Staff: {
    person: async ({ person }) => {
      return await Person.findOne({ where: { id: person} })
    },
    position: async ({ position }) => {
      return await Position.findOne({ where: { name: position } })
    },
    services: async ({ id }) => {
      const servicesIds = await ServiceXStaff.findAll({
        where: { staff: id, status: true }
      })
      return await Service.findAll({
        where: {
          id: servicesIds.map(({ service }) => service),
          status: true
        }
      })
    },
    milestones: async ({id}) =>{ 
      return await Milestone.findAll({where:{ staff: id, status: true}})
    }
  }
}
