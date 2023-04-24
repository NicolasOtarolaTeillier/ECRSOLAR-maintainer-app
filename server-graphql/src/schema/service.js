import { Service } from '../models/Service.js'
import { ServiceType } from '../models/ServiceType.js'
import { Customer } from '../models/Customer.js'
import { PhotovoltaicPowerStation } from '../models/PhotovoltaicPowerStation.js'
import { Contact } from '../models/Contact.js'
import { ServiceXStaff } from '../models/ServiceXStaff.js'
import { ServiceXCar } from '../models/ServiceXCar.js'
import { Staff } from '../models/Staff.js'
import { Car } from '../models/Car.js'

// definitions graphql
export const typeDefs = `#graphql

  type NewService {
    id: ID!
    purchase_order: Int!
    contract: Boolean!
    price: Int!
    proposed_execution_date: String!
    finish_execution_date: String!
    service_type: String!
    customer: String!
    contact: Int!
    photovoltaic_power_station: String!
    step: Int!
    status: Boolean!
  }

  type Service {
    id: ID!
    purchase_order: Int!
    contract: Boolean!
    price: Int!
    proposed_execution_date: String!
    finish_execution_date: String!
    service_type: ServiceType!
    customer: Customer!
    contact: Contact!
    photovoltaic_power_station: PhotovoltaicPowerStation!
    step: Int!
    status: Boolean!
    leader: Staff
    car: [Car!]
    staff: [Staff!]
  }

  extend type Query {
    allServices: [Service!]
    servicesCount: Int!
    findService(id: ID!): Service
  }

 extend type Mutation {
    addService(
      purchase_order: Int!
      contract: Boolean!
      price: Int!
      proposed_execution_date: String!
      finish_execution_date: String!
      service_type: String!
      customer: String!
      contact: Int!
      photovoltaic_power_station: String!
      step: Int
      status: Boolean
    ): NewService!
 }
`

// resolvers graphql
export const resolvers = {
  Query: {
    allServices: async () => {
      return await Service.findAll({
        where: { status: true },
        order: [['createdAt', 'ASC']]
      })
    },
    servicesCount: async () => {
      return await Service.count()
    },
    findService: async (root, { id }) => {
      try {
        const service = await Service.findByPk(id)
        if (!service) {
          throw new Error(`No service was found with the id: ${id}`)
        }
        return service
      } catch (err) {
        console.error(err)
        throw err
      }
    }
  },
  Mutation: {
    addService: async (
      root,
      {
        purchase_order,
        contract,
        price,
        proposed_execution_date,
        finish_execution_date,
        service_type,
        customer,
        photovoltaic_power_station,
        contact
      }
    ) => {
      const existContact = await Contact.findOne({ where: { id: contact } })
      if (!existContact) {
        throw new Error(`Contact no exists.`)
      }

      const existPhotovoltaicPowerStation =
        await PhotovoltaicPowerStation.findOne({
          where: { name: photovoltaic_power_station }
        })
      if (!existPhotovoltaicPowerStation) {
        throw new Error(`Photovoltaic Power Station no exists.`)
      }

      const existCustomer = await Customer.findOne({
        where: { name: customer }
      })
      if (!existCustomer) {
        throw new Error(`Customer no exists.`)
      }

      const existServiceType = await ServiceType.findOne({
        where: { name: service_type }
      })
      if (!existServiceType) {
        throw new Error(`Service Type no exists.`)
      }

      const duplicateService = await Service.findOne({
        where: {
          purchase_order,
          contract,
          price,
          proposed_execution_date,
          service_type
        }
      })
      if (duplicateService) {
        throw new Error(
          `Service already exists, with id: ${duplicateService.id}`
        )
      } else {
        return await Service.create({
          purchase_order,
          contract,
          price,
          proposed_execution_date,
          finish_execution_date,
          service_type,
          customer,
          photovoltaic_power_station,
          contact
        })
      }
    }
  },
  Service: {
    customer: async ({ customer }) => {
      return await Customer.findOne({ where: { name: customer } })
    },
    photovoltaic_power_station: async ({ photovoltaic_power_station }) => {
      return await PhotovoltaicPowerStation.findOne({
        where: { name: photovoltaic_power_station }
      })
    },
    service_type: async ({ service_type }) => {
      return await ServiceType.findOne({ where: { name: service_type } })
    },
    contact: async ({ contact }) => {
      return await Contact.findOne({ where: { id: contact } })
    },
    leader: async ({ id }) => {
      // buscar el id del staff que en leader === true dado que viene del serviceXStaff que contiene el service == id
      const staffIds = await ServiceXStaff.findAll({
        where: { service: id, leader: true }
      })
      // return staff
      return await Staff.findOne({
        where: { id: staffIds.map(({ staff }) => staff) }
      })
    },
    car: async ({ id }) => {
      const carIds = await ServiceXCar.findAll({
        where: { service: id }
      })
      return await Car.findAll({
        where: { license_plate: carIds.map(({ car }) => car) }
      })
    },
    staff: async ({ id }) => {
      const staffIds = await ServiceXStaff.findAll({
        where: { service: id }
      })
      console.log(
        await Staff.findAll({
          where: { id: staffIds.map(({ staff }) => staff) }
        })
      )
      return await Staff.findAll({
        where: { id: staffIds.map(({ staff }) => staff) }
      })
    }
  }
}
