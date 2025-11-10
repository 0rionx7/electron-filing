import { faker } from '@faker-js/faker'

export type Case = {
  id: number
  firstName: string
  lastName: string
  date: Date
  amount: number
  region: string
  status: 'Resolved' | 'Process' | 'Canceled'
}

const range = (len: number): number[] => {
  return Array.from({ length: len }, (_, i) => i)
}

const newCase = (): Case => {
  return {
    id: faker.number.int(100),
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    date: faker.date.anytime(),
    amount: faker.number.int(1000),
    region: faker.location.country(),
    status: faker.helpers.shuffle<Case['status']>(['Resolved', 'Process', 'Canceled'])[0]!
  }
}

export function makeData(...lens: number[]): Case[] {
  const makeDataLevel = (depth = 0): Case[] => {
    const len = lens[depth]!
    return range(len).map((): Case => {
      return {
        ...newCase()
        // subRows: lens[depth + 1] ? makeDataLevel(depth + 1) : undefined
      }
    })
  }
  return makeDataLevel()
}
