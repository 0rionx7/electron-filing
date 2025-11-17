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

export const cases = [
  {
    id: 19,
    firstName: 'Alan',
    lastName: 'Pacocha',
    date: '2025-05-03T14:04:19.924Z',
    amount: 251,
    region: 'Nauru',
    status: 'Canceled'
  },
  {
    id: 11,
    firstName: 'Amalia',
    lastName: 'Upton',
    date: '2026-01-04T21:28:10.927Z',
    amount: 643,
    region: 'Mauritania',
    status: 'Resolved'
  },
  {
    id: 11,
    firstName: 'Archibald',
    lastName: 'Schamberger',
    date: '2025-07-19T21:40:33.614Z',
    amount: 226,
    region: 'Saint Barthelemy',
    status: 'Resolved'
  },
  {
    id: 52,
    firstName: 'Arnoldo',
    lastName: 'Wunsch',
    date: '2025-08-26T18:57:31.886Z',
    amount: 352,
    region: 'Brazil',
    status: 'Resolved'
  },
  {
    id: 95,
    firstName: 'Bernhard',
    lastName: 'Weissnat',
    date: '2025-08-26T00:18:15.185Z',
    amount: 20,
    region: 'Guyana',
    status: 'Resolved'
  },
  {
    id: 7,
    firstName: 'Brenden',
    lastName: 'Koelpin',
    date: '2024-12-25T13:51:04.532Z',
    amount: 126,
    region: 'Sint Maarten',
    status: 'Canceled'
  },
  {
    id: 69,
    firstName: 'Brent',
    lastName: 'Homenick',
    date: '2025-02-05T16:32:35.124Z',
    amount: 64,
    region: 'Ukraine',
    status: 'Canceled'
  },
  {
    id: 79,
    firstName: 'Brook',
    lastName: 'Wyman',
    date: '2025-01-13T04:44:16.435Z',
    amount: 839,
    region: 'Guyana',
    status: 'Resolved'
  },
  {
    id: 45,
    firstName: 'Carmel',
    lastName: 'Morissette',
    date: '2025-04-25T00:03:01.394Z',
    amount: 838,
    region: 'Republic of Korea',
    status: 'Resolved'
  },
  {
    id: 40,
    firstName: 'Courtney',
    lastName: 'Moore',
    date: '2026-01-08T09:00:54.000Z',
    amount: 45,
    region: 'United States of America',
    status: 'Canceled'
  },
  {
    id: 53,
    firstName: 'Cristina',
    lastName: 'Dach',
    date: '2025-01-13T16:54:32.186Z',
    amount: 500,
    region: 'Singapore',
    status: 'Process'
  },
  {
    id: 81,
    firstName: 'Cristina',
    lastName: 'Wunsch',
    date: '2024-11-28T04:01:16.024Z',
    amount: 491,
    region: 'New Zealand',
    status: 'Canceled'
  },
  {
    id: 75,
    firstName: 'Cynthia',
    lastName: 'Hammes-Hilpert',
    date: '2025-08-02T02:44:28.045Z',
    amount: 153,
    region: 'Iran',
    status: 'Process'
  },
  {
    id: 16,
    firstName: 'Damion',
    lastName: 'Kozey',
    date: '2026-10-23T08:30:43.514Z',
    amount: 394,
    region: 'Kuwait',
    status: 'Resolved'
  },
  {
    id: 31,
    firstName: 'Danika',
    lastName: 'Hegmann',
    date: '2025-11-14T06:57:42.947Z',
    amount: 793,
    region: 'Norfolk Island',
    status: 'Process'
  },
  {
    id: 21,
    firstName: 'Daphne',
    lastName: 'Mueller-Fritsch',
    date: '2025-02-02T13:31:20.167Z',
    amount: 801,
    region: 'Nauru',
    status: 'Canceled'
  },
  {
    id: 87,
    firstName: 'Darrion',
    lastName: 'Ebert-Wunsch',
    date: '2025-12-26T22:35:08.584Z',
    amount: 751,
    region: 'Slovakia',
    status: 'Process'
  },
  {
    id: 73,
    firstName: 'Dedric',
    lastName: 'Luettgen',
    date: '2026-04-18T06:33:49.175Z',
    amount: 477,
    region: 'Egypt',
    status: 'Resolved'
  },
  {
    id: 67,
    firstName: 'Dejah',
    lastName: 'Von',
    date: '2024-11-23T13:00:00.434Z',
    amount: 630,
    region: 'Vietnam',
    status: 'Resolved'
  },
  {
    id: 46,
    firstName: 'Dominic',
    lastName: 'Ortiz',
    date: '2026-05-06T04:20:59.894Z',
    amount: 863,
    region: 'Netherlands',
    status: 'Canceled'
  },
  {
    id: 30,
    firstName: 'Earnest',
    lastName: 'Fadel',
    date: '2026-01-11T11:50:58.266Z',
    amount: 725,
    region: 'Algeria',
    status: 'Resolved'
  },
  {
    id: 88,
    firstName: 'Effie',
    lastName: 'Bashirian',
    date: '2026-01-23T16:18:36.603Z',
    amount: 266,
    region: 'Argentina',
    status: 'Canceled'
  },
  {
    id: 85,
    firstName: 'Efrain',
    lastName: 'Fritsch',
    date: '2025-10-30T19:13:40.306Z',
    amount: 851,
    region: 'Cayman Islands',
    status: 'Process'
  },
  {
    id: 57,
    firstName: 'Elfrieda',
    lastName: 'Osinski-Berge',
    date: '2025-06-05T03:31:32.558Z',
    amount: 151,
    region: 'Belarus',
    status: 'Canceled'
  },
  {
    id: 67,
    firstName: 'Elisa',
    lastName: 'Ritchie',
    date: '2024-12-17T02:54:26.996Z',
    amount: 638,
    region: 'Martinique',
    status: 'Canceled'
  },
  {
    id: 44,
    firstName: 'Elisha',
    lastName: 'Lang',
    date: '2025-07-17T08:55:02.957Z',
    amount: 106,
    region: 'Bangladesh',
    status: 'Process'
  },
  {
    id: 68,
    firstName: 'Emmanuelle',
    lastName: 'Schiller',
    date: '2025-01-13T00:34:54.810Z',
    amount: 964,
    region: 'United States of America',
    status: 'Resolved'
  },
  {
    id: 11,
    firstName: 'Erich',
    lastName: 'Wisozk',
    date: '2026-03-22T20:15:10.486Z',
    amount: 458,
    region: 'Curacao',
    status: 'Process'
  },
  {
    id: 59,
    firstName: 'Ernie',
    lastName: 'Glover',
    date: '2025-12-14T06:51:54.679Z',
    amount: 646,
    region: 'Belgium',
    status: 'Canceled'
  },
  {
    id: 24,
    firstName: 'Evalyn',
    lastName: 'Mosciski',
    date: '2025-07-25T18:57:19.475Z',
    amount: 744,
    region: 'New Zealand',
    status: 'Resolved'
  },
  {
    id: 51,
    firstName: 'Fausto',
    lastName: 'Wolff',
    date: '2026-03-06T05:49:45.764Z',
    amount: 391,
    region: 'Slovenia',
    status: 'Process'
  },
  {
    id: 40,
    firstName: 'Freda',
    lastName: 'Stracke',
    date: '2025-11-01T07:29:29.263Z',
    amount: 374,
    region: 'Grenada',
    status: 'Canceled'
  },
  {
    id: 14,
    firstName: 'Freda',
    lastName: 'Wolf',
    date: '2025-11-17T21:53:57.370Z',
    amount: 445,
    region: 'Germany',
    status: 'Canceled'
  },
  {
    id: 93,
    firstName: 'Frederique',
    lastName: 'Lang',
    date: '2026-09-07T13:30:22.645Z',
    amount: 405,
    region: 'Curacao',
    status: 'Resolved'
  },
  {
    id: 40,
    firstName: 'Fredrick',
    lastName: 'Gislason',
    date: '2024-11-27T07:07:14.326Z',
    amount: 905,
    region: 'Guadeloupe',
    status: 'Resolved'
  },
  {
    id: 44,
    firstName: 'Garnett',
    lastName: 'Hyatt',
    date: '2024-11-18T01:58:48.847Z',
    amount: 466,
    region: "Cote d'Ivoire",
    status: 'Resolved'
  },
  {
    id: 3,
    firstName: 'Geovanni',
    lastName: 'Zulauf',
    date: '2026-01-11T17:04:12.596Z',
    amount: 62,
    region: 'Turks and Caicos Islands',
    status: 'Canceled'
  },
  {
    id: 33,
    firstName: 'Geovany',
    lastName: 'Waelchi',
    date: '2025-05-12T16:11:15.199Z',
    amount: 769,
    region: 'Ghana',
    status: 'Resolved'
  },
  {
    id: 12,
    firstName: 'Glennie',
    lastName: 'Kirlin',
    date: '2025-06-22T14:16:10.097Z',
    amount: 286,
    region: 'Hong Kong',
    status: 'Resolved'
  },
  {
    id: 93,
    firstName: 'Gust',
    lastName: 'Simonis',
    date: '2026-07-31T04:56:04.840Z',
    amount: 922,
    region: 'Croatia',
    status: 'Resolved'
  },
  {
    id: 88,
    firstName: 'Hans',
    lastName: 'Konopelski-Hegmann',
    date: '2026-08-27T20:16:46.709Z',
    amount: 965,
    region: 'Lebanon',
    status: 'Resolved'
  },
  {
    id: 0,
    firstName: 'Hilma',
    lastName: 'Trantow',
    date: '2025-10-04T16:30:40.355Z',
    amount: 271,
    region: 'Argentina',
    status: 'Resolved'
  },
  {
    id: 63,
    firstName: 'Hyman',
    lastName: 'Brekke',
    date: '2026-07-08T18:22:09.066Z',
    amount: 934,
    region: 'Gabon',
    status: 'Canceled'
  },
  {
    id: 10,
    firstName: 'Jaleel',
    lastName: 'Dach',
    date: '2025-06-07T03:59:04.151Z',
    amount: 202,
    region: 'Botswana',
    status: 'Canceled'
  },
  {
    id: 24,
    firstName: 'Jaleel',
    lastName: 'Homenick',
    date: '2026-05-04T01:48:40.084Z',
    amount: 125,
    region: 'Bolivia',
    status: 'Process'
  },
  {
    id: 36,
    firstName: 'Janick',
    lastName: 'Pagac',
    date: '2026-02-22T11:17:09.344Z',
    amount: 391,
    region: 'Russian Federation',
    status: 'Resolved'
  },
  {
    id: 66,
    firstName: 'Jaylon',
    lastName: 'Ritchie',
    date: '2025-01-07T13:36:18.785Z',
    amount: 156,
    region: 'Vanuatu',
    status: 'Canceled'
  },
  {
    id: 98,
    firstName: 'Jayme',
    lastName: 'Runolfsson',
    date: '2025-12-05T21:40:12.089Z',
    amount: 560,
    region: 'Morocco',
    status: 'Canceled'
  },
  {
    id: 22,
    firstName: 'Jedediah',
    lastName: 'Franey',
    date: '2025-03-23T17:25:46.056Z',
    amount: 261,
    region: 'Central African Republic',
    status: 'Process'
  },
  {
    id: 16,
    firstName: 'Jeffery',
    lastName: 'Kirlin',
    date: '2025-11-29T23:31:04.224Z',
    amount: 632,
    region: "Cote d'Ivoire",
    status: 'Resolved'
  },
  {
    id: 32,
    firstName: 'Jovany',
    lastName: 'Franecki',
    date: '2026-04-07T09:53:38.203Z',
    amount: 251,
    region: 'Oman',
    status: 'Process'
  },
  {
    id: 10,
    firstName: 'Juana',
    lastName: 'Halvorson',
    date: '2026-08-01T11:29:03.238Z',
    amount: 534,
    region: 'Cameroon',
    status: 'Process'
  },
  {
    id: 70,
    firstName: 'Kaelyn',
    lastName: 'Franey',
    date: '2026-05-20T15:58:52.647Z',
    amount: 594,
    region: 'Azerbaijan',
    status: 'Resolved'
  },
  {
    id: 61,
    firstName: 'Kamren',
    lastName: 'Orn',
    date: '2026-02-14T06:56:01.764Z',
    amount: 32,
    region: 'Dominican Republic',
    status: 'Process'
  },
  {
    id: 70,
    firstName: 'Karelle',
    lastName: 'Zemlak',
    date: '2026-11-05T08:08:02.646Z',
    amount: 25,
    region: 'Uzbekistan',
    status: 'Process'
  },
  {
    id: 52,
    firstName: 'Katlynn',
    lastName: 'McDermott',
    date: '2026-11-07T07:16:03.701Z',
    amount: 775,
    region: 'Tokelau',
    status: 'Resolved'
  },
  {
    id: 73,
    firstName: 'Kelley',
    lastName: 'Orn',
    date: '2025-01-23T06:00:56.723Z',
    amount: 410,
    region: 'Falkland Islands (Malvinas)',
    status: 'Resolved'
  },
  {
    id: 34,
    firstName: 'Kirk',
    lastName: 'Jast',
    date: '2025-04-10T11:07:16.691Z',
    amount: 927,
    region: 'Ghana',
    status: 'Canceled'
  },
  {
    id: 10,
    firstName: 'Kristopher',
    lastName: 'Hane',
    date: '2025-08-07T18:06:58.786Z',
    amount: 949,
    region: 'Bhutan',
    status: 'Process'
  },
  {
    id: 48,
    firstName: 'Lambert',
    lastName: 'Wuckert',
    date: '2025-12-23T02:50:15.694Z',
    amount: 165,
    region: 'Tanzania',
    status: 'Process'
  },
  {
    id: 72,
    firstName: 'Laurel',
    lastName: 'Reichert',
    date: '2025-01-18T03:53:39.760Z',
    amount: 949,
    region: 'Guyana',
    status: 'Resolved'
  },
  {
    id: 31,
    firstName: 'Laverna',
    lastName: 'Stehr',
    date: '2026-09-10T18:26:11.224Z',
    amount: 738,
    region: 'Niger',
    status: 'Canceled'
  },
  {
    id: 33,
    firstName: 'Lenore',
    lastName: 'Hirthe',
    date: '2025-06-25T02:50:03.671Z',
    amount: 175,
    region: 'Israel',
    status: 'Process'
  },
  {
    id: 43,
    firstName: 'Lillian',
    lastName: 'Witting',
    date: '2024-11-25T23:05:10.035Z',
    amount: 383,
    region: 'Dominican Republic',
    status: 'Resolved'
  },
  {
    id: 43,
    firstName: 'Malachi',
    lastName: 'Rippin',
    date: '2026-07-17T00:22:23.972Z',
    amount: 883,
    region: 'Mayotte',
    status: 'Canceled'
  },
  {
    id: 84,
    firstName: 'Mara',
    lastName: 'Swift',
    date: '2025-01-28T03:17:02.331Z',
    amount: 929,
    region: 'Madagascar',
    status: 'Process'
  },
  {
    id: 26,
    firstName: 'Marty',
    lastName: 'Kohler',
    date: '2026-05-05T05:47:40.051Z',
    amount: 787,
    region: 'Isle of Man',
    status: 'Process'
  },
  {
    id: 81,
    firstName: 'Mary',
    lastName: 'Streich',
    date: '2025-01-14T22:26:28.105Z',
    amount: 396,
    region: 'Anguilla',
    status: 'Resolved'
  },
  {
    id: 56,
    firstName: 'Mathilde',
    lastName: 'Runolfsdottir',
    date: '2026-08-19T13:16:26.310Z',
    amount: 881,
    region: 'Vanuatu',
    status: 'Resolved'
  },
  {
    id: 66,
    firstName: 'Maurice',
    lastName: 'Vandervort',
    date: '2026-10-24T06:24:36.473Z',
    amount: 688,
    region: 'Greece',
    status: 'Canceled'
  },
  {
    id: 77,
    firstName: 'Mavis',
    lastName: 'Ebert',
    date: '2026-08-15T06:29:27.465Z',
    amount: 908,
    region: 'Bermuda',
    status: 'Canceled'
  },
  {
    id: 44,
    firstName: 'Mellie',
    lastName: "D'Amore-Cartwright",
    date: '2026-11-06T14:18:43.080Z',
    amount: 188,
    region: 'American Samoa',
    status: 'Canceled'
  },
  {
    id: 30,
    firstName: 'Montana',
    lastName: 'Kuhn',
    date: '2026-05-03T16:18:53.300Z',
    amount: 91,
    region: 'Mozambique',
    status: 'Process'
  },
  {
    id: 44,
    firstName: 'Napoleon',
    lastName: 'Pfannerstill',
    date: '2025-07-22T15:25:56.414Z',
    amount: 948,
    region: 'Cyprus',
    status: 'Process'
  },
  {
    id: 30,
    firstName: 'Nelda',
    lastName: 'Greenholt',
    date: '2025-04-10T11:08:42.784Z',
    amount: 893,
    region: 'Romania',
    status: 'Process'
  },
  {
    id: 90,
    firstName: 'Ocie',
    lastName: 'Abernathy',
    date: '2026-07-08T14:46:17.009Z',
    amount: 19,
    region: 'Venezuela',
    status: 'Canceled'
  },
  {
    id: 80,
    firstName: 'Ola',
    lastName: "O'Connell",
    date: '2025-09-05T23:32:14.817Z',
    amount: 275,
    region: 'Jamaica',
    status: 'Process'
  },
  {
    id: 95,
    firstName: 'Oleta',
    lastName: 'Wehner',
    date: '2026-10-23T06:24:03.761Z',
    amount: 696,
    region: 'Maldives',
    status: 'Resolved'
  },
  {
    id: 39,
    firstName: 'Ollie',
    lastName: 'Doyle',
    date: '2025-11-26T18:24:17.021Z',
    amount: 603,
    region: 'Tunisia',
    status: 'Resolved'
  },
  {
    id: 37,
    firstName: 'Orlo',
    lastName: 'Stoltenberg',
    date: '2025-03-27T04:14:20.844Z',
    amount: 541,
    region: "Democratic People's Republic of Korea",
    status: 'Canceled'
  },
  {
    id: 52,
    firstName: 'Oscar',
    lastName: 'Herman',
    date: '2025-11-10T16:03:47.535Z',
    amount: 661,
    region: 'Belarus',
    status: 'Process'
  },
  {
    id: 82,
    firstName: 'Otis',
    lastName: 'Mueller',
    date: '2025-02-24T05:03:39.442Z',
    amount: 745,
    region: 'Gabon',
    status: 'Process'
  },
  {
    id: 81,
    firstName: 'Ottis',
    lastName: 'Quitzon',
    date: '2024-11-26T04:26:54.510Z',
    amount: 449,
    region: 'Romania',
    status: 'Process'
  },
  {
    id: 34,
    firstName: 'Philip',
    lastName: 'Kihn',
    date: '2025-12-19T01:24:27.839Z',
    amount: 656,
    region: 'Kazakhstan',
    status: 'Canceled'
  },
  {
    id: 33,
    firstName: 'Piper',
    lastName: 'Purdy',
    date: '2026-03-04T07:55:29.093Z',
    amount: 564,
    region: 'Pitcairn Islands',
    status: 'Process'
  },
  {
    id: 25,
    firstName: 'Prince',
    lastName: 'Schinner',
    date: '2026-10-06T21:05:06.504Z',
    amount: 979,
    region: 'Mali',
    status: 'Process'
  },
  {
    id: 37,
    firstName: 'Rahul',
    lastName: 'Runte',
    date: '2026-08-09T16:19:54.774Z',
    amount: 624,
    region: 'American Samoa',
    status: 'Canceled'
  },
  {
    id: 79,
    firstName: 'Reggie',
    lastName: 'Cronin',
    date: '2025-09-28T20:06:27.947Z',
    amount: 472,
    region: 'Dominican Republic',
    status: 'Resolved'
  },
  {
    id: 21,
    firstName: 'Reva',
    lastName: 'Zulauf',
    date: '2026-01-11T18:36:26.276Z',
    amount: 338,
    region: 'Russian Federation',
    status: 'Canceled'
  },
  {
    id: 54,
    firstName: 'Reymundo',
    lastName: 'Parisian',
    date: '2025-03-16T06:50:44.972Z',
    amount: 408,
    region: 'Sri Lanka',
    status: 'Process'
  },
  {
    id: 87,
    firstName: 'Rhiannon',
    lastName: 'Dickens',
    date: '2025-08-09T05:48:39.065Z',
    amount: 603,
    region: 'Aruba',
    status: 'Process'
  },
  {
    id: 42,
    firstName: 'Rodolfo',
    lastName: 'Greenfelder',
    date: '2026-02-02T07:26:41.948Z',
    amount: 79,
    region: 'Cambodia',
    status: 'Process'
  },
  {
    id: 23,
    firstName: 'Rodrigo',
    lastName: 'Padberg',
    date: '2026-10-26T20:09:55.984Z',
    amount: 67,
    region: 'Guernsey',
    status: 'Process'
  },
  {
    id: 85,
    firstName: 'Rose',
    lastName: 'Gorczany',
    date: '2026-03-07T15:16:20.048Z',
    amount: 510,
    region: 'Turkey',
    status: 'Resolved'
  },
  {
    id: 67,
    firstName: 'Rubye',
    lastName: 'Beer',
    date: '2026-09-28T09:19:01.180Z',
    amount: 175,
    region: 'Somalia',
    status: 'Resolved'
  },
  {
    id: 92,
    firstName: 'Ryan',
    lastName: 'Homenick',
    date: '2026-06-28T17:34:34.619Z',
    amount: 236,
    region: 'Kyrgyz Republic',
    status: 'Canceled'
  },
  {
    id: 23,
    firstName: 'Suzanne',
    lastName: 'Macejkovic',
    date: '2024-12-26T05:26:21.823Z',
    amount: 199,
    region: 'Argentina',
    status: 'Resolved'
  },
  {
    id: 21,
    firstName: 'Victor',
    lastName: 'Rempel',
    date: '2026-09-23T13:19:18.592Z',
    amount: 922,
    region: 'Georgia',
    status: 'Process'
  },
  {
    id: 70,
    firstName: 'Xander',
    lastName: 'Bailey',
    date: '2026-04-12T23:15:08.633Z',
    amount: 847,
    region: 'Kiribati',
    status: 'Resolved'
  },
  {
    id: 54,
    firstName: 'Zoie',
    lastName: 'Boyer',
    date: '2025-04-21T21:15:59.222Z',
    amount: 558,
    region: 'South Georgia and the South Sandwich Islands',
    status: 'Resolved'
  }
]
