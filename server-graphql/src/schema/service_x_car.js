import { Car } from '../models/Car.js'
import { ServiceXCar } from '../models/ServiceXCar.js'
import { Service } from '../models/Service.js'

// definitions graphql
export const typeDefs = `#graphql

type NewServiceXCar {
    service: ID!
    car: String!
    status: Boolean
}

type ServiceXCar {
    service: Service!
    car: Car!
    status: Boolean
}

extend type Query {
    allServiceXCars: [ServiceXCar!]
}

extend type Mutation {
    addServiceXCar(
        service: ID!
        car: Int!
    ): NewServiceXCar!
}
`

export const resolvers = {
  Query: {
    allServiceXCars: async () => {
      return await ServiceXCar.findAll()
    }
  },
  Mutation: {
    addServiceXCar: async (root, { service, car }) => {
      return await ServiceXCar.create({
        service,
        car,
      })
    }
  },
  ServiceXCar :{
    car: async ({ car }) => {
        return await Car.findOne({
          where: { license_plate: car }
        })
      },
    service: async ({ service }) => {
        return await Service.findOne({
          where: { id: service }
        })
    }

  }
}
