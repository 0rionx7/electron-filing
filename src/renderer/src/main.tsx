import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'

import { store } from '@renderer/app/store'
import App from './App'
import './assets/main.css'
import MaskedDate from '@renderer/components/dateTime/MaskedDate'
import MaskedTime from '@renderer/components/dateTime/MaskedTime'
import DateForm from '@renderer/components/dateTime/DateForm'
import PersonalInfo from '@renderer/components/steppedForm/PersonalInfo'

createRoot(document.getElementById('root')!).render(
  // <StrictMode>
  <Provider store={store}>
    {/* <App /> */}
    <DateForm />
    {/* <PersonalInfo /> */}
  </Provider>
  // </StrictMode>
)
