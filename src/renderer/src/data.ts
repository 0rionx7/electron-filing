import { GeolocationEntity } from '@renderer/slices/geolocationsSlice'

export const regions: GeolocationEntity[] = [
  { label: 'North America', value: 'na', renders: ['us', 'ca', 'mx'] },
  { label: 'Europe', value: 'eu', renders: ['uk', 'de', 'fr'] },
  { label: 'Asia Pacific', value: 'apac', renders: ['jp', 'au', 'sg'] },
  { label: 'South America', value: 'sa', renders: ['br'] }
  // { label: 'Middle East', value: 'me', renders: ['ae'] },
  // { label: 'Africa', value: 'af', renders: ['za'] },
  // { label: 'Central America', value: 'ca_region', renders: ['cr'] },
  // { label: 'Eastern Europe', value: 'ee', renders: ['pl'] },
  // { label: 'Southeast Asia', value: 'sea', renders: ['th'] },
  // { label: 'Caribbean', value: 'cb', renders: ['jm'] }
]

export const countries: GeolocationEntity[] = [
  { label: 'United States', value: 'us', renders: ['ny', 'ca_state', 'tx'] },
  { label: 'Canada', value: 'ca', renders: ['on', 'qc', 'bc'] },
  { label: 'Mexico', value: 'mx', renders: ['mx_city', 'jal'] },
  { label: 'United Kingdom', value: 'uk', renders: ['lon', 'man'] },
  { label: 'Germany', value: 'de', renders: ['ber', 'mun'] },
  { label: 'France', value: 'fr', renders: ['par', 'lyo'] },
  { label: 'Japan', value: 'jp', renders: ['tok', 'osa'] },
  { label: 'Australia', value: 'au', renders: ['nsw', 'vic'] },
  { label: 'Singapore', value: 'sg', renders: ['sg_central'] },
  { label: 'Brazil', value: 'br', renders: ['sp', 'rj'] }
]

export const statesProvinces: GeolocationEntity[] = [
  { label: 'New York', value: 'ny', renders: ['nyc', 'buf', 'roc'] },
  { label: 'California', value: 'ca_state', renders: ['la', 'sf', 'sd'] },
  { label: 'Texas', value: 'tx', renders: ['hou', 'dal', 'aus'] },
  { label: 'Ontario', value: 'on', renders: ['tor', 'ott', 'ham'] },
  { label: 'Quebec', value: 'qc', renders: ['mtl', 'qc_city'] },
  { label: 'British Columbia', value: 'bc', renders: ['van', 'vic_city'] },
  { label: 'Mexico City', value: 'mx_city', renders: ['mxc'] },
  { label: 'Jalisco', value: 'jal', renders: ['gdl'] },
  { label: 'London', value: 'lon', renders: ['wm', 'cam'] },
  { label: 'Manchester', value: 'man', renders: ['mcr'] },
  { label: 'Berlin', value: 'ber', renders: ['brln'] },
  { label: 'Munich', value: 'mun', renders: ['mnch'] },
  { label: 'Paris', value: 'par', renders: ['prs'] },
  { label: 'Lyon', value: 'lyo', renders: ['lyn'] },
  { label: 'Tokyo', value: 'tok', renders: ['shib', 'shin', 'rap'] },
  { label: 'Osaka', value: 'osa', renders: ['osk'] },
  { label: 'New South Wales', value: 'nsw', renders: ['syd'] },
  { label: 'Victoria', value: 'vic', renders: ['mel'] },
  { label: 'Central Singapore', value: 'sg_central', renders: ['sgc'] },
  { label: 'São Paulo', value: 'sp', renders: ['sp_city'] },
  { label: 'Rio de Janeiro', value: 'rj', renders: ['rio'] }
]

