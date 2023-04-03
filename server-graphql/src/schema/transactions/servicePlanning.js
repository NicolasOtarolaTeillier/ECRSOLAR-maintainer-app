import { sequelize } from '../../database/database.js'

import { ServiceXEquipment } from '../../models/ServiceXEquipment.js'
import { ServiceXStaff } from '../../models/ServiceXStaff.js'
import { ServiceXCar } from '../../models/ServiceXCar.js'


// definitions graphql
export const typeDefs = `#graphql

extend type Mutation {
    servicePlanning(
      service: ID!
      staffs: [Int!]
      leader: Int!
      equipments: [Int!]
      cars: [String!]
    ): String!
  }
`

export const resolvers = {
  Mutation: {
    servicePlanning: async (
      _,
      { service, staffs, leader, equipments, cars }
    ) => {
      // Inicia una transacción
      return sequelize.transaction(async t => {
        try {
          // service x staff
          const staffRecords = staffs.map(s => ({service: service, staff: s, leader: leader === s ? true : false}))
          await ServiceXStaff.bulkCreate(staffRecords, { transaction: t })

          // service x equipment
          const equipmentRecords = equipments.map(e => ({service: service, equipment: e}))
          await ServiceXEquipment.bulkCreate(equipmentRecords, {transaction: t})

          // servcice x car
          const carRecords = cars.map(c => ({ service: service, car: c }))
          await ServiceXCar.bulkCreate(carRecords, { transaction: t })

          return 'Success'
        } catch (error) {
          t.rollback()
          throw new Error(
            'Error added information to servicePlanning: ' + error.message
          )
        }
      })
    }
  }
}
