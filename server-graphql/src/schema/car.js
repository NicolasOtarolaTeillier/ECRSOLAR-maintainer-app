import { Car } from '../models/Car.js'

// definitions graphql
export const typeDefs = `#graphql

type Car {
    color: String
    make: String
    model: String
    license_plate: String!
    status: Boolean
}

extend type Query {
    allCars: [Car!]
}

extend type Mutation {
    addCar(
        color: String
        make: String
        model: String
        license_plate: String!
    ): Car!
}
`

export const resolvers = {
  Query: {
    allCars: async () => {
      return await Car.findAll()
    }
  },
  Mutation: {
    addCar: async (root, { color, make, model, license_plate }) => {
      return await Car.create({
        color,
        make,
        model,
        license_plate
      })
    }
  }
}
