import { sequelize } from '../../database/database.js'

import { ServiceXEquipment } from '../../models/ServiceXEquipment.js'
import { ServiceXStaff } from '../../models/ServiceXStaff.js'
import { ServiceXCar } from '../../models/ServiceXCar.js'
import { Service } from '../../models/Service.js'


// definitions graphql
export const typeDefs = `#graphql

extend type Mutation {
    servicePlanning(
      service: ID!
      staffs: [Int!]
      leader: Int!
      equipments: [Int!]
      cars: [String!]
      step: Int!
    ): String!
  }
`

export const resolvers = {
  Mutation: {
    servicePlanning: async (
      _,
      { service, staffs, leader, equipments, cars,step }
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

          // servcice 
          const updatedService = await Service.update(
            { step: step },
            {
              where: { id: service },
              transaction: t,
            }
          );
          if (updatedService[0] === 0) {
            throw new Error('No se pudo actualizar el registro de Service');
          }

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
