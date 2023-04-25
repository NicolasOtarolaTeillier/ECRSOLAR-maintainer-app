import { sequelize } from '../../database/database.js'
import { ServiceXStaff } from '../../models/ServiceXStaff.js'


// definitions graphql
export const typeDefs = `#graphql

extend type Mutation {
    changeServiceXStaff(
      service_old: ID!
      service_new: ID!
      staff: Int!
    ): String!
  }
`

export const resolvers = {
    Mutation: {
        changeServiceXStaff: async (
            _,
            { service_old, service_new, staff }
        ) => {
            // Inicia una transacción
            return sequelize.transaction(async t => {

                try {
                    // service_old comprobar si no es leder de ese servicio el staff 
                    const dataServiceXStaff = await ServiceXStaff.findOne({ where: { staff: staff, service: service_old } })
                    const { dataValues } = dataServiceXStaff
                    const { leader, id } = dataValues
                    if (leader) {
                        throw new Error(
                            'Error, is leader: '
                        )
                    }
                    else {
                        // service_old desactivar registro
                        await ServiceXStaff.update(
                            { status: false },
                            {
                                where: { id: id },
                                transaction: t,
                            }
                        );
                    }
                    // id_new si existe reigstro entonces actualiza el servicio, 
                    const duplicate = await ServiceXStaff.findOne({ where: { staff: staff, service: service_new } })
                    if (duplicate) {
                        await ServiceXStaff.update(
                            { status: true },
                            {
                                where: { service: service_new, staff: staff },
                                transaction: t,
                            }
                        );
                    }
                    //sino crea uno
                    else {                        
                        await ServiceXStaff.create({ staff: staff, service: service_new }, { transaction: t, })
                    }
                    return 'Success'
                } catch (error) {
                    t.rollback()
                    throw new Error(
                        'Error change services: ' + error.message
                    )
                }
            })
        }
    }
}
