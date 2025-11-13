import { faker } from '@faker-js/faker'

export type Place = {
  id: number
  name: string
}

const range = (len: number): number[] => {
  return Array.from({ length: len }, (_, i) => i)
}

const newPlace = (count: number): Place => {
  return {
    id: faker.number.int(count),
    name: faker.location.country()
  }
}

export function makeData(count: number): Place[] {
  return range(count).map((): Place => {
    return {
      ...newPlace(count)
    }
  })
}