export const cities: GeolocationEntity[] = [
  {
    label: 'New York City',
    value: 'nyc',
    renders: ['nyc_manhattan', 'nyc_brooklyn', 'nyc_queens']
  },
  { label: 'Buffalo', value: 'buf', renders: ['buf_downtown', 'buf_north'] },
  { label: 'Rochester', value: 'roc', renders: ['roc_center'] },
  {
    label: 'Los Angeles',
    value: 'la',
    renders: ['la_downtown', 'la_hollywood', 'la_venice']
  },
  {
    label: 'San Francisco',
    value: 'sf',
    renders: ['sf_downtown', 'sf_mission']
  },
  { label: 'San Diego', value: 'sd', renders: ['sd_downtown'] },
  { label: 'Houston', value: 'hou', renders: ['hou_downtown', 'hou_uptown'] },
  { label: 'Dallas', value: 'dal', renders: ['dal_downtown'] },
  { label: 'Austin', value: 'aus', renders: ['aus_downtown'] },
  { label: 'Toronto', value: 'tor', renders: ['tor_downtown', 'tor_north'] },
  { label: 'Ottawa', value: 'ott', renders: ['ott_center'] },
  { label: 'Hamilton', value: 'ham', renders: ['ham_downtown'] },
  { label: 'Montreal', value: 'mtl', renders: ['mtl_downtown', 'mtl_plateau'] },
  { label: 'Quebec City', value: 'qc_city', renders: ['qc_old'] },
  { label: 'Vancouver', value: 'van', renders: ['van_downtown', 'van_kits'] },
  { label: 'Victoria City', value: 'vic_city', renders: ['vic_inner'] },
  { label: 'Mexico City', value: 'mxc', renders: ['mxc_centro'] },
  { label: 'Guadalajara', value: 'gdl', renders: ['gdl_centro'] },
  { label: 'Westminster', value: 'wm', renders: ['wm_west'] },
  { label: 'Camden', value: 'cam', renders: ['cam_town'] },
  { label: 'Manchester City', value: 'mcr', renders: ['mcr_center'] },
  { label: 'Berlin City', value: 'brln', renders: ['brln_mitte'] },
  { label: 'Munich City', value: 'mnch', renders: ['mnch_center'] },
  { label: 'Paris City', value: 'prs', renders: ['prs_marais'] },
  { label: 'Lyon City', value: 'lyn', renders: ['lyn_vieux'] },
  {
    label: 'Shibuya',
    value: 'shib',
    renders: ['shib_crossing', 'shib_harajuku']
  },
  { label: 'Shinjuku', value: 'shin', renders: ['shin_kabuki'] },
  { label: 'Roppongi', value: 'rap', renders: ['rap_hills'] },
  { label: 'Osaka City', value: 'osk', renders: ['osk_namba'] },
  { label: 'Sydney', value: 'syd', renders: ['syd_cbd'] },
  { label: 'Melbourne', value: 'mel', renders: ['mel_cbd'] },
  { label: 'Singapore Central', value: 'sgc', renders: ['sgc_marina'] },
  { label: 'São Paulo City', value: 'sp_city', renders: ['sp_paulista'] },
  { label: 'Rio City', value: 'rio', renders: ['rio_copa'] }
]

export const districts: GeolocationEntity[] = [
  { label: 'Manhattan', value: 'nyc_manhattan', renders: [] },
  { label: 'Brooklyn', value: 'nyc_brooklyn', renders: [] },
  { label: 'Queens', value: 'nyc_queens', renders: [] },
  { label: 'Buffalo Downtown', value: 'buf_downtown', renders: [] },
  { label: 'Buffalo North', value: 'buf_north', renders: [] },
  { label: 'Rochester Center', value: 'roc_center', renders: [] },
  { label: 'LA Downtown', value: 'la_downtown', renders: [] },
  { label: 'Hollywood', value: 'la_hollywood', renders: [] },
  { label: 'Venice Beach', value: 'la_venice', renders: [] },
  { label: 'SF Downtown', value: 'sf_downtown', renders: [] },
  { label: 'Mission District', value: 'sf_mission', renders: [] },
  { label: 'San Diego Downtown', value: 'sd_downtown', renders: [] },
  { label: 'Houston Downtown', value: 'hou_downtown', renders: [] },
  { label: 'Houston Uptown', value: 'hou_uptown', renders: [] },
  { label: 'Dallas Downtown', value: 'dal_downtown', renders: [] },
  { label: 'Austin Downtown', value: 'aus_downtown', renders: [] },
  { label: 'Toronto Downtown', value: 'tor_downtown', renders: [] },
  { label: 'North York', value: 'tor_north', renders: [] },
  { label: 'Ottawa Center', value: 'ott_center', renders: [] },
  { label: 'Hamilton Downtown', value: 'ham_downtown', renders: [] },
  { label: 'Montreal Downtown', value: 'mtl_downtown', renders: [] },
  { label: 'Plateau Mont-Royal', value: 'mtl_plateau', renders: [] },
  { label: 'Old Quebec', value: 'qc_old', renders: [] },
  { label: 'Vancouver Downtown', value: 'van_downtown', renders: [] },
  { label: 'Kitsilano', value: 'van_kits', renders: [] },
  { label: 'Victoria Inner Harbour', value: 'vic_inner', renders: [] },
  { label: 'Centro Histórico', value: 'mxc_centro', renders: [] },
  { label: 'Guadalajara Centro', value: 'gdl_centro', renders: [] },
  { label: 'Westminster West', value: 'wm_west', renders: [] },
  { label: 'Camden Town', value: 'cam_town', renders: [] },
  { label: 'Manchester Centre', value: 'mcr_center', renders: [] },
  { label: 'Berlin Mitte', value: 'brln_mitte', renders: [] },
  { label: 'Munich Center', value: 'mnch_center', renders: [] },
  { label: 'Le Marais', value: 'prs_marais', renders: [] },
  { label: 'Vieux Lyon', value: 'lyn_vieux', renders: [] },
  { label: 'Shibuya Crossing', value: 'shib_crossing', renders: [] },
  { label: 'Harajuku', value: 'shib_harajuku', renders: [] },
  { label: 'Kabukicho', value: 'shin_kabuki', renders: [] },
  { label: 'Roppongi Hills', value: 'rap_hills', renders: [] },
  { label: 'Namba', value: 'osk_namba', renders: [] },
  { label: 'Sydney CBD', value: 'syd_cbd', renders: [] },
  { label: 'Melbourne CBD', value: 'mel_cbd', renders: [] },
  { label: 'Marina Bay', value: 'sgc_marina', renders: [] },
  { label: 'Avenida Paulista', value: 'sp_paulista', renders: [] },
  { label: 'Copacabana', value: 'rio_copa', renders: [] }
]
