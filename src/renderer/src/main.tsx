import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router'

import Welcome from '@renderer/components/routingFlow/Welcome'
import PersonalInfo from '@renderer/components/routingFlow/PersonalInfo'
import FlowControl from '@renderer/components/routingFlow/FlowControl'
import FirstStep from '@renderer/components/routingFlow/FirstStep'
import SecondStep from '@renderer/components/routingFlow/SecondStep'
import ThirdStep from '@renderer/components/routingFlow/ThirdStep'
import App from './App'
import './assets/main.css'

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<App />}>
        <Route index element={<Welcome />} />
        <Route path="personalInfo" element={<PersonalInfo />} />
        <Route path="flowControl" element={<FlowControl />} />
        <Route path="flow1">
          <Route path="f1step1" element={<FirstStep />} />
          <Route path="f1step2" element={<SecondStep />} />
          <Route path="f1step3" element={<ThirdStep />} />
        </Route>
        <Route path="flow2">
          <Route path="f2step1" element={<FirstStep />} />
          <Route path="f2step2" element={<SecondStep />} />
          <Route path="f2step3" element={<ThirdStep />} />
        </Route>
        <Route path="flow3">
          <Route path="f3step1" element={<FirstStep />} />
          <Route path="f3step2" element={<SecondStep />} />
          <Route path="f3step3" element={<ThirdStep />} />
        </Route>
      </Route>
    </>
  )
)

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
)
