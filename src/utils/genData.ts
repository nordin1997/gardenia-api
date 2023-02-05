import { faker } from '@faker-js/faker'

export const genData = (rows: number) => {
  return Array.from(Array(rows), (item, index) => {
    return {
      id: index + 1,
      issueId: faker.random.alphaNumeric,
      name: faker.company.name(),
      dateRegistered: faker.date.recent(),
      ownerName: faker.name.fullName(),
      address: faker.address.cityName(),
      phoneNumber: faker.phone.number()
    }
  }
  )
}