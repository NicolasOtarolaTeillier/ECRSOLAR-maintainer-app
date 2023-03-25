import { PhotovoltaicPowerStation } from '../models/PhotovoltaicPowerStation.js'
import { Customer } from '../models/Customer.js'

// definitions graphql
export const typeDefs = `#graphql
  type NewPhotovoltaicPowerStation {
    id: Int!
    name: String!
    strings: Int!
    modules: Int!
    module_size: String!
    hectares: Int!
    investor_brand: String!
    module_brand: String!
    mw: Float!
    owner: String!
    manager_name: String!
    customer: String!
    manager_number: String!
    status: Boolean
  }

  type PhotovoltaicPowerStation {
    id: Int!
    name: String!
    strings: Int!
    modules: Int!
    module_size: String!
    hectares: Int!
    investor_brand: String!
    module_brand: String!
    mw: Float!
    owner: String!
    manager_name: String!
    customer: Customer!
    manager_number: String!
    status: Boolean!
  }

  extend type Query {
    allPhotovoltaicPowerStations: [PhotovoltaicPowerStation!]
  }

  extend type Mutation {
    addPhotovoltaicPowerStation(
       name: String!
       strings: Int!
       modules: Int!
       module_size: String!
       hectares: Int!
       investor_brand: String!
       module_brand: String!
       mw: Float!
       owner: String!
       manager_name: String!
       customer: String!
       manager_number: String!
       status: Boolean
   ): NewPhotovoltaicPowerStation
 }
`
// resolvers graphql
export const resolvers = {
  Query: {
    allPhotovoltaicPowerStations: async () => {
      return await PhotovoltaicPowerStation.findAll({
        order: [['name', 'ASC']]
      })
    }
  },
  Mutation: {
    addPhotovoltaicPowerStation: async (
      root,
      {
        name,
        strings,
        modules,
        module_size,
        hectares,
        investor_brand,
        module_brand,
        mw,
        owner,
        manager_name,
        customer,
        manager_number,
        status
      }
    ) => {
      const photovoltaic_power_station = await PhotovoltaicPowerStation.findOne(
        { where: { name } }
      )
      if (photovoltaic_power_station) {
        throw new Error(
          `Photovoltaic Power Station already exists whit the name: ${name}`
        )
      } else {
        return await PhotovoltaicPowerStation.create({
          name,
          strings,
          modules,
          module_size,
          hectares,
          investor_brand,
          module_brand,
          mw,
          owner,
          manager_name,
          customer,
          manager_number,
          status
        })
      }
    }
  },
  PhotovoltaicPowerStation: {
    customer: async ({ customer }) => {
      return await Customer.findOne({ where: { name: customer } })
    }
  }
}
